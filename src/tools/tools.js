//js中两数相乘得到准精确值
function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length

  } catch (e) {}
  try {
    m += s2.split(".")[1].length
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
Number.prototype.Mul = function (arg) {
  return accMul(arg, this);
};
/* js中两数相除得到准精确值 */
function accDiv(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}

  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}

  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}
//给Number类型增加一个div方法，，使用时直接用 .div 即可完成计算。
Number.prototype.div = function (arg) {
  return accDiv(this, arg);
};
//加法函数
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m).toFixed(0) / m;
}
//给Number类型增加一个add方法，，使用时直接用 .add 即可完成计算。
Number.prototype.add = function (arg) {
  return accAdd(arg, this);
};
/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accSub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 给Number类型增加一个sub方法，调用起来更加方便。
Number.prototype.sub = function (arg) {
  return accSub(arg, this);
};
/* 阶乘 */
Math.factorial = function (n) {
  return n <= 1 ? 1 : n * Math.factorial(n - 1);
};
/*C算法*/
function combination(m, n) {
  return n < m || m < 0 ? 0 : Math.factorial(n) / (Math.factorial(n - m) * Math.factorial(m));
};
/*A算法*/
function permutation(m, n) {
  return n < m || m < 0 ? 0 : Math.factorial(n) / Math.factorial(n - m);
};
/* 统计选了哪些号，并组装成二级数组。 */
function countJisuan(arr) {
  let transforArr = [];
  arr.forEach(item => {
    transforArr.push(item.childNodes)
  });

  let transforArr2 = [];
  if (transforArr[0].length == 16 && transforArr[1]) {
    transforArr2.push(Array.from(transforArr[0]).concat(Array.from(transforArr[1])))
  } else {
    transforArr2 = transforArr;
  }
  //console.log(transforArr2);
  let newArr = [];
  for (let i = 0; i < transforArr2.length; i++) {
    let arr1 = [];
    for (let j = 0; j < transforArr2[i].length; j++) {
      if (transforArr2[i][j].classList.contains("active")) {
        //console.log(transforArr2[i][j]);
        if (!isNaN(parseInt(transforArr2[i][j].innerHTML))) {
          //console.log(parseInt(transforArr2[i][j].innerHTML))
          arr1.push(parseInt(transforArr2[i][j].innerHTML))
        } else {
          switch (transforArr2[i][j].innerHTML) {
            case "龙":
              arr1.push(parseInt(246));
              break;
            case "虎":
              arr1.push(parseInt(248));
              break;
            case "和":
              arr1.push(parseInt(247));
              break;
            case "大":
              arr1.push(parseInt(201));
              break;
            case "小":
              arr1.push(parseInt(202));
              break;
            case "单":
              arr1.push(parseInt(203));
              break;
            case "双":
              arr1.push(parseInt(204));
              break;
          }
        }
      }
    }
    newArr.push(arr1);
  };
  return newArr;
}
//清除选号盘数据
function clearStyle(arr) {
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].childNodes.length; j++) {
        if (arr[i].childNodes[j].classList.contains('active')) {
          arr[i].childNodes[j].classList.remove('active');
        }
      }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].childNodes.length; j++) {
      if (arr[i].childNodes[j].classList.contains('active')) {
        arr[i].childNodes[j].classList.remove('active');
      }
    }
  };
}
/* 统计二维数组里每项的length便于算注数(第一位和其余位选的数可以同时选的情况) */
function selectNum(arr) {
  var newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i].length);
  }
  return newArr;
}
/* 计算前三位选号不能重复的注数 */
function getCount3(arr) {
  let firstArr = arr[0],
    secondArr = arr[1],
    thirdArr = arr[2],
    count = 0;
  if (firstArr.length > 0 && secondArr.length > 0 && thirdArr.length > 0) {
    for (let i = 0; i < firstArr.length; i++) {
      for (let j = 0; j < secondArr.length; j++) {
        for (let k = 0; k < thirdArr.length; k++) {
          if (firstArr[i] != secondArr[j] && firstArr[i] != thirdArr[k] && secondArr[j] != thirdArr[k]) {
            count++;
          }
        }
      }
    }
  }
  return count;
}
/* 计算前两位选号不能重复的注数 */
function getCount2(arr) {
  let firstArr = arr[0],
    secondArr = arr[1],
    count = 0;
  if (firstArr.length > 0 && secondArr.length > 0) {
    for (let i = 0; i < firstArr.length; i++) {
      for (let j = 0; j < secondArr.length; j++) {
        if (firstArr[i] != secondArr[j]) {
          count++;
        }
      }
    }
  }
  return count;
}
//生成随机数方法
function randomFn(min, max) {
  let c = max - min + 1
  return Math.floor(Math.random() * c + min)
}
//生成随机数数组，元素不重复，第一个参数是生成几个,第二第三是生成随机数的范围
function getRandomArr(num, min, max) {
  let arr = [];
  while (arr.length < num) {
    let a = randomFn(min, max);
    let onOff = true;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == a) {
        onOff = false;
        break;
      } else {
        onOff = true;
      }
    }
    if (onOff) {
      arr.push(a)
    }
  }
  return arr;
}
//点击选号盘一个数然后全部选中的效果函数
function oneAll(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].childNodes.length; j++) {
      arr[i].childNodes[j].classList.toggle("active")
    }
  }
}
//快三系列的二同号标准选号和二不同号胆拖选号的选中后页面效果
//参数说明：
//1：当前号所在的行号
//2：整个选号盘数组
//3：当前选号的内容
//4：当前选号的对象
function xuanhao2(currentIndex, arr, content, target) {
  //1.获取当前点击元素在当前行的下标
  let index;
  for (let i = 0; i < arr[currentIndex].childNodes.length; i++) {
    if (content == arr[currentIndex].childNodes[i].innerHTML) {
      index = i;
    }
  }
  //2:判断当前元素在第几行
  if (currentIndex == 0) {
    //2.1如果是第一行，先清除当前行所有样式，在清除下一行同样下标的样式，在给自己加样式
    for (let i = 0; i < arr[0].childNodes.length; i++) {
      arr[0].childNodes[i].classList.remove("active");
    }
    arr[1].childNodes[index].classList.remove('active');
    target.target.classList.add("active");
  } else if (currentIndex == 1) {
    //2.2如果是第二行，先判断有无样式，有可以去，无的话先清除上一行同样下标的样式，在给自己加样式
    if (target.target.classList.contains("active")) {
      target.target.classList.remove("active")
    } else {
      arr[0].childNodes[index].classList.remove('active');
      target.target.classList.add("active");
    }
  }
}
//将时间戳转化为年月日格式
function getDate(dd) {
  let date = new Date(dd);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = formatTima(date.getDate()) + ' ';
  let h = formatTima(date.getHours()) + ':';
  let m = formatTima(date.getMinutes()) + ':';
  let s = formatTima(date.getSeconds());
  return Y + M + D + h + m + s
  // 输出结果：2014-04-23 18:55:49
}

