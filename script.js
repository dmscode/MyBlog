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

// Callouts
window.addEventListener('load', ()=>{
  document.body.querySelectorAll('article .callout.is-collapsible').forEach((el)=>{
    el.addEventListener('click', ()=>{
      el.classList.toggle('is-collapsed')
    })
  })
})