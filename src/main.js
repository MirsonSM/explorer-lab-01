import "./css/index.css"
import IMask from "imask"


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

//security code

const securityCode = document.querySelector("#security-code")
const securyCodePattern = {
  mask:'0000'
}

const securityCodeMasked = IMask(securityCode, securyCodePattern)

const expirationDate = document.querySelector('#expiration-date')
const expeirationDatePattern = {
  mask:'MM{/}YY',
  blocks: { //usado para criar o range - Nesse caso para mês e ano.
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2), // String está transformando o ano e texto para pegtar os dois ultimos dígitos com o slice(2)
      to: String(new Date().getFullYear()+10 ).slice(2)
    },
    MM: {
    mask: IMask.MaskedRange,
    from: 1,
    to: 12
    }
  } 
}



const expirantioDateMasked = IMask(expirationDate, expeirationDatePattern)






