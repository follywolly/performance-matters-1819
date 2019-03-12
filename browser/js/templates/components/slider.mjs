import Component from '../component.mjs'

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.loading = true
  }
  loader() {
    const v = this.domHandler.virtualize
    return v('div', {'id': 'slider-holder'},
      v('div', {'class': 'paintingsholder', 'id': 'paintingsholder'},
        v('div', {'class': 'painting-group active'},
          v('div', {'class': 'painting loader'},
            v('div', {'class': 'img'})
          ),
          v('div', {'class': 'painting loader'},
            v('div', {'class': 'img'})
          ),
          v('div', {'class': 'painting loader'},
            v('div', {'class': 'img'})
          )
        )
      )
    )
  }
}

export default Slider
