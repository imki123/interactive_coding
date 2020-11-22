export default class Ball {
  constructor(stageWidth, stageHeight, radius, speed, block) {
    this.radius = radius
    this.vx = speed
    this.vy = speed
    this.vc = 0.3

    const diameter = this.radius * 2
    this.x = diameter + (Math.random() * stageWidth - diameter)
    this.y = diameter + (Math.random() * stageHeight - diameter)

    //블락 안에 공이 갇히지 않도록 초기화
    const minX = block.x - this.radius
    const maxX = block.maxX + this.radius
    const minY = block.y - this.radius
    const maxY = block.maxY + this.radius
    while(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY){
      this.x = diameter + (Math.random() * stageWidth - diameter)
      this.y = diameter + (Math.random() * stageHeight - diameter)
    }

    this.color = Math.floor(Math.random()*256)
    this.fillStyle = `hsl(${this.color} 100% 50% / 0.7)`
  }

  draw(ctx, stageWidth, stageHeight, block) {
    this.x += this.vx
    this.y += this.vy
    this.color += this.vc
    if(this.color >= 255 || this.color <= 0) this.vc *= -1
    this.fillStyle = `hsl(${this.color} 100% 50% / 0.7)`

    this.bounceWindow(stageWidth, stageHeight)
    this.bounceBlock(block)

    ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = this.fillStyle
    ctx.shadowColor = this.fillStyle
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius
    const maxX = stageWidth - this.radius
    const minY = this.radius
    const maxY = stageHeight - this.radius

    if (this.x <= minX) {
      if(this.vx <= 0) this.vx *= -1
    }
    if(this.x >= maxX){
      if(this.vx > 0) this.vx *= -1
    }
    if (this.y <= minY) {
      if(this.vy <= 0) this.vy *= -1
    }
    if(this.y >= maxY){
      if(this.vy > 0) this.vy *= -1
    }
  }

  bounceBlock(block){
    const minX = block.x - this.radius
    const maxX = block.maxX + this.radius
    const minY = block.y - this.radius
    const maxY = block.maxY + this.radius

    if(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY){
      const x1 = Math.abs(minX - this.x)
      const x2 = Math.abs(maxX - this.x)
      const y1 = Math.abs(minY - this.y)
      const y2 = Math.abs(maxY - this.y)
      const min1 = Math.min(x1, x2)
      const min2 = Math.min(y1, y2)
      const min = Math.min(min1, min2)
      const diameter = this.radius * 2
      const newX = diameter + (Math.random() * document.body.clientWidth - diameter)
      const newY = diameter + (Math.random() * document.body.clientHeight - diameter)

      if(min === min1){
        this.vx *= -1
        this.x += this.vx
        if(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY){
          this.x = newX
          this.y = newY
        }
      }
      if(min === min2){
        this.vy *= -1
        this.y += this.vy
        if(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY){
          this.x = newX
          this.y = newY
        }
      }
    }
  }
} //Ball end