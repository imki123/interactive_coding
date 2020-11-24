import Mouse from './Mouse.js'
import Time from './Time.js'

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

    //마우스 인스턴스 생성
    this.mouse = new Mouse(5, this)

    //Time 인스턴스 생성
    this.time = new Time(this.mouse, 50)

    window.requestAnimationFrame(this.animate.bind(this))
  }

  resize() {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight

    //픽셀을 더 또렷하게
    this.canvas.width = this.stageWidth * this.pixelRatio
    this.canvas.height = this.stageHeight * this.pixelRatio
    this.ctx.scale(this.pixelRatio, this.pixelRatio)

    this.max = Math.max(document.body.clientWidth, document.body.clientHeight)
    this.min = Math.min(document.body.clientWidth, document.body.clientHeight)
  }

  animate(t) { //애니메이션
    window.requestAnimationFrame(this.animate.bind(this))

    //프레임 바뀔 때마다 화면 초기화
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    //Time 그리기
    this.time.draw(this.ctx)

    //마우스 그리기
    this.mouse.draw(this.ctx) 
  }
} // App end

window.onload = () => {
  const app = new App()
}

export function rand(min, max){
  return Math.floor(Math.random()*(max -min +1)) +min
}