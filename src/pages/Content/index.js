import { isThread, threadId, lastPageNumber, currentPageNumber } from './modules/metadata';
import { addButton, getPostsContainer, hideLoader, removeAllChildrenOfElement, removeBottomFixerIfExists, removeButtons, removePager, showLoader } from './modules/html';
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

    preProcessPage();
    const postsContainer = getPostsContainer();
    removeAllChildrenOfElement(postsContainer);
    postsContainer.innerHTML = allPagesContent.join('');
}

async function showAllFromHere() {
    showLoader();
    let allPagesContent = await Promise.all(
        new Array(lastPageNumber - currentPageNumber)
            .fill(0)
            .map((item, index) => getPageContent(threadId, index + currentPageNumber + 1))
    );

    preProcessPage();
    const postsContainer = getPostsContainer();
    postsContainer.innerHTML += allPagesContent.join('');
}

function preProcessPage() {
    hideLoader();
    removePager();
    removeButtons();
}
