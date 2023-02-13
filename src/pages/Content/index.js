import { isThread } from './modules/metadata';
import {
  addButton,
  attachPageSelectorDropdown,
  hideAdsIfProgrammer,
  removeBottomFixerIfExists,
  toggleDropdownMenu,
} from './modules/html';
import { showAllFromHere } from './modules/paging';

if (isThread) {
  addButton('הצג הכל מכאן ולהבא', showAllFromHere);
  addButton('בחר עמודים להצגה', toggleDropdownMenu);

  attachPageSelectorDropdown();
}

// apparently this removes management area
// removeBottomFixerIfExists();

hideAdsIfProgrammer();
