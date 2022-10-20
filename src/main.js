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

const expirationDateMasked = IMask(expirationDate, expeirationDatePattern)

const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/, // Expressão regular - Regra para cartão do visa Pesquisar mais a respeito
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/, // Expresão regular - Regra para Cartão Master
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function(item) {
      return number.match(item.regex) // find = encontre
    })

    return foundMask
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector('#add-card')

addButton.addEventListener('click', () => {
  alert('Cartão adicionada!')
})

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
} ) // Desativar o reload do submit, caso não seja feito isso ao clicar o form irá fazer o "reload"

const cardHolder = document.querySelector('#card-holder')

cardHolder.addEventListener('input' , () => { //input é o evento de escrever.
  const ccHolder = document.querySelector('.cc-holder .value')
  ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

securityCodeMasked.on('accept' , () => {
  updateSecurityCode(securityCodeMasked.value)
} )

function updateSecurityCode (code) {
  const ccSecurity = document.querySelector('.cc-security .value')
  ccSecurity.innerText = code.length === 0 ? '123' : code
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype // recebe a informação da mascara podendo ser mastercard, visa ou default
  setCardType(cardType) 
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : cardNumberMasked.value
}

expirationDateMasked.on('accept', () => {
  updateExpirationDate(expirationDateMasked.value) 
})

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector('.cc-extra .value')
  ccExpiration.innerText = date.length === 0 ? "02/32" : date
}

