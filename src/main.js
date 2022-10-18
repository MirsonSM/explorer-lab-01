import "./css/index.css"


const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBGColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const cclogo = document.querySelector('.cc-logo span:nth-child(2) img')

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
  }
  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBGColor02.setAttribute("fill", colors[type][1])
  cclogo.setAttribute('src', `cc-${type}.svg`)
}

setCardType('mastercard')


