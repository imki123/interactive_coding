export default class Sauce {
  constructor(app) {
    this.app = app
    this.sauce = app.sauce
    if (this.sauce === 'ketchup') this.color = 'rgba(255,0,0)'
    if (this.sauce === 'soysauce') this.color = 'rgba(30,30,30)'
    if (this.sauce === 'redpepper') this.color = 'rgba(255,100,0)'
    if (this.sauce === 'wasabi') this.color = 'rgba(0,255,0)'

    this.speed = 0.2
    this.r = app.egg.radius / 3
    this.x = app.mouse.x
    this.y = app.mouse.y
  }
  draw(ctx) {
    if(this.r > 0){
      if (this.sauce !== 'none' && this.distance(this.x, this.y, this.app.egg.initX, this.app.egg.initY) <= this.app.egg.radius*3) {
        ctx.save()
        // 소스자국
        let grd = ctx.createRadialGradient(this.x, this.y, 1, this.x, this.y, this.r)
        //grd.addColorStop(0, this.color)
        //grd.addColorStop(1, 'white')
        //ctx.fillStyle = grd
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        this.r -= this.speed
      }
    }else{
      this.app.print.shift()
    }
  }

  setX() {
    let mouse = this.app.mouse
    let egg = this.app.egg
    let ratio = (mouse.x - egg.initX) / egg.radius
    this.x = egg.initX + ratio * this.r
  }
  setY() {
    let mouse = this.app.mouse
    let egg = this.app.egg
    let ratio = (mouse.y - egg.initY) / egg.radius
    this.y = egg.initY + ratio * this.r
  }

  resize() {
    this.r = this.app.egg.radius / 5
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  }
}

