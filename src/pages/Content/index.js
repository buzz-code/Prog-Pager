import { isThread, threadId, lastPageNumber } from './modules/metadata';
import { addButton, getPostsContainer, hideLoader, removeAllChildrenOfElement, removeBottomFixerIfExists, removeButtons, removePager, showLoader } from './modules/html';
import { getPageContent } from './modules/utils';

if (isThread) {
    addButton('הצג את כל האשכול', showAllPages);
}

removeBottomFixerIfExists();

async function showAllPages() {
    showLoader();
    let allPagesContent = await Promise.all(
        new Array(lastPageNumber)
            .fill(0)
            .map((item, index) => getPageContent(threadId, index + 1))
    );

    hideLoader();
    removePager();
    removeButtons();
    const postsContainer = getPostsContainer();
    removeAllChildrenOfElement(postsContainer);
    postsContainer.innerHTML = allPagesContent.join('');
}
