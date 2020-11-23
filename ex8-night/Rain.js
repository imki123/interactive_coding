export default class Rain{
  constructor(radius, delay, stageWidth, stageHeight, mouse){
    this.x = Math.random()*stageWidth
    this.y = -radius*2
    this.radius = radius

    this.vxRange = 2 //빗방울 x속도
    this.vx = Math.random()*this.vxRange
    this.vy = 0
    this.delay = delay
    this.excuteDelay() //일정 시간 후에 비가 떨어지도록 하기
    this.color = Math.floor(Math.random()*256)

    this.mouse = mouse
  }

  draw(ctx, stageWidth, stageHeight){
    this.stageWidth = stageWidth
    this.stageHeight = stageHeight

    this.gravity = ((this.stageWidth/2) - this.mouse.x) / (this.stageWidth/2)

    this.x += this.vx
    this.y += this.vy
    if(this.y >= stageHeight + this.radius){ //바닥에 닿으면 위치, 색변경
      this.y = -this.radius
      this.x = Math.random()*stageWidth
      this.color = Math.floor(Math.random()*256)
    }
    //빗방울
    ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = `hsl(${this.color} 100% 60% / 0.8)`
    ctx.shadowColor = `hsl(${this.color} 100% 60% / 0.8)`
    ctx.shadowBlur = this.radius*1/2;
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()

    //빗방울 줄기
    /* ctx.fillStyle = `hsl(${this.color} 100% 30% / 0.7)`
    ctx.beginPath()
    ctx.moveTo(this.x-1, this.y-(this.vy) -this.radius)
    ctx.lineTo(this.x-1, this.y-(this.vy*4) -this.radius)
    ctx.lineTo(this.x, this.y-(this.vy*4) -this.radius)
    ctx.lineTo(this.x, this.y-(this.vy) -this.radius)
    ctx.fill() */
  }

  setVx(time){
    setInterval(() => {
      this.vx = (Math.random() * this.vxRange) -this.vxRange/2 -this.gravity*this.vxRange
    }, time)
  }

  excuteDelay(){
    setTimeout(()=>{
      this.vy = 3 //빗방울 y속도
      this.setVx(500) //0.5초마다 방향 변경
    },this.delay)
  }
}