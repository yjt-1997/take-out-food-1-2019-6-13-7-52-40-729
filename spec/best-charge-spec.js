describe('Take out food', function () {

  //isExsit非法输入测试
  it ('should return false when invoke isExsit given ["ITEM0100"]', () => {
    //given
    const inputs = ["ITEM0100"];
    //when
    const result = isExsit(inputs);
    //then
    expect(result).toBe(false);
  });

  //isExsit合法输入测试
  it ('should return true when invoke isExsit given ["ITEM0001"]', () => {
    //given
    const inputs = ["ITEM0001"];
    //when
    const result = isExsit(inputs);
    //then
    expect(result).toBe(true);
  });

  //isValid非法输入测试
  it ('should return false when invoke isExsit given ["ITEM0001 x 1.1"]', () => {
    //given
    const inputs = ["ITEM0001 x 1.1"];
    //when
    const result = isValid(inputs);
    //then
    expect(result).toBe(false);
  });

  //isValid合法输入测试
  it ('should return true when invoke isExsit given ["ITEM0001 x 1"]', () => {
    //given
    const inputs = ["ITEM0001 x 1"];
    //when
    const result = isValid(inputs);
    //then
    expect(result).toBe(true);
  });

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

});