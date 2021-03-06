import Component from '../component.mjs'

class ErrorTemp extends Component {
  constructor() {
    super()
  }
  build(code, msg) {
    const v = this.domHandler.virtualize
    return v('div', {'class': 'holder error'},
      v('h1', {}, code),
      v('p', {}, msg),
      v('a', {'class': 'btn', 'href': '#/'}, 'Return home')
    )
  }
}

export default ErrorTemp
