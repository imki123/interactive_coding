export default class Ripple {
  constructor(mouse, app) {
    this.mouse = mouse
    this.x = mouse.x
    this.y = mouse.y
    this.power = this.mouse.power / 10
    this.radius = 1

    this.color = app.color += 5
    this.shape = app.shape
  }

  draw(ctx) {
    const pi = Math.PI
    const r = this.radius
    let x = this.x
    let y = this.y
    //ctx.globalCompositeOperation = 'saturation'
    //ctx.shadowColor = `hsl(${this.color} 100% 60% / 0.7)`
    //ctx.shadowBlur = 40;
    ctx.fillStyle = `hsl(${this.color} 100% 60% / 0.7)`

    if (this.shape === 'circle') {
      ctx.beginPath()
      ctx.arc(x, y, r, 0, 2 * pi)
      ctx.fill()
    } else if (this.shape === 'triangle') {
      ctx.beginPath()
      ctx.moveTo(x, y - r)
      ctx.lineTo(x - r * Math.cos(pi / 6), y + r * Math.sin(pi / 6))
      ctx.lineTo(x + r * Math.cos(pi / 6), y + r * Math.sin(pi / 6))
      ctx.fill()
    } else if (this.shape === 'square') {
      ctx.beginPath()
      ctx.moveTo(x - r, y - r)
      ctx.lineTo(x - r, y + r)
      ctx.lineTo(x + r, y + r)
      ctx.lineTo(x + r, y - r)
      ctx.fill()
    } else if (this.shape === 'star') {
      ctx.beginPath()
      //중앙 위쪽점부터 반시계방향으로
      //1 위쪽 꼭지점
      ctx.moveTo(x, y - r)
      //2
      ctx.lineTo(x - (r / 3) * Math.cos((pi * 3) / 10), y - (r / 3) * Math.sin((pi * 3) / 10))
      //3 왼쪽위 꼭지점
      ctx.lineTo(x - r * Math.cos(pi / 10), y - r * Math.sin(pi / 10))
      //4
      ctx.lineTo(x - (r / 3) * Math.cos(pi / 10), y + (r / 3) * Math.sin(pi / 10))
      //5 왼쪽아래 꼭지점
      ctx.lineTo(x - r * Math.cos((pi * 3) / 10), y + r * Math.sin((pi * 3) / 10))
      //6
      ctx.lineTo(x, y + r / 3)
      //7 오른쪽아래 꼭지점
      ctx.lineTo(x + r * Math.cos((pi * 3) / 10), y + r * Math.sin((pi * 3) / 10))
      //8
      ctx.lineTo(x + (r / 3) * Math.cos(pi / 10), y + (r / 3) * Math.sin(pi / 10))
      //9 오른쪽위 꼭지점
      ctx.lineTo(x + r * Math.cos(pi / 10), y - r * Math.sin(pi / 10))
      //10
      ctx.lineTo(x + (r / 3) * Math.cos((pi * 3) / 10), y - (r / 3) * Math.sin((pi * 3) / 10))
      ctx.fill()
    } else if (this.shape === 'heart') {
      y = y - r/2
      const topCurveHeight = r * 0.3
      ctx.beginPath()
      ctx.moveTo(x, y + topCurveHeight)
      // top left curve
      ctx.bezierCurveTo(x, y, x - r / 2, y, x - r / 2, y + topCurveHeight)
      // bottom left curve
      ctx.bezierCurveTo(x - r / 2, y + (r + topCurveHeight) / 2, x, y + (r + topCurveHeight)*2/3, x, y + r)
      // bottom right curve
      ctx.bezierCurveTo(x, y + (r + topCurveHeight)*2/3, x + r / 2, y + (r + topCurveHeight) / 2, x + r / 2, y + topCurveHeight)
      // top right curve
      ctx.bezierCurveTo(x + r / 2, y, x, y, x, y + topCurveHeight)
      ctx.fill()
    }

    this.radius += this.power
  }
}
