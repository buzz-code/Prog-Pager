export const isThread = /threads/.test(window.location.href);

export const threadId = isThread
    ? window.location.href.match(/threads\/[^\.]*\.(\d*)/)[1]
    : null;

export const isLastPageOfThread = isThread
    ? document.querySelector('.pageNav-jump--next') === null
    : null;

export const lastPageNumber = isThread
    ? document.querySelector('ul.pageNav-main')
        ? Number(
            document.querySelector('ul.pageNav-main')
                .querySelector('li:last-child')
                .textContent
        )
        : 1
    : null;

export const currentPageNumber = isThread
    ? window.location.href.match(/page-(\d*)/)
        ? Number(
            window.location.href.match(/page-(\d*)/)[1]
        )
        : 1
    : null;
