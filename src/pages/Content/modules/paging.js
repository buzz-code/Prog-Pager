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
  getValueOfCheckbox,
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

  preProcessPage();
  const postsContainer = getPostsContainer();
  postsContainer.innerHTML = allPagesContent.join('');
  postProcessPage();
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

  preProcessPage();
  const postsContainer = getPostsContainer();
  postsContainer.innerHTML += allPagesContent.join('');
  postProcessPage();
}

export async function showAllByParams() {
  const firstPage = Math.max(0, getValueOfPageSelector('firstPage'));
  const lastPage = Math.min(lastPageNumber, getValueOfPageSelector('lastPage'));
  const isRemovePager = getValueOfCheckbox('isRemovePager');

  showLoader();
  let allPagesContent = await Promise.all(
    new Array(lastPage - firstPage + 1)
      .fill(0)
      .map((item, index) => getPageContent(threadId, index + firstPage))
  );

  preProcessPage(isRemovePager);
  const postsContainer = getPostsContainer();
  postsContainer.innerHTML = allPagesContent.join('');
  postProcessPage();
}

function preProcessPage(isRemovePager = false) {
  hideLoader();
  isRemovePager && removePager();
  removeButtons();
}

function postProcessPage() {
  const postsContainer = getPostsContainer();
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
    postProcessPage();
  } catch {
    button.parentElement
      .querySelector('.loader')
      .classList.toggle('hidden', true);
  }
};
