import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'dayjs'

Vue.use(Vuex)
// const host = 'http://news-at.zhihu.com'
const host = 'http://www.weigram.com:8081'

const themesApi = host + '/api/4/themes'
// latest获取到 今天首页今天 和轮播 {date stories[] top_stories[]}
const latestApi = host + '/api/4/news/latest'

const historyApi = host + '/api/4/news/before/'
const detailsApi = host + '/api/4/news/'

const themesContentApi = host + '/api/4/theme/'

const themesContentBeforeApi = host + '/api/4/theme/themeid/before/storyid'

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 在非生产环境下，使用严格模式
  state: {
    // 数据存储
    themeList: [], // 主题列表
    HomeList: [], // 首页列表
    slideList: [], // 轮播内容
    tempDetails: {}, // 进入详情页的data
    tempThemeContent: {}, // 进入主题后显示的列表
    // 页面使用
    headBarTitle: '首页', // 顶部显示标题
    showHeadBar: true, // 是否显示headbar
    direction: '',
  },
  mutations: {
    setThemeList(state, val) {
      state.themeList = val
    },
    setHomeList(state, val) {
      if (state.HomeList.length == 0) {
        state.HomeList.push(val)
        return;
      } else if (state.HomeList[0].dateStr == val.dateStr) {
        state.HomeList.shift()
        state.HomeList.unshift(val)
        return
      } else {
        for (let i = 1; i < state.HomeList.length; i++) {
          if (state.HomeList[i].dateStr === val.dateStr) return;
        }
        state.HomeList.push(val)
      }
    },
    setSlideList(state, val) {
      state.slideList = val
    },
    setTempDetails(state, val) {
      state.tempDetails = val
    },
    setTempThemeContent(state, val) {
      console.log(val.themeid)
      if (state.tempThemeContent.stories && val.stories && val.themeid == undefined) {
        state.tempThemeContent.stories = state.tempThemeContent.stories.concat(val.stories)
        console.log('theme拼接')
        return
      }
      console.log('theme重新赋值')
      state.tempThemeContent = val
    },
    // 修改显示的标题
    setHeadBarTitle(state, title) {
      state.headBarTitle = title
    },
    // 修改是否显示headbar
    setShowHeadBar(state, val) {
      state.showHeadBar = val
    },
    updateDirection(state, payload) {
      state.direction = payload.direction
    }

  },
  actions: {
    requestThemeList(context) {
      axios.get(themesApi).then(res => {
        context.commit('setThemeList', res.data.others)
      })
    },
    requestLatest: async function (context) {
      await axios.get(latestApi).then(res => {
        var day = moment(res.data.date)
        const week = ['日', '一', '二', '三', '四', '五', '六']
        var dateStr = day.format('MM月DD日 星期') + week[day.day() - 1]
        context.commit('setHomeList', {
          date: day,
          dateStr: dateStr,
          stories: res.data.stories
        })
        if (res.data.top_stories) {
          var sliders = res.data.top_stories.map(u => {
            u.img = u.image // .replace('https', 'http')
            u.fallbackImg = require('@/assets/notFound.jpg')
            u.url = '/story/' + u.id
            return u
          })
          context.commit('setSlideList', sliders)
        }
      })
    },
    requestBefore: async function (context, date) {
      await axios.get(historyApi + date).then(res => {
        var day = moment(res.data.date)
        const week = ['日', '一', '二', '三', '四', '五', '六']
        var dateStr = day.format('MM月DD日 星期') + week[day.day()]
        context.commit('setHomeList', {
          date: day,
          dateStr: dateStr,
          stories: res.data.stories
        })
        console.log('request before end')
      })
    },
    requestDetails: async function (context, newsid) {
      await axios.get(detailsApi + newsid).then(res => {
        var detail = res.data
        if (detail.body && detail.images && detail.images.length > 0) {
          // var cssurl = detail.css[0]
          // cssurl = cssurl.substr(cssurl.indexOf('/css'), cssurl.length)

          // detail.body = '<link href="' + cssurl + '" />' + detail.body
          var imgplace = `<div class="img-wrap">
          <h1 class="headline-title">${detail.title}</h1>
          <span class="img-source" >图片：${detail.image_source}</span>
          <img src="${detail.images[0]}" width='${window.screen.availWidth}px' alt="">
          <div class="img-mask"></div>
          </div>`
          detail.body = detail.body.replace('<div class="img-place-holder"></div>', imgplace)
        }
        context.commit('setTempDetails', detail)
      })
    },
    requestThemeHome: async function (context, themeid) {
      await axios.get(themesContentApi + themeid).then(res => {
        res.data.themeid = themeid
        context.commit('setTempThemeContent', res.data)
      })
    },
    requestThemeHomeBefore: async function (context, themeid) {
      if (context.state.tempThemeContent.stories == undefined || context.state.tempThemeContent.stories.length === 0) {
        return
      }
      let storyid = context.state.tempThemeContent.stories[context.state.tempThemeContent.stories.length - 1].id
      let beforApi = themesContentBeforeApi.replace('themeid', themeid).replace('storyid', storyid)
      console.log(beforApi)
      await axios.get(beforApi).then(res => {
        context.commit('setTempThemeContent', res.data)
      })
    }
  },
  getters: {}
})
