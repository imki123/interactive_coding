import Egg from './Egg.js'
import EggFace from './EggFace.js'
import Mouse from './Mouse.js'
import Sauce from './Sauce.js'

class App {
  constructor() {
    //캔버스 생성
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1
    document.body.appendChild(this.canvas)

    //리사이즈 이벤트 등록
    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()

    window.requestAnimationFrame(this.animate.bind(this))

    //소스 정보 저장
    this.sauce = 'none'
    this.print = []

    //마우스 인스턴스 생성
    this.mouse = new Mouse(3, this) //radius, app
  }

  resize() {
    console.log('resize')
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight

    //캔버스 픽셀을 더 또렷하게
    this.canvas.width = this.stageWidth * this.pixelRatio
    this.canvas.height = this.stageHeight * this.pixelRatio
    this.ctx.scale(this.pixelRatio, this.pixelRatio)

    this.max = Math.max(this.stageWidth, this.stageHeight)
    this.min = Math.min(this.stageWidth, this.stageHeight)

    //에그 인스턴스 생성
    this.egg = new Egg(this) //app

    //에그페이스 인스턴스 생성
    this.eggFace = new EggFace(this) //app

    //화면 크기 이용해서 모양 박스 크기 조절하기
    const minHalf = this.min*0.6
    const $imgs = document.querySelectorAll('.sauces img')
    $imgs[0].parentElement.style.width = minHalf +'px'
    for(let i of $imgs){
      i.style.width = minHalf*0.11 +'px'
      i.style.margin = minHalf*0.01 +'px'
      i.style.padding = minHalf*0.02 +'px'
    }
  }

  animate(t) { //애니메이션
    window.requestAnimationFrame(this.animate.bind(this))

    //프레임 바뀔 때마다 화면 초기화
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    //에그 그리기
    this.egg.draw(this.ctx)

    //소스 그리기
    this.print.forEach(i=>i.draw(this.ctx))

    //에그페이스 그리기
    this.eggFace.draw(this.ctx)

    //마우스 그리기
    this.mouse.draw(this.ctx) 
  }
} // App end

window.onload = () => {
  const app = new App()

  //img 클릭시 소스 선택하기. 이벤트 무시하기. 
  const $imgs = document.querySelectorAll('img')
  for(let i of $imgs){
    i.onmousedown = e => e.stopPropagation()
    i.onmouseup = e => e.stopPropagation()
    i.ontouchstart = e => e.stopPropagation()
    i.ontouchend = e => e.stopPropagation()
    i.onclick = e => {
      e.stopPropagation()
      app.sauce = i.alt
      app.egg.feel = i.name //none, like, dislike
      console.log(app.sauce, app.egg.feel)
    }
  }
}

export function rand(min, max){
  return Math.floor(Math.random()*(max -min +1)) +min
}