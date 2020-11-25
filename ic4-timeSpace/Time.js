export default class Time{
  constructor(mouse, radius) {
    this.mouse = mouse
    this.x = radius
    this.y = mouse.app.clientWidth/10 +radius +10
    this.r = radius 
    this.setSpeed()

    this.sunColor = 60 //해. 노랑
    this.backColor = 240 //파랑
  }
  
  draw(ctx){
    this.setSpeed()
    let stageWidth = this.mouse.app.stageWidth
    let stageHeight = this.mouse.app.stageHeight
    let pi = Math.PI
    let x = this.x
    let y = this.y
    let r = this.r
    
    this.x = this.x + this.speed
    if(this.x > stageWidth + r) this.x = -r
    let xRatio = (this.x +r)/(stageWidth +r*2)
    this.y = stageWidth/10 - stageWidth/10*Math.sin(pi*xRatio) +this.r + 10

    

    this.light = 50*Math.sin(pi*xRatio) //밝기
    if(this.x >= stageWidth +r -this.speed){ //벽에 숨으면 색 변경
      this.sunColor = this.sunColor === 60 ? 40 : 60
    }

    /* 배경 그리기 */
    ctx.save() //ctx 개별 적용
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
    this.speed = 1 -this.mouse.y/this.mouse.app.stageHeight
    this.speed *= 5
  }
}