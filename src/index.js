import _ from 'lodash'
import printMe from './print.js'
function component() {
  const element = document.createElement('div')
  const btn = document.createElement('button')
  element.innerHTML = _.join(['print', 'webpack'], '')
  btn.innerHTML = '点击这里，然后查看 console！'
  btn.onclick = printMe
  element.appendChild(btn)
  return element
}

document.body.append(component())