function getYMD(dd) {
  let date = new Date(dd);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = formatTima(date.getDate());
  return Y + M + D
  // 输出结果：2014-04-23
}

function formatTima(a) {
  return a < 10 ? '0' + a : a
}
//每个号码对应固定的注数，计算注数
function addCount(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].childNodes.length; j++) {
      if (arr[i].childNodes[j].classList.contains("active")) {
        count += Number(arr[i].childNodes[j].getAttribute("selfkey"));
      }

    }
  }
  return count
}
var creat = {
  //从一个数组里按c算法取出4个元素组成新的数组
  creatArr4(arr) {
    let arr1 = [];
    if (arr.length > 3) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          for (var k = j + 1; k < arr.length; k++) {
            for (let f = k + 1; f < arr.length; f++) {
              let arr2 = [arr[i], arr[j], arr[k], arr[f]];
              arr1.push(arr2);
            }
          }
        }
      }
    }
    return arr1;
  },
  //从一个数组里按c算法取出3个元素组成新的数组
  creatArr3(arr) {
    let arr1 = [];
    if (arr.length > 2) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          for (var k = j + 1; k < arr.length; k++) {
            let arr2 = [arr[i], arr[j], arr[k]];
            arr1.push(arr2);
          }
        }
      }
    }
    return arr1;
  },
  //从一个数组里按c算法取出2个元素组成新的数组
  creatArr2(arr) {
    let arr1 = [];
    if (arr.length > 1) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          let arr2 = [arr[i], arr[j]];
          arr1.push(arr2);
        }
      }
    }
    return arr1;
  }
}
//将一个数和一个数组里的元素对比，没重复的话组成一注
function getCount4(arr1, arr2, creatArr) {
  /* 数组第二位里按c算法取出的数 组成的新的数组 */
  let arr22 = creat[creatArr](arr2);
  let count = 0;
  if (arr22) {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr22.length; j++) {
        if (arr22[j].indexOf(arr1[i]) == -1) {
          count++;
        }
      }
    }
  }
  return count;
}
var store = {
  // 将数据存储到本地
  setData(key, value) {
    localStorage[key] = JSON.stringify(value);
  },
  // 从本地取数据   问题：使用localStorage[key]取数据就会报错。？？？？？？？？？？？？？？？？
  getData(key) {
    console.log(key)
    return JSON.parse(localStorage.getItem(key)) || {};
  }
};
//按照c算法从数组里取若干个数组成二维数组
/* @arr  arr:初始数组
   @size  size:个数
*/
function choose(arr, size) {
  var allResult = [];
  (function choose1(arr, size, result) {
    var arrLen = arr.length;
    if (size > arrLen) {
      return;
    }
    if (size == arrLen) {
      allResult.push([].concat(result, arr))
    } else {
      for (var i = 0; i < arrLen; i++) {
        var newResult = [].concat(result);
        newResult.push(arr[i]);
        if (size == 1) {
          allResult.push(newResult);
        } else {
          var newArr = [].concat(arr);
          newArr.splice(0, i + 1);
          choose1(newArr, size - 1, newResult);
        }
      }
    }
  })(arr, size, [])
  return allResult;
}

export default {
  accMul,
  accDiv,
  combination,
  permutation,
  countJisuan,
  selectNum,
  clearStyle,
  getCount3,
  getCount2,
  getRandomArr,
  randomFn,
  oneAll,
  xuanhao2,
  getDate,
  addCount,
  getCount4,
  store,
  creat,
  choose,
  formatTima,
  getYMD
};
