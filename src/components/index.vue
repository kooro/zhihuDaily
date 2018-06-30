<template>
  <div class="index-content">
    <scroller lock-x scrollbar-y use-pullup  use-pulldown @on-pulldown-loading="frshToday" height="-60" @on-pullup-loading="getBeforeDay" ref="mainScroller" :pullup-config="{upContent:'上拉加载更多', downContent: '释放后加载',loadingContent:'正在努力加载...'}" :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新' ,loadingContent:'正在努力加载...'}">
      <div>
        <swiper :list="slideList" :auto="true" :loop="true" :interval="2500" dots-position="right"></swiper>
        <group v-if="HomeList.length>0" v-for="(day,dayindex) in HomeList" :key="dayindex">
          <div class="news-date">{{day.dateStr}}</div>
          <cell v-for="(item,index) in day.stories" :key="index" :title="item.title" :link="'/story/'+item.id">
            <img :src="item.images[0]" style="width:3rem;height:3rem;" />
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
  import {
    Group,
    Cell,
    Swiper,
    Scroller
  } from 'vux'
  import {
    mapState,
    mapActions,
  } from 'vuex'
  import {
    log
  } from 'util';
  import {
    homedir
  } from 'os';

  export default {
    name: 'index',
    data() {
      return {
      }
    },
    methods: {
      ...mapActions(['requestBefore', 'requestLatest']),
      getBeforeDay() {
        console.log('getBeforeDay')
        var date = this.HomeList[this.HomeList.length - 1].date.format("YYYYMMDD")
        console.log(date)
        this.requestBefore(date).then().then(() => {
          this.$refs.mainScroller.donePullup()
          console.log('loading end0')
        })
        console.log('loading end1')
      },
      frshToday() {
        console.log('frshToday')
        this.requestLatest().then(()=>{
           this.$nextTick(()=>{
           this.$refs.mainScroller.donePulldown()
         })
        })
      }
    },
    computed: {
      ...mapState({
        HomeList: state => state.HomeList,
        slideList: state => state.slideList,
      }),
    },
    components: {
      Group,
      Cell,
      Swiper,
      Scroller
    },
    mounted() {


      // console.log(day.locale('zh-cn').format())
    },
    filters: {

    }
  }

</script>

<style>
  .index-content .vux-swiper-desc {
    margin: 0 !important;
  }

  .news-date {
    background-color: #028fd6;
    width: 100%;
    height: 40px;
    color: white;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }

</style>
