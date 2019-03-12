import DOM from '../modules/dom.mjs'
import Helper from '../modules/helper.mjs'
import store from '../store.mjs'

class Component {
  constructor(props){
    this.domHandler = new DOM()
    this.helper = new Helper()
    this.store = store
    this.props = props
    this.state = {}
    this.id = this.store.unId
    this.store.commit('updateID') // increment unique id for every instance of components
    this.loading = false // default no loading state
  }
  setState(state) {
    this.state = Object.assign({}, this.state, state)
    this.domHandler.update(this) // update the component when state changes
  }
  preBuild() {
    let node
    if (this.loading) {
      node = this.loader() // loading state
    } else {
      node = this.build() // default state
    }
    if (!node.props) {
      node.props = {}
    }
    node.props['data-id'] = this.id // keep track of unique id per component on html elements

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
