import Component from '../component.mjs'

class Search extends Component {
  constructor() {
    super()
  }
  build() {
    const v = this.domHandler.virtualize
    return v('form', {'class': 'search-holder', 'id': 'search-form'},
      v('label', {'for': 'search-input', 'class': 'hide'}, 'Search painting'),
      v('input', {'type': 'text', 'id': 'search-input', 'placeholder': 'Search painting...', 'value': this.store.getState('query')})
    )
  }
  mounted() {
    this.search()
    document.querySelector('#search-form').addEventListener('submit', (e) => e.preventDefault())
  }
  onSSR() {
    return this.search
  }
  search(){
    const input = document.querySelector('#search-input')
    console.log('search() from server')
    input.addEventListener('input', () => {
      this.store.setState({query: input.value.toLowerCase()})
    })
  }


}

export default Search
