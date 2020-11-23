import Block from './Block.js'
import Ball from './Ball.js'

class App {
  constructor() {
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1
    document.body.appendChild(this.canvas)
    

    window.addEventListener("resize", this.resize.bind(this), false)
    this.resize()

    this.block = new Block(document.body.clientWidth*0.6, document.body.clientHeight*0.1, 200, document.body.clientHeight*0.4)

    const $ballNumInput = document.querySelector('.ballNumInput')
    $ballNumInput.addEventListener('keyup', ()=>{
      this.setBallNum($ballNumInput.value)  
    })
    this.setBallNum(Math.random()*30+1)
        

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

  setBallNum(num){
    num = parseInt(num)
    if(num === undefined || isNaN(num) || num === '' || num <= 1){
      num = 1
    }else if(num > 30){
      num = 30
    }

    const $ballNum = document.querySelector('.ballNum')
    if(this.ballNum !== num){
      this.ballNum = num
      this.balls = []
      if($ballNum) $ballNum.innerHTML = num
      for(let i=0; i<this.ballNum; i++){
        let ballSize = Math.random()*60 +10
        this.balls[i] = new Ball(this.stageWidth, this.stageHeight, ballSize, 140/ballSize, this.block)
      }
      console.log(this.balls)
    }
  }
} // App end

window.onload = () => {
  new App()
}