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

    //랜드마크 그리기
    let lx = x +unit*2 //랜드마크 기준점 x좌표
    let ly = y +unit*2 //랜드마크 기준점 y좌표
    ctx.save()
    ctx.fillStyle= `hsl(${50} 100% 50%)`
    ctx.beginPath()
    ctx.moveTo(lx, ly) //위. 기준점
    ctx.lineTo(lx, ly + unit) //아래
    ctx.lineTo(lx + unit/2, ly + unit) //아래
    ctx.lineTo(lx + unit/2, ly) //위
    ctx.fill()
    ctx.restore()

    let light = this.app.time.light /500
    let dx = (this.app.time.x - lx)*light //태양과 랜드마크의 거리
    let dy = (this.app.time.y - ly)*light
    

    ctx.save()
    ctx.fillStyle= `hsl(${50} 100% 0%)`
    ctx.beginPath()
    ctx.moveTo(lx -dx, ly + unit -dy) //위
    ctx.lineTo(lx, ly + unit) //아래
    ctx.lineTo(lx + unit/2, ly + unit) //아래
    ctx.lineTo(lx + unit/2 -dx, ly + unit- dy) //위
    ctx.fill()
    ctx.restore()
  }

  setSpeed() {
    this.speed = this.mouse.x/this.mouse.app.stageWidth
    this.speed *= 5
  }
}
