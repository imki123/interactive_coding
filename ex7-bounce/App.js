import Block from './Block.js'
import Ball from './Ball.js'
import Mouse from './Mouse.js'

class App {
  constructor() {
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1
    document.body.appendChild(this.canvas)
    
    window.addEventListener("resize", this.resize.bind(this), false)
    this.resize()


    this.block = new Block(document.body.clientWidth*0.6, document.body.clientHeight*0.1, 200, document.body.clientHeight*0.4)
    this.mouse = new Mouse(this)

    //this.setBallNum(Math.random()*30+1)
    let ballSize = rand(10,70)
    this.ballNum = 1
    this.balls = []
    this.balls.push(new Ball(this.stageWidth, this.stageHeight, ballSize, 140/ballSize, this.block))

    //init 버튼 클릭 이벤트 걸어주기
    const $initButton = document.querySelector('#initButton')
    $initButton.onmousedown = e => e.stopPropagation()
    $initButton.onmouseup = e => e.stopPropagation()
    $initButton.onmousemove = e => e.stopPropagation()
    $initButton.ontouchstart = e => e.stopPropagation()
    $initButton.ontouchend = e => e.stopPropagation()
    $initButton.ontouchmove = e => e.stopPropagation()
    $initButton.onclick = (e)=>{
      e.preventDefault()
      e.stopPropagation()
      this.balls = [new Ball(this.stageWidth, this.stageHeight, ballSize, 140/ballSize, this.block)]
      this.ballNum = 1
      document.querySelector('.ballNum').innerHTML = '1'
      document.querySelector('.info').style.display = 'block'
    }

    window.requestAnimationFrame(this.animate.bind(this))
  }

  resize() {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight

    this.canvas.width = this.stageWidth * this.pixelRatio
    this.canvas.height = this.stageHeight * this.pixelRatio
    this.ctx.scale(this.pixelRatio, this.pixelRatio)

    this.block = new Block(document.body.clientWidth*0.6, document.body.clientHeight*0.1, 200, document.body.clientHeight*0.4)
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this))

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    
    this.block.draw(this.ctx)
    this.balls.forEach(i=>{
      i.draw(this.ctx, this.stageWidth, this.stageHeight, this.block)
    })
  }
} // App end

window.onload = () => {
  new App()
}

export function rand(min, max){
  return Math.floor(Math.random()*(max -min +1)) +min
}