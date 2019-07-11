const loadItems = require('../src/items.js');
const loadPro = require('../src/promotions.js');

const items = loadItems.loadAllItems();
const promotions = loadPro.loadPromotions();
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
function getBuyedItems(inputs) {
  let buyedItems = new Array();
  let index = 0;
  for (let i = 0; i < inputs.length; i++) {
    let inputItem = inputs[i].split("x");
    let itemId = inputItem[0].trim();
    let number = parseInt(inputItem[1].trim());
    buyedItems.push({ itemId: itemId, number: number });
  }
  return buyedItems;
}
function isInPro(itemId) {
  let halfIds = promotions[1].items;
  for (let i = 0; i < halfIds.length; i++) {
    if (halfIds[i] == itemId)
      return true;
  }
  return false;
}
function bestCharge(inputs) {
  if (isValid(inputs)) {
    const buyedItems = getBuyedItems(inputs);
    let bestCharge = "============= 订餐明细 =============\n";
    let totalSum = 0;
    let plan1Sum = 0;
    let plan2Sum = 0;
    let usePlanFlag = false;
    let finalCost;
    let halfSaleName = "";
    for (let i = 0; i < buyedItems.length; i++) {
      for (let j = 0; j < items.length; j++) {
        if (items[j].id == buyedItems[i].itemId) {
          let tempCost = items[j].price * buyedItems[i].number;
          if (isInPro(buyedItems[i].itemId)) {
            plan2Sum += tempCost / 2;
            halfSaleName += `${items[j].name}，`;
            usePlanFlag = true;
          } else {
            plan2Sum += tempCost;
          }
          totalSum += tempCost;
          bestCharge += `${items[j].name} x ${buyedItems[i].number} = ${tempCost}元\n`;
        }
      }
    }
    usePlanFlag = (totalSum >= 30) || usePlanFlag;
    plan1Sum = totalSum >= 30 ? (totalSum - Math.floor(totalSum / 30) * 6) : totalSum;
    finalCost = totalSum;
    if (usePlanFlag) {
      bestCharge += "-----------------------------------\n使用优惠:\n";
      if (plan2Sum < plan1Sum) {
        finalCost = plan2Sum;
        bestCharge += `指定菜品半价(${halfSaleName.substr(0, halfSaleName.length - 1)})，省${totalSum - plan2Sum}元\n`;
      } else {
        finalCost = plan1Sum;
        bestCharge += `满30减6元，省${totalSum - plan1Sum}元\n`;
      }
    }
    bestCharge += `-----------------------------------\n总计：${finalCost}元\n===================================`;
    return bestCharge;
  }
}
console.log(bestCharge(["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]));
module.exports = {
  isExsit, isValid, getBuyedItems, isInPro, bestCharge
}