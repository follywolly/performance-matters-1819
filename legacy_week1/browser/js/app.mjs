import Component from './templates/component.mjs'
import Header from './templates/components/header.mjs'
import Footer from './templates/components/footer.mjs'

class App extends Component {
  constructor(props) {
    super(props)
  }
  build() {
    const v = this.domHandler.virtualize
    return v('div', {'class': 'app'},
      v(Header),
      v('div', {'id': 'router-view'}), // every route renders in router-view element
      v(Footer)
    )
  }
}

export default App
