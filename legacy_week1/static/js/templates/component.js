import DOM from '../modules/dom.js'
import Helper from '../modules/helper.js'
// import store from '../store.js'

class Component {
  constructor(props){
    this.domHandler = new DOM()
    this.helper = new Helper()
    this.store = window.store
    this.props = props
    this.state = {}
    // this.id = this.store.unId
    // this.store.commit('updateID') // increment unique id for every instance of components
    this.isLoading = false // default no loading state
  }
  watchers() {
    return undefined
  }
  update() {
    // makes sure update of the component happens after all queued functions in the callstack to make sure its designated parent exists
    setTimeout(() => this.domHandler.update(this), 0)
  }
  setState(state) {
    this.state = Object.assign({}, this.state, state)
    this.update() // update the component when state changes
  }
  loading(bool){
    this.isLoading = bool
    if (bool === true) {
      this.update()
    }
  }
  serverData() {
    return new Promise(resolve => resolve(undefined))
  }
  preBuild(data = undefined) {
    let node
    if (!data) {
      if (this.isLoading) {
        node = this.loader() // loading state
      } else {
        node = this.build() // default state
      }
    } else {
      this.state = Object.assign({}, this.state, {data})
      node = this.build() // default state
    }
    node.props['data-id'] = this.constructor.name // keep track of unique id per component on html elements

    return node
  }
  mounted() {
    return undefined
  }
  loader() {
    const v = this.domHandler.virtualize // shorthand for the DOM virtualize method
    return v('div', {'class': 'holder loading'},
      v('p', {}, 'Loading...')
    )
  }
  build() {
    return undefined
  }
}
export default Component
