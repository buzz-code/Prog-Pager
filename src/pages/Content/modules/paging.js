import { threadId, lastPageNumber, currentPageNumber } from './metadata';
import {
  addWaterMarkToPosts,
  getPostsContainer,
  getValueOfPageSelector,
  hideLoader,
  removeButtons,
  removePager,
  showLoader,
} from './html';
import { getPageContent } from './utils';

document.documentElement.setAttribute(
  'ondurationchange',
  'XF.activate(document); return false'
);

export async function showAllPages() {
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

export async function showAllFromHere() {
  showLoader();
  let allPagesContent = await Promise.all(
    new Array(lastPageNumber - currentPageNumber)
      .fill(0)
      .map((item, index) =>
        getPageContent(threadId, index + currentPageNumber + 1)
      )
  );

  const postsContainer = getPostsContainer();
  preProcessPage(postsContainer);
  postsContainer.innerHTML += allPagesContent.join('');
  postProcessPage(postsContainer);
}

export async function showAllByParams() {
  const firstPage = getValueOfPageSelector('firstPage');
  const lastPage = getValueOfPageSelector('lastPage');

  showLoader();
  let allPagesContent = await Promise.all(
    new Array(lastPage - firstPage + 1)
      .fill(0)
      .map((item, index) => getPageContent(threadId, index + firstPage))
  );

  const postsContainer = getPostsContainer();
  preProcessPage(postsContainer);
  postsContainer.innerHTML = allPagesContent.join('');
  postProcessPage(postsContainer);
}

function preProcessPage(postsContainer) {
  hideLoader();
  removePager();
  removeButtons();
}

function postProcessPage(postsContainer) {
  addWaterMarkToPosts(postsContainer);
  document.documentElement.dispatchEvent(new CustomEvent('durationchange'));
}
