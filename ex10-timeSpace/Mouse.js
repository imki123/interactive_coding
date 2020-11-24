import { rand } from './App.js'

export default class Mouse {
  constructor(radius, app) {
    this.initRadius = radius
    this.radius = radius
    this.power = 0
    this.interval = Infinity

    this.app = app
    this.color = app.color

    document.body.addEventListener('mousedown', (e) => {
      this.handleMouse(e)
      this.handleDown()
    })
    document.body.addEventListener('mousemove', (e) => this.handleMouse(e))
    document.body.addEventListener('mouseup', (e) => {
      this.handleMouse(e)
      this.handleUp()
    })
    document.body.addEventListener('touchstart', (e) => {
      this.handleTouch(e)
      this.handleDown()
    })
    document.body.addEventListener('touchmove', (e) => this.handleTouch(e))
    document.body.addEventListener('touchend', (e) => {
      this.handleTouch(e)
      this.handleUp()
    })
  }

  handleMouse(e) {
    this.x = e.clientX
    this.y = e.clientY
  }
  handleTouch(e) {
    this.x = e.changedTouches[0].clientX
    this.y = e.changedTouches[0].clientY
  }

  handleDown() {
    //터치 시작하면 인터벌 체크 시작
    clearInterval(this.interval)
    this.interval = Date.now()
  }
  handleUp() {
    //터치 때면 인터벌 체크 끝
    this.gap = Date.now() - this.interval
    if (this.gap <= 1) {
      //터치 간격이 매우 작거나, 한번 더 실행되는 에러 처리
      return
    }
  }

  draw(ctx) {
    ctx.strokeStyle = `rgba(255,255,255,0.9)`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.lineWidth = 2
    ctx.stroke()
  }
}
