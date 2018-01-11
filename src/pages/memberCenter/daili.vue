<template>
  <MemberCommon>
    <div slot="nav">
      <li :class="{hover:safe==1}" @click="changeSafe(1)">
        <a href="javascript:;">团队总览</a>
      </li>
      <li :class="{hover:safe==2}" @click="changeSafe(2)">
        <a href="javascript:;">开户中心</a>
      </li>
      <li :class="{hover:safe==3}" @click="changeSafe(3)">
        <a href="javascript:;">团队管理</a>
      </li>
      <li :class="{hover:safe==4}" @click="changeSafe(4)">
        <a href="javascript:;">游戏记录</a>
      </li>
      <li :class="{hover:safe==5}" @click="changeSafe(5)">
        <a href="javascript:;">帐变记录</a>
      </li>
      <li :class="{hover:safe==6}" @click="changeSafe(6)">
        <a href="javascript:;">团队报表</a>
      </li>
    </div>
    <div slot="body">
      <div v-show="safe==1">
        <div class="team_1_header">
          <p>
            <em>团队成员：</em>
            <span class="dcolor">{{sumCount}}</span>
            人（玩家
            <span class="dcolor">{{playCount}}</span>人，代理
            <span class="dcolor">{{agentCount}}</span>人）</p>
          <p> 彩票总余额：
            <span class="dcolor">{{totalMoney}}</span>元</p>
        </div>
        <div class="team_1_tit">
          <h1>彩票游戏</h1>
        </div>
        <div class="info_box">
          <li>
            <a class="btn btn-radius" :class="{'team-btn':selectedTime==3,'team-btn-hover':selectedTime!=3}" @click="selectTimeRange(3)">最近3天</a>
          </li>
          <li>
            <a class="btn btn-radius" :class="{'team-btn':selectedTime==7,'team-btn-hover':selectedTime!=7}" @click="selectTimeRange(7)">最近7天</a>
          </li>
          <li>
            <a class="btn btn-radius" :class="{'team-btn':selectedTime==30,'team-btn-hover':selectedTime!=30}" @click="selectTimeRange(30)">最近一个月</a>
          </li>
          <span>时间</span>
          <el-date-picker size="small" v-model="dateStart2" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <span class="to">至</span>
          <el-date-picker size="small" v-model="dateEnd2" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <el-button size="small" type="primary" style="width:100px;margin-left:48px;" @click="getReportData">查询</el-button>
        </div>
        <div class="info_t">
          <ul>
            <li>
              <em>充值量</em>
              <span id="recharge">{{czAmount | retainDecimalDigits(3)}}</span>
            </li>

            <li>
              <em>提现量</em>
              <span id="withdraw">{{txAmount | retainDecimalDigits(3)}}</span>
            </li>

            <li>
              <em>投注量</em>
              <span id="bet">{{tzAmount | retainDecimalDigits(3)}}</span>
            </li>
            <li>
              <em>派奖金额</em>
              <span id="bonus">{{pcAmount | retainDecimalDigits(3)}}</span>
            </li>

            <li style="border-right: none">
              <em>返点</em>
              <span id="rebate">{{fdRebates | retainDecimalDigits(3)}}</span>
            </li>
          </ul>
        </div>
        <div class="info_r">
          <el-radio v-model="radioOption" label="充值量">充值量</el-radio>
          <el-radio v-model="radioOption" label="提现量">提现量</el-radio>
          <el-radio v-model="radioOption" label="投注量">投注量</el-radio>
          <el-radio v-model="radioOption" label="派奖">派奖</el-radio>
          <el-radio v-model="radioOption" label="返点">返点</el-radio>
          <el-radio v-model="radioOption" label="活动">活动</el-radio>
          <el-radio v-model="radioOption" label="新增用户数">新增用户数</el-radio>
        </div>
        <div ref="lineCharts" :options="options" style="width:818px;height:400px;"></div>
      </div>
      <div v-if="safe==2" class="user_body2">
        <div class="body_nav">
          <ul>
            <li :class="{hover:kaihu==1}" @click="changeKaihu(1)">
              <a href="javascript:;">普通开户</a>
            </li>
            <li :class="{hover:kaihu==2}" @click="changeKaihu(2)">
              <a href="javascript:;">链接开户</a>
            </li>
            <li :class="{hover:kaihu==3}" @click="changeKaihu(3)">
              <a href="javascript:;">链接管理</a>
            </li>
          </ul>
        </div>
        <div class="link_manage_form" v-show="kaihu==1">
          <div class="remark">
            <em>温馨提示：</em>
            <span>
              自动注册的会员初始密码为“ks123456”
            </span>
          </div>
          <div class="form open_account">
            <form action="/Agent/accountCenter.html" method="post" id="account_form">
              <div class="form_group">
                <label for="" class="three">开户类别:</label>
                <el-radio class="radio" v-model="radio" label="3" size="small" style="width:55px;">代理</el-radio>
                <el-radio class="radio" v-model="radio" label="4" size="small" style="width:55px;">玩家</el-radio>
              </div>
              <div class="form_group">
                <label for="" class="three">用户名:</label>
                <input type="text" placeholder="请输入用户名" v-model="memberName" @blur="check_user">
                <p class="text_info">格式：
                  <span class="red">6-16</span>&nbsp;字母+数字或者下划线组合</p>
              </div>
              <div class="form_group" v-for="(item,index) in memberRebates" :key="index">
                <label for="" class="three">{{item.catName}}:</label>
                <input type="text" placeholder="请输入返点" id="rebate" class="rebate" v-model="item.rebate" @blur="checkValueRange(index,item.rebate2)" @keyup="checkdigit(index)" autocomplete="off">
                <p class="text_info">可分配范围（
                  <span class="red">0.1～{{item.rebate2}}</span>）</p>
              </div>
              <button type="button" class="btn btn-radius btn-default btn-register" id="add" @click="registerMember">
                注册用户
              </button>
            </form>
          </div>
        </div>
        <div class="link_manage_form" v-show="kaihu==2">
          <div class="remark">
            <em>温馨提示：</em>
            <span>
              生成链接不会立即扣减配额，只有用户使用该链接注册成功的时候，才会扣减配额；请确保您的配额充足 配额不足将造成用户注册不成功。
            </span>
          </div>
          <div class="form open_account">
            <form action="/Agent/accountCenter.html" method="post" id="account_form">
              <div class="form_group">
                <label for="" class="three">开户类别:</label>
                <el-radio class="radio" v-model="radio2" label="3" size="small" style="width:55px;">代理</el-radio>
                <el-radio class="radio" v-model="radio2" label="4" size="small" style="width:55px;">玩家</el-radio>
              </div>
              <div class="form_group">
                <label for="" class="three">链接有效期:</label>
                <el-date-picker v-model="expirationTime" type="date" placeholder="链接有效期" :picker-options="pickerOptions0" class="input_text" size="large" style="width:320px;margin-left: 4px;">
                </el-date-picker>
              </div>
              <div class="form_group">
                <label for="" class="three">使用次数:</label>
                <input type="text" placeholder="请输入次数" v-model="useCount" @keyup="checkUseCount(useCount)">
              </div>
              <div class="form_group" v-for="(item,index) in memberRebates" :key="index">
                <label for="" class="three">{{item.catName}}:</label>
                <input type="text" placeholder="请输入返点" class="rebate" v-model="item.rebate" @keyup="checkdigit(index)" @blur="checkValueRange(index,item.rebate2)" autocomplete="off">
                <p class="text_info">可分配范围（
                  <span class="red">0.1～{{item.rebate2}}</span>）</p>
              </div>
              <button type="button" @click="creatLink" class="btn btn-radius btn-default btn-register" id="add">
                生成链接
              </button>
            </form>
          </div>
        </div>
        <div class="link_manage_form" v-show="kaihu==3">
          <div-table style="margin-top:15px;" v-loading="loading" element-loading-text="拼命加载中">
            <div slot="head" class="thead">
              <div style="flex:2">推荐人</div>
              <div style="flex:2">用户类别</div>
              <div style="flex:6">彩票返点</div>
              <div style="flex:4">过期时间</div>
              <div style="flex:2">剩余个数</div>
              <div style="flex:1">操作</div>
            </div>
            <div slot="body" class="tbody" v-for="(item,index) in urlManager" :key="index">
              <div style="flex:2;cursor:pointer" :class="{'color':item.expirationDate>new Date()&&item.useCount>0}" @click="gotoRegister(item.agentNo,$event)">{{item.agentNo}}</div>
              <div style="flex:2">{{item.memberType|transforType}}</div>
              <div style="flex:6">{{item.agentRebateList|transforRebateList}}</div>
              <div style="flex:4">{{item.expirationDate|transforTime}}</div>
              <div style="flex:2">{{item.useCount}}</div>
              <div style="flex:1;cursor:pointer" @click="deletee(item.id)">删除</div>
            </div>
          </div-table>
        </div>

      </div>
      <div v-show="safe==3">
        <div class="info_select">
          <span class="b_search_name"> 用户名：</span>
          <el-input placeholder="请输入用户名" style="width:90px;" size="small" v-model="memberNameTeam"></el-input>
          <span class="b_search_name"> 余额：</span>
          <el-input style="width:60px;" size="small" v-model="balance1"></el-input>
          <span class="b_search_name"> 至：</span>
          <el-input style="width:60px;" size="small" v-model="balance2"></el-input>
          <span class="b_search_name"> 返水时间：</span>
          <el-date-picker size="small" v-model="dateStart1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <span class="b_search_name"> 至</span>
          <el-date-picker size="small" v-model="dateEnd1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <el-button size="small" type="primary" style="float:right;width:60px" @click="fetchTeamManageData(1)">查询</el-button>
        </div>
        <el-table :data="memberList" border  size="medium " v-loading="loading" element-loading-text="拼命加载中">
          <el-table-column  prop="name" label="用户名" width="120" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="type" label="账户类别" width="90" align="center" :show-overflow-tooltip="true" :formatter="filterType">
          </el-table-column>
          <el-table-column  prop="balance" label="账户余额" width="120" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="rebate" label="彩票返点" width="300" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="login_time" label="最后登录" width="185" align="center" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <el-pagination @current-change="changePage1"  layout="prev, pager, next"  v-if="memberList.length" :page-count="pages"></el-pagination>
      </div>
      <div v-show="safe==4">
        <div class="info_select">
          <span class="b_search_name"> 用户名：</span>
          <el-input placeholder="请输入用户名" style="width:110px;" size="small" v-model="memberNamePlay"></el-input>
          <span class="b_search_name"> 期号：</span>
          <el-input style="width:114px;" size="small" v-model="period"></el-input>
          <span class="b_search_name"> 下单时间：</span>
          <el-date-picker size="small" v-model="dateStart1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <span class="b_search_name"> 至</span>
          <el-date-picker size="small" v-model="dateEnd1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <el-button size="small" type="primary" style="float:right;width:60px" @click="fetchPlayRecord(1)">查询</el-button>
        </div>
        <el-table :data="PlayRecordList" border  size="medium " v-loading="loading" element-loading-text="拼命加载中">
          <el-table-column  type="index" label="编号" width="45" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="name" label="用户名" width="90" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="lotteryName" label="彩种" width="85" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="codeName" label="玩法" width="85" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="period" label="期号" width="106" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="betNum" label="投注号码" width="50" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="createTime" label="下单时间" width="85" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="betMoney" label="投注金额" width="50" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="winMoney" label="奖金" width="80" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="status" label="状态" width="50" :formatter="filterStatus" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="createDate" label="会员注册日期" width="90" align="center" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <el-pagination @current-change="changePage2"  layout="prev, pager, next"  v-if="PlayRecordList.length" :page-count="pages"></el-pagination>
      </div>
      <div v-show="safe==5">
        <div class="info_select">
          <span class="b_search_name"> 账单类别：</span>
          <el-select placeholder="请选择" size="small" style="width:103px;" v-model="selected">
            <el-option v-for="item in selectOption" :key="item.index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <span class="b_search_name"> 用户名：</span>
          <el-input placeholder="请输入用户名" style="width:111px;" size="small" v-model="memberNameAccount"></el-input>
          <span class="b_search_name"> 时间：</span>
          <el-date-picker size="small" v-model="dateStart1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <span class="b_search_name"> 至</span>
          <el-date-picker size="small" v-model="dateEnd1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <el-button size="small" type="primary" style="width:100px;float:right;" @click="fetchAccountChangeData(1)">查询</el-button>
        </div>
        <el-table :data="AccountChangeList" border  size="medium " v-loading="loading" element-loading-text="拼命加载中">
          <el-table-column  type="index" label="编号" width="60" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="name" label="用户名" width="150" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="accountType" :formatter="filterAccountType" label="账单类别" width="200" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <!-- <el-table-column  prop="beginMoney" label="之前金额" width="105" align="center" :show-overflow-tooltip="true">
          </el-table-column> -->
          <el-table-column  prop="optionMoney" label="操作金额" width="155" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <!-- <el-table-column  prop="afterMoney" label="剩余金额" width="107" align="center" :show-overflow-tooltip="true">
          </el-table-column> -->
          <el-table-column  prop="optionTime" label="操作时间" width="252" align="center" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <el-pagination @current-change="changePage3"  layout="prev, pager, next"  v-if="AccountChangeList.length" :page-count="pages"></el-pagination>
      </div>
      <div v-show="safe==6">
        <div class="info_select">
          <span class="b_search_name"> 用户名：</span>
          <el-input placeholder="请输入用户名" style="width:120px;" size="small" v-model="teamName"></el-input>
          <span class="b_search_name"> 时间：</span>
          <el-date-picker size="small" v-model="dateStart1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <span class="b_search_name"> 至</span>
          <el-date-picker size="small" v-model="dateEnd1" type="date" placeholder="选择日期" :clearable="false">
          </el-date-picker>
          <el-button size="small" type="primary" style="margin-left:33px;width:100px;float:right;" @click="fetchTeamFormData(1)">查询</el-button>
        </div>
        <el-table :data="teamFormList" border  size="medium " v-loading="loading" element-loading-text="拼命加载中">
          <el-table-column  prop="name" label="用户名" width="120" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="czAmount" label="充值" width="90" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="txAmount" label="取款" width="85" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="txfeeAmount" label="扣除" width="85" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="tzAmount" label="投注" width="85" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="pcAmount" label="派奖" width="87" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="fdRebates" label="返点" width="85" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="yhAmount" label="活动" width="90" align="center" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column  prop="tdAmount" label="盈利" width="90" align="center" :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <el-pagination @current-change="changePage4"  layout="prev, pager, next" v-if="teamFormList.length" :page-count="pages6"></el-pagination>
      </div>
    </div>
  </MemberCommon>
