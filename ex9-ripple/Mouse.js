import { rand } from './App.js'
import Ripple from './Ripple.js'

export default class Mouse {
  constructor(radius, app) {
    this.initRadius = radius
    this.radius = radius
    this.x = document.body.clientWidth / 2
    this.y = document.body.clientHeight / 2
    this.power = 0
    this.interval = 0

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
    //클릭 시작하면 물결, 파워 증가
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.power += 0.5
      this.radius = this.power
    })
  }
  handleUp() {
    //클릭 때면 물결 생성
    if (this.power <= 0.5) {
      //터치의 경우 한번 더 실행되는 에러 처리
      clearInterval(this.interval)
      this.power = 0
      this.radius = this.initRadius
      return
    }

    //물결 생성
    console.log(this.power)
    this.app.ripples.push(new Ripple(this, this.app)) 
    if (this.app.ripples.length > 100) {
      //100개 까지 물결 저장
      this.app.ripples.shift()
    }
    clearInterval(this.interval)
    this.power = 0
    this.radius = this.initRadius
  }

  draw(ctx) {
    //터치 동그라미
    ctx.strokeStyle = `rgba(255,255,255,0.9)`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.lineWidth = 2
    ctx.stroke()
  }
}
