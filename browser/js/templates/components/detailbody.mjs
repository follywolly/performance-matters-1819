import Component from '../component.mjs'

class DetailBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      data: {}
    }
    this.loading = true
  }
  build() {
    const v = this.domHandler.virtualize
    const painting = this.state.data
    if (!painting) {
      return v('div', {'class': 'painting-body'})
    }

    return v('div', {'class': 'painting-body'},
      v('figure', {},
        v('img', {'src': painting.src, 'alt': `${painting.longTitle} - Rijksmuseum Collection`}),
        v('figcaption', {}, `${painting.longTitle} - Rijksmuseum Collection`)
      ),
      v('h3', {}, painting.title),
      v('p', {}, painting.makerLine),
      v('p', {}, painting.description),
      v('p', {}, painting.maker),
      v('div', {'class': 'color-blocks-holder'},
        ...painting.colors.map(color =>
          v('div', {'class': 'color-block', 'style': `background-color: ${color}`}, color)
        )
      )
    )
  }
  loader() {
    const v = this.domHandler.virtualize
    return v('div', {'class': 'painting detail loader', 'data-id': this.id},
      v('div', {'class': 'img'}),
      v('div', {'class': 'text'})
    )
  }
}

export default DetailBody