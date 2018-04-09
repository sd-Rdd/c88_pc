<template>
  <div class="lhc-bet-area">
    <!-- 工具栏开始 -->
    <quickSettingMoney @showQuickMoneySetting="showQuickMoneySetting"></quickSettingMoney>
    <!-- 工具栏结束 -->
    <div class="tabs">
      <div :class="{'tab-selected':currentIndex==index+5}" v-for="(item,index) in sublotteryCode.sixOdds" :key="index" @click="changeIndex(index+5)">
        <label>{{item.name}}</label>
        <span>{{item.odds}}</span>
      </div>
    </div>
    <div>
      <div class="balls-grid">
        <div class="row title">
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%; color: rgb(51, 51, 51);">号码</div>
            <div class="select" style="width: 50%; color: rgb(51, 51, 51);">勾选</div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%; color: rgb(51, 51, 51);">号码</div>
            <div class="select" style="width: 50%; color: rgb(51, 51, 51);">勾选</div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%; color: rgb(51, 51, 51);">号码</div>
            <div class="select" style="width: 50%; color: rgb(51, 51, 51);">勾选</div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%; color: rgb(51, 51, 51);">号码</div>
            <div class="select" style="width: 50%; color: rgb(51, 51, 51);">勾选</div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%; color: rgb(51, 51, 51);">号码</div>
            <div class="select" style="width: 50%; color: rgb(51, 51, 51);">勾选</div>
          </div>
        </div>
        <div class="row">
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">01</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['01']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">11</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['11']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">21</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['21']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">31</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['31']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">41</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['41']"></el-checkbox>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">02</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['02']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">12</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['12']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">22</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['22']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">32</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['32']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">42</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['42']"></el-checkbox>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">03</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['03']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">13</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['13']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">23</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['23']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">33</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['33']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">43</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['43']"></el-checkbox>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">04</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['04']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">14</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['14']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">24</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['24']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">34</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['34']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">44</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['44']"></el-checkbox>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">05</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['05']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">15</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['15']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">25</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['25']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">35</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['35']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">45</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['45']"></el-checkbox>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">06</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['06']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">16</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['16']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">26</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['26']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">36</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['36']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">46</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['46']"></el-checkbox>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">07</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['07']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">17</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['17']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">27</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['27']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">37</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['37']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">47</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['47']"></el-checkbox>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">08</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['08']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">18</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['18']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">28</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['28']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">38</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['38']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">48</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['48']"></el-checkbox>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">09</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['09']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">19</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['19']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">29</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['29']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">39</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['39']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(106, 204, 123); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">49</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['49']"></el-checkbox>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">10</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['10']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(81, 171, 240); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">20</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['20']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">30</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['30']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span style="background-color: rgb(244, 89, 89); font-size: 12px; background-size: 100%; cursor: default; width: 24px; height: 24px; text-align: center; line-height: 24px; color: rgb(255, 255, 255); border: none; border-radius: 50%;">40</span>
            </div>
            <div class="select" style="width: 50%;">
              <el-checkbox v-model="moreCheck['40']"></el-checkbox>
            </div>
          </div>
          <div class="cell" style="width: 20%;">
            <div class="number" style="width: 50%;">
              <span></span>
            </div>
            <div class="select" style="width: 50%;"></div>
          </div>
        </div>
      </div>
      <!-- 结果开始 -->
      <betResult2 :SumGroup="SumGroup" :LikeSumlist="LikeSumlist" :sublotteryCode="sublotteryCode" :moreCheck="moreCheck" @onClearInputprice="ClearInputprice"></betResult2>
      <!-- 结果结束 -->
    </div>
    <showSettingMoney v-if="quickSettingisShow" @ShowQuickMoneySetting="showQuickMoneySetting"></showSettingMoney>
  </div>
</template>
<script>
import quickSettingMoney from "./quickSettingMoney";
import betResult2 from "./betResult2";
import common from "./common.js";
import tools from "tools/tools.js";
import showSettingMoney from "./showSettingMoney";
export default {
  props: ["sublotteryCode"],
  data() {
    return {
      currentIndex: 5, //当前处于哪个选项卡下
      moreCheck: {}, //记录多选框选中与否数据
      count: null, //用于计算号码组合共多少组
      NumberArr: [], //记录选择了哪些号码
      quickSettingisShow: false //控制快捷金额设置是否显示
    };
  },
  components: {
    quickSettingMoney,
    betResult2,
    showSettingMoney
  },
  computed: {
    SumGroup() {
      return tools.combination(this.currentIndex, this.count);
    },
    LikeSumlist() {
      /* 第一步：将选中的号按规定分解成二维数组 */
      let erweiArr = tools.choose(this.NumberArr, this.currentIndex);
      /* 第二部：组装成列表里显示的数据格式 */
      let LikeSumlist2 = [];
      erweiArr.forEach(item => {
        let obj = {};
        obj.mode = this.sublotteryCode.sixOdds[this.currentIndex-5].name;
        obj.number = item;
        obj.odds = this.sublotteryCode.sixOdds[this.currentIndex-5].odds;
        obj.oddsCodeNo = this.sublotteryCode.sixOdds[this.currentIndex-5].code;
        LikeSumlist2.push(obj);
      });
      /* 第三部：return出去这个数组 */
      return LikeSumlist2;
    },
  },
  methods: {
    showQuickMoneySetting(a) {
      this.quickSettingisShow = a;
    },
    changeIndex(a) {
      this.currentIndex = a;
      this.moreCheck = common.clearInputprice(this.moreCheck);
    },
    GetSumGroup() {
      this.count = 0;
      this.NumberArr = [];
      for (let key in this.moreCheck) {
        if (this.moreCheck[key]) {
          this.count++;
          this.NumberArr.push(key);
        }
      }
    },
    ClearInputprice(val) {
      this.moreCheck = val;
    }
  },
  watch: {
    moreCheck: {
      handler: function(val) {
        this.GetSumGroup();
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>

</style>
