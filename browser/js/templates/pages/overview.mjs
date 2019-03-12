import Component from '../component.mjs'
import Search from '../components/search.mjs'
import Slider from '../components/slider.mjs'

class Overview extends Component {
  constructor() {
    super()
  }
  build() {
    const v = this.domHandler.virtualize
    return v('div', {'class': 'holder'},
      // v(Search),
      v('div', {},
        v(Slider)
      )
    )
  }
}

export default Overview
