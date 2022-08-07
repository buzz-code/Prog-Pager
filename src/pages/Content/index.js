import { isThread, threadId, lastPageNumber, currentPageNumber } from './modules/metadata';
import { addButton, addWaterMarkToPosts, getPostsContainer, hideLoader, removeBottomFixerIfExists, removeButtons, removePager, showLoader } from './modules/html';
import { getPageContent } from './modules/utils';

if (isThread) {
    addButton('הצג את כל האשכול', showAllPages);
    addButton('הצג הכל מכאן ולהבא', showAllFromHere);
}

removeBottomFixerIfExists();

async function showAllPages() {
    showLoader();
    let allPagesContent = await Promise.all(
        new Array(lastPageNumber)
            .fill(0)
            .map((item, index) => getPageContent(threadId, index + 1))
    );

    const postsContainer = getPostsContainer();
    preProcessPage(postsContainer);
    postsContainer.innerHTML = allPagesContent.join('');
    postProcessPage(postsContainer);
}

async function showAllFromHere() {
    showLoader();
    let allPagesContent = await Promise.all(
        new Array(lastPageNumber - currentPageNumber)
            .fill(0)
            .map((item, index) => getPageContent(threadId, index + currentPageNumber + 1))
    );

    const postsContainer = getPostsContainer();
    preProcessPage(postsContainer);
    postsContainer.innerHTML += allPagesContent.join('');
    postProcessPage(postsContainer);
}

function preProcessPage(postsContainer) {
    hideLoader();
    removePager();
    removeButtons();
}

function postProcessPage(postsContainer) {
    addWaterMarkToPosts(postsContainer);
    XF.activate(document);
}