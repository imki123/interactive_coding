export default class Landmark {
  constructor(app, space) {
    this.app = app
    this.space = space
    this.images = []

    this.images.push(this.loadImage('../images/ex10/england.png')) //0
    this.images.push(this.loadImage('../images/ex10/france.png')) //1
    this.images.push(this.loadImage('../images/ex10/korea.png')) //2
  }
  draw(ctx) {
    let x = this.space.x
    let y = this.space.y
    let w = this.app.stageWidth
    let h = this.app.stageHeight
    let u = h / 100 //계산 편하게 하기 위한 기본 단위 설정

    //랜드마크 그리기
    let lx = x + u * 41 //랜드마크 기준점 x좌표
    let ly = y + u * 15 //랜드마크 기준점 y좌표
    this.drawLandmark(0, lx, ly, u, ctx, 0.5)

    lx = x + u * 45
    ly = y + u * 19
    this.drawLandmark(1, lx, ly, u, ctx, 0.5)

    lx = x + u * 85
    ly = y + u * 26
    this.drawLandmark(2, lx, ly, u, ctx, 2)


  }

  drawLandmark(idx, lx, ly, u, ctx, xyRatio) { //이미지 인덱스, 랜드마크 기준점, 단위값, 컨텍스트, xy비율(x/y)
    let light = this.app.time.light / (100 * u)
    let dx = (lx - this.app.time.x) * light //태양과 랜드마크의 거리
    let dy = (ly - this.app.time.y) * light

    if(isNaN(xyRatio)) xyRatio = 1
    let xRatio = 1
    let yRatio = 1
    if(xyRatio < 1){
      yRatio /= xyRatio
    }else{
      xRatio *= xyRatio
    }

    let sx = lx //그림자 기준점
    let sy = ly + u * 5 * yRatio //그림자 기준점
    

    ctx.drawImage(this.images[idx], lx, ly, u * 5 * xRatio, u * 5 * yRatio)
    ctx.fillStyle = `hsl(${0} 0% ${(50 - this.app.time.light) / 3}%)`
    ctx.beginPath()
    ctx.moveTo(sx, sy) //그림자 시작. 왼쪽위
    ctx.lineTo(sx + dx, sy + dy) //그림자 왼쪽아래 (+dx, +dy)
    ctx.bezierCurveTo(sx + dx * 2, sy + dy * 2, sx + dx * 2 + u * 5 * xRatio, sy + dy * 2, sx + u * 5 * xRatio, sy) //그림자 오른쪽아래
    ctx.lineTo(sx + u * 5 * xRatio, sy) //오른쪽위 (+dx, +dy)
    ctx.fill()
  }

  loadImage(src){
    let image = new Image()
    image.src = src
    return image
  }
}
