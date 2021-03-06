// We only need to import the modules necessary for initial render
import Actions from './Actions'
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import inbox from './Inbox'
import Login from './Login'
import logout from './Logout'
import Projects from './Projects'
import Tags from './Tags'

/*
 * 使用Plain Routes配置react-router.
 * 参考：https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md#configuration-with-plain-routes
 */
export const createRoutes = (store) => ([
  {
    path: '/',
    component: CoreLayout,
    indexRoute: inbox(store),
    childRoutes: [
      Actions,
      logout,
      Projects,
      Tags
    ]
  },
  Login
])

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
