import { userName } from "./metadata";

export const addButton = (text, onClickHandler) => {
    var buttonGroup = document.querySelector(".p-body-content .buttonGroup");
    var newButton = document.createElement("a");
    newButton.href = "#";
    newButton.className = "button--link button";
    var buttonContent = document.createElement("span");
    buttonContent.className = "button-text";
    buttonContent.innerHTML = text;
    newButton.appendChild(buttonContent);
    newButton.onclick = function (event) {
        onClickHandler.bind(this, event)();
        return false;
    }
    buttonGroup.insertBefore(newButton, buttonGroup.firstChild);
}

export const removeBottomFixerIfExists = () => {
    const bottomFixer = document.querySelector('.u-bottomFixer');
    if (bottomFixer) {
        bottomFixer.remove();
    }
}

export const showLoader = () => {
    const loader = document.createElement('span');
    loader.className = 'globalAction is-active';
    const loaderInner = document.createElement('span');
    loaderInner.className = 'globalAction-bar';
    loader.appendChild(loaderInner);
    document.body.append(loader);
}

export const hideLoader = () => {
    const loader = document.querySelector('.globalAction');
    if (loader) {
        loader.remove();
    }
}

export const removeAllChildrenOfElement = (element) => {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

export const getPostsContainer = () => document.querySelector('.block-container.lbContainer');

export const removePager = () => {
    document.querySelectorAll('.pageNavWrapper').forEach(el => el.remove());
}

export const removeButtons = () => {
    document.querySelector('.buttonGroup').remove();
}

export const addWaterMarkToPosts = (postsContainer) => {
    postsContainer.querySelectorAll('.message-attribution-main').forEach(el => {
        const attribution = document.createElement('span');
        attribution.className = 'watermark';
        attribution.textContent = ' הופק על ידי ' + userName;
        el.after(attribution);
    });
}

export const hideAdsIfProgrammer = () => {
    if (localStorage.getItem('disable-ads') === 'true') {
        document.body.classList.add('hide-ads');
    }
}