</template>
<script>
import ccaa from "tools/tools.js";
import MemberCommon from "components/common/memberCommon";
import DivTable from "components/common/divTable";
import url from "static/url.js";
import HighCharts from "highcharts";
export default {
  data() {
    return {
      //公共数据开始
      loading: false, //请求数据时的遮罩
      safe: 1, //控制哪个大菜单显示
      dateStart1: null, //开始时间
      dateEnd1: new Date(), //结束时间
      //公共数据结束
      //团队总览部分数据开始
      sumCount:null,
      agentCount: null,
      playCount: null,
      totalMoney: null,
      dateStart2: null, //团队总览开始时间
      dateEnd2: null, //团队总览结束时间
      selectedTime: 3, //当前选择的时间段
      radioOption: "充值量",//纵轴单选框数据
      charts:null,//存放初始化的图表
      czAmount:0.000,//充值量
      txAmount:0.000,//提现量
      tzAmount:0.000,//投注量
      pcAmount:0.000,//派奖金额
      fdRebates:0.000,//返点
      options: {
        title: {
          text: ""
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        yAxis: {
          title: {
            text: "充值量"
          }
        },
        xAxis: {
          title: {
            text: "时间"
          },
        },
        series: [{
          data:[0,0,0]
        }]
      },
      //团队总览部分数据结束
      //开户中心部分数据
      radio: "3", //开户中心开户类别单选框
      radio2: "3", //开户中心开户类别单选框
      kaihu: 1, //展示开户中心底下哪个选项卡的数据
      memberRebates: [], //从接口请求回来的用户赔率数据，对应getMemberRebates()函数
      memberName: null, //普通开户里的用户名
      useCount: null, //链接开户输入的链接使用次数
      expirationTime: "", //链接开户输入的链接使用有效期
      pickerOptions0: {
        //链接有效期时间配置
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      urlManager: null, //接口请求回来的链接数组
      //开户中心部分数据结束

      //团队管理数据开始
      memberNameTeam: null, //用户名
      memberList: [], //从接口返回来的数组数据
      pages: 0, //总页数
      //团队管理数据结束
      //团队报表数据开始
      teamFormList: [], //借口返回来的数据
      teamName: null, //用户名
      balance1: null, //余额
      balance2: null, //余额
      pages6: 0,
      //团队报表数据结束
      //帐变记录数据开始
      selectOption: [
        { value: "", label: "全部" },
        { value: "1", label: "投注" },
        { value: "2", label: "返点" },
        { value: "3", label: "派彩" },
        { value: "4", label: "投注返水" },
        { value: "5", label: "取消订单" },
        { value: "6", label: "代理返水" },
        { value: "7", label: "线上充值" },
        { value: "8", label: "线下充值" },
        { value: "9", label: "人工入款" },
        { value: "10", label: "人工出款" },
        { value: "11", label: "提现" },
        { value: "12", label: "手续费扣除" },
        { value: "13", label: "取消提现" },
        { value: "14", label: "活动优惠" }
      ],
      selected: "", //选中的下拉列表
      memberNameAccount: null, //用户名
      AccountChangeList: [], //接口回来的数据
      //帐变记录数据结束
      //游戏记录数据开始
      memberNamePlay: null, //游戏记录用户名
      PlayRecordList: [], //游戏记录接口数据
      period: null, //期号
      //游戏记录数据结束
    };
  },
  filters: {
    transforType(a) {
      if (a == 3) {
        return "代理";
      } else if (a == 4) {
        return "玩家";
      }
    },
    transforTime(a) {
      return ccaa.getDate(a);
    },
    transforRebateList(a) {
      let arr = [];
      a.forEach(res => {
        arr.push(res.lotMaxRebate);
      });
      return arr.join("/");
    },
    //保留几位小数过滤
    retainDecimalDigits(a, b) {
      return Number(a).toFixed(b);
    },
  },
  created() {
    this.initDate(); //初始化时间为每月一号
    this.getTeamCount();
    this.getMemberRebates(); //获取用户赔率数据
    this.getUrlManager(); //获取链接管理数据
    /* this.fetchTeamFormData(ccaa.store.getData("user").id); //获取团队报表数据 */
  },
  //元素加载完后初始化图表
  mounted(){
    this.charts=HighCharts.chart(this.$refs.lineCharts, this.options);
    this.charts.xAxis[0].setCategories(this.getInitTimeRange());
  },
  components: {
    MemberCommon,
    DivTable,
  },
  methods: {
    // 团队管理分页取数据
    changePage1(a){
      this.fetchTeamManageData(a)
    },
    // 游戏记录分页取数据
    changePage2(a){
      this.fetchPlayRecord(a)
    },
    // 帐变记录分页取数据
    changePage3(a){
      this.fetchAccountChangeData(a)
    },
    // 团队报表分页取数据
    changePage4(a){
      this.fetchTeamFormData(a)
    },
    //highcharts图标数据获取
    getReportData(){
      this.getReportData3();
      switch (this.radioOption) {
        case '充值量':
          this.getReportData2("/report/rechargeDays");
          break;
        case '提现量':
          this.getReportData2("/report/gateringDays");
          break;
        case '投注量':
          this.getReportData2("/report/betDays");
          break;
        case '派奖':
          this.getReportData2("/report/payoutDays");
          break;
        case '返点':
          this.getReportData2("/report/rebateDays");
          break;
        case '活动':
          this.getReportData2("/report/activityDays");
          break;
        case '新增用户数':
          this.getReportData2("/report/newMemberDays");
          break;
      }
    },
    getReportData2(a){
      let obj={};
      obj.id=ccaa.store.getData("user").id;
      obj.beginTime=ccaa.getYMD(this.dateStart2);
      obj.endTime=ccaa.getYMD(this.dateEnd2);
      this.$http.post(a,obj).then(res=>{
        if(res.data.status==200){
          //更新x轴
          this.charts.xAxis[0].setCategories(this.getInitTimeRange());
          //更新Y轴数据
          this.charts.series[0].setData(this.filteToArrY(res.data.result));
          //更新Y轴标题
          this.charts.yAxis[0].setTitle({
            text: this.radioOption,
        });
        }
      })
    },
    //将请求回来的数据转成坐标轴数据格式
    filteToArrY(arr){
      let arrX=[],arrY=[];
      arrX=this.getInitTimeRange();
      arrX.forEach(i=>{
        let aa=arr.filter(item=>{
          return item.strDate==i;
        })
        if(aa.length){
          arrY.push(aa[0].count)
        }else{
          arrY.push(0)
        }
      });
      return arrY
    },
    //获取初始化的时间范围
    getInitTimeRange(){
      let arrX=[];
      let dateStart2=this.dateStart2 instanceof Date?this.dateStart2.getTime():this.dateStart2,
          dateEnd2=this.dateEnd2 instanceof Date?this.dateEnd2.getTime():this.dateEnd2;
      do{
        arrX.push(ccaa.getYMD(dateStart2));
        dateStart2=dateStart2+(24*3600*1000);
        //console.log(dateStart2)
      }while (dateStart2<dateEnd2);
      return arrX;
    },
    //获取团队总览中的充值量和体现量等数据
    getReportData3(){
       let obj = {};
        obj.id = ccaa.store.getData("user").id;
        obj.name = ccaa.store.getData("user").memberName;
        obj.beginTime = ccaa.getYMD(this.dateStart2);
        obj.endTime = ccaa.getYMD(this.dateEnd2);
        this.$http.post("/report/agent", obj).then(res => {
        console.log(res.data);
        if (res.data.status == 200) {
          let result=res.data.result.list[0];
          this.czAmount = result.czAmount;
          this.txAmount = result.txAmount;
          this.tzAmount = result.tzAmount;
          this.pcAmount = result.winMoney;
          this.fdRebates = result.fdRebates;
        }
      });
    },
    //团队管理数据获取
    fetchTeamManageData(a) {
      this.loading = true;
      let endTime = this.dateEnd1.getTime();
      let obj = {};
      obj.id = ccaa.store.getData("user").id;
      obj.name = this.memberNameTeam;
      obj.minBalance = this.balance1;
      obj.maxBalance = this.balance2;
      obj.beginTime = ccaa.getYMD(this.dateStart1);
      obj.endTime = ccaa.getYMD(endTime);
      obj.pageNum = a
      console.log(obj,this.pages);
      this.$http.post("/report/team", obj).then(res => {
        if (res.data.status == 200) {
          console.log(res.data.result);
          this.memberList = res.data.result.list;
          this.pages = res.data.result.pages
          this.loading = false;
        }
      });
    },
    //团队管理用户类型转化
    filterType:function(a,b,c) {
      switch (c) {
        case -1:
          return "已删除";
          break;
        case 0:
          return "试玩账户";
          break;
        case 1:
          return "正常账户";
          break;
        case 2:
          return "总代理";
          break;
        case 3:
          return "子代理";
          break;
        case 4:
          return "代理邀请会员";
          break;
      }
    },
    //游戏记录数据获取
    fetchPlayRecord(a) {
      if (!this.memberNamePlay) {
        this.$message("请输入用户名");
      } else {
        this.loading = true;
        let endTime = this.dateEnd1.getTime();
        let obj = {};
        obj.id = ccaa.store.getData("user").id;
        obj.name = this.memberNamePlay;
        obj.period = this.selected;
        obj.beginTime = ccaa.getYMD(this.dateStart1);
        obj.endTime = ccaa.getYMD(endTime);
        obj.pageNum = a
        console.log(obj,this.pages);
        this.$http.post("/report/bet", obj).then(res => {
          if (res.data.status == 200) {
            console.log(res.data.result);
            this.PlayRecordList = res.data.result.list;
            this.pages = res.data.result.pages
            this.loading = false;
          }
        });
      }
    },
    //游戏记录状态转变
    filterStatus:function(c,b,a) {
      console.log(c.isRepeal);
      if(c.isRepeal === 1) {
        return "已撤单"
      }
      switch (a) {
        case -1:
          return "等待开奖";
          break;
        case 0:
          return "未中奖";
          break;
        default:
          return "中奖";
          break;
      }
    },
    //获取帐变记录数据
    fetchAccountChangeData(a) {
      if (!this.memberNameAccount) {
        this.$message("请输入用户名");
      } else {
        this.loading = true;
        let endTime = this.dateEnd1.getTime();
        let obj = {};
        obj.id = ccaa.store.getData("user").id;
        obj.name = this.memberNameAccount;
        obj.accountType = this.selected;
        obj.beginTime = ccaa.getYMD(this.dateStart1);
        obj.endTime = ccaa.getYMD(endTime);
        obj.pageNum = a
        console.log(obj,this.pages);
        this.$http.post("/report/change", obj).then(res => {
          if (res.data.status == 200) {
            //console.log(res.data.result);
            this.AccountChangeList = res.data.result.list;
            this.pages = res.data.result.pages
            this.loading = false;
          }
        });
      }
    },
    //帐变记录里过滤账户类型
    filterAccountType(c,b,a) {
      switch (Number(a)) {
        case 1:
          return "投注";
          break;
        case 2:
          return "返点";
          break;
        case 3:
          return "派彩";
          break;
        case 4:
          return "投注返水";
          break;
        case 5:
          return "取消订单";
          break;
        case 6:
          return "代理返水";
          break;
        case 7:
          return "线上充值";
          break;
        case 8:
          return "线下充值";
          break;
        case 9:
          return "人工入款";
          break;
        case 10:
          return "人工出款";
          break;
        case 11:
          return "提现";
          break;
        case 12:
          return "手续费扣除";
          break;
        case 13:
          return "取消提现";
          break;
        case 14:
          return "活动优惠";
          break;
      }
    },
    //获取团队报表数据
    fetchTeamFormData(a) {
      this.loading = true;
      let endTime = this.dateEnd1.getTime();
      let obj = {};
        obj.id = ccaa.store.getData("user").id;
        obj.name = this.teamName;
      obj.beginTime = ccaa.getYMD(this.dateStart1);
      obj.endTime = ccaa.getYMD(endTime);
      obj.pageNum= a;
      console.log(obj,this.pages)
      this.$http.post("/report/agent", obj).then(res => {
        if (res.data.status == 200) {
          this.teamFormList = res.data.result.list;
          this.pages6 = res.data.result.pages;
          this.loading = false;
        }
      });
    },
    //改变大菜单
    changeSafe(a) {
      this.safe = a;
      this.initDate();
      if (a == 6) {
        this.pages6 = 0
        this.fetchTeamFormData(1);
      } else if (a == 3) {
        this.fetchTeamManageData(1);
      } else if (a == 4) {
        this.PlayRecordList=[];
      } else if (a == 5){
        this.AccountChangeList=[];
      }
    },
    //检测输入框在不在规定范围
    checkValueRange(index,maxRebates) {
      let currentDate = this.memberRebates[index].rebate;
      if(currentDate){
        let currentDate2 = Number(currentDate)
        if( currentDate2 < 0.1 || currentDate2 > Number(maxRebates) ){
        this.$message({
          message: "请输入正确范围的返利",
          type: "warning"
        });
        this.memberRebates[index].rebate = null;
        }
      }
    },
    // 检查输入的必须是两位小数
    checkdigit(index){
      let currentDate = Number(this.memberRebates[index].rebate);
      // console.log(currentDate)
       this.memberRebates[index].rebate=this.memberRebates[index].rebate.replace(/\.\d{2,}$/,this.memberRebates[index].rebate.substr(this.memberRebates[index].rebate.indexOf('.'),3))
    },
    // 检查可用次数必须为数字
    checkUseCount(val){
      this.useCount=this.useCount.replace(/\D/g,'')
    },
    check_user() {
      //console.log(this.memberName);
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_-]{6,16}$/g
      if(this.memberName){
        if (!reg.test(this.memberName)) {
        this.$message({
          message: "请输入正确的格式",
          type: "warning"
        });
        this.memberName = null;
       }
      }
    },
    changeKaihu(a) {
      this.kaihu = a;
    },
    //获取团队总览部分团队总数据
    getTeamCount() {
      this.$http
        .post("/agent/team/count", { id: ccaa.store.getData("user").id })
        .then(res => {
          //console.log(res.data);
          if (res.data.status == 200) {
            let result=res.data.result;
            this.sumCount=result.sumCount;
            this.agentCount = result.agentCount;
            this.playCount = result.memberCount;
            this.totalMoney = result.sumBalance;
          }
        })
        .catch(err => console.log(err));
    },
    //团队总览中改变时间范围
    selectTimeRange(days) {
      this.selectedTime=days;
      let date = new Date().getTime(),
        newDate;
      newDate = new Date(date - days * 24 * 3600 * 1000).getTime();
      this.dateStart2 = newDate;
      this.dateEnd2 = date;
    },
    //获取用户赔率数据
    getMemberRebates() {
      this.$http
        .post("/member/get/rebates", {
          memberId: ccaa.store.getData("user").id
        })
        .then(res => {
          //console.log(res.data);
          if (res.data.status == 200) {
            //console.log(res.data.result)
            let arr;
            arr = res.data.result.filter(res => {
              return (
                res.catId == "1" ||
                res.catId == "2" ||
                res.catId == "3" ||
                res.catId == "4" ||
                res.catId == "5"
              );
            });
            //console.log(arr);
            this.memberRebates = this.changeMemberRebates(arr);
          }
        })
        .catch(err => console.log(err));
    },
    //获取链接管理列表数据
    getUrlManager() {
      this.loading = true;
      this.$http
        .post("/member/url/manager", {
          memberId: ccaa.store.getData("user").id
        })
        .then(res => {
          //console.log(res.data);
          if (res.data.status == 200) {
            this.urlManager = this.changeMemberRebates(res.data.result);
            this.loading = false;
          }
        })
        .catch(err => console.log(err));
    },
    changeMemberRebates(a) {
      let memberRebates = [];
      a.forEach(item => {
        let obj = item;
        obj.rebate2 = Number(item.rebate).toFixed(2);
        memberRebates.push(obj);
      });
      return memberRebates;
    },
    registerMember() {
      let obj = {};
      obj.memberId = ccaa.store.getData("user").id;
      obj.type = this.radio;
      obj.memberName = this.memberName;
      let arr = [];
      this.memberRebates.forEach(item => {
        let obj = {};
        obj.lotCatId = item.catId;
        obj.lotMaxRebate = Number(item.rebate);
        arr.push(obj);
      });
      obj.rebateList = arr;
      console.log(obj);
      this.$http
        .post("/member/ordinary/open", obj)
        .then(res => {
          //console.log(res.data);
          if (res.data.status == 200) {
            this.$alert("注册成功", "", {
              confirmButtonText: "确定"
            });
          }else{
            this.$alert(res.data.message, "", {
              confirmButtonText: "确定"
            });
          }
          this.memberName = null;
        })
        .catch(err => console.log(err));
    },
    creatLink() {
      let obj = {};
      obj.memberId = ccaa.store.getData("user").id;
      obj.type = this.radio2;
      obj.useCount = Number(this.useCount);
      obj.expirationTime = ccaa.getYMD(this.expirationTime);
      let arr = [];
      this.memberRebates.forEach(item => {
        let obj = {};
        obj.lotCatId = item.catId;
        obj.lotMaxRebate = item.rebate;
        arr.push(obj);
      });
      obj.rebateList = arr;
      //console.log(obj);
      this.$http
        .post("/member/url/open", obj)
        .then(res => {
          console.log(res.data);
          if (res.data.status == 200) {
            this.useCount = null;
            this.expirationTime = "";
            this.$alert("生成链接成功", {
              confirmButtonText: "确定",
              callback: res => {
                this.getUrlManager();
                this.kaihu = 3;
              }
            });
          }
        })
        .catch(err => console.log(err));
    },
    deletee(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/agent/delete/Code", { agentCodeId: id })
            .then(res => {
              //console.log(res.data);
              if (res.data.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getUrlManager();
              } else {
                this.$message({
                  type: "warning",
                  message: res.data.message
                });
              }
            })
            .catch(res => console.log(res));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    gotoRegister(agentNo, element) {
      if (element.target.classList.contains("color")) {
        window.open(url + "/register?agentNo=" + agentNo);
      }
    },
    //切换大菜单时初始化时间数据
    initDate() {
      //针对团队总览，初始化时间范围
      if(this.safe==1){
        this.selectTimeRange(3)
      }
      //初始化开始时间为每月一号
      let currentDate = new Date();
      currentDate.setDate(1);
      currentDate.setHours(0);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      currentDate.setMilliseconds(0);
      this.dateStart1 = currentDate;
      //初始化结束时间为当前时间
      this.dateEnd1 = new Date();
    }
  }
}
</script>
<style lang="less" scoped>
.NameCls {
  cursor: pointer;
}
.font{
  font-size: 11px !important;
}
.NameCls:hover {
  text-decoration: underline;
}
.team_1_header {
  line-height: 30px;
  font-size: 14px;
  padding: 20px;
  p {
    line-height: 30px;
  }
}
.red {
  color: red;
}

.team_1_tit {
  width: inherit;
  background: #fffbf5;
  border-left: 3px solid #0f95f6;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  overflow: hidden;
}

.btn-radius {
  border-radius: 4px;
}

.team-btn {
  background: #E94335;
  color: #fff;
}

.btn {
  display: inline-block;
  padding: 10px;
  border: 0px;
  font-size: 1.0625rem;
  color: #fff;
  text-align: center;
  border-radius: 4px;
}

.team-btn-hover {
  background: #cccccc;
  color: #fff;
}

.info_box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 17px;
  padding-right: 30px;
  li {
    overflow: hidden;
    a {
      width: inherit;
      color: #fff;
      text-decoration: none;
    }
    a.btn {
      height: 32px;
      padding: 0px;
      line-height: 32px;
      padding-left: 10px;
      padding-right: 15px;
      margin-left: 15px;
      font-size: 14px;
    }
  }
  span {
    width: inherit;
    color: #999;
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
    line-height: 30px;
    font-size: 14px;
  }
}

.el-date-editor.el-input {
  width: 129px;
}
.info_r {
  width: inherit;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  padding: 0 36px;
  display: flex;
  justify-content: space-between;
}
.info_t {
  overflow: hidden;
  margin-top: 23px;
  ul {
    width: inherit;
    li {
      float: left;
      overflow: hidden;
      width: 141px;
      padding: 10px;
      text-align: center;
      border-right: 1px dashed #ddd;
      line-height: 32px;
      em {
        display: block;
        font-size: 14px;
        color: #333;
      }
      span {
        width: inherit;
        font-size: 22px;
      }
    }
  }
}

.user_body2 {
  padding: 18px;
  .body_nav {
    border: 1px solid #ebebeb;
    height: 45px;
    line-height: 45px;
    padding-left: 10px;
    background: #f5f5f5;
    ul {
      li {
        float: left;
        font-size: 14px;
        position: relative;
        width: 130px;
        height: 45px;
        &.hover {
          top: -2px;
          border-top: 2px solid #0f76c1;
          z-index: 1;
          color: #0f76c1;
          background: #fff;
        }
        a {
          color: #333;
          display: inline-block;
          line-height: 45px;
          width: 130px;
          text-align: center;
          text-decoration: none;
          position: absolute;
        }
      }
    }
  }
  .link_manage_form {
    overflow: hidden;
    border: 1px solid #ddd;
    border-top: none;
    width: 780px;
    .remark {
      overflow: hidden;
      padding: 25px;
      em {
        overflow: hidden;
        color: #333333;
        font-size: 12px;
        display: block;
        float: left;
        line-height: 27px;
      }
      span {
        overflow: hidden;
        color: #999999;
        font-size: 12px;
        display: block;
        width: 650px;
        float: left;
        line-height: 27px;
      }
    }
    .form {
      overflow: hidden;
      padding-bottom: 20px;
      .form_group {
        display: block;
        overflow: hidden;
        margin-bottom: 18px;
        position: relative;
        label {
          width: 140px;
          display: block;
          float: left;
          text-align: right;
          font-size: 1rem;
          line-height: 48px;
          padding-right: 10px;
          color: #636363;
          &.three {
            letter-spacing: 5px;
          }
        }
        input {
          border: 1px solid #ddd;
          border-radius: 2px;
          width: 296px;
          margin-left: 5px;
          padding-left: 12px;
          color: #999;
          padding-top: 14px;
          font-size: 16px;
          padding-bottom: 15px;
        }
      }
    }
    .open_account {
      overflow: hidden;
    }
    .open_account.form {
      width: 565px;
      margin: 0 auto;
      .form_group {
        label {
          font-size: 14px;
        }
        input {
          overflow: hidden;
          height: 28px;
          padding: 10px;
        }
        p.text_info {
          font-size: 13px;
          text-align: left;
          margin-left: 153px;
          margin-top: 6px;
          color: #666666;
        }
      }
      button {
        margin-left: 154px;
        width: 310px;
        line-height: 30px;
        font-size: 22px;
        height: 50px;
        margin-bottom: 20px;
        overflow: hidden;
        overflow: hidden;
        margin-top: 30px;
        background: #E94335;
        &:hover {
          background: rgb(237, 105, 93);
          color: #fff;
        }
      }
    }
  }
}

.info_select {
  padding-left: 15px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 15px;
}

.b_search_name {
  line-height: 30px;
  text-align: center;
  font-size: 0.8125rem;
  display: inline-block;
  vertical-align: top;
  color: #999;
}

.empty_data {
  background-image: url("../../assets/image/lion.png");
  background-size: 40px 46px;
  background-repeat: no-repeat;
  line-height: 50px;
  background-position: 42%;
  color: #999 !important;
}

.color {
  color: red !important;
}

.color:hover {
  text-decoration: underline;
}
#playRecord > div {
  font-size: 11px;
  align-items: center;
}
</style>
