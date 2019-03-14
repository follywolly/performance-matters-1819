import DOM from './dom.mjs'
import ErrorTemp from '../templates/pages/error.mjs'
import App from '../app.mjs'

class Render {
  constructor(){
    this.dom = new DOM()
    this.errorTemp = new ErrorTemp()

    this.app = {
      el: document.querySelector('#root'),
      temp: new App()
    }

    // this.dom.update(
    //   this.app.temp
    // )

    this.container = document.querySelector('#router-view') // init router-view element
  }
  clean() {
    this.container.innerHTML = ''
  }
  error(code, msg) {
    this.clean()
    this.container.appendChild(
      this.dom.create(
        this.errorTemp.build(code, msg)
      )
    )
  }
  async template(config) {
    this.clean()
    this.container.appendChild( // render templates in router-view element
      this.dom.create(
        config.temp.preBuild()
      )
    )
    config.temp.mounted()
    if (config.callback){
      if (config.callback.length) {
        // array of functions passed in
        config.callback.forEach(cb => cb())
      } else {
        // function
        config.callback()
      }
    }
  }
}

export default Render
