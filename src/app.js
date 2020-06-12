import "regenerator-runtime"
import "./style/materialize/materialize.css"
import "./style/materialize/materialize.js"
import "./style/main.css"
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents'
import mainView from "./script/view/main.js"

document.addEventListener("DOMContentLoaded", mainView)

// String(date(times)).substr(16, 5)
// String(date(times)).substr(0,16)

// if ('serviceWorker' in navigator) {
//     const registration = runtime.register()

//     registerEvents(registration, {
//         onInstalled: () => {
//             console.log('berhasil regist')
//         }
//     })
// }