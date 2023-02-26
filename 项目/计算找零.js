function checkCashRegister(price, cash, cid) {
    //所有货币价值都乘以100，以处理小数涉及的精确错误
    const denomination = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1,];
  
    function transaction(price, cash, cid) {
      let changeNeeded = (cash - price) * 100;
      //金钱将被推到每个数组中的第二个价值
      let moneyProvided = [
      ["ONE HUNDRED", 0], 
      ["TWENTY", 0], 
      ["TEN", 0], 
      ["FIVE", 0], 
      ["ONE", 0], 
      ["QUARTER", 0], 
      ["DIME", 0], 
      ["NICKEL", 0], 
      ["PENNY", 0],
    ];
    //采取CID，将其倒转（例如在罗马数字练习中），将值乘以100
    let availCash = [...cid].reverse().map(el => [el[0], el[1] * 100]);
    //获取所有现金的总和除以100
    let sumOfCash = availCash.reduce((a, b) => (a + b[1]),0) / 100;
    //如果sumofcash是确切的更改，则需要返回
    if (sumOfCash === changeNeeded / 100) {
      return {status: "CLOSED", change: [...cid]};
    }
    //否则，运行此功能
    else for (let i = 0; i < availCash.length; i++) {
      //如果面额值小于所需的变化，并且可用现金价值大于0，则运行时循环
        while (denomination[i] <= changeNeeded && availCash[i][1] > 0) {
          //1.货币提供的阵列通过面额价值增加
          moneyProvided[i][1] += denomination[i];
          //2.改变的面额值减少了
          changeNeeded -= denomination[i];
          //3.相同的面额价值也会减少可用的现金
          availCash[i][1] -= denomination[i];
        }
      };
      
     //清理货币提供的阵列
      let change = moneyProvided
      //1.通过除以100来重置货币价值
      .map(el => [el[0], el[1] / 100])
      //2.滤除所有非空美元和价值数组
      .filter(el => el[1] !== 0);
      //计算更改阵列的总数
      let changeTotal = change.reduce((a, b) => (a + b[1]),0);
      //如果总变化小于所需的更改
      if (changeTotal < changeNeeded) {
          return {status: "INSUFFICIENT_FUNDS", change: []};
      }
      return {status: "OPEN", change};
    }
  
    //这是称为事务功能的地方
    let answer = transaction(price, cash, cid);
    //在这里，如果2语言未首先捕获，则提供最终答案
    return answer;
  };