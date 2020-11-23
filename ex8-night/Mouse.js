export default class Mouse{
  constructor(radius){
    this.radius = radius
    this.x = document.body.clientWidth/2
    this.y = document.body.clientHeight -this.radius -this.radius/5

    document.body.addEventListener('mousemove', (e)=>this.handleMove(e))
    document.body.addEventListener('touchstart', (e)=>this.handleTouch(e))
    document.body.addEventListener('touchmove', (e)=>this.handleTouch(e))
  }

  handleMove(e){ 
    //우산 위치조정
    this.x = e.clientX +this.radius/5 
    this.y = e.clientY -this.radius -this.radius/5
  }
  handleTouch(e){
    this.x = e.changedTouches[0].clientX +this.radius/5 
    this.y = e.changedTouches[0].clientY -this.radius -this.radius/5
  }

  draw(ctx){
    //우산 윗부분
    ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, Math.PI, 2*Math.PI)
    ctx.fill()

    //우산 기둥
    ctx.fillStyle = `white`
    ctx.beginPath()
    ctx.moveTo(this.x-1, this.y)
    ctx.lineTo(this.x-1, this.y +this.radius)
    ctx.lineTo(this.x+1, this.y +this.radius)
    ctx.lineTo(this.x+1, this.y)
    ctx.fill()

    //우산 손잡이
    ctx.strokeStyle = 'white'
    ctx.beginPath()
    ctx.arc(this.x-this.radius/5, this.y +this.radius, this.radius/5, 0, Math.PI)
    ctx.lineWidth = 2;
    ctx.stroke()
    


  }
}