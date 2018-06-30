<template>
  <div>
    <scroller lock-x scrollbar-y use-pullup height="-60" @on-pullup-loading="getBeforeDay" ref="mainScroller" :pullup-config="{upContent:'上拉加载更多', downContent: '释放后加载',loadingContent:'正在努力加载...'}" 
      :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新' ,loadingContent:'正在努力加载...'}">
      <div>
        <group v-if="tempThemeContent.stories">
          <cell v-for="(item,index) in tempThemeContent.stories" :key="index" :title="item.title" :link="'/story/'+item.id">
            <img v-if="item.images&&item.images.length>0" :src="item.images[0]" style="width:3rem;height:3rem;" />
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
    Scroller
  } from 'vux'
  import {
    mapState,
    mapActions,
    mapMutations
  } from 'vuex'
  export default {
    methods: {
      ...mapActions([
        'requestThemeHome',
        'requestThemeHomeBefore'
      ]),
      ...mapMutations([
        'setShowHeadBar',
        'setHeadBarTitle',
        'updateDirection'
      ]),
      getBeforeDay() {
        console.log('getBeforeTheme ' + this.route.params.id)
        this.requestThemeHomeBefore(this.route.params.id).then(() => {
          this.$refs.mainScroller.donePullup()
          console.log('loading end0')
        })
        console.log('loading end1')
      },
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        showHeadBar: state => state.showHeadBar,
        tempThemeContent: state => state.tempThemeContent,
      }),
    },
    created() {
      if (this.tempThemeContent) {
        var themeid = this.route.params.id
        this.requestThemeHome(themeid)
      }
    },
    mounted() {},
    components: {
      Group,
      Cell,
      Scroller
    },
    watch: {
      route: function (to, from) {
        this.$nextTick(() => {
          this.$refs.mainScroller.reset({
            top: 0
          })
        })
      }
    }
  }

</script>

<style>


</style>
