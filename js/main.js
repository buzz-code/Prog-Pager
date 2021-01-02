//hide ads
if (localStorage['disable-ads'] === 'true') {
	var style = document.createElement('style');
	style.innerHTML = '[data-widget-definition="xa_ams_latest_articles"],[data-position="big_main_banner"],.p-body-sidebar,.samBannerUnit,img#register {display: none !important}';
	document.head.appendChild(style);
}

//add show-all button
var buttonGroup = document.querySelector('.block.block--messages .block-outer .block-outer-opposite .buttonGroup');
var showAllButton = document.createElement('a');
showAllButton.href = '#';
showAllButton.className = 'button--link button';
var showAllText = document.createElement('span');
showAllText.className = 'button-text';
showAllText.innerHTML = 'הצג את כל האשכול';
showAllButton.appendChild(showAllText);
showAllButton.onclick = getThread;
buttonGroup.insertBefore(showAllButton, buttonGroup.firstChild);

//function to generate pdf
function getThread() {
	var threadId = location.href.match(/threads\/[^\.]*\.(\d*)/)[1];
	var url = location.origin + '/threads/' + threadId;
	var data = $('<html>');
	data.append('<base href="' + window.location.href + '">');
	data.append('<style>body {direction: rtl} .message-main {height: unset !important}</style>');
	data.append('<style>[data-widget-definition="xa_ams_latest_articles"],[data-position="big_main_banner"],.p-body-sidebar,.block.block--messages .block-outer,form,.blockMessage.blockMessage--none,.p-breadcrumbs--bottom {display: none !important}</style>');
	$('<span class="globalAction"><span class="globalAction-bar" /></span>')
	.appendTo("body")
	.addClass("is-active");
	getNextPageRes(url, 1);
	function getNextPageRes(url, page) {
		$.get(url + '/page-' + page)
		.done(function(response) {
			var $res = $(response);
			data.append($res);
			var pageEl = $res.find('.pageNavSimple-el--next').attr('href');
			if(pageEl) {
				var page = pageEl.match(/page-(\d*)/)[1];
				getNextPageRes(url, page);
			} else {
				completeScraping();
			}
		})
		.fail(function (a,b,c,d) {
			console.log('err', c);
			completeScraping();
		});
	}
	function completeScraping() {
		$('.globalAction').remove();
		data.find('footer.p-footer:not(:last),header.p-header:not(:first),.p-navSticky:not(:first),.p-sectionLinks:not(:first),.p-breadcrumbs:not(:first),.p-body-header:not(:first)').remove();
		document.body.innerHTML = data.html();
		// var win = window.open("", Math.random(), "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
		// win.document.write(data.html());
		// win.document.close();
		// win.focus();
		// win.onload = function(){win.print();win.close();};
	}
	
	return false;
}