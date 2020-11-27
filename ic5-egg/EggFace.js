export default class EggFace {
  constructor(app) {
    this.app = app
  }

  draw(ctx) {
    const pi = Math.PI
    let x = this.app.egg.x
    let y = this.app.egg.y
    let r = this.app.egg.radius
    let eyeX = this.app.egg.eyeX/8
    let eyeY = this.app.egg.eyeY/8
    let dr = r/10
    console.log(eyeX, dr)
    // 얼굴 그리기
    if (this.app.egg.feel === 'none') {
      //보통. 눈하고 입만 움직임
      this.app.egg.none(this.app.mouse)
      ctx.save()
      ctx.strokeStyle = 'black'
      ctx.fillStyle = 'black'
      ctx.lineWidth = 2

      // 왼쪽눈. x -r +ex
      ctx.beginPath()
      ctx.arc(x -eyeX -r*4/10, y - r / 6 - eyeY, r / 20, 0, pi * 2)
      ctx.fill()

      //오른쪽눈 x +r +ex
      ctx.beginPath()
      ctx.arc(x -eyeX +r*4/10, y - r / 6 - eyeY, r / 20, 0, pi * 2)
      ctx.fill()

      //입
      ctx.beginPath()
      ctx.arc(x -eyeX, y + r / 15 - eyeY, r / 4, pi / 6, (pi * 5) / 6)
      ctx.stroke()
      ctx.restore()
    } else if (this.app.egg.feel === 'like') {
      //좋아함
      this.app.egg.like(this.app.mouse)
      ctx.save()
      ctx.strokeStyle = 'black'
      ctx.fillStyle = 'black'
      ctx.lineWidth = 2

      // 왼쪽눈
      ctx.beginPath()
      ctx.moveTo(x - r / 3 - r / 7, y - r / 5 - r / 10)
      ctx.lineTo(x - r / 3, y - r / 5)
      ctx.lineTo(x - r / 3 - r / 7, y - r / 5 + r / 10)
      ctx.stroke()

      //오른쪽눈
      ctx.beginPath()
      ctx.moveTo(x + r / 3 + r / 7, y - r / 5 - r / 10)
      ctx.lineTo(x + r / 3, y - r / 5)
      ctx.lineTo(x + r / 3 + r / 7, y - r / 5 + r / 10)
      ctx.stroke()

      //입
      ctx.beginPath()
      ctx.arc(x, y, r / 4, pi / 6, (pi * 5) / 6)
      ctx.stroke()
      ctx.restore()
    } else if (this.app.egg.feel === 'dislike') {
      //싫어함
      this.app.egg.dislike(this.app.mouse)
      ctx.save()
      ctx.strokeStyle = 'black'
      ctx.fillStyle = 'black'
      ctx.lineWidth = 2

      // 왼쪽눈
      ctx.beginPath()
      ctx.arc(x - r / 3, y - r / 5, r / 20, 0, pi * 2)
      ctx.fill()
      //왼쪽 눈썹
      ctx.beginPath()
      ctx.moveTo(x - r / 3 + (r * 1) / 10, y - r / 4 - (r * 1) / 10)
      ctx.lineTo(x - r / 3 - r / 5, y - r / 4 - r / 5)
      ctx.stroke()

      //오른쪽눈
      ctx.beginPath()
      ctx.arc(x + r / 3, y - r / 5, r / 20, 0, pi * 2)
      ctx.fill()
      //왼쪽 눈썹
      ctx.beginPath()
      ctx.moveTo(x + r / 3 - (r * 1) / 10, y - r / 4 - (r * 1) / 10)
      ctx.lineTo(x + r / 3 + r / 5, y - r / 4 - r / 5)
      ctx.stroke()

      //입
      ctx.beginPath()
      ctx.arc(x, y + r / 3, r / 3, (pi * 7) / 6, (pi * 11) / 6)
      ctx.stroke()
      ctx.restore()
    }
  }
}
