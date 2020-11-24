import { rand } from './App.js'
import Ripple from './Ripple.js'

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
    //터치 시작하면 인터벌 생성, CLICK 안보이게 하기
    document.querySelector('.info').style.display = 'none'
    clearInterval(this.interval)
    this.interval = Date.now()
  }
  handleUp() {
    //터치 때면 물결, 파워 생성
    this.power = (Date.now() - this.interval)/20
    if (this.power <= 1/20 || this.interval === Infinity) {
      //터치 간격이 매우 작거나, 한번 더 실행되는 에러 처리
      this.power = 0
      this.interval = Infinity
      this.radius = this.initRadius
      return
    }

    //물결 생성
    //console.log(this.power)
    this.app.ripples.push(new Ripple(this, this.app)) 
    if (this.app.ripples.length > 70) {
      //70개 까지 물결 저장
      this.app.ripples.shift()
    }
    this.power = 0
    this.interval = Infinity
    this.radius = this.initRadius
  }

  draw(ctx) {
    //터치 시 파워 크기 보여주는 동그라미
    if(this.interval === Infinity){ //터치 에러 처리
      this.radius = this.initRadius
    }else{ //파워 동그라미 키우기
      this.radius = (Date.now() - this.interval)/5
    }

    ctx.strokeStyle = `rgba(255,255,255,0.9)`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.lineWidth = 2
    ctx.stroke()
  }
}
