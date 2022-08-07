import { isThread } from './modules/metadata';
import { addButton, hideAdsIfProgrammer, removeBottomFixerIfExists, } from './modules/html';
import { showAllFromHere, showAllPages } from './modules/paging';

if (isThread) {
    addButton('הצג את כל האשכול', showAllPages);
    addButton('הצג הכל מכאן ולהבא', showAllFromHere);
}

removeBottomFixerIfExists();

hideAdsIfProgrammer();
