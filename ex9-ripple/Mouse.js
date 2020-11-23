import {rand} from './App.js'

export default class Mouse{
  constructor(radius){
    this.radius = radius
    this.x = document.body.clientWidth/2
    this.y = document.body.clientHeight/2

    document.body.addEventListener('mousedown', (e)=>this.handleMouse(e))
    document.body.addEventListener('mousemove', (e)=>this.handleMouse(e))
    document.body.addEventListener('mouseup', (e)=>{this.handleMouse(e);this.handleUp()})
    document.body.addEventListener('touchstart', (e)=>this.handleTouch(e))
    document.body.addEventListener('touchmove', (e)=>this.handleTouch(e))
    document.body.addEventListener('touchend', (e)=>{this.handleTouch(e);this.handleUp()})
  }

  handleMouse(e){ 
    this.x = e.clientX
    this.y = e.clientY
  }
  handleUp(){
    this.color = rand(0,360)
    document.body.style.background = `hsl(${this.color} 100% 50% / 0.8)`
  }

  handleTouch(e){
    this.x = e.changedTouches[0].clientX
    this.y = e.changedTouches[0].clientY
  }

  draw(ctx){
    //터치 동그라미
    ctx.strokeStyle = `hsl(${(this.color+256/3)%256} 100% 50% / 0.8)`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
    ctx.lineWidth = 2
    ctx.stroke()
  }
}