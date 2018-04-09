<template>
  <div>
    <div class="play-choice animated shake">
      <div class="play-list">
        <div v-for="(item,index) in play.playList" :key="index" :class="{playActivity:item.id==playTitle}" @click="selectPlayTitle(item.id)">{{item.name}}</div>
      </div>
      <div class="method-list" v-for="(item,index) in play.methodList" :key="index" v-show="item[0].ids==playTitle">
        <div class="method-row" v-for="(item,index) in item" :key="index">
          <div class="group-label">{{item.ruleName}}</div>
          <div class="radio-group" v-for="(item,index) in item.subName" :key="index" @click="selectPlaylist(item.id)" :class="{'check':item.id==ischeckedPlayList,'uncheck':item.id!=ischeckedPlayList}">
            <!--<i class="iconfont " :class="{'icon-radio_check':item.id==ischeckedPlayList,'icon-radio_uncheck':item.id!=ischeckedPlayList}"></i>-->
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
export default {
  props: {
    play: {
      type: Object,
      default: () => {}
    },
    firstDefault: Number,
    secondDefault: Number
  },
  data() {
    return {
      playTitle: null, //决定一级玩法
      ischeckedPlayList: null //决定三级玩法
    }
  },
  watch: {
    ischeckedPlayList() {
      this.$store.commit('changePlayCode', { a: this.ischeckedPlayList })
    },
    secondDefault(val) {
      this.playTitle = this.firstDefault
      this.ischeckedPlayList = this.secondDefault
    }
  },
  methods: {
    selectPlayTitle(a) {
      this.playTitle = a
      let obj = this.play.methodList.filter(item => {
        return item[0].ids === a
      })[0]
      let b = obj[0].subName[0].id
      this.ischeckedPlayList = b
    },
    selectPlaylist(a) {
      this.ischeckedPlayList = a
    }
  }
}
</script>
<style scoped>
.check {
  color: #ff632c;
  font-size: 20px;
  border: 1px solid #ff632c;
  border-radius: 3px;
}

.uncheck {
  color: #ccc;
  font-size: 20px;
}
</style>
