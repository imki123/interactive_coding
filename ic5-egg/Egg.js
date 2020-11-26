export default class Egg {
  constructor(radius, app) {
    this.radius = radius
    this.app = app

    this.initX = app.stageWidth / 2
    this.initY = app.stageHeight / 5
    this.x = this.initX
    this.y = this.initY
    this.like = true
  }
  draw(ctx) {
    const pi = Math.PI
    if(this.like) {
      this.likeIt(this.app.mouse)
    }
    else this.dislikeIt(this.app.mouse)

    //흰자 그리기
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.initX, this.initY, this.radius*3, 0, pi * 2) //위치 고정
    // Create gradient
    let grd = ctx.createRadialGradient(this.initX, this.initY, 1, this.initX, this.initY, this.radius*3)
    grd.addColorStop(0, 'white')
    grd.addColorStop(1, '#f8f9fa')
    ctx.fillStyle = grd
    ctx.shadowColor = 'gray'
    ctx.shadowBlur = 10
    ctx.fill()
    ctx.restore()

    // 노른자 그리기 
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, pi * 2)
    // Create gradient
    grd = ctx.createRadialGradient(this.x, this.y, 1, this.x, this.y, this.radius)
    grd.addColorStop(0, '#ffec99')
    grd.addColorStop(1, '#fcc419')
    ctx.fillStyle = grd
    ctx.shadowColor = 'gray'
    ctx.shadowBlur = 10
    ctx.fill()
    ctx.restore()

    // 얼굴 그리기
    ctx.save()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
    ctx.lineWidth = 2

    // 왼쪽눈
    ctx.beginPath()
    ctx.arc(this.x - this.radius/3, this.y - this.radius/4, this.radius/20, 0, pi*2)
    ctx.fill()
    
    //오른쪽눈
    ctx.beginPath()
    ctx.arc(this.x + this.radius/3, this.y - this.radius/4, this.radius/20, 0, pi*2)
    ctx.fill()
    
    //입
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius/3, pi/6, pi*5/6)
    ctx.stroke()
    ctx.restore()
  }

  likeIt(mouse){
    let isIn = (this.distance(this.initX, this.initY, mouse.x, mouse.y) <= this.radius*3)
    if(isIn){
      this.x = this.initX + (mouse.x - this.initX)*2/3
      this.y = this.initY + (mouse.y - this.initY)*2/3
    }else{
      let angle = Math.atan(Math.abs(mouse.x - this.initX)/Math.abs(mouse.y - this.initY))
      if(mouse.x > this.initX) this.x = this.initX + Math.sin(angle)*this.radius*2
      else this.x = this.initX - Math.sin(angle)*this.radius*2
      if(mouse.y > this.initY) this.y = this.initY + Math.cos(angle)*this.radius*2
      else this.y = this.initY - Math.cos(angle)*this.radius*2
    }
  }

  distance(x1,y1, x2,y2){
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))
  }
}
