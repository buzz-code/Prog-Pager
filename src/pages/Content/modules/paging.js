import { threadId, lastPageNumber, currentPageNumber } from './metadata';
import {
  addWaterMarkToPosts,
  getPostsContainer,
  getValueOfPageSelector,
  hideLoader,
  removeButtons,
  removePager,
  showLoader,
  bindLogicToButtons,
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
  setTimeout(() => {
    bindLogicToButtons('[id^="retry-button"]', reloadPageContent);
  }, 0);
}

export const reloadPageContent = async () => {
  const button = event.target;
  const { thread_id, page_number } = button.dataset;
  try {
    button.parentElement
      .querySelector('.loader')
      .classList.toggle('hidden', false);
    const pageContent = await getPageContent(thread_id, page_number);
    button.parentNode.outerHTML = pageContent;
    const postsContainer = getPostsContainer();
    postProcessPage(postsContainer);
  } catch {
    button.parentElement
      .querySelector('.loader')
      .classList.toggle('hidden', true);
  }
};
