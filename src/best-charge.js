const items = loadAllItems();
const promotions = loadPromotions();
function isExsit(itemId) {
  for (let i = 0; i < items.length; i++) {
    if (itemId == items[i].id)
      return true;
  }
  return false;
}
function isValid(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if (!/^ITEM00[0-9]{2} x [1-9]{1}[0-9]*$/.test(inputs[i])) {
      return false;
    }
    let inputItem = inputs[i].split("x");
    let itemId = inputItem[0].trim();
    if (!isExsit(itemId))
      return false;
  }
  return true;
}
function getBuyedItems(inputs){
  let buyedItems = new Array();
  let index = 0;
  for(let i=0;i<inputs.length;i++){
    let inputItem = inputs[i].split("x");
    let itemId = inputItem[0].trim();
    let number = parseInt(inputItem[1].trim());
    buyedItems.push({itemId:itemId,number:number});
  }
  return buyedItems;
}