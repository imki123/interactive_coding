export default class EggFace {
  constructor(app) {
    this.app = app
  }

  draw(ctx) {
    const pi = Math.PI
    // 얼굴 그리기
    if (this.app.egg.feel === 'none') {
      //보통. 눈하고 입만 움직임
      this.app.egg.none(this.app.mouse)
      ctx.save()
      ctx.strokeStyle = 'black'
      ctx.fillStyle = 'black'
      ctx.lineWidth = 2

      // 왼쪽눈
      ctx.beginPath()
      ctx.arc(this.app.egg.x - this.app.egg.radius / 10 - this.app.egg.eyeX / 20, this.app.egg.y - this.app.egg.radius / 10 - this.app.egg.eyeY / 20, this.app.egg.radius / 20, 0, pi * 2)
      ctx.fill()

      //오른쪽눈
      ctx.beginPath()
      ctx.arc(this.app.egg.x + (this.app.egg.radius * 7) / 10 - this.app.egg.eyeX / 20, this.app.egg.y - this.app.egg.radius / 10 - this.app.egg.eyeY / 20, this.app.egg.radius / 20, 0, pi * 2)
      ctx.fill()

      //입
      ctx.beginPath()
      ctx.arc(this.app.egg.x + (this.app.egg.radius * 3) / 10 - this.app.egg.eyeX / 20, this.app.egg.y + this.app.egg.radius / 10 - this.app.egg.eyeY / 20, this.app.egg.radius / 4, pi / 6, (pi * 5) / 6)
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
      ctx.moveTo(this.app.egg.x - this.app.egg.radius / 3 - this.app.egg.radius / 7, this.app.egg.y - this.app.egg.radius / 5 - this.app.egg.radius / 10)
      ctx.lineTo(this.app.egg.x - this.app.egg.radius / 3, this.app.egg.y - this.app.egg.radius / 5)
      ctx.lineTo(this.app.egg.x - this.app.egg.radius / 3 - this.app.egg.radius / 7, this.app.egg.y - this.app.egg.radius / 5 + this.app.egg.radius / 10)
      ctx.stroke()

      //오른쪽눈
      ctx.beginPath()
      ctx.moveTo(this.app.egg.x + this.app.egg.radius / 3 + this.app.egg.radius / 7, this.app.egg.y - this.app.egg.radius / 5 - this.app.egg.radius / 10)
      ctx.lineTo(this.app.egg.x + this.app.egg.radius / 3, this.app.egg.y - this.app.egg.radius / 5)
      ctx.lineTo(this.app.egg.x + this.app.egg.radius / 3 + this.app.egg.radius / 7, this.app.egg.y - this.app.egg.radius / 5 + this.app.egg.radius / 10)
      ctx.stroke()

      //입
      ctx.beginPath()
      ctx.arc(this.app.egg.x, this.app.egg.y, this.app.egg.radius / 4, pi / 6, (pi * 5) / 6)
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
      ctx.arc(this.app.egg.x - this.app.egg.radius / 3, this.app.egg.y - this.app.egg.radius / 5, this.app.egg.radius / 20, 0, pi * 2)
      ctx.fill()
      //왼쪽 눈썹
      ctx.beginPath()
      ctx.moveTo(this.app.egg.x - this.app.egg.radius / 3 + (this.app.egg.radius * 1) / 10, this.app.egg.y - this.app.egg.radius / 4 - (this.app.egg.radius * 1) / 10)
      ctx.lineTo(this.app.egg.x - this.app.egg.radius / 3 - this.app.egg.radius / 5, this.app.egg.y - this.app.egg.radius / 4 - this.app.egg.radius / 5)
      ctx.stroke()

      //오른쪽눈
      ctx.beginPath()
      ctx.arc(this.app.egg.x + this.app.egg.radius / 3, this.app.egg.y - this.app.egg.radius / 5, this.app.egg.radius / 20, 0, pi * 2)
      ctx.fill()
      //왼쪽 눈썹
      ctx.beginPath()
      ctx.moveTo(this.app.egg.x + this.app.egg.radius / 3 - (this.app.egg.radius * 1) / 10, this.app.egg.y - this.app.egg.radius / 4 - (this.app.egg.radius * 1) / 10)
      ctx.lineTo(this.app.egg.x + this.app.egg.radius / 3 + this.app.egg.radius / 5, this.app.egg.y - this.app.egg.radius / 4 - this.app.egg.radius / 5)
      ctx.stroke()

      //입
      ctx.beginPath()
      ctx.arc(this.app.egg.x, this.app.egg.y + this.app.egg.radius / 3, this.app.egg.radius / 3, (pi * 7) / 6, (pi * 11) / 6)
      ctx.stroke()
      ctx.restore()
    }
  }
}
