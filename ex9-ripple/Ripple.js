export default class Ripple{
  constructor(mouse, app){
    this.mouse = mouse
    this.x = mouse.x
    this.y = mouse.y
    this.color = app.color += 5
    this.power = this.mouse.power/10
    this.radius = 1
  }

  draw(ctx){
    //ctx.globalCompositeOperation = 'saturation'
    ctx.fillStyle = `hsl(${this.color} 100% 60% / 0.7)`
    //ctx.shadowColor = `hsl(${this.color} 100% 60% / 0.7)`
    //ctx.shadowBlur = 40;
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
    this.radius += this.power
  }
}