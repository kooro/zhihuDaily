<template>
  <div id="left-component">
    <!-- 投向区域 -->
    <a class="userinfo" href="/userinfo">
      <div class="userinfo-icon" :style="{backgroundImage:'url(' + userinfo.icon + ')'}">
        <span class="userinfo-name">{{userinfo.name}}</span>
      </div>
    </a>
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item v-for="(item,index) in userOperation" :key="index" :link="item.href" :label="item.title">
        <img slot="icon" :src="item.icon">
      </grid-item>
    </grid>
    <scroller lock-x scrollbar-y height="-182">
      <div class="box1">
        <cell style="color:#94999d;font-size:12px;" title="首页" link="/" @click.native="leave('首页')">
          <img slot="icon" width="20" :src="require('@/assets/icon/operate-home.svg')" style="margin-right:1rem;" />
        </cell>
        <cell style="color:#94999d;font-size:12px;" v-for="(item,index) in themeList" :title="item.name" :link="'/theme/'+item.id"
          :key="index" @click.native="leave(item.name,item.id)">
        </cell>
      </div>
    </scroller>
  </div>
</template>
<script>
  import {
    Group,
    Cell,
    Grid,
    GridItem,
    Scroller
  } from "vux";
  import {
    mapState,
    mapMutations,
    mapActions
  } from "vuex";
  export default {
    name: "left",
    props: ["showLeft"],
    data() {
      return {
        userinfo: {
          icon: require("@/assets/headicon.jpg"),
          name: "三克油",
          Collection: [],
          message: []
        },
        userOperation: [{
            title: "收藏",
            href: "/",
            icon: require("@/assets/icon/operate-store.svg")
          },
          {
            title: "消息",
            href: "/",
            icon: require("@/assets/icon/operate-message.svg")
          },
          {
            title: "收藏",
            href: "/",
            icon: require("@/assets/icon/operate-setting.svg")
          }
        ]
      };
    },
    methods: {
      ...mapMutations(["setHeadBarTitle"]),
      ...mapActions(['requestThemeHome']),
      leave(themeName, themeid) {
        this.setHeadBarTitle(themeName);
        if (themeid) {
          this.requestThemeHome(themeid).then(this.$emit("update:showLeft", false))
        } else {
          this.$emit("update:showLeft", false);
        }
      }
    },
    computed: {
      ...mapState({
        themeList: state => state.themeList
      })
    },
    components: {
      Group,
      Cell,
      Grid,
      GridItem,
      Scroller
    }
  };

</script>
<style lang="less">
  .userinfo {
    display: block;
    height: 4.5rem;
    padding: 1rem;
    box-sizing: border-box;
    .userinfo-icon {
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
      background-size: cover;
    }
    .userinfo-name {
      line-height: 3rem;
      margin-left: 4rem;
      position: absolute;
      color: #93989c;
    }
  }

  #left-component {
    .weui-cell p {
      margin: 0 !important;
    }
    .weui-grid__label span {
      color: #94999d;
    }
    .weui-grid:after {
      border-bottom: none;
    }
    .weui-cell:before {
      border-top: none;
    }
    .weui-cell:active {
      background-color: #1b2329;
      color: white !important;
    }
    .weui-grids:before {
      border-top: none;
    }
    .weui-grids {
      height: 110px;
    }
    .weui-grid:active {
      background-color: #1b2329;
    }
    .weui-grid:active .weui-grid__label span {
      color: white;
    }
  }

</style>
