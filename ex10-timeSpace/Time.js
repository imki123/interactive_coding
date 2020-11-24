export default class Time{
  constructor(mouse, radius) {
    this.mouse = mouse
    this.x = 0
    this.y = document.body.clientWidth/10 - radius
    this.r = radius 
    this.setSpeed()

    this.sunColor = 60 //해. 노랑
    this.backColor = 240 //파랑
  }
  
  draw(ctx){
    this.setSpeed()
    let stageWidth = document.body.clientWidth
    let stageHeight = document.body.clientHeight
    let pi = Math.PI
    let x = this.x
    let y = this.y
    let r = this.r
    
    this.x = (this.x + this.speed)%(stageWidth + r * 2)
    let xRatio = this.x/stageWidth
    this.y = stageWidth/10 - stageWidth/10*Math.sin(pi*xRatio) +this.r

    

    this.light = 50*Math.sin(pi*xRatio) //밝기
    //console.log(this.x, document.body.clientWidth, this.light)
    if(this.x >= document.body.clientWidth -this.speed){ //벽에 닿으면 색 변경
      this.sunColor = this.sunColor === 60 ? 40 : 60
    }

    /* 배경 그리기 */
    ctx.save() //ctx 개별 적용
    let backLlight 
    if(this.sunColor === 60){
      ctx.fillStyle = `hsl(${this.backColor} 100% ${this.light*8/5}%)` //낮
    }else{
      ctx.fillStyle = `hsl(${this.backColor} 100% ${this.light*1/5}%)` //밤
    }
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0,stageHeight)
    ctx.lineTo(stageWidth,stageHeight)
    ctx.lineTo(stageWidth,0)
    ctx.fill()
    ctx.restore() //ctx 개별 적용

    /*해, 달 그리기 */
    ctx.save() //ctx 개별 적용
    ctx.fillStyle = `hsl(${this.sunColor} 100% ${this.light+10}% / 0.9)`
    ctx.shadowColor = `hsl(${this.sunColor} 100% ${this.light+10}% / 0.9)`
    ctx.shadowBlur = this.light //그림자크기
    ctx.beginPath()
    if(this.sunColor === 60){ //해
      ctx.moveTo(x, y)
      ctx.arc(x, y, r, 0, 2 * pi)
    }else{ //달
      ctx.moveTo(x, y)
      ctx.arc(x, y, r, 0-pi/4, pi*3/4)
      ctx.bezierCurveTo(x, y+r, x+r, y, x+r/Math.sqrt(2), y-r/Math.sqrt(2))
    }
    ctx.fill()
    ctx.restore() //ctx 개별 적용
  }

  setSpeed(){
    this.speed = 1 -this.mouse.y/document.body.clientHeight
    this.speed *= 10
  }
}