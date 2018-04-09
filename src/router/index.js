import Vue from 'vue';
import Router from 'vue-router';
import index from 'pages/index/index';
import helpCenter from 'pages/helpCenter/helpCenter';
import tryPlay from 'pages/tryPlay/tryPlay';
import joinAgent from 'pages/joinAgent/joinAgent';
import Rules from 'pages/rules/rules';
import news from 'pages/news/index';
import mobileBuyLottery from 'pages/mobileBuyLottery/mobileBuyLottery';
import activity from 'pages/activity/activity';
import notice from 'pages/notice/notice';
import numbers from 'pages/notice/children/numbers';
import detailNumbers from 'pages/notice/children/detailNumbers';
import charts from 'pages/charts/charts';
import chartsIndex from 'pages/charts/children/chartsIndex';
import detailCharts from 'pages/charts/children/detail';
import buyLottery from 'pages/buyLottery/buyLottery';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      component: index,
    },
    {
      path: '/register',
      component: resolve => require(['pages/register/register'], resolve)
    },
    {
      path: '/regAgreement',
      component: resolve => require(['pages/regAgreement/regAgreement'], resolve)
    },
    {
      path: '/buyLottery',
      component: buyLottery,
      children: [{
          path: '',
          component: resolve => require(['pages/buyLottery/children/lotteryLobby'], resolve),
        },
        {
          path: 'bet21',
          component: resolve => require(['pages/buyLottery/children/lotterys/21'], resolve),
        },
        {

          path: 'bet22',
          component: resolve => require(['pages/buyLottery/children/lotterys/22'], resolve),
        },
        {
          path: 'bet23',
          component: resolve => require(['pages/buyLottery/children/lotterys/23'], resolve),
        },
        {
          path: 'bet41',
          component: resolve => require(['pages/buyLottery/children/lotterys/41'], resolve),
        },
        {
          path: 'bet104',
          component: resolve => require(['pages/buyLottery/children/lotterys/104'], resolve),
        },
        {
          path: 'bet101',
          component: resolve => require(['pages/buyLottery/children/lotterys/101'], resolve),
        },
        {
          path: 'bet31',
          component: resolve => require(['pages/buyLottery/children/lotterys/31'], resolve),
        },
        {
          path: 'bet32',
          component: resolve => require(['pages/buyLottery/children/lotterys/32'], resolve),
        },
        {
          path: 'bet51',
          component: resolve => require(['pages/buyLottery/children/lotterys/51'], resolve),
        },
        {
          path: 'bet11',
          component: resolve => require(['pages/buyLottery/children/lotterys/11'], resolve),
        },
        {
          path: 'bet12',
          component: resolve => require(['pages/buyLottery/children/lotterys/12'], resolve),
        },
        {
          path: 'bet13',
          component: resolve => require(['pages/buyLottery/children/lotterys/13'], resolve),
        },
        {
          path: 'bet14',
          component: resolve => require(['pages/buyLottery/children/lotterys/14'], resolve),
        },
        {
          path: 'bet15',
          component: resolve => require(['pages/buyLottery/children/lotterys/15'], resolve),
        }
      ],
    },
    {
      path: '/tryPlay',
      component: tryPlay,
    },
    {
      path: '/joinAgent',
      component: joinAgent,
    },
    {
      path: '/helpCenter',
      component: helpCenter,
      children: [{
          path: '',
          component: resolve => require(['pages/helpCenter/children/index'], resolve),
        },
        {
          path: 'helpList/:listId',
          name: 'helpList',
          component: resolve => require(['pages/helpCenter/children/helpList'], resolve),
        }
      ]
    },
    {
      path: '/rules',
      component: Rules,
    },
    {
      path: '/news',
      component: news,
      children: [{
        path: '',
        component: resolve => require(['pages/news/children/newsList'], resolve),
      }, {
        path: 'newsDetail/:id',
        name: 'newsDetail',
        component: resolve => require(['pages/news/children/newsDetail'], resolve),
      }, ]
    },
    {
      path: '/mobile',
      component: mobileBuyLottery,
    },
    {
      path: '/activity',
      component: activity,
    },
    {
      path: '/notice',
      component: notice,
      children: [{
          path: '',
          component: numbers
        },
        {
          path: 'detailNumbers/:lotteryId',
          component: detailNumbers,
          name: "detail"
        },
      ]
    },
    {
      path: '/charts',
      component: charts,
      children: [{
          path: '',
          component: chartsIndex,
        },
        {
          path: 'lottery/:id',
          component: detailCharts,
        },
      ],
    },
    {
      path: '/memberCenter',
      component: resolve => require(['pages/memberCenter/index'], resolve),
      children: [{
          path: '',
          redirect: 'person'
        },
        {
          path: 'peilv',
          component: resolve => require(['pages/memberCenter/peilv'], resolve),
        },
        {
          path: 'setting',
          component: resolve => require(['pages/memberCenter/setting'], resolve),
        },
        {
          path: 'person',
          component: resolve => require(['pages/memberCenter/person'], resolve),
        },
        {
          path: 'message',
          component: resolve => require(['pages/memberCenter/message'], resolve),
        },
        {
          path: 'bettingRecord',
          component: resolve => require(['pages/memberCenter/bettingRecord'], resolve),
        },
        {
          path: 'caiwu/:id',
          component: resolve => require(['pages/memberCenter/caiwu'], resolve),
        },
        {
          path: 'daili',
          component: resolve => require(['pages/memberCenter/daili'], resolve),
        }
      ]
    },
    {
      path: '/noticeList',
      component: resolve => require(['pages/noticeList/index'], resolve),
      children: [{
        path: '',
        component: resolve => require(['pages/noticeList/children/noticeList'], resolve),
      }, {
        path: 'noticeListDetail/:id',
        name: 'noticeDetail',
        component: resolve => require(['pages/noticeList/children/noticeDetail'], resolve),
      }, ]
    }
  ]
})
