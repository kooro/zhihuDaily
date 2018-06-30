<template>
  <div>
    <group v-if="tempThemeContent.stories">
      <cell v-for="(item,index) in tempThemeContent.stories" :key="index" :title="item.title" :link="'/story/'+item.id">
        <img v-if="item.images&&item.images.length>0" :src="item.images[0]" style="width:3rem;height:3rem;" />
      </cell>
    </group>
  </div>
</template>

<script>
  import {
    Group,
    Cell,
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
      ]),
      ...mapMutations([
        'setShowHeadBar',
        'setHeadBarTitle',
        'updateDirection'
      ])
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
      if(this.tempThemeContent){
        var themeid = this.route.params.id
        this.requestThemeHome(themeid)
      }
    },
    mounted(){
        console.log(this.tempThemeContent)
    },
    components: {
      Group,
      Cell,
    }
  }

</script>

<style>


</style>
