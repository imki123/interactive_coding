import { rand } from "./App.js"
import Ball from "./Ball.js"

export default class Mouse {
  constructor(app) {
    this.app = app
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
    this.gap = Date.now() - this.interval
    if (this.gap <= 1) {
      //터치 간격이 매우 작거나, 한번 더 실행되는 에러 처리
      return
    }
    if(this.app.ballNum < 30){
      let ballSize = rand(10,70)
      this.app.balls.push(new Ball(this.app.stageWidth, this.app.stageHeight, ballSize, 140/ballSize, this.app.block, this.x, this.y))
      this.app.ballNum++
      document.querySelector('.ballNum').innerHTML = this.app.ballNum
    }
  }
}
