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

function getThread() {
	var threadId = location.href.match(/threads\/[^\.]*\.(\d*)/)[1];
	var url = location.origin + '/threads/' + threadId;
	var data = $('<html>');
	$('<span class="globalAction"><span class="globalAction-bar" /></span>')
	.appendTo("body")
	.addClass("is-active");
	getNextPageRes(url, 1);
	function getNextPageRes(url, page) {
		$.get(url + '/page-' + page)
		.done(function(response) {
			var $res = $(response);
			appendToPreviousReponse($res);
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
	function appendToPreviousReponse(html) {
		data.append(html);
	}
	function completeScraping() {
		$('.globalAction').remove();
		data.find('[data-widget-definition="xa_ams_latest_articles"],[data-position="big_main_banner"],.p-body-sidebar,.block.block--messages .block-outer,form,.blockMessage.blockMessage--none,.p-breadcrumbs--bottom,footer.p-footer:not(:last),header.p-header:not(:first),.p-navSticky:not(:first),.p-sectionLinks:not(:first),.p-breadcrumbs:not(:first),.p-body-header:not(:first)').remove();
		var win = window.open("", Math.random(), "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
		win.document.body.innerHTML = '<base href="' + window.location.href + '">';
		win.document.body.innerHTML += '<style>body {direction: rtl}</style>';
		win.document.body.innerHTML += data.html();
		win.document.querySelectorAll('.message-main').forEach(function (item){item.style.height = 'unset';})
		win.focus();
		win.print();
		win.close();
	}
	
	return false;
}