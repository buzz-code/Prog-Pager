import { currentPageNumber, lastPageNumber, userName } from './metadata';
import { showAllByParams } from './paging';

export const addButton = (text, onClickHandler) => {
  var buttonGroup = document.querySelector('.p-body-content .buttonGroup');
  var newButton = document.createElement('a');
  newButton.href = '#';
  newButton.className = 'button--link button';
  var buttonContent = document.createElement('span');
  buttonContent.className = 'button-text';
  buttonContent.innerHTML = text;
  newButton.appendChild(buttonContent);
  newButton.onclick = function (event) {
    onClickHandler.bind(this, event)();
    return false;
  };
  buttonGroup.insertBefore(newButton, buttonGroup.firstChild);
  return newButton;
};

export const removeBottomFixerIfExists = () => {
  const bottomFixer = document.querySelector('.u-bottomFixer');
  if (bottomFixer) {
    bottomFixer.remove();
  }
};

export const showLoader = () => {
  const loader = document.createElement('span');
  loader.className = 'globalAction is-active';
  const loaderInner = document.createElement('span');
  loaderInner.className = 'globalAction-bar';
  loader.appendChild(loaderInner);
  document.body.append(loader);
};

export const hideLoader = () => {
  const loader = document.querySelector('.globalAction');
  if (loader) {
    loader.remove();
  }
};

export const removeAllChildrenOfElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
};

export const getPostsContainer = () =>
  document.querySelector('.block-container.lbContainer');

export const removePager = () => {
  document.querySelectorAll('.pageNavWrapper').forEach((el) => el.remove());
};

export const removeButtons = () => {
  document.querySelector('.buttonGroup').remove();
};

export const addWaterMarkToPosts = (postsContainer) => {
  postsContainer.querySelectorAll('.message-attribution-main').forEach((el) => {
    const attribution = document.createElement('span');
    attribution.className = 'watermark';
    attribution.textContent = ' הופק על ידי ' + userName;
    el.after(attribution);
  });
};

export const hideAdsIfProgrammer = () => {
  if (localStorage.getItem('disable-ads') === 'true') {
    document.body.classList.add('hide-ads');
  }
};

export const getValueOfPageSelector = (inputName) => {
  let value = document.querySelector(
    '[name=' + inputName + ']:checked'
  ).value;

  if (value === '-1') {
    value = document.querySelector(
      '[name=' + inputName + 'Custom]'
    ).value;
  }

  return Number(value);
};

export const toggleDropdownMenu = () => {
  document.getElementById('dropdown-menu').classList.toggle('hidden');
};

export const attachPageSelectorDropdown = () => {
  const dropdownMenu = document.createElement('div');
  dropdownMenu.id = 'dropdown-menu';
  dropdownMenu.className = 'dropdown-menu hidden';
  dropdownMenu.innerHTML = `
    <div class="page-selector-wrapper">
        <div>בחר עמוד התחלה</div>
        <label>
            <input name="firstPage" type="radio" value="1"/>
             עמוד ראשון
       </label>
        <label>
            <input name="firstPage" type="radio" value="${currentPageNumber}" checked/>
            עמוד נוכחי (${currentPageNumber})
        </label>
        <label>
            <input name="firstPage" type="radio" value="-1"/>
            בחירת עמוד
            <input name="firstPageCustom" type="number" min="1" max="${lastPageNumber}"/>
        </label>
    </div>
    <div class="page-selector-wrapper">
        <div>בחר עמוד סיום</div>
        <label>
            <input name="lastPage" type="radio" value="${currentPageNumber}"/>
            עמוד נוכחי (${currentPageNumber})
        </label>
        <label>
            <input name="lastPage" type="radio" value="${lastPageNumber}" checked/>
             עמוד אחרון
       </label>
        <label>
            <input name="lastPage" type="radio" value="-1"/>
            בחירת עמוד
            <input name="lastPageCustom" type="number" min="1" max="${lastPageNumber}"/>
        </label>
    </div>
    `;

  const newButton = document.createElement('button');
  newButton.textContent = 'הצג עמודים נבחרים';
  newButton.onclick = function () {
    showAllByParams();
    toggleDropdownMenu();
    return false;
  };
  dropdownMenu.appendChild(newButton);

  var buttonGroup = document.querySelector('.p-body-content .buttonGroup');
  buttonGroup.style.position = 'relative';
  buttonGroup.appendChild(dropdownMenu);
};
