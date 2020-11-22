import Mouse from './Mouse.js'
import Rain from './Rain.js'

class App {
  constructor() {
    //캔버스 생성
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    document.body.appendChild(this.canvas)

    //리사이즈 이벤트 등록
    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()

    //마우스 인스턴스 생성
    this.mouse = new Mouse(60)

    //빗방울 인스턴스 생성
    this.rains = []
    this.rainsNum = 60 //빗방울 개수
    for(let i=0; i<this.rainsNum; i++){
      this.rains[i] = new Rain(Math.random()*document.body.clientWidth, 100*i, this.mouse)
    }


    window.requestAnimationFrame(this.animate.bind(this))
  }

  resize() {
    this.canvas.width = document.body.clientWidth
    this.canvas.height = document.body.clientHeight
  }

  animate(t) { //애니메이션
    window.requestAnimationFrame(this.animate.bind(this))

    //프레임 바뀔 때마다 화면 초기화
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    //마우스 그리기
    this.mouse.draw(this.ctx) 

    //빗방울 그리기
    this.rains.forEach(i=>i.draw(this.ctx, this.canvas.width, this.canvas.height))

  }
} // App end

window.onload = () => {
  new App()
}
