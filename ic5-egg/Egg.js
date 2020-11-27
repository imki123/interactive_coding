import EggFace from "./EggFace.js"

export default class Egg {
  constructor(app) {
    this.radius = app.stageHeight / 10
    this.app = app

    this.initX = app.stageWidth / 2
    this.initY = app.stageHeight *3/ 10
    this.x = this.initX
    this.y = this.initY
    this.feel = 'none'

    this.eyeX = this.x
    this.eyeY = this.y
  }
  draw(ctx) {
    const pi = Math.PI

    //흰자 그리기
    ctx.save()
    let grd = ctx.createRadialGradient(this.initX, this.initY, 1, this.initX, this.initY, this.radius * 3)
    grd.addColorStop(0, 'white')
    grd.addColorStop(1, '#f8f9fa')
    ctx.fillStyle = grd
    ctx.shadowColor = 'gray'
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.arc(this.initX, this.initY, this.radius * 3, 0, pi * 2) //위치 고정
    ctx.fill()
    ctx.restore()

    // 노른자 그리기
    ctx.save()
    grd = ctx.createRadialGradient(this.x, this.y, 1, this.x, this.y, this.radius)
    grd.addColorStop(0, '#ffec99')
    grd.addColorStop(1, '#fcc419')
    ctx.fillStyle = grd
    ctx.shadowColor = 'gray'
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, pi * 2)
    ctx.fill()
    ctx.restore()

  }

  none(mouse){
    //보통은 눈하고 입만 움직임
    this.app.egg.x = this.app.egg.initX
    this.app.egg.y = this.app.egg.initY
    if(mouse.y === this.app.egg.initY) mouse.y = this.app.egg.initY + 0.0000001 //atan 에러 방지
    let angle = Math.atan(Math.abs(mouse.x - this.app.egg.initX) / Math.abs(mouse.y - this.app.egg.initY))

    if (mouse.x > this.app.egg.initX) this.app.egg.eyeX = - Math.sin(angle) * this.app.egg.radius
    else this.app.egg.eyeX = Math.sin(angle) * this.app.egg.radius
    if (mouse.y > this.app.egg.initY) this.app.egg.eyeY = - Math.cos(angle) * this.app.egg.radius
    else this.app.egg.eyeY = Math.cos(angle) * this.app.egg.radius
  }

  like(mouse) {
    //좋아할 때 마우스에 따라 노른자 위치 정하기
    let isIn = this.app.egg.distance(this.app.egg.initX, this.app.egg.initY, mouse.x, mouse.y) <= this.app.egg.radius * 3
    if (isIn) {
      this.app.egg.x = this.app.egg.initX + ((mouse.x - this.app.egg.initX) * 2) / 3
      this.app.egg.y = this.app.egg.initY + ((mouse.y - this.app.egg.initY) * 2) / 3
    } else {
      let angle = Math.atan(Math.abs(mouse.x - this.app.egg.initX) / Math.abs(mouse.y - this.app.egg.initY))
      if (mouse.x > this.app.egg.initX) this.app.egg.x = this.app.egg.initX + Math.sin(angle) * this.app.egg.radius * 2
      else this.app.egg.x = this.app.egg.initX - Math.sin(angle) * this.app.egg.radius * 2
      if (mouse.y > this.app.egg.initY) this.app.egg.y = this.app.egg.initY + Math.cos(angle) * this.app.egg.radius * 2
      else this.app.egg.y = this.app.egg.initY - Math.cos(angle) * this.app.egg.radius * 2
    }
  }

  dislike(mouse) {
    //싫어할 때 마우스에 따라 노른자 위치 정하기
    if(mouse.y === this.app.egg.initY) mouse.y = this.app.egg.initY + 0.0000001 //atan 에러 방지
    let angle = Math.atan(Math.abs(mouse.x - this.app.egg.initX) / Math.abs(mouse.y - this.app.egg.initY))
    if (mouse.x > this.app.egg.initX) this.app.egg.x = this.app.egg.initX - Math.sin(angle) * this.app.egg.radius * 2
    else this.app.egg.x = this.app.egg.initX + Math.sin(angle) * this.app.egg.radius * 2
    if (mouse.y > this.app.egg.initY) this.app.egg.y = this.app.egg.initY - Math.cos(angle) * this.app.egg.radius * 2
    else this.app.egg.y = this.app.egg.initY + Math.cos(angle) * this.app.egg.radius * 2
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  }
}
