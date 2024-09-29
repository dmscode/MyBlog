// 菜单切换按钮
document.body.querySelector('aside > .toggle').addEventListener('click', ()=>{
  document.body.classList.toggle('show-side')
})
window.addEventListener('resize', ()=>{
  document.body.classList.remove('show-side')
})
// TOC 菜单激活
let nowHash = window.location.hash.replace(/^#/, '')
/** 获取元素的 y 坐标（相对于 HTML 元素）
 *
 * @param {HTMLElement} el
 * @param {number} [Y=0]
 * @return {number} 
 */
const getElPosY = (el, Y=0)=>{
  if(!el || el.tagName==='BODY' || el.tagName==='HTML') return Y
  Y += el.offsetTop
  const pEl = el.offsetParent
  if(!pEl || pEl.tagName==='BODY' || pEl.tagName==='HTML') return Y
  return getElPosY(pEl, Y)
}
/** 设定当前激活菜单
 *
 *
 * @param {string} hash 要设定的 hash
 * @param {boolean} [force=false] 是否强制设置（不对比当前 hash值）
 */
const setTocActive = (hash, force=false)=>{
  if(!force && hash === nowHash) return
  document.body.querySelectorAll('aside .toc li').forEach((el)=>{
    if(el.dataset.hash === hash){
      el.classList.add('active')
      return
    }
    el.classList.remove('active')
  })
}
setTocActive(nowHash, true)
/** 页面滚动，切换菜单按钮显示状态 */
let pageScrollY = window.scrollY
document.addEventListener('scroll', ()=>{
  let nowHeading = ''
  document.body.querySelectorAll('article >section >h1, article >section >h2, article >section >h3, article >section >h4, article >section >h5, article >section >h6').forEach((el)=>{
    const posY = getElPosY(el)
    if(posY < window.scrollY+window.innerHeight/2) nowHeading = el.id
  })
  setTocActive(nowHeading)
  /** 页面滚动，切换菜单按钮显示状态 */
  const scrollY = window.scrollY
  if(pageScrollY < scrollY){
    document.body.querySelector('aside > .toggle').style.top = '-110%'
  }
  if(pageScrollY > scrollY){
    document.body.querySelector('aside > .toggle').style.top = '0'
  }
  pageScrollY = scrollY
})
// 咖啡菜单随机渐变
const gradients = [
  'linear-gradient(220.55deg, #A531DC 0%, #4300B1 100%)',
  'linear-gradient(220.55deg, #FF896D 0%, #D02020 100%)',
  'linear-gradient(220.55deg, #3793FF 0%, #0017E4 100%)',
  'linear-gradient(220.55deg, #FFD439 0%, #FF7A00 100%)',
  'linear-gradient(220.55deg, #7CF7FF 0%, #4B73FF 100%)',
  'linear-gradient(220.55deg, #FFED46 0%, #FF7EC7 100%)',
  'linear-gradient(220.55deg, #8FFF85 0%, #39A0FF 100%)',
  'linear-gradient(220.55deg, #8A88FB 0%, #D079EE 100%)',
  'linear-gradient(220.55deg, #EAEAEA 0%, #8B8B8B 100%)',
  'linear-gradient(220.55deg, #FFEB3A 0%, #4DEF8E 100%)',
  'linear-gradient(220.55deg, #565656 0%, #181818 100%)',
  'linear-gradient(220.55deg, #FFBB89 0%, #7B6AE0 100%)',
  'linear-gradient(220.55deg, #FFF500 0%, #FFB800 100%)',
  'linear-gradient(220.55deg, #FFEAF6 0%, #FF9DE4 100%)',
  'linear-gradient(220.55deg, #00B960 0%, #00552C 100%)',
  'linear-gradient(220.55deg, #FFE6A4 0%, #AD8211 100%)',
  'linear-gradient(220.55deg, #C5EDF5 0%, #4A879A 100%)',
  'linear-gradient(220.55deg, #FFF6EB 0%, #DFD1C5 100%)',
  'linear-gradient(220.55deg, #FF9D7E 0%, #4D6AD0 100%)',
  'linear-gradient(220.55deg, #DD7BFF 0%, #FF6C6C 100%)',
  'linear-gradient(220.55deg, #E0FF87 0%, #8FB85B 100%)',
  'linear-gradient(220.55deg, #FFDC99 0%, #FF62C0 100%)',
  'linear-gradient(220.55deg, #DDE4FF 0%, #8DA2EE 100%)',
  'linear-gradient(220.55deg, #97E8B5 0%, #5CB67F 100%)',
  'linear-gradient(220.55deg, #24CFC5 0%, #001C63 100%)',
  'linear-gradient(220.55deg, #FF3F3F 0%, #063CFF 100%)',
  'linear-gradient(220.55deg, #5D85A6 0%, #0E2C5E 100%)',
  'linear-gradient(220.55deg, #DEB5FF 0%, #6F00B3 100%)',
  'linear-gradient(220.55deg, #FF5EEF 0%, #456EFF 100%)',
  'linear-gradient(220.55deg, #AFCCCB 0%, #616566 100%)',
  'linear-gradient(220.55deg, #4063BC 0%, #6B0013 100%)',
  'linear-gradient(220.55deg, #FFF500 0%, #FF00B8 100%)',
  'linear-gradient(220.55deg, #FF5E98 0%, #0F213E 100%)',
  'linear-gradient(220.55deg, #FFC328 0%, #E20000 100%)',
  'linear-gradient(220.55deg, #FFE70B 0%, #27B643 100%)',
  'linear-gradient(220.55deg, #FFADF7 0%, #B1FF96 100%)',
  'linear-gradient(220.55deg, #61C695 0%, #133114 100%)',
  'linear-gradient(220.55deg, #B7DCFF 0%, #FFA4F6 100%)',
  'linear-gradient(220.55deg, #9F25FF 0%, #FF7A00 100%)',
  'linear-gradient(220.55deg, #5EE2FF 0%, #00576A 100%)',
  'linear-gradient(220.55deg, #FF0000 0%, #470000 100%)',
  'linear-gradient(220.55deg, #4643DF 0%, #0B0A47 100%)',
  'linear-gradient(220.55deg, #D7003A 0%, #19087E 100%)',
  'linear-gradient(220.55deg, #FADD76 0%, #9F3311 100%)',
  'linear-gradient(220.55deg, #00E0EE 0%, #AD00FE 100%)',
  'linear-gradient(220.55deg, #D0004B 0%, #88069D 100%)',
  'linear-gradient(220.55deg, #FF8570 0%, #418CB7 100%)',
  'linear-gradient(220.55deg, #B9A14C 0%, #000000 100%)'
]
document.querySelector('#side-menu .coffee').style.backgroundImage = gradients[Math.floor(Math.random()*gradients.length)]

// Callouts
window.addEventListener('load', ()=>{
  // 折叠
  document.body.querySelectorAll('article .callout.is-collapsible > .callout-title').forEach((el)=>{
    el.addEventListener('click', ()=>{
      el.parentElement.classList.toggle('is-collapsed')
    })
  })
  // 复制代码
  document.body.querySelectorAll('pre.hljs-code-block').forEach((el)=>{
    const copybutton = document.createElement('div')
    copybutton.classList.add('copy-code')
    copybutton.innerHTML = '<i class="fas fa-copy"></i>'
    copybutton.addEventListener('click', ()=>{
      navigator.clipboard.writeText(el.innerText)
    })
    el.appendChild(copybutton)
  })
})