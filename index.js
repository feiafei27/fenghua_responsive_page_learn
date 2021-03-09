require('./iconfont.css')
require('./libs/glide/glide.core.min.css')
require('./libs/glide/glide.theme.min.css')
require('./style.scss')

const Glide = require('./libs/glide/glide.min')
const anime = require('./libs/anime/anime.min')
const Isotope = require('./libs/isotope/isotope.pkgd.min')




// 轮播图
const glide = new Glide(".glide")
const captionsEl = document.querySelectorAll(".slide-caption")

glide.on(["mount.after", "run.after"], () => {
  const caption = captionsEl[glide.index]
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "linear",
    delay: anime.stagger(400, {start: 300}),
    translateY: [anime.stagger([40, 10]), 0]
  })
})

glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach(el => {
    el.style.opacity = 0
  })
})

glide.mount()

// 成功案例
console.log(Isotope)
const isotope = new Isotope(".cases", {
  layoutMode: "fitRows",
  itemSelector: ".case-item"
})

const filterBtns = document.querySelector(".filter-btns")
filterBtns.addEventListener("click", e => {
  let { target } = e
  const filterOption = target.getAttribute("data-filter")
  if(filterOption){
    document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"))
    target.classList.add("active")

    isotope.arrange({filter: filterOption})
  }
})























