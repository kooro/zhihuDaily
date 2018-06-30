<template>
  <div class="story-detail">
    <!-- <img v-if="tempDetails.section.thumbnail" style="width: 100%;" :src="tempDetails.section.thumbnail" :onerror="'this.onerror=null;this.src=\''+require('@/assets/notFound.jpg')+'\''"
    /> -->
    <div v-html="tempDetails.body"></div>
  </div>
</template>
<script>
  import {
    mapState,
    mapActions,
    mapMutations
  } from 'vuex'
  import {
    XImg,
  } from 'vux'
  export default {
    methods: {
      ...mapActions([
        'requestDetails',
      ]),
      ...mapMutations([
        'setShowHeadBar',
        'setHeadBarTitle',
        'updateDirection'
      ]),
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        showHeadBar: state => state.showHeadBar,
        tempDetails: state => state.tempDetails,
      }),
    },
    created() {
      // var storyid = this.route.params.id
      // this.requestDetails(storyid)
      // console.log(this.tempDetails)
    },
    components: {
      XImg
    },
    watch: {
    }
  }

</script>

<style>
  .img-wrap {
    position: relative;
    /* max-height: 375px; */
    /* overflow: hidden; */
  }

  /* .img-wrap img {
    width: 100%;
    display: block;
    margin: 0 auto;
  } */

  .img-wrap .headline-title {
    margin: 20px 0;
    bottom: 10px;
    z-index: 1;
    position: absolute;
    color: white;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  }

  .img-wrap .img-source {
    position: absolute;
    bottom: 10px;
    z-index: 1;
    font-size: 12px;
    color: rgba(255, 255, 255, .6);
    right: 40px;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, .3);
  }

</style>
