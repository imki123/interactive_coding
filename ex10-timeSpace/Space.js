import Landmark from "./Landmark.js"

export default class Space {
  constructor(idx, mouse, app) {
    //load image
    this.image = new Image()
    this.image.src = '../images/ex10/world.png'

    this.idx = idx
    this.mouse = mouse
    this.app = app

    this.stageWidth = app.stageWidth
    this.stageHeight = app.stageHeight
    this.x = this.idx * this.stageHeight
    this.y = this.stageHeight / 3

    //landmark 인스턴스 생성
    this.landmark = new Landmark(app, this) //app, space
  }

  draw(ctx) {
    this.setSpeed()
    this.x += this.speed

    let x = this.x
    let y = this.y
    let w = this.stageWidth
    let h = this.stageHeight
    let unit = h/20

    ctx.save()
    ctx.drawImage(this.image, x, h/2 -20, h, h / 2)
    ctx.restore()
    if (x + h <= 0) {
      //지도가 왼쪽으로 사라지는 경우
      let leftIdx = this.idx - 1
      if (leftIdx < 0) leftIdx = this.app.spaceNum
      this.x = this.app.spaces[leftIdx].x + h //왼쪽 지도위치 +h
    }
    if (x >= w) {
      //지도가 오른쪽으로 사라지는 경우
      let rightIdx = this.idx + 1
      if (rightIdx > this.app.spaceNum) rightIdx = 0
      this.x = this.app.spaces[rightIdx].x - h //오른쪽 지도위치 -h
    }

    //Landmark 그리기
    this.landmark.draw(ctx)
  }

  setSpeed() {
    this.speed = this.mouse.x/this.mouse.app.stageWidth
    this.speed *= 6
  }
}
