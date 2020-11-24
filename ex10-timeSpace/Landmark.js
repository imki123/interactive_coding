import { rand } from "./App.js"

export default class Landmark {
  constructor(app, space) {
    this.app = app
    this.space = space
    this.images = []

    this.images.push(this.loadImage('../images/ex10/england.png')) //0
    this.images.push(this.loadImage('../images/ex10/france.png')) //1
    this.images.push(this.loadImage('../images/ex10/china.png')) //2
    this.images.push(this.loadImage('../images/ex10/korea.png')) //3
    this.images.push(this.loadImage('../images/ex10/india.png')) //4
    this.images.push(this.loadImage('../images/ex10/russia.png')) //5
    this.images.push(this.loadImage('../images/ex10/usa.png')) //6
    this.images.push(this.loadImage('../images/ex10/canada.png')) //7
    this.images.push(this.loadImage('../images/ex10/egypt.png')) //8
    this.images.push(this.loadImage('../images/ex10/africa.png')) //9
    this.images.push(this.loadImage('../images/ex10/brazil.png')) //10
    this.images.push(this.loadImage('../images/ex10/austrailia.png')) //11

    this.colors = this.images.map(i=>rand(0, 359))
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

    lx = x + u * 70
    ly = y + u * 18
    this.drawLandmark(5, lx, ly, u, ctx, 2)

    lx = x + u * 73
    ly = y + u * 27
    this.drawLandmark(2, lx, ly, u, ctx, 2)

    lx = x + u * 68
    ly = y + u * 34
    this.drawLandmark(4, lx, ly, u, ctx, 2)

    lx = x + u * 85
    ly = y + u * 26
    this.drawLandmark(3, lx, ly, u, ctx, 2)

    lx = x + u * 14
    ly = y + u * 12
    this.drawLandmark(7, lx, ly, u, ctx, 0.5)

    lx = x + u * 18
    ly = y + u * 20
    this.drawLandmark(6, lx, ly, u, ctx, 0.5)

    lx = x + u * 49
    ly = y + u * 32
    this.drawLandmark(8, lx, ly, u, ctx, 2)

    lx = x + u * 50
    ly = y + u * 45
    this.drawLandmark(9, lx, ly, u, ctx, 2)

    lx = x + u * 23
    ly = y + u * 38
    this.drawLandmark(10, lx, ly, u, ctx, 0.5)

    lx = x + u * 87
    ly = y + u * 50
    this.drawLandmark(11, lx, ly, u, ctx, 2)
  }

  drawLandmark(idx, lx, ly, u, ctx, xyRatio) { //이미지 인덱스, 랜드마크 기준점, 단위값, 컨텍스트, xy비율(x/y)
    let light = this.app.time.light / (200 * u)
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
    dx *= xRatio
    dy *= yRatio
    

    ctx.drawImage(this.images[idx], lx, ly, u * 5 * xRatio, u * 5 * yRatio)
    ctx.fillStyle = `hsl(${this.colors[idx]} 50% ${this.app.time.light}%)`
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
