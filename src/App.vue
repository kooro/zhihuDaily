<template>
  <div style="height:100%;">
    <drawer width="200px;" :show.sync="showLeft" show-mode="push" placement="left" :drawer-style="{'background-color':'#232a30', width: '200px'}">
      <div slot="drawer">
        <!-- 左侧栏 -->
        <left :showLeft.sync="showLeft"></left>
      </div>
      <view-box ref="viewBox" :body-padding-top="showHeadBar ? '46px' : '0'" body-padding-bottom="0">
        <x-header v-if="showHeadBar" slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="leftOptions"
          :title="headBarTitle">
          <span v-if="!leftOptions.showBack" slot="overwrite-left" @click="showLeft=true">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
        </x-header>

        <!-- rourer-view 作为默认插槽内容 -->
        <transition :name="viewTransition">
          <router-view></router-view>
        </transition>

      </view-box>
    </drawer>
  </div>
</template>
<script>
  import Left from "./components/Left.vue";
  import {
    ViewBox,
    XHeader,
    Drawer,
    Group,
    Cell
  } from "vux";
  import {
    mapState,
    mapActions,
    mapMutations
  } from "vuex";
  export default {
    name: "app",
    data() {
      return {
        entryUrl: document.location.href,
        showLeft: false
      };
    },
    components: {
      ViewBox,
      XHeader,
      Drawer,
      Group,
      Cell,
      Left
    },
    methods: {
      ...mapActions(["requestThemeList", "requestLatest"]),
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        headBarTitle: state => state.headBarTitle,
        showHeadBar: state => state.showHeadBar,
        direction: state => state.direction,
      }),
     // xheader 是否显示 返回
      leftOptions() {
        return {
          showBack: this.route.path !== "/" && this.route.name != 'theme'
        };
      }, //根据滑动方向 来决定 header的动画
      viewTransition() {
        if (!this.direction) return ''
        return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
      }
    },
    created() {
      console.log('屏幕宽度' + window.screen.availWidth)
      // 初始化主题列表 主页内容
      this.requestThemeList();
      this.requestLatest();
    }
  };

</script>
<style lang="less">
  @import "~vux/src/styles/reset.less";
  @import "~vux/src/styles/1px.less";
  @import "~vux/src/styles/tap.less";
  body {
    background-color: #fbf9fe;
  } // 重要
  html,
  body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: 46px;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

</style>
 <style>
 @import url('http://news-at.zhihu.com//css/news_qa.auto.css?v=4b3e3');
</style>