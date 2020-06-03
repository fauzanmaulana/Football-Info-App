import "regenerator-runtime"
import "./style/materialize/materialize.css"
import "./style/materialize/materialize.js"
import "./style/main.css"
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents'
import mainView from "./script/view/main.js"

document.addEventListener("DOMContentLoaded", mainView)

if ('serviceWorker' in navigator) {
    const registration = runtime.register()

    registerEvents(registration)
}