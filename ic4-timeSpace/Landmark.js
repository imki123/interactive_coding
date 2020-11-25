import { rand } from "./App.js"

export default class Landmark {
  constructor(app, space) {
    this.app = app
    this.space = space
    this.images = []

    this.images.push(this.loadImage('../images/ic4/england.png')) //0
    this.images.push(this.loadImage('../images/ic4/france.png')) //1
    this.images.push(this.loadImage('../images/ic4/china.png')) //2
    this.images.push(this.loadImage('../images/ic4/korea.png')) //3
    this.images.push(this.loadImage('../images/ic4/india.png')) //4
    this.images.push(this.loadImage('../images/ic4/russia.png')) //5
    this.images.push(this.loadImage('../images/ic4/usa.png')) //6
    this.images.push(this.loadImage('../images/ic4/canada.png')) //7
    this.images.push(this.loadImage('../images/ic4/egypt.png')) //8
    this.images.push(this.loadImage('../images/ic4/africa.png')) //9
    this.images.push(this.loadImage('../images/ic4/brazil.png')) //10
    this.images.push(this.loadImage('../images/ic4/austrailia.png')) //11

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
    ly = y + u * 16
    this.drawLandmark(5, lx, ly, u, ctx, 1)

    lx = x + u * 73
    ly = y + u * 27
    this.drawLandmark(2, lx, ly, u, ctx, 2)

    lx = x + u * 68
    ly = y + u * 34
    this.drawLandmark(4, lx, ly, u, ctx, 1)

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

    if(isNaN(xyRatio)) xyRatio = 1
    let xRatio = 1
    let yRatio = 1
    if(xyRatio === 1){
      xRatio = 2
      yRatio = 2
    }else if(xyRatio < 1){
      yRatio /= xyRatio
    }else{
      xRatio *= xyRatio
    }

    let dx = (lx +u * 5 * xRatio - this.app.time.x) * light //태양과 랜드마크의 거리
    let dy = (ly +u * 5 * yRatio - this.app.time.y) * light
    let sx = lx //그림자 기준점
    let sy = ly + u * 5 * yRatio //그림자 기준점
    dx *= xRatio
    dy *= yRatio
    

    ctx.save()
    ctx.drawImage(this.images[idx], lx, ly, u * 5 * xRatio, u * 5 * yRatio)
    if(this.app.time.sunColor === 60){ //낮이면
      ctx.fillStyle = ctx.shadowColor = `hsl(${this.colors[idx]} 100% 30%)`
    }else{
      ctx.fillStyle = ctx.shadowColor =`hsl(${this.colors[idx]} 100% 10%)`
    }
    ctx.shadowBlur = this.app.time.light
    ctx.beginPath()
    ctx.moveTo(sx, sy) //그림자 시작. 왼쪽
    ctx.bezierCurveTo(sx + dx * 2, sy + dy * 2, sx + dx * 2 + u * 5 * xRatio, sy + dy * 2, sx + u * 5 * xRatio, sy) //그림자 끝. 오른쪽
    ctx.fill()
    ctx.restore()
  }

  loadImage(src){
    let image = new Image()
    image.src = src
    return image
  }
}
