const items = loadAllItems();
const promotions = loadPromotions();
function bestCharge(selectedItems) {
  return /*TODO*/;
}
function isValid(inputs) {
  let isValid = true;
  let isExsit = false;
  for (let i = 0; i < inputs.length; i++) {
    let inputItem = element.split("x");
    let itemId = inputItem[0].trim();
    if (!/^ITEM00[0-9]{2}$/.test(itemId)) {
      isValid = false;
      break;
    }
    for (let j = 0; j < items.length; j++) {
      if (itemId == items[j].id) {
        isExsit = true;
        break;
      }
    }
    if (!isExsit || !isValid)
      return false;
  }
  return isValid;
}
