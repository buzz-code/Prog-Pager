import { parseDocument, DomUtils } from 'htmlparser2';

export const getBaseThreadUrl = (threadId) => {
    return window.location.origin + "/threads/" + threadId;
}

export const getUrlForThreadAndPage = (threadId, pageNumber) => {
    return getBaseThreadUrl(threadId) + '/page-' + pageNumber;
}

export const getPageContent = async (threadId, pageNumber) => {
    const pageUrl = getUrlForThreadAndPage(threadId, pageNumber);
    const res = await fetch(pageUrl);
    const pageText = await res.text();
    const dom = parseDocument(pageText);

    const postsContainer = DomUtils.findOne(el => el.attribs.class === 'block-container lbContainer', dom.childNodes);
    return DomUtils.getInnerHTML(postsContainer);
}
