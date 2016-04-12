import Router from 'vue-router'
import Vue from 'vue'
import App from './components/App.vue'
import CollectionPanel from './components/CollectionPanel.vue'
import ActionPanel from './components/ActionPanel.vue'

Vue.use(Router)

// routing
var router = new Router()

// default route to collections panel
router.redirect({
  '*': '/collections'
})

router.map({
  // things collection panel
  '/collections': {
    component: CollectionPanel
  },
  // todo action panel
  '/actions': {
    component: ActionPanel
  }
})

router.start(App, '#app')
