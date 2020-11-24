export default class Landmark{
  constructor(app, space){
    this.app = app
    this.space = space
    this.images = []

    this.images[0] = new Image()
    this.images[0].src = '../images/ex10/england_500.png'
  }
  draw(ctx){
    let x = this.space.x
    let y = this.space.y
    let w = this.app.stageWidth
    let h = this.app.stageHeight
    let u = h/100 //계산 편하게 하기 위한 기본 단위 설정

    //랜드마크 그리기
    let light = this.app.time.light /(100*u)
    let lx = x +u*41 //랜드마크 기준점 x좌표
    let ly = y +u*15 //랜드마크 기준점 y좌표
    let sx = lx //그림자 기준점
    let sy = ly + u*10 //그림자 기준점
    let dx = (lx - this.app.time.x)*light //태양과 랜드마크의 거리
    let dy = (ly - this.app.time.y)*light

    ctx.drawImage(this.images[0], lx, ly, 10*u, 10*u)

    ctx.fillStyle= `hsl(${0} 0% ${(50-this.app.time.light)/3}%)`
    ctx.beginPath()
    ctx.moveTo(sx, sy) //그림자 시작. 왼쪽위
    ctx.lineTo(sx +dx, sy +dy) //그림자 왼쪽아래 (+dx, +dy)
    ctx.bezierCurveTo(sx +dx*2, sy +dy*2, sx +dx*2 +u*10, sy +dy*2, sx +u*10, sy) //그림자 오른쪽아래
    ctx.lineTo(sx +u*10, sy) //오른쪽위 (+dx, +dy)
    ctx.fill()
  }
}