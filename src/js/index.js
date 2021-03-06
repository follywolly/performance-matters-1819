console.log('connected');

const slider = () => {
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

const search = () => {
  const input = document.querySelector('#search-input')
  if (!input) return
  input.addEventListener('input', () => {
      const paintings = window.$store.paintings
      const query = input.value
      const filtered = paintings.filter(painting =>
        painting.title.toLowerCase().indexOf(query) > -1 ||
        painting.maker.toLowerCase().indexOf(query) > -1
      )
      window.$store.filtered = filtered
  })
}

slider()
search()
