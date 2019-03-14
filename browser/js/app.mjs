import Component from './templates/component.mjs'
import Header from './templates/components/header.mjs'
import Footer from './templates/components/footer.mjs'
import Overview from './templates/pages/overview.mjs'

class App extends Component {
  constructor(props) {
    super(props)
  }
  build() {
    const v = this.domHandler.virtualize
    return v('div', {'class': 'app'},
      v(Header),
      v('div', {'id': 'router-view'}),
      v(Footer)
    )
  }
}

export default App
