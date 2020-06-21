import "regenerator-runtime"
import "./style/materialize/materialize.css"
import "./style/materialize/materialize.js"
import "./style/main.css"
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import mainView from "./script/view/main.js"

document.addEventListener("DOMContentLoaded", mainView)

if ('serviceWorker' in navigator) {
    const registration = runtime.register();
}

if ('Notification' in window){
    Notification.requestPermission().then(function(result){
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan.")
            return
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin.")
            return
        }
    })
}

if ('PushManager' in window) {
    navigator.serviceWorker.getRegistration().then(function(registration) {
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BKpW5Ia830eAsmaouFpIiWG2eBUwZI2oXOE4OjMLC7nT8hRtnrQd3X1LF1jaumvgBLrPbP_IPcFBZfT6sL7coYw")
        }).then(function(subscribe) {
            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('auth')))));
        }).catch(function(e) {
            console.error('Tidak dapat melakukan subscribe ', e.message);
        });
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}