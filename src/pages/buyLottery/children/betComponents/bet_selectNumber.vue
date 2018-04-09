<template>
  <div class="select_num">
    <!--显示单位-->
    <div class="checkbox animated bounceInRight" v-if="playCode==1713||playCode==1813||playCode==1814">
      <div class="checkbox-row" v-for="(item,index) in unit" :key="index">
        <div class="unit">{{item.unit}}</div>
        <div class="items">
          <div class="checkbox-group" v-for="(item,index) in item.items" :key="index">
            <label>
              <input type="checkbox" v-model="selected[index]" @change="changeSelect(index)">
              <span>{{item}}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- 选号盘数据 -->
    <div class="select animated bounceInRight">
      <div class="select-row" v-for="(item,index1) in selectNumber1" :key="index1">
        <div class="unit" v-show="item.unit">{{item.unit}}</div>
        <div class="items" ref="items">
          <div v-for="(item,index) in item.items" :key="index" :selfKey="item.key" :class="{wrap:item.num.length>2}"
               @click="select($event)">{{item.num}}
          </div>
        </div>
        <div class="select-tools" v-show="item.tools">
          <span v-for="(item,index) in item.tools" :key="index" @click="toolQuan(index,item.key)" >{{item.val}}</span>
        </div>
      </div>
      <!-- 选号盘下面的赔率部分 -->
      <div class="current-odds" v-if="odds.length==16">
        <div v-for="(item,index) in odds" :key="index">{{item | retainDigit(3)}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import ccaa from 'tools/tools.js'
  export default {
    data (){
        return {

        }
    },
    methods: {
      //点击选号盘后，加样式，算注数
      select(a) {
        /* 加样式 */
        if (
          (this.lotteryCode == 31 ||
          this.lotteryCode == 32 ||
          this.lotteryCode == 33) &&
          (this.playCode == 2 || this.playCode == 5)
        ) {
          ccaa.oneAll(this.$refs.items)
        } else if (
          (this.lotteryCode == 31 ||
          this.lotteryCode == 32 ||
          this.lotteryCode == 33) &&
          (this.playCode == 7 || this.playCode == 9)
        ) {
          ccaa.xuanhao2(
            a.target.getAttribute('selfKey'),
            this.$refs.items,
            a.target.innerHTML,
            a
          )
        } else {
          this.$store.commit('getIndex', a.target.getAttribute('selfKey'))
          a.target.classList.toggle('active') //添加/清除样式的转换
        }
        //console.log(a.target.innerHTML)
        /* 算注数 */
        this.calculateCount()
      },
      //算注数算法单独抽出来
      calculateCount() {
        let count = 0
        let erweiArr
        //对于时时彩里有单位的，重组二维数组
        if (
          (this.lotteryCode == 21 ||
          this.lotteryCode == 22 ||
          this.lotteryCode == 23 ||
          this.lotteryCode == 24 ||
          this.lotteryCode == 25 ||
          this.lotteryCode == 26) &&
          (this.playCode == 1713 ||
          this.playCode == 1813 ||
          this.playCode == 1814)
        ) {
          erweiArr = ccaa.countJisuan(this.$refs.items) //声明变量接收二维数组
          erweiArr.unshift(this.unitRecord)
        } else {
          erweiArr = ccaa.countJisuan(this.$refs.items) //声明变量接收二维数组
        }
        this.$store.commit('changeSumListObj2', erweiArr) //将选中的球组装成二维数组传给vuex
        //console.log(erweiArr);
        let selectedNum = ccaa.selectNum(erweiArr) //声明变量接收各个位上选中的个数(是个数组)
        /* 因有些玩法函数需要的参数不同，需要用if区分开 */
        if (
          this.lotteryCode == 11 ||
          this.lotteryCode == 12 ||
          this.lotteryCode == 13 ||
          this.lotteryCode == 14 ||
          this.lotteryCode == 15
        ) {
          switch (this.playCode) {
            case 11:
              count = this.getCount[11][this.playCode](erweiArr)
              break
            case 9:
              count = this.getCount[11][this.playCode](erweiArr)
              break
            default:
              count = this.getCount[11][this.playCode](
                selectedNum[0],
                selectedNum[1],
                selectedNum[2],
                selectedNum[3],
                selectedNum[4]
              )
              break
          }
        } else if (
          this.lotteryCode == 31 ||
          this.lotteryCode == 32 ||
          this.lotteryCode == 33
        ) {
          switch (this.playCode) {
            case 2:
              count = selectedNum[0] == 0 ? 0 : 1
              break
            case 5:
              count = selectedNum[0] == 0 ? 0 : 1
              break
            default:
              count = this.getCount[31][this.playCode](
                selectedNum[0],
                selectedNum[1]
              )
              break
          }
        } else if (
          this.lotteryCode == 21 ||
          this.lotteryCode == 22 ||
          this.lotteryCode == 23 ||
          this.lotteryCode == 24 ||
          this.lotteryCode == 25 ||
          this.lotteryCode == 26
        ) {
          if (
            this.playCode == 1215 ||
            this.playCode == 1217 ||
            this.playCode == 2314 ||
            this.playCode == 2414
          ) {
            count = this.getCount[21][this.playCode](erweiArr[0], erweiArr[1])
          } else if (this.playCode == 1216) {
            count = this.getCount[21][this.playCode](erweiArr[1], erweiArr[0])
          } else if (
            this.playCode == 1218 ||
            this.playCode == 1219 ||
            this.playCode == 2316 ||
            this.playCode == 2416
          ) {
            count = this.getCount[21][this.playCode](erweiArr)
          } else if (
            this.playCode == 1314 ||
            this.playCode == 2512 ||
            this.playCode == 2612 ||
            this.playCode == 1413 ||
            this.playCode == 1416 ||
            this.playCode == 2011 ||
            this.playCode == 2022 ||
            this.playCode == 2023 ||
            this.playCode == 2024 ||
            this.playCode == 2025
          ) {
            count = this.getCount[21][this.playCode](this.$refs.items)
          } else {
            count = this.getCount[21][this.playCode](
              selectedNum[0],
              selectedNum[1],
              selectedNum[2],
              selectedNum[3],
              selectedNum[4]
            )
          }
        } else if (this.lotteryCode == 101 || this.lotteryCode == 102) {
          if (
            this.playCode == 1112 ||
            this.playCode == 1216 ||
            this.playCode == 1215
          ) {
            count = this.getCount[101][this.playCode](this.$refs.items)
          } else {
            count = this.getCount[101][this.playCode](
              selectedNum[0],
              selectedNum[1],
              selectedNum[2]
            )
          }
        } else if (this.lotteryCode == 41 || this.lotteryCode == 42) {
          switch (this.playCode) {
            case 2:
              count = this.getCount[41][this.playCode](erweiArr)
              break
            case 3:
              count = this.getCount[41][this.playCode](erweiArr)
              break
            default:
              count = this.getCount[41][this.playCode](
                selectedNum[0],
                selectedNum[1],
                selectedNum[2],
                selectedNum[3],
                selectedNum[4]
              )
              break
          }
        }
        this.$store.commit('changeSumListObj1', {a: count}) //算注数并传递到store
      },
      //全，大，小，单，双点击算法
      toolQuan(index, key) {
        if (index == 0) {
          this.quan(this.$refs.items[key].childNodes)
        } else if (index == 1) {
          this.da(this.$refs.items[key].childNodes)
        } else if (index == 2) {
          this.xiao(this.$refs.items[key].childNodes)
        } else if (index == 3) {
          this.dan(this.$refs.items[key].childNodes)
        } else if (index == 4) {
          this.shuang(this.$refs.items[key].childNodes)
        } else if (index == 5) {
          this.qing(this.$refs.items[key].childNodes)
        }
      },
      //点全的功能算法
      quan(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].classList.add('active')
        }
        this.calculateCount()
      },
      da(arr) {
        this.singelQing(arr)
        for (let i = Math.ceil(arr.length / 2); i < arr.length; i++) {
          arr[i].classList.add('active')
        }
        this.calculateCount()
      },
      xiao(arr) {
        this.singelQing(arr)
        for (let i = 0; i < Math.ceil(arr.length / 2); i++) {
          arr[i].classList.add('active')
        }
        this.calculateCount()
      },
      dan(arr) {
        this.singelQing(arr)
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].innerHTML % 2 == 1) {
            arr[i].classList.add('active')
          }
        }
        this.calculateCount()
      },
      shuang(arr) {
        this.singelQing(arr)
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].innerHTML % 2 == 0) {
            arr[i].classList.add('active')
          }
        }
        this.calculateCount()
      },
      qing(arr) {
        this.singelQing(arr)
        this.calculateCount()
      },
      singelQing(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].classList.remove('active')
        }
      },
      changeSelect() {
        this.unitRecord = []
        for (let i = 0; i < this.selected.length; i++) {
          if (this.selected[i]) {
            this.unitRecord.push(i + 1)
          }
        }
        this.calculateCount()
      },
      // 首页过来的号码渲染到选号盘中
      addClass(arr, num) {
        for (let i in arr) {
          if (num.indexOf(arr[i].innerText) !== -1) {
            arr[i].classList.add('active')
          }
        }
      },
      // 首页过来的号码渲染到选号盘中（第二种情况）
      addClass2(arr, num) {
        console.log(arr)
        console.log(num)
        for (let i in arr) {
          for (let j in arr[i].children) {
            if ([num[i]].indexOf(arr[i].children[j].innerText) !== -1) {
              arr[i].children[j].classList.add('active')
            }
          }
        }
      }
    },
    computed: {
      playCode() {
        return this.$store.state.bet_selectPlay.playCode
      },
      lotteryCode() {
        return this.$store.state.lotteryCode
      },
      selectNumPan() {
        return this.$store.state.selectNumPan
      },
      odds() {
        let odds = this.$store.state.bet_tools.odds
        if (odds) {
          return odds
        } else {
          return []
        }
      },
      //根据玩法code和彩种不同，渲染不同的选号盘
      selectNumber1() {
        if (
          this.lotteryCode == 11 ||
          this.lotteryCode == 12 ||
          this.lotteryCode == 13 ||
          this.lotteryCode == 14 ||
          this.lotteryCode == 15
        ) {
          return this.selectNumber[11][this.playCode]
        } else if (
          this.lotteryCode == 31 ||
          this.lotteryCode == 32 ||
          this.lotteryCode == 33
        ) {
          return this.selectNumber[31][this.playCode]
        } else if (
          this.lotteryCode == 21 ||
          this.lotteryCode == 22 ||
          this.lotteryCode == 23 ||
          this.lotteryCode == 24 ||
          this.lotteryCode == 25 ||
          this.lotteryCode == 26
        ) {
          return this.selectNumber[21][this.playCode]
        } else if (this.lotteryCode == 41 || this.lotteryCode == 42) {
          return this.selectNumber[41][this.playCode]
        } else if (this.lotteryCode == 101 || this.lotteryCode == 102) {
          return this.selectNumber[101][this.playCode]
        }
      }
    },
    created() {
      // console.log(this.$route.query.number)
      if (this.$route.query.number) {
        this.number = this.$route.query.number.split(',')
      }
    },
    //组件挂载完元素后，将选号盘数据传给vuex
    mounted() {
      this.$store.commit('changeSelectNumPan', this.$refs.items)
    },
    //更改玩法code后，清除选号盘样式，并重新计算注数
    watch: {
      playCode(val) {
        if (this.$refs.items) {
          ccaa.clearStyle(this.$refs.items)
        }
        for (let i = 0; i < this.selected.length; i++) {
          this.selected[i] = false
        }
        this.$store.commit('changeSumListObj1', {a: 0})
        //将记录选好盘下标的数据清除，是个数组
        this.$store.commit('clearIndex')
        this.$nextTick(() => {
          this.$store.commit('changeSelectNumPan', this.$refs.items)
        })
      },
      selectNumPan(val, oval) {
        if (val && !oval && this.number) {
          switch (this.lotteryCode) {
            case '23':
              this.addClass(val[this.number[0]].children, [this.number[1]])
              this.calculateCount()
              break
            case '11':
            case '32':
              this.addClass(val[0].children, this.number)
              this.calculateCount()
              break
            case '41':
              this.addClass2(val, this.number)
              this.calculateCount()
              break
          }
        }
      }
    },
    data() {
      return {
        /* 单位input绑定的变量 */
        selected: [false, false, false, false, false],
        /* 记录选了哪些单位 */
        unitRecord: [],
        selectCount: '',
        getCount: {
          '11': {
            '22': m => {
              return m
            },
            '1': m => {
              return ccaa.combination(2, m)
            },
            '2': m => {
              return ccaa.combination(3, m)
            },
            '3': m => {
              return ccaa.combination(4, m)
            },
            '4': m => {
              return ccaa.combination(5, m)
            },
            '5': m => {
              return ccaa.combination(6, m)
            },
            '6': m => {
              return ccaa.combination(7, m)
            },
            '7': m => {
              return ccaa.combination(8, m)
            },
            '24': (a, b, c, d, e) => {
              return a + b + c + d + e
            },
            '23': m => {
              return m
            },
            '10': m => {
              return ccaa.combination(2, m)
            }, //二码-前二组选
            '9': m => {
              return ccaa.getCount2(m)
            }, //二码-前二直选
            '12': m => {
              return ccaa.combination(3, m)
            }, //三码-前三组选
            '11': m => {
              return ccaa.getCount3(m)
            } //三码-前三直选
          },
          '21': {
            '1111': (a, b, c, d, e) => {
              return a + b + c + d + e
            },
            '1211': (a, b, c, d, e) => {
              return a * b * c * d * e
            },
            '1213': (a, b, c, d, e) => {
              return 5 * a * b * c * d * e
            },
            '1214': m => {
              return ccaa.combination(5, m)
            },
            '1215': (arr1, arr2) => {
              return ccaa.getCount4(arr1, arr2, 'creatArr3')
            },
            '1216': (arr1, arr2) => {
              return ccaa.getCount4(arr1, arr2, 'creatArr2')
            },
            '1217': (arr1, arr2) => {
              return ccaa.getCount4(arr1, arr2, 'creatArr2')
            },
            '1218': m => {
              return ccaa.getCount2(m)
            },
            '1219': m => {
              return ccaa.getCount2(m)
            },
            '2311': (a, b, c, d) => {
              return a * b * c * d
            },
            '2312': (a, b, c, d) => {
              return 4 * a * b * c * d
            },
            '2313': m => {
              return ccaa.combination(4, m)
            },
            '2314': (arr1, arr2) => {
              return ccaa.getCount4(arr1, arr2, 'creatArr2')
            },
            '2315': m => {
              return ccaa.combination(2, m)
            },
            '2316': m => {
              return ccaa.getCount2(m)
            },
            '2411': (a, b, c, d) => {
              return a * b * c * d
            },
            '2412': (a, b, c, d) => {
              return 4 * a * b * c * d
            },
            '2413': m => {
              return ccaa.combination(4, m)
            },
            '2414': (arr1, arr2) => {
              return ccaa.getCount4(arr1, arr2, 'creatArr2')
            },
            '2415': m => {
              return ccaa.combination(2, m)
            },
            '2416': m => {
              return ccaa.getCount2(m)
            },
            '1311': (a, b, c) => {
              return a * b * c
            },
            '1314': arr => {
              return ccaa.addCount(arr)
            },
            '1312': m => {
              return ccaa.permutation(2, m)
            },
            '1313': m => {
              return ccaa.combination(3, m)
            },
            '2511': (a, b, c) => {
              return a * b * c
            },
            '2512': arr => {
              return ccaa.addCount(arr)
            },
            '2513': m => {
              return ccaa.permutation(2, m)
            },
            '2514': m => {
              return ccaa.combination(3, m)
            },
            '2611': (a, b, c) => {
              return a * b * c
            },
            '2612': arr => {
              return ccaa.addCount(arr)
            },
            '2613': m => {
              return ccaa.permutation(2, m)
            },
            '2614': m => {
              return ccaa.combination(3, m)
            },
            '1411': (a, b) => {
              return a * b
            },
            '1413': arr => {
              return ccaa.addCount(arr)
            },
            '1414': (a, b) => {
              return a * b
            },
            '1412': m => {
              return ccaa.combination(2, m)
            },
            '1415': (a, b) => {
              return a * b
            },
            '1416': arr => {
              return ccaa.addCount(arr)
            },
            '1417': (a, b) => {
              return a * b
            },
            '1418': m => {
              return ccaa.combination(2, m)
            },
            '1613': m => {
              return m
            },
            '1622': m => {
              return m
            },
            '1611': m => {
              return m
            },
            '1614': m => {
              return ccaa.combination(2, m)
            },
            '1623': m => {
              return ccaa.combination(2, m)
            },
            '1612': m => {
              return ccaa.combination(2, m)
            },
            '1711': (a, b, c, d, e) => {
              return a * (b + c + d + e) + b * (d + c + e) + c * (d + e) + d * e
            },
            '1713': (a, b) => {
              return ccaa.combination(2, a) * ccaa.combination(2, b)
            },
            '1811': (a, b, c, d, e) => {
              return (
                a * b * (c + d) +
                e * (a + d) * (b + c) +
                a * d * (c + e) +
                b * c * (d + e)
              )
            },
            '1813': (a, b) => {
              return ccaa.combination(3, a) * ccaa.permutation(2, b)
            },
            '1814': (a, b) => {
              return ccaa.combination(3, a) * ccaa.combination(3, b)
            },
            '1911': (a, b, c, d, e) => {
              return a * b * c * (d + e) + d * e * (b * c + a * c + a * b)
            },
            '2011': arr => {
              return ccaa.addCount(arr)
            },
            '2022': arr => {
              return ccaa.addCount(arr)
            },
            '2023': arr => {
              return ccaa.addCount(arr)
            },
            '2024': arr => {
              return ccaa.addCount(arr)
            },
            '2025': arr => {
              return ccaa.addCount(arr)
            },
            '2111': m => {
              return m
            },
            '2112': m => {
              return m
            },
            '2113': m => {
              return m
            },
            '2114': m => {
              return m
            },
            '2211': m => {
              return m
            },
            '2212': m => {
              return m
            },
            '2213': m => {
              return m
            },
            '2214': m => {
              return m
            },
            '2215': m => {
              return m
            },
            '2216': m => {
              return m
            },
            '2217': m => {
              return m
            },
            '2218': m => {
              return m
            },
            '2219': m => {
              return m
            },
            '2220': m => {
              return m
            }
          },
          '31': {
            '1': m => {
              return ccaa.combination(1, m)
            },
            '3': m => {
              return ccaa.combination(1, m)
            },
            '4': m => {
              return ccaa.combination(3, m)
            },
            '6': m => {
              return ccaa.combination(1, m)
            },
            '8': m => {
              return ccaa.combination(2, m)
            },
            '7': (a, b) => {
              return a * b
            },
            '9': (a, b) => {
              return a * b
            }
          },
          '101': {
            '1111': (a, b, c) => {
              return a * b * c
            }, //三码 直选 复式
            '1112': arr => {
              return ccaa.addCount(arr)
            }, //三码 直选 和值
            '1113': m => {
              return ccaa.permutation(2, m)
            }, //三码 组选 组三
            '1114': m => {
              return ccaa.combination(3, m)
            }, //三码 组选 组六
            '1216': arr => {
              return ccaa.addCount(arr)
            }, //前二码直选  直选和值
            '1211': (a, b) => {
              return a * b
            }, //前二码直选  复式
            '1212': (a, b) => {
              return a * b
            }, //后二码直选  复式
            '1215': arr => {
              return ccaa.addCount(arr)
            }, //后二码直选  直选和值
            '1213': m => {
              return ccaa.combination(2, m)
            }, //前二码组选  复式
            '1214': m => {
              return ccaa.combination(2, m)
            }, //后二码组选  复式
            '1311': (a, b, c) => {
              return a + b + c
            }, //定位胆
            '1411': m => {
              return m
            } //一码不定位
          },
          '41': {
            '1': m => {
              return m
            },
            '2': m => {
              return ccaa.getCount2(m)
            },
            '3': m => {
              return ccaa.getCount3(m)
            },
            '5': (a, b, c, d, e) => {
              return a + b + c + d + e
            },
            '6': (a, b, c, d, e) => {
              return a + b + c + d + e
            },
            '7': m => {
              return m
            },
            '8': m => {
              return m
            },
            '9': m => {
              return m
            },
            '10': m => {
              return m
            },
            '11': m => {
              return m
            },
            '12': m => {
              return m
            }
          }
        },
        selectNumber: {
          '11': {
            '11': [
              {
                unit: '第一位',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '第二位',
                items: [
                  {num: '01', key: '1'},
                  {num: '02', key: '1'},
                  {num: '03', key: '1'},
                  {num: '04', key: '1'},
                  {num: '05', key: '1'},
                  {num: '06', key: '1'},
                  {num: '07', key: '1'},
                  {num: '08', key: '1'},
                  {num: '09', key: '1'},
                  {num: '10', key: '1'},
                  {num: '11', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '第三位',
                items: [
                  {num: '01', key: '2'},
                  {num: '02', key: '2'},
                  {num: '03', key: '2'},
                  {num: '04', key: '2'},
                  {num: '05', key: '2'},
                  {num: '06', key: '2'},
                  {num: '07', key: '2'},
                  {num: '08', key: '2'},
                  {num: '09', key: '2'},
                  {num: '10', key: '2'},
                  {num: '11', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              }
            ],
            '12': [
              {
                unit: '选号',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '9': [
              {
                unit: '第一位',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '第二位',
                items: [
                  {num: '01', key: '1'},
                  {num: '02', key: '1'},
                  {num: '03', key: '1'},
                  {num: '04', key: '1'},
                  {num: '05', key: '1'},
                  {num: '06', key: '1'},
                  {num: '07', key: '1'},
                  {num: '08', key: '1'},
                  {num: '09', key: '1'},
                  {num: '10', key: '1'},
                  {num: '11', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '10': [
              {
                unit: '选号',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '23': [
              {
                unit: '选号',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '24': [
              {
                unit: '第一位',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '第二位',
                items: [
                  {num: '01', key: '1'},
                  {num: '02', key: '1'},
                  {num: '03', key: '1'},
                  {num: '04', key: '1'},
                  {num: '05', key: '1'},
                  {num: '06', key: '1'},
                  {num: '07', key: '1'},
                  {num: '08', key: '1'},
                  {num: '09', key: '1'},
                  {num: '10', key: '1'},
                  {num: '11', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '第三位',
                items: [
                  {num: '01', key: '2'},
                  {num: '02', key: '2'},
                  {num: '03', key: '2'},
                  {num: '04', key: '2'},
                  {num: '05', key: '2'},
                  {num: '06', key: '2'},
                  {num: '07', key: '2'},
                  {num: '08', key: '2'},
                  {num: '09', key: '2'},
                  {num: '10', key: '2'},
                  {num: '11', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              },
              {
                unit: '第四位',
                items: [
                  {num: '01', key: '3'},
                  {num: '02', key: '3'},
                  {num: '03', key: '3'},
                  {num: '04', key: '3'},
                  {num: '05', key: '3'},
                  {num: '06', key: '3'},
                  {num: '07', key: '3'},
                  {num: '08', key: '3'},
                  {num: '09', key: '3'},
                  {num: '10', key: '3'},
                  {num: '11', key: '3'}
                ],
                tools: [
                  {val: '全', key: '3'},
                  {val: '大', key: '3'},
                  {val: '小', key: '3'},
                  {val: '单', key: '3'},
                  {val: '双', key: '3'},
                  {val: '清', key: '3'}
                ]
              },
              {
                unit: '第五位',
                items: [
                  {num: '01', key: '4'},
                  {num: '02', key: '4'},
                  {num: '03', key: '4'},
                  {num: '04', key: '4'},
                  {num: '05', key: '4'},
                  {num: '06', key: '4'},
                  {num: '07', key: '4'},
                  {num: '08', key: '4'},
                  {num: '09', key: '4'},
                  {num: '10', key: '4'},
                  {num: '11', key: '4'}
                ],
                tools: [
                  {val: '全', key: '4'},
                  {val: '大', key: '4'},
                  {val: '小', key: '4'},
                  {val: '单', key: '4'},
                  {val: '双', key: '4'},
                  {val: '清', key: '4'}
                ]
              }
            ],
            '22': [
              {
                unit: '一中一',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1': [
              {
                unit: '二中二',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2': [
              {
                unit: '三中三',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '3': [
              {
                unit: '四中四',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '4': [
              {
                unit: '五中五',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '5': [
              {
                unit: '六中五',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '6': [
              {
                unit: '七中五',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '7': [
              {
                unit: '八中五',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'},
                  {num: '11', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ]
          },
          '21': {
            '1211': [
              {
                unit: '万位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '千位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '百位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '3'},
                  {num: '1', key: '3'},
                  {num: '2', key: '3'},
                  {num: '3', key: '3'},
                  {num: '4', key: '3'},
                  {num: '5', key: '3'},
                  {num: '6', key: '3'},
                  {num: '7', key: '3'},
                  {num: '8', key: '3'},
                  {num: '9', key: '3'}
                ],
                tools: [
                  {val: '全', key: '3'},
                  {val: '大', key: '3'},
                  {val: '小', key: '3'},
                  {val: '单', key: '3'},
                  {val: '双', key: '3'},
                  {val: '清', key: '3'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '0', key: '4'},
                  {num: '1', key: '4'},
                  {num: '2', key: '4'},
                  {num: '3', key: '4'},
                  {num: '4', key: '4'},
                  {num: '5', key: '4'},
                  {num: '6', key: '4'},
                  {num: '7', key: '4'},
                  {num: '8', key: '4'},
                  {num: '9', key: '4'}
                ],
                tools: [
                  {val: '全', key: '4'},
                  {val: '大', key: '4'},
                  {val: '小', key: '4'},
                  {val: '单', key: '4'},
                  {val: '双', key: '4'},
                  {val: '清', key: '4'}
                ]
              }
            ],
            '1213': [
              {
                unit: '万位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '千位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '百位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '3'},
                  {num: '1', key: '3'},
                  {num: '2', key: '3'},
                  {num: '3', key: '3'},
                  {num: '4', key: '3'},
                  {num: '5', key: '3'},
                  {num: '6', key: '3'},
                  {num: '7', key: '3'},
                  {num: '8', key: '3'},
                  {num: '9', key: '3'}
                ],
                tools: [
                  {val: '全', key: '3'},
                  {val: '大', key: '3'},
                  {val: '小', key: '3'},
                  {val: '单', key: '3'},
                  {val: '双', key: '3'},
                  {val: '清', key: '3'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '0', key: '4'},
                  {num: '1', key: '4'},
                  {num: '2', key: '4'},
                  {num: '3', key: '4'},
                  {num: '4', key: '4'},
                  {num: '5', key: '4'},
                  {num: '6', key: '4'},
                  {num: '7', key: '4'},
                  {num: '8', key: '4'},
                  {num: '9', key: '4'}
                ],
                tools: [
                  {val: '全', key: '4'},
                  {val: '大', key: '4'},
                  {val: '小', key: '4'},
                  {val: '单', key: '4'},
                  {val: '双', key: '4'},
                  {val: '清', key: '4'}
                ]
              }
            ],
            '1214': [
              {
                unit: '选号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1215': [
              {
                unit: '二重号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '单号',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '1216': [
              {
                unit: '二重号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '单号',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '1217': [
              {
                unit: '三重号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '单号',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '1218': [
              {
                unit: '三重号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '二重号',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '1219': [
              {
                unit: '四重号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '单号',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '2311': [
              {
                unit: '千位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '百位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '0', key: '3'},
                  {num: '1', key: '3'},
                  {num: '2', key: '3'},
                  {num: '3', key: '3'},
                  {num: '4', key: '3'},
                  {num: '5', key: '3'},
                  {num: '6', key: '3'},
                  {num: '7', key: '3'},
                  {num: '8', key: '3'},
                  {num: '9', key: '3'}
                ],
                tools: [
                  {val: '全', key: '3'},
                  {val: '大', key: '3'},
                  {val: '小', key: '3'},
                  {val: '单', key: '3'},
                  {val: '双', key: '3'},
                  {val: '清', key: '3'}
                ]
              }
            ],
            '2312': [
              {
                unit: '千位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '百位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '0', key: '3'},
                  {num: '1', key: '3'},
                  {num: '2', key: '3'},
                  {num: '3', key: '3'},
                  {num: '4', key: '3'},
                  {num: '5', key: '3'},
                  {num: '6', key: '3'},
                  {num: '7', key: '3'},
                  {num: '8', key: '3'},
                  {num: '9', key: '3'}
                ],
                tools: [
                  {val: '全', key: '3'},
                  {val: '大', key: '3'},
                  {val: '小', key: '3'},
                  {val: '单', key: '3'},
                  {val: '双', key: '3'},
                  {val: '清', key: '3'}
                ]
              }
            ],
            '2313': [
              {
                unit: '选号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2314': [
              {
                unit: '二重号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '单号',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '2315': [
              {
                unit: '二重号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2316': [
              {
                unit: '三重号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '单号',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '2411': [
              {
                unit: '万位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '千位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '百位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '3'},
                  {num: '1', key: '3'},
                  {num: '2', key: '3'},
                  {num: '3', key: '3'},
                  {num: '4', key: '3'},
                  {num: '5', key: '3'},
                  {num: '6', key: '3'},
                  {num: '7', key: '3'},
                  {num: '8', key: '3'},
                  {num: '9', key: '3'}
                ],
                tools: [
                  {val: '全', key: '3'},
                  {val: '大', key: '3'},
                  {val: '小', key: '3'},
                  {val: '单', key: '3'},
                  {val: '双', key: '3'},
                  {val: '清', key: '3'}
                ]
              }
            ],
            '2412': [
              {
                unit: '万位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '千位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '百位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '3'},
                  {num: '1', key: '3'},
                  {num: '2', key: '3'},
                  {num: '3', key: '3'},
                  {num: '4', key: '3'},
                  {num: '5', key: '3'},
                  {num: '6', key: '3'},
                  {num: '7', key: '3'},
                  {num: '8', key: '3'},
                  {num: '9', key: '3'}
                ],
                tools: [
                  {val: '全', key: '3'},
                  {val: '大', key: '3'},
                  {val: '小', key: '3'},
                  {val: '单', key: '3'},
                  {val: '双', key: '3'},
                  {val: '清', key: '3'}
                ]
              }
            ],
            '2413': [
              {
                unit: '选号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2414': [
              {
                unit: '二重号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '单号',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '2415': [
              {
                unit: '二重号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2416': [
              {
                unit: '三重号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '单号',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '1311': [
              {
                unit: '百位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              }
            ],
            '1314': [
              {
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '3'},
                  {num: '2', key: '6'},
                  {num: '3', key: '10'},
                  {num: '4', key: '15'},
                  {num: '5', key: '21'},
                  {num: '6', key: '28'},
                  {num: '7', key: '36'},
                  {num: '8', key: '45'},
                  {num: '9', key: '55'},
                  {num: '10', key: '63'},
                  {num: '11', key: '69'},
                  {num: '12', key: '73'},
                  {num: '13', key: '75'},
                  {num: '14', key: '75'},
                  {num: '15', key: '73'}
                ]
              },
              {
                items: [
                  {num: '16', key: '69'},
                  {num: '17', key: '63'},
                  {num: '18', key: '55'},
                  {num: '19', key: '45'},
                  {num: '20', key: '36'},
                  {num: '21', key: '28'},
                  {num: '22', key: '21'},
                  {num: '23', key: '15'},
                  {num: '24', key: '10'},
                  {num: '25', key: '6'},
                  {num: '26', key: '3'},
                  {num: '27', key: '1'}
                ]
              }
            ],
            '1312': [
              {
                unit: '组三',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1313': [
              {
                unit: '组六',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2511': [
              {
                unit: '千位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '百位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              }
            ],
            '2512': [
              {
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '3'},
                  {num: '2', key: '6'},
                  {num: '3', key: '10'},
                  {num: '4', key: '15'},
                  {num: '5', key: '21'},
                  {num: '6', key: '28'},
                  {num: '7', key: '36'},
                  {num: '8', key: '45'},
                  {num: '9', key: '55'},
                  {num: '10', key: '63'},
                  {num: '11', key: '69'},
                  {num: '12', key: '73'},
                  {num: '13', key: '75'},
                  {num: '14', key: '75'},
                  {num: '15', key: '73'}
                ]
              },
              {
                items: [
                  {num: '16', key: '69'},
                  {num: '17', key: '63'},
                  {num: '18', key: '55'},
                  {num: '19', key: '45'},
                  {num: '20', key: '36'},
                  {num: '21', key: '28'},
                  {num: '22', key: '21'},
                  {num: '23', key: '15'},
                  {num: '24', key: '10'},
                  {num: '25', key: '6'},
                  {num: '26', key: '3'},
                  {num: '27', key: '1'}
                ]
              }
            ],
            '2513': [
              {
                unit: '组三',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2514': [
              {
                unit: '组六',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2611': [
              {
                unit: '万位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '千位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '百位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              }
            ],
            '2612': [
              {
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '3'},
                  {num: '2', key: '6'},
                  {num: '3', key: '10'},
                  {num: '4', key: '15'},
                  {num: '5', key: '21'},
                  {num: '6', key: '28'},
                  {num: '7', key: '36'},
                  {num: '8', key: '45'},
                  {num: '9', key: '55'},
                  {num: '10', key: '63'},
                  {num: '11', key: '69'},
                  {num: '12', key: '73'},
                  {num: '13', key: '75'},
                  {num: '14', key: '75'},
                  {num: '15', key: '73'}
                ]
              },
              {
                items: [
                  {num: '16', key: '69'},
                  {num: '17', key: '63'},
                  {num: '18', key: '55'},
                  {num: '19', key: '45'},
                  {num: '20', key: '36'},
                  {num: '21', key: '28'},
                  {num: '22', key: '21'},
                  {num: '23', key: '15'},
                  {num: '24', key: '10'},
                  {num: '25', key: '6'},
                  {num: '26', key: '3'},
                  {num: '27', key: '1'}
                ]
              }
            ],
            '2613': [
              {
                unit: '组三',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2614': [
              {
                unit: '组六',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1411': [
              {
                unit: '十位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '1413': [
              {
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '2'},
                  {num: '2', key: '3'},
                  {num: '3', key: '4'},
                  {num: '4', key: '5'},
                  {num: '5', key: '6'},
                  {num: '6', key: '7'},
                  {num: '7', key: '8'},
                  {num: '8', key: '9'},
                  {num: '9', key: '10'},
                  {num: '10', key: '9'},
                  {num: '11', key: '8'},
                  {num: '12', key: '7'},
                  {num: '13', key: '6'},
                  {num: '14', key: '5'},
                  {num: '15', key: '4'}
                ]
              },
              {
                items: [
                  {num: '16', key: '3'},
                  {num: '17', key: '2'},
                  {num: '18', key: '1'}
                ]
              }
            ],
            '1414': [
              {
                unit: '十位',
                items: [
                  {num: '大', key: '0'},
                  {num: '小', key: '0'},
                  {num: '单', key: '0'},
                  {num: '双', key: '0'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '大', key: '0'},
                  {num: '小', key: '0'},
                  {num: '单', key: '0'},
                  {num: '双', key: '0'}
                ]
              }
            ],
            '1412': [
              {
                unit: '组选',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1415': [
              {
                unit: '万位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '千位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '1416': [
              {
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '2'},
                  {num: '2', key: '3'},
                  {num: '3', key: '4'},
                  {num: '4', key: '5'},
                  {num: '5', key: '6'},
                  {num: '6', key: '7'},
                  {num: '7', key: '8'},
                  {num: '8', key: '9'},
                  {num: '9', key: '10'},
                  {num: '10', key: '9'},
                  {num: '11', key: '8'},
                  {num: '12', key: '7'},
                  {num: '13', key: '6'},
                  {num: '14', key: '5'},
                  {num: '15', key: '4'}
                ]
              },
              {
                items: [
                  {num: '16', key: '3'},
                  {num: '17', key: '2'},
                  {num: '18', key: '1'}
                ]
              }
            ],
            '1417': [
              {
                unit: '万位',
                items: [
                  {num: '大', key: '0'},
                  {num: '小', key: '0'},
                  {num: '单', key: '0'},
                  {num: '双', key: '0'}
                ]
              },
              {
                unit: '千位',
                items: [
                  {num: '大', key: '0'},
                  {num: '小', key: '0'},
                  {num: '单', key: '0'},
                  {num: '双', key: '0'}
                ]
              }
            ],
            '1418': [
              {
                unit: '组选',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1111': [
              {
                unit: '万位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '千位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '百位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '3'},
                  {num: '1', key: '3'},
                  {num: '2', key: '3'},
                  {num: '3', key: '3'},
                  {num: '4', key: '3'},
                  {num: '5', key: '3'},
                  {num: '6', key: '3'},
                  {num: '7', key: '3'},
                  {num: '8', key: '3'},
                  {num: '9', key: '3'}
                ],
                tools: [
                  {val: '全', key: '3'},
                  {val: '大', key: '3'},
                  {val: '小', key: '3'},
                  {val: '单', key: '3'},
                  {val: '双', key: '3'},
                  {val: '清', key: '3'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '0', key: '4'},
                  {num: '1', key: '4'},
                  {num: '2', key: '4'},
                  {num: '3', key: '4'},
                  {num: '4', key: '4'},
                  {num: '5', key: '4'},
                  {num: '6', key: '4'},
                  {num: '7', key: '4'},
                  {num: '8', key: '4'},
                  {num: '9', key: '4'}
                ],
                tools: [
                  {val: '全', key: '4'},
                  {val: '大', key: '4'},
                  {val: '小', key: '4'},
                  {val: '单', key: '4'},
                  {val: '双', key: '4'},
                  {val: '清', key: '4'}
                ]
              }
            ],
            '1613': [
              {
                unit: '不定胆',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1622': [
              {
                unit: '不定胆',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1611': [
              {
                unit: '不定胆',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1614': [
              {
                unit: '不定胆',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1623': [
              {
                unit: '不定胆',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1612': [
              {
                unit: '不定胆',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1711': [
              {
                unit: '万位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '千位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '百位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '3'},
                  {num: '1', key: '3'},
                  {num: '2', key: '3'},
                  {num: '3', key: '3'},
                  {num: '4', key: '3'},
                  {num: '5', key: '3'},
                  {num: '6', key: '3'},
                  {num: '7', key: '3'},
                  {num: '8', key: '3'},
                  {num: '9', key: '3'}
                ],
                tools: [
                  {val: '全', key: '3'},
                  {val: '大', key: '3'},
                  {val: '小', key: '3'},
                  {val: '单', key: '3'},
                  {val: '双', key: '3'},
                  {val: '清', key: '3'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '0', key: '4'},
                  {num: '1', key: '4'},
                  {num: '2', key: '4'},
                  {num: '3', key: '4'},
                  {num: '4', key: '4'},
                  {num: '5', key: '4'},
                  {num: '6', key: '4'},
                  {num: '7', key: '4'},
                  {num: '8', key: '4'},
                  {num: '9', key: '4'}
                ],
                tools: [
                  {val: '全', key: '4'},
                  {val: '大', key: '4'},
                  {val: '小', key: '4'},
                  {val: '单', key: '4'},
                  {val: '双', key: '4'},
                  {val: '清', key: '4'}
                ]
              }
            ],
            '1713': [
              {
                unit: '号码',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1811': [
              {
                unit: '万位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '千位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '百位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '3'},
                  {num: '1', key: '3'},
                  {num: '2', key: '3'},
                  {num: '3', key: '3'},
                  {num: '4', key: '3'},
                  {num: '5', key: '3'},
                  {num: '6', key: '3'},
                  {num: '7', key: '3'},
                  {num: '8', key: '3'},
                  {num: '9', key: '3'}
                ],
                tools: [
                  {val: '全', key: '3'},
                  {val: '大', key: '3'},
                  {val: '小', key: '3'},
                  {val: '单', key: '3'},
                  {val: '双', key: '3'},
                  {val: '清', key: '3'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '0', key: '4'},
                  {num: '1', key: '4'},
                  {num: '2', key: '4'},
                  {num: '3', key: '4'},
                  {num: '4', key: '4'},
                  {num: '5', key: '4'},
                  {num: '6', key: '4'},
                  {num: '7', key: '4'},
                  {num: '8', key: '4'},
                  {num: '9', key: '4'}
                ],
                tools: [
                  {val: '全', key: '4'},
                  {val: '大', key: '4'},
                  {val: '小', key: '4'},
                  {val: '单', key: '4'},
                  {val: '双', key: '4'},
                  {val: '清', key: '4'}
                ]
              }
            ],
            '1813': [
              {
                unit: '号码',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1814': [
              {
                unit: '号码',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1911': [
              {
                unit: '万位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '千位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '百位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '3'},
                  {num: '1', key: '3'},
                  {num: '2', key: '3'},
                  {num: '3', key: '3'},
                  {num: '4', key: '3'},
                  {num: '5', key: '3'},
                  {num: '6', key: '3'},
                  {num: '7', key: '3'},
                  {num: '8', key: '3'},
                  {num: '9', key: '3'}
                ],
                tools: [
                  {val: '全', key: '3'},
                  {val: '大', key: '3'},
                  {val: '小', key: '3'},
                  {val: '单', key: '3'},
                  {val: '双', key: '3'},
                  {val: '清', key: '3'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '0', key: '4'},
                  {num: '1', key: '4'},
                  {num: '2', key: '4'},
                  {num: '3', key: '4'},
                  {num: '4', key: '4'},
                  {num: '5', key: '4'},
                  {num: '6', key: '4'},
                  {num: '7', key: '4'},
                  {num: '8', key: '4'},
                  {num: '9', key: '4'}
                ],
                tools: [
                  {val: '全', key: '4'},
                  {val: '大', key: '4'},
                  {val: '小', key: '4'},
                  {val: '单', key: '4'},
                  {val: '双', key: '4'},
                  {val: '清', key: '4'}
                ]
              }
            ],
            '2011': [
              {
                unit: '选号',
                items: [
                  {num: '0', key: '10'},
                  {num: '1', key: '54'},
                  {num: '2', key: '96'},
                  {num: '3', key: '126'},
                  {num: '4', key: '144'},
                  {num: '5', key: '150'},
                  {num: '6', key: '144'},
                  {num: '7', key: '126'},
                  {num: '8', key: '96'},
                  {num: '9', key: '54'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2022': [
              {
                unit: '选号',
                items: [
                  {num: '0', key: '10'},
                  {num: '1', key: '54'},
                  {num: '2', key: '96'},
                  {num: '3', key: '126'},
                  {num: '4', key: '144'},
                  {num: '5', key: '150'},
                  {num: '6', key: '144'},
                  {num: '7', key: '126'},
                  {num: '8', key: '96'},
                  {num: '9', key: '54'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2023': [
              {
                unit: '选号',
                items: [
                  {num: '0', key: '10'},
                  {num: '1', key: '54'},
                  {num: '2', key: '96'},
                  {num: '3', key: '126'},
                  {num: '4', key: '144'},
                  {num: '5', key: '150'},
                  {num: '6', key: '144'},
                  {num: '7', key: '126'},
                  {num: '8', key: '96'},
                  {num: '9', key: '54'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2024': [
              {
                unit: '选号',
                items: [
                  {num: '0', key: '10'},
                  {num: '1', key: '18'},
                  {num: '2', key: '16'},
                  {num: '3', key: '14'},
                  {num: '4', key: '12'},
                  {num: '5', key: '10'},
                  {num: '6', key: '8'},
                  {num: '7', key: '6'},
                  {num: '8', key: '4'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2025': [
              {
                unit: '选号',
                items: [
                  {num: '0', key: '10'},
                  {num: '1', key: '18'},
                  {num: '2', key: '16'},
                  {num: '3', key: '14'},
                  {num: '4', key: '12'},
                  {num: '5', key: '10'},
                  {num: '6', key: '8'},
                  {num: '7', key: '6'},
                  {num: '8', key: '4'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2111': [
              {
                unit: '选号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2112': [
              {
                unit: '选号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2113': [
              {
                unit: '选号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2114': [
              {
                unit: '选号',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2211': [
              {
                unit: '龙虎',
                items: [
                  {num: '龙', key: '246'},
                  {num: '虎', key: '248'},
                  {num: '和', key: '247'}
                ]
              }
            ],
            '2212': [
              {
                unit: '龙虎',
                items: [
                  {num: '龙', key: '246'},
                  {num: '虎', key: '248'},
                  {num: '和', key: '247'}
                ]
              }
            ],
            '2213': [
              {
                unit: '龙虎',
                items: [
                  {num: '龙', key: '246'},
                  {num: '虎', key: '248'},
                  {num: '和', key: '247'}
                ]
              }
            ],
            '2214': [
              {
                unit: '龙虎',
                items: [
                  {num: '龙', key: '246'},
                  {num: '虎', key: '248'},
                  {num: '和', key: '247'}
                ]
              }
            ],
            '2215': [
              {
                unit: '龙虎',
                items: [
                  {num: '龙', key: '246'},
                  {num: '虎', key: '248'},
                  {num: '和', key: '247'}
                ]
              }
            ],
            '2216': [
              {
                unit: '龙虎',
                items: [
                  {num: '龙', key: '246'},
                  {num: '虎', key: '248'},
                  {num: '和', key: '247'}
                ]
              }
            ],
            '2217': [
              {
                unit: '龙虎',
                items: [
                  {num: '龙', key: '246'},
                  {num: '虎', key: '248'},
                  {num: '和', key: '247'}
                ]
              }
            ],
            '2218': [
              {
                unit: '龙虎',
                items: [
                  {num: '龙', key: '246'},
                  {num: '虎', key: '248'},
                  {num: '和', key: '247'}
                ]
              }
            ],
            '2219': [
              {
                unit: '龙虎',
                items: [
                  {num: '龙', key: '246'},
                  {num: '虎', key: '248'},
                  {num: '和', key: '247'}
                ]
              }
            ],
            '2220': [
              {
                unit: '龙虎',
                items: [
                  {num: '龙', key: '246'},
                  {num: '虎', key: '248'},
                  {num: '和', key: '247'}
                ]
              }
            ]
          },
          '31': {
            '1': [
              {
                items: [
                  {num: '3', key: '0'},
                  {num: '4', key: '1'},
                  {num: '5', key: '2'},
                  {num: '6', key: '3'},
                  {num: '7', key: '4'},
                  {num: '8', key: '5'},
                  {num: '9', key: '6'},
                  {num: '10', key: '7'},
                  {num: '11', key: '8'},
                  {num: '12', key: '9'},
                  {num: '13', key: '10'},
                  {num: '14', key: '11'},
                  {num: '15', key: '12'},
                  {num: '16', key: '13'},
                  {num: '17', key: '14'},
                  {num: '18', key: '15'}
                ]
              }
            ],

            '3': [
              {
                unit: '号码',
                items: [
                  {num: '111', key: '0'},
                  {num: '222', key: '0'},
                  {num: '333', key: '0'},
                  {num: '444', key: '0'},
                  {num: '555', key: '0'},
                  {num: '666', key: '0'}
                ]
              }
            ],

            '2': [
              {
                unit: '胆码',
                items: [
                  {num: '111', key: '0'},
                  {num: '222', key: '0'},
                  {num: '333', key: '0'},
                  {num: '444', key: '0'},
                  {num: '555', key: '0'},
                  {num: '666', key: '0'}
                ]
              }
            ],

            '4': [
              {
                unit: '号码',
                items: [
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'}
                ]
              }
            ],

            '5': [
              {
                unit: '号码',
                items: [
                  {num: '123', key: '0'},
                  {num: '234', key: '0'},
                  {num: '345', key: '0'},
                  {num: '456', key: '0'}
                ]
              }
            ],

            '6': [
              {
                unit: '二同号',
                items: [
                  {num: '11*', key: '0'},
                  {num: '22*', key: '0'},
                  {num: '33*', key: '0'},
                  {num: '44*', key: '0'},
                  {num: '55*', key: '0'},
                  {num: '66*', key: '0'}
                ]
              }
            ],

            '7': [
              {
                unit: '二同号',
                items: [
                  {num: '11', key: '0'},
                  {num: '22', key: '0'},
                  {num: '33', key: '0'},
                  {num: '44', key: '0'},
                  {num: '55', key: '0'},
                  {num: '66', key: '0'}
                ]
              },
              {
                unit: '不同号',
                items: [
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'}
                ]
              }
            ],

            '8': [
              {
                unit: '号码',
                items: [
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'}
                ]
              }
            ],

            '9': [
              {
                unit: '胆码',
                items: [
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'}
                ]
              },
              {
                unit: '拖码',
                items: [
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'}
                ]
              }
            ]
          },
          '41': {
            '1': [
              {
                unit: '第一位',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '2': [
              {
                unit: '第一位',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '第二位',
                items: [
                  {num: '01', key: '1'},
                  {num: '02', key: '1'},
                  {num: '03', key: '1'},
                  {num: '04', key: '1'},
                  {num: '05', key: '1'},
                  {num: '06', key: '1'},
                  {num: '07', key: '1'},
                  {num: '08', key: '1'},
                  {num: '09', key: '1'},
                  {num: '10', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '3': [
              {
                unit: '第一位',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '第二位',
                items: [
                  {num: '01', key: '1'},
                  {num: '02', key: '1'},
                  {num: '03', key: '1'},
                  {num: '04', key: '1'},
                  {num: '05', key: '1'},
                  {num: '06', key: '1'},
                  {num: '07', key: '1'},
                  {num: '08', key: '1'},
                  {num: '09', key: '1'},
                  {num: '10', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '第三位',
                items: [
                  {num: '01', key: '2'},
                  {num: '02', key: '2'},
                  {num: '03', key: '2'},
                  {num: '04', key: '2'},
                  {num: '05', key: '2'},
                  {num: '06', key: '2'},
                  {num: '07', key: '2'},
                  {num: '08', key: '2'},
                  {num: '09', key: '2'},
                  {num: '10', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              }
            ],
            '5': [
              {
                unit: '第一名',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '第二名',
                items: [
                  {num: '01', key: '1'},
                  {num: '02', key: '1'},
                  {num: '03', key: '1'},
                  {num: '04', key: '1'},
                  {num: '05', key: '1'},
                  {num: '06', key: '1'},
                  {num: '07', key: '1'},
                  {num: '08', key: '1'},
                  {num: '09', key: '1'},
                  {num: '10', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '第三名',
                items: [
                  {num: '01', key: '2'},
                  {num: '02', key: '2'},
                  {num: '03', key: '2'},
                  {num: '04', key: '2'},
                  {num: '05', key: '2'},
                  {num: '06', key: '2'},
                  {num: '07', key: '2'},
                  {num: '08', key: '2'},
                  {num: '09', key: '2'},
                  {num: '10', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              },
              {
                unit: '第四名',
                items: [
                  {num: '01', key: '3'},
                  {num: '02', key: '3'},
                  {num: '03', key: '3'},
                  {num: '04', key: '3'},
                  {num: '05', key: '3'},
                  {num: '06', key: '3'},
                  {num: '07', key: '3'},
                  {num: '08', key: '3'},
                  {num: '09', key: '3'},
                  {num: '10', key: '3'}
                ],
                tools: [
                  {val: '全', key: '3'},
                  {val: '大', key: '3'},
                  {val: '小', key: '3'},
                  {val: '单', key: '3'},
                  {val: '双', key: '3'},
                  {val: '清', key: '3'}
                ]
              },
              {
                unit: '第五名',
                items: [
                  {num: '01', key: '4'},
                  {num: '02', key: '4'},
                  {num: '03', key: '4'},
                  {num: '04', key: '4'},
                  {num: '05', key: '4'},
                  {num: '06', key: '4'},
                  {num: '07', key: '4'},
                  {num: '08', key: '4'},
                  {num: '09', key: '4'},
                  {num: '10', key: '4'}
                ],
                tools: [
                  {val: '全', key: '4'},
                  {val: '大', key: '4'},
                  {val: '小', key: '4'},
                  {val: '单', key: '4'},
                  {val: '双', key: '4'},
                  {val: '清', key: '4'}
                ]
              }
            ],
            '6': [
              {
                unit: '第六名',
                items: [
                  {num: '01', key: '0'},
                  {num: '02', key: '0'},
                  {num: '03', key: '0'},
                  {num: '04', key: '0'},
                  {num: '05', key: '0'},
                  {num: '06', key: '0'},
                  {num: '07', key: '0'},
                  {num: '08', key: '0'},
                  {num: '09', key: '0'},
                  {num: '10', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '第七名',
                items: [
                  {num: '01', key: '1'},
                  {num: '02', key: '1'},
                  {num: '03', key: '1'},
                  {num: '04', key: '1'},
                  {num: '05', key: '1'},
                  {num: '06', key: '1'},
                  {num: '07', key: '1'},
                  {num: '08', key: '1'},
                  {num: '09', key: '1'},
                  {num: '10', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '第八名',
                items: [
                  {num: '01', key: '2'},
                  {num: '02', key: '2'},
                  {num: '03', key: '2'},
                  {num: '04', key: '2'},
                  {num: '05', key: '2'},
                  {num: '06', key: '2'},
                  {num: '07', key: '2'},
                  {num: '08', key: '2'},
                  {num: '09', key: '2'},
                  {num: '10', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              },
              {
                unit: '第九名',
                items: [
                  {num: '01', key: '3'},
                  {num: '02', key: '3'},
                  {num: '03', key: '3'},
                  {num: '04', key: '3'},
                  {num: '05', key: '3'},
                  {num: '06', key: '3'},
                  {num: '07', key: '3'},
                  {num: '08', key: '3'},
                  {num: '09', key: '3'},
                  {num: '10', key: '3'}
                ],
                tools: [
                  {val: '全', key: '3'},
                  {val: '大', key: '3'},
                  {val: '小', key: '3'},
                  {val: '单', key: '3'},
                  {val: '双', key: '3'},
                  {val: '清', key: '3'}
                ]
              },
              {
                unit: '第十名',
                items: [
                  {num: '01', key: '4'},
                  {num: '02', key: '4'},
                  {num: '03', key: '4'},
                  {num: '04', key: '4'},
                  {num: '05', key: '4'},
                  {num: '06', key: '4'},
                  {num: '07', key: '4'},
                  {num: '08', key: '4'},
                  {num: '09', key: '4'},
                  {num: '10', key: '4'}
                ],
                tools: [
                  {val: '全', key: '4'},
                  {val: '大', key: '4'},
                  {val: '小', key: '4'},
                  {val: '单', key: '4'},
                  {val: '双', key: '4'},
                  {val: '清', key: '4'}
                ]
              }
            ],
            '7': [
              {
                unit: '第一名',
                items: [{num: '大', key: '0'}, {num: '小', key: '0'}]
              }
            ],
            '8': [
              {
                unit: '第二名',
                items: [{num: '大', key: '0'}, {num: '小', key: '0'}]
              }
            ],
            '9': [
              {
                unit: '第三名',
                items: [{num: '大', key: '0'}, {num: '小', key: '0'}]
              }
            ],
            '10': [
              {
                unit: '第一名',
                items: [{num: '单', key: '0'}, {num: '双', key: '0'}]
              }
            ],
            '11': [
              {
                unit: '第二名',
                items: [{num: '单', key: '0'}, {num: '双', key: '0'}]
              }
            ],
            '12': [
              {
                unit: '第三名',
                items: [{num: '单', key: '0'}, {num: '双', key: '0'}]
              }
            ]
          },
          '101': {
            '1111': [
              {
                unit: '百位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              }
            ],
            '1112': [
              {
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '3'},
                  {num: '2', key: '6'},
                  {num: '3', key: '10'},
                  {num: '4', key: '15'},
                  {num: '5', key: '21'},
                  {num: '6', key: '28'},
                  {num: '7', key: '36'},
                  {num: '8', key: '45'},
                  {num: '9', key: '55'},
                  {num: '10', key: '63'},
                  {num: '11', key: '69'},
                  {num: '12', key: '73'},
                  {num: '13', key: '75'},
                  {num: '14', key: '75'},
                  {num: '15', key: '73'}
                ]
              },
              {
                items: [
                  {num: '16', key: '69'},
                  {num: '17', key: '63'},
                  {num: '18', key: '55'},
                  {num: '19', key: '45'},
                  {num: '20', key: '36'},
                  {num: '21', key: '28'},
                  {num: '22', key: '21'},
                  {num: '23', key: '15'},
                  {num: '24', key: '10'},
                  {num: '25', key: '6'},
                  {num: '26', key: '3'},
                  {num: '27', key: '1'}
                ]
              }
            ],
            '1113': [
              {
                unit: '组三',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1114': [
              {
                unit: '组六',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1212': [
              {
                unit: '十位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '1215': [
              {
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '2'},
                  {num: '2', key: '3'},
                  {num: '3', key: '4'},
                  {num: '4', key: '5'},
                  {num: '5', key: '6'},
                  {num: '6', key: '7'},
                  {num: '7', key: '8'},
                  {num: '8', key: '9'},
                  {num: '9', key: '10'},
                  {num: '10', key: '9'},
                  {num: '11', key: '8'},
                  {num: '12', key: '7'},
                  {num: '13', key: '6'},
                  {num: '14', key: '5'},
                  {num: '15', key: '4'}
                ]
              },
              {
                items: [
                  {num: '16', key: '3'},
                  {num: '17', key: '2'},
                  {num: '18', key: '1'}
                ]
              }
            ],
            '1311': [
              {
                unit: '组选',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1211': [
              {
                unit: '百位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              }
            ],
            '1216': [
              {
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '2'},
                  {num: '2', key: '3'},
                  {num: '3', key: '4'},
                  {num: '4', key: '5'},
                  {num: '5', key: '6'},
                  {num: '6', key: '7'},
                  {num: '7', key: '8'},
                  {num: '8', key: '9'},
                  {num: '9', key: '10'},
                  {num: '10', key: '9'},
                  {num: '11', key: '8'},
                  {num: '12', key: '7'},
                  {num: '13', key: '6'},
                  {num: '14', key: '5'},
                  {num: '15', key: '4'}
                ]
              },
              {
                items: [
                  {num: '16', key: '3'},
                  {num: '17', key: '2'},
                  {num: '18', key: '1'}
                ]
              }
            ],
            '1213': [
              {
                unit: '组选',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1214': [
              {
                unit: '组选',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ],
            '1311': [
              {
                unit: '百位',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              },
              {
                unit: '十位',
                items: [
                  {num: '0', key: '1'},
                  {num: '1', key: '1'},
                  {num: '2', key: '1'},
                  {num: '3', key: '1'},
                  {num: '4', key: '1'},
                  {num: '5', key: '1'},
                  {num: '6', key: '1'},
                  {num: '7', key: '1'},
                  {num: '8', key: '1'},
                  {num: '9', key: '1'}
                ],
                tools: [
                  {val: '全', key: '1'},
                  {val: '大', key: '1'},
                  {val: '小', key: '1'},
                  {val: '单', key: '1'},
                  {val: '双', key: '1'},
                  {val: '清', key: '1'}
                ]
              },
              {
                unit: '个位',
                items: [
                  {num: '0', key: '2'},
                  {num: '1', key: '2'},
                  {num: '2', key: '2'},
                  {num: '3', key: '2'},
                  {num: '4', key: '2'},
                  {num: '5', key: '2'},
                  {num: '6', key: '2'},
                  {num: '7', key: '2'},
                  {num: '8', key: '2'},
                  {num: '9', key: '2'}
                ],
                tools: [
                  {val: '全', key: '2'},
                  {val: '大', key: '2'},
                  {val: '小', key: '2'},
                  {val: '单', key: '2'},
                  {val: '双', key: '2'},
                  {val: '清', key: '2'}
                ]
              }
            ],
            '1411': [
              {
                unit: '不定胆',
                items: [
                  {num: '0', key: '0'},
                  {num: '1', key: '0'},
                  {num: '2', key: '0'},
                  {num: '3', key: '0'},
                  {num: '4', key: '0'},
                  {num: '5', key: '0'},
                  {num: '6', key: '0'},
                  {num: '7', key: '0'},
                  {num: '8', key: '0'},
                  {num: '9', key: '0'}
                ],
                tools: [
                  {val: '全', key: '0'},
                  {val: '大', key: '0'},
                  {val: '小', key: '0'},
                  {val: '单', key: '0'},
                  {val: '双', key: '0'},
                  {val: '清', key: '0'}
                ]
              }
            ]
          }
        },
        unit: [
          {
            unit: '位置',
            items: ['万位', '千位', '百位', '十位', '个位']
          }
        ],
        number: null // 从首页过来的选中的号
      }
    },
    filters: {
      retainDigit(num, d) {
        return Number(num).toFixed(d)
      }
    }
  }
</script>
<style  scoped>
  .checked {
    /*color: #ff632c;*/
    background: #000;
  }

  .select_num {
    padding: 15px 0;
    border-bottom: 1px solid #F3F3F3;
  }

  .select .select-row {
    display: flex;
    height: 48px;
    /*border-radius: 100px;*/
    /*background-color: #f7f7f7;*/
    /*margin-top: 15px;*/
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
  }

  .select .select-row .unit {
    width: 70px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    color: #4f4f4f;
    font-size: 14px;
    font-weight: bold;
  }

  * {
    box-sizing: border-box;
    color: #333;
  }

  .select .select-row .items {
    /*margin: 0 20px;*/
    /*padding: 0 20px;*/
    height: 46px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /*border-radius: 20px;*/
    transition: all 0.3s linear;
  }

  /*.select .select-row .items:hover {*/
    /*border-radius: 20px;*/
    /*background-color: #f1f1f1;*/
    /*box-shadow: inset 1px 1px 5px #cdcdcd;*/
  /*}*/

  .select .select-row .items div {
    width: 36px;
    height: 36px;
    line-height: 34px;
    font-size: 19px;
    border: 2px solid #ccc;
    border-radius: 50%;
    color: #4f4f4f;
    background-color: #fff;
    box-shadow: 1px 1px 2px #ccc;
    transition: all 0.2s linear;
    text-align: center;
    margin-right: 6px;
    display: inline-block;
    cursor: pointer;

  }

  .select .select-row .items div:last-child {
    margin-right: 0;
  }

  .select .select-row .items div:hover {
    /*transform: scale(1.3);*/
    border-color: #ff632c;
    color: #ff632c;
  }

  .select .select-row .items .active:hover {
    color: #fff;
  }

  .select .select-row .items .wrap {
    width: auto;
    padding: 0 10px;
    border-radius: 20px;
  }

  .select .select-row .items .active {
    background-color: #ff632c;
    border-color: #ff632c;
    color: #fff;
  }

  .select .select-row .select-tools {
    display: flex;
    margin-left: 30px;
  }

  .select .select-row .select-tools span {
    cursor: pointer;
    width: 22px;
    height: 30px;
    font-size: 15px;
    color: #959595;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    transition: all 0.2s linear;
    margin-right: 5px;
  }

  .select .select-row .select-tools span:focus {
    color: #8C5A8E;
  }

  .select .select-row .select-tools span:hover {
    color: #ff632c;
  }

  .select .select-row .select-tools span:hover {
  /*transform: scale(1.3);*/
  border-color: #ff632c;
  color: #ff632c;
  }

  .select .select-row .select-tools span:last-child {
    margin-right: 0;
  }

  .select .current-odds {
    margin-top: 10px;
    padding-left: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .select .current-odds div {
    width: 43px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    font-size: 0.75rem;
    color: #999;
    background-color: #fff;
  }

  .select .current-odds div + div {
    margin-left: 3px;
  }
</style>
