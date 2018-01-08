//实时遍历对象获取注数和总金额
function forInInputprice(Inputprice) {
  let count = 0;
  let sumMoney = 0;
  for (let key in Inputprice) {
    //console.log(key+"   "+this.Inputprice[key])
    if (Inputprice[key]) {
      count++;
      sumMoney += Number(Inputprice[key]);
    }
  }
  return {
    count,
    sumMoney
  }
}
//清除Inputprice里所有的钱数
function clearInputprice(Inputprice) {
  for (let key in Inputprice) {
    //console.log(key+"   "+this.Inputprice[key])
    if (Inputprice[key]) {
      Inputprice[key] = null;
    }
  }
  return Inputprice
}
function clearMoreCheck(MoreCheck){
  for (let key in MoreCheck) {
    if (MoreCheck[key]) {
      MoreCheck[key] = false;
    }
  }
  return MoreCheck
}
export default {
  forInInputprice,
  clearInputprice,
  clearMoreCheck
}
