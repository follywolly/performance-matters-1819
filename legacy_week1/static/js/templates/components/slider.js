import Component from '../component.js'
import request from '../../modules/data.js'

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.loading(true)
  }
  mounted() {
    this.store.watch('filtered', (data) => {
      this.setState({data})
    }, this.id)

    this.store.watch('lang', () => {
      this.langChange = true
      this.loading(true)
      this.getData(false)
    }, this.id)

    if (this.state.data.length > 0) {
      this.loading(false)
    }

    if (this.isLoading && !this.langChange) {
      this.getData(true)
    }

    if (!this.isLoading) {
      this.slider()
    }
  }
  async getData(local) {
    const language = this.store.getState('lang')
    try {
      const data = await request('Overview', {'adjacent': '&ps=3', 'lang': language}, local)
      this.store.setState({paintings: data})
      this.loading(false)
      this.store.commit('filter')
      this.langChange = false
    } catch (e) {
      console.error(e)
    }

  }
  build() {
    const v = this.domHandler.virtualize
    const slices = this.helper.chunk(this.state.data, 3)
    if (this.state.data.length === 0) {
      return v('div', {'class': 'center-text'},
        v('p', {}, 'No paintings found with that name or maker'),
        v('button', {'id': 'slider-button'}, 'Next three...')
      )
    }
    return v('div', {'id': 'slider-holder'},
      v('div', {'class': 'paintingsholder', 'id': 'paintingsholder'},
        ...slices.map((slice, i) => {
          return v('div', {'class': i == 0 ? 'painting-group active' : 'painting-group'},
          ...slice.map(painting =>
              v('div', {'class': 'painting'},
                v('a', {'href': `/#/paintings/${painting.number}`},
                  v('figure', {},
                    v('img', {'src': painting.headerSrc}),
                    v('figcaption', {},
                      v('h3', {}, painting.title),
                      v('p', {}, painting.maker)
                    )
                  )
                )
              )
            )
          )
        })
      ),
      v('button', {'id': 'slider-button'}, 'Next three...')
    )
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
  slider() {
    const el = document.querySelector('#slider-button')
    if (!el) return
    el.addEventListener('click', () => {
      const all = document.querySelectorAll('.painting-group')
      const selected = document.querySelector('.painting-group.active')
      const elReset = e => {
        e.target.classList.remove('active-out')
        e.target.removeEventListener('transitionend', elReset)
      }
      all.forEach((element, index) => {
        if (element === selected) {
          selected.classList.remove('active')
          selected.addEventListener('transitionend', elReset)
          selected.classList.add('active-out')
          if (all[index + 1]) {
            all[index + 1].classList.add('active')
          } else {
            all[0].classList.add('active')
          }
        }
      })
    })
  }
}

export default Slider
