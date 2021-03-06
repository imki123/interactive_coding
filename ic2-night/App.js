import Mouse from './Mouse.js'
import Snow from './Snow.js'

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
    this.mouse = new Mouse(60)

    //빗방울 인스턴스 생성
    this.snows = []
    this.snowsNum = 16 //빗방울 개수
    for(let i=0; i<this.snowsNum; i++){
      this.snows[i] = new Snow(30, 500*i, this.mouse) //radius, delay, mouse
    }

    const $buttons = document.querySelectorAll('.buttons button')


    $buttons[0].ontouchstart = e => e.stopPropagation()
    $buttons[0].onclick = this.incRadius
    $buttons[0].ontouchend = this.incRadius
    $buttons[1].ontouchstart = e => e.stopPropagation()
    $buttons[1].onclick = this.decRadius
    $buttons[1].ontouchend = this.decRadius
    

    window.requestAnimationFrame(this.animate.bind(this))
  }

  resize() {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight

    //픽셀을 더 또렷하게
    this.canvas.width = this.stageWidth * this.pixelRatio
    this.canvas.height = this.stageHeight * this.pixelRatio
    this.ctx.scale(this.pixelRatio, this.pixelRatio)
  }

  animate(t) { //애니메이션
    window.requestAnimationFrame(this.animate.bind(this))

    //프레임 바뀔 때마다 화면 초기화
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    //마우스 그리기
    this.mouse.draw(this.ctx) 

    //빗방울 그리기
    this.snows.forEach(i=>i.draw(this.ctx))

  }

  incRadius = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.snows.forEach(i => {
      i.radius += 4
      if(i.radius >= 500){
        i.radius = 500
      }
    })
    this.mouse.x = this.stageWidth/2
    this.mouse.y = this.stageHeight -72
  }
  decRadius = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.snows.forEach(i => {
      i.radius -= 4
      if(i.radius <= 1){
        i.radius = 1
      }
    })
    this.mouse.x = this.stageWidth/2
    this.mouse.y = this.stageHeight -72
  }
} // App end

window.onload = () => {
  new App()
}
