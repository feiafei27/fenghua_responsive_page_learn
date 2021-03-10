require('./iconfont.css')
require('./libs/glide/glide.core.min.css')
require('./libs/glide/glide.theme.min.css')
require('./style.scss')

const Glide = require('./libs/glide/glide.min')
const anime = require('./libs/anime/anime.min')
const Isotope = require('./libs/isotope/isotope.pkgd.min')
const ScrollReveal = require('./libs/scrollReveal/scrollreveal.min')
const SmoothScroll = require('./libs/smooth-scroll/smooth-scroll.polyfills.min')


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

// 固定导航以及返回顶部
const headerEl = document.querySelector("header")
const scrollToTop = document.querySelector(".scrollToTop")
window.addEventListener("scroll", () => {
  let height = headerEl.getBoundingClientRect().height
  if(window.pageYOffset - height > 800){
    if(!headerEl.classList.contains("sticky")){
      headerEl.classList.add("sticky")
    }
  }else{
    headerEl.classList.remove("sticky")
  }

  if(window.pageYOffset > 2000){
    scrollToTop.style.display = "block"
  }else{
    scrollToTop.style.display = "none"
  }
})

// 元素动态出现效果
const staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "bottom"
}

ScrollReveal().reveal(".feature", {...staggeringOption, interval: 350})
ScrollReveal().reveal(".service-item", {...staggeringOption, interval: 350})

const dataSectionEl = document.querySelector(".data-section")
ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    anime({
      targets: ".data-piece .num",
      innerHTML: el => {
        return [0, el.innerHTML]
      },
      duration: 2000,
      round: 1,
      easing: "easeInExpo"
    })
    dataSectionEl.style.backgroundPosition =
      `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`
  }
})

//数据部分 背景的处理
window.addEventListener("scroll", () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom
  const top = dataSectionEl.getBoundingClientRect().top

  if(bottom >= 0 && top <= window.innerHeight){
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`
  }
})

// 动态滚动效果
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
  header: "header",
  offset:80
})

// 探索更多按钮点击滚动的效果
const exploreBtnEls = document.querySelectorAll(".explore-btn")
exploreBtnEls.forEach(exploreBtnEl => {
  exploreBtnEl.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector("#about-us"))
  })
})
















