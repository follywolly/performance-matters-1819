import Component from '../component.mjs'
import LangSwitcher from './atoms/langswitcher.mjs'

class Header extends Component {
  constructor(props) {
    super(props)
  }
  build() {
    const v = this.domHandler.virtualize
    return v('header', {},
      v('h1', {}, 'Artpieces from the Rijksmuseum'),
      v('div', {}, v(LangSwitcher))
    )
  }
}

export default Header
