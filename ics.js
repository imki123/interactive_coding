//ic번호로 b
const ics = ['ic1-bounce','ic2-night','ic3-ripple','ic4-timeSpace','ic5-egg']
document.addEventListener('DOMContentLoaded', function(){
  console.log('loaded')
  //ic번호에 따라서 prev, next 버튼 활성화
  const $ic = document.querySelector('.ic')
  if($ic && !isNaN($ic.value*1)){
    const icNum = $ic.value*1
    const prev = icNum-2 < 0 ? ics.length-1 : icNum-2
    const next = icNum >= ics.length ? 0 : icNum
    console.log(prev, icNum, next)
    const $navigation = document.querySelectorAll('.navigation a')
    if($navigation[0]) $navigation[0].href = `../${ics[prev]}/`
    if($navigation[1]) $navigation[1].href = `../${ics[next]}/`
  }
})