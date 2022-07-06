import { isThread, threadId, lastPageNumber } from './modules/metadata';
import { addButton, getPostsContainer, hideLoader, removeAllChildrenOfElement, removeBottomFixerIfExists, removeButtons, removePager, showLoader } from './modules/html';
import { getPageContent } from './modules/utils';

if (isThread) {
    addButton('הצג את כל האשכול', showAllPages);
}

removeBottomFixerIfExists();

async function showAllPages() {
    showLoader();
    let pageNumber = 1;
    let allPagesContent = [];
    while (pageNumber <= lastPageNumber) {
        const pageContent = await getPageContent(threadId, pageNumber);
        allPagesContent.push(pageContent);
        pageNumber++;
    }

    hideLoader();
    removePager();
    removeButtons();
    const postsContainer = getPostsContainer();
    removeAllChildrenOfElement(postsContainer);
    postsContainer.innerHTML = allPagesContent.join('');
}
