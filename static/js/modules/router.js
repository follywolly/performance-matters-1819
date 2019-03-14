import Render from './render.js'

class Router {
  constructor(routes = []){
    this.routes = routes
    this.render = new Render()

    if (!window.location.hash) {
      this.navigate('#'+window.location.pathname)
    } else {
      this.navigate(window.location.hash)
    }

    window.addEventListener('hashchange', () => {
      this.navigate(this.hash())
    })
  }
  hash() {
    return window.location.hash
  }

  add(route) {
    if (route.length) {
      route.forEach(route => this.routes.push(route))
    } else {
      this.routes.push(route)
    }
  }

  get(hash) {
    const params = hash.split('/')
    let route, param

    if (params.length > 2 && params[2] !== '') {
      // kind of crude check for detail page url
      route = this.routes.find(route => route.href.indexOf(params[1]) > -1)
      param = params[2]
    } else {
      route = this.routes.find(route => route.href === hash.split('#')[1])
      param = null
    }

    return {route, param}
  }

  navigate(hash = this.hash()) {
    const req = this.get(hash)

    if (!req.route) {
      return this.render.error('404', 'Page not found')
    }
    if (req.param !== null && req.param.indexOf('-') === -1) {
      return this.render.error('401', 'Check if painting ID is valid. All ID\'s consist of letters, numbers and hyphens.')
    }
    return this.render.template({ // if route is found, render correct component
      temp: req.route.temp(req.param),
      callback: req.route.callback
    })
  }
}

export default Router
