import Component from '../component.mjs'
import DetailBody from '../components/detailbody.mjs'

class Detail extends Component {
  constructor(props) {
    super(props)
  }
  build() {
    const v = this.domHandler.virtualize
    return v('div', {'class': 'holder'},
      v('div', {'class': 'painting detail'},
        v('a', {'href': '/#/', 'class': 'btn'}, 'Return'),
        v('div', {},
          v(DetailBody, {id: this.props.id})
        )
      )
    )
  }
}

export default Detail
