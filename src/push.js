const webPush = require("web-push");

const vapidKeys = {
    publicKey : "BKpW5Ia830eAsmaouFpIiWG2eBUwZI2oXOE4OjMLC7nT8hRtnrQd3X1LF1jaumvgBLrPbP_IPcFBZfT6sL7coYw",
    privateKey : "j8R4-WgHqmC0UIBV-IBGKkSndXQ3fS7LV8FIWD8nFmA"
}

const subscription = {
    endpoint : "https://fcm.googleapis.com/fcm/send/cHBdp4LTcdM:APA91bEn3EcVgmYYTKRzhuzG7blGCR7W14KNQ_0fGXsiuSwNomVz6NYW-TIstQDWVDhAVM7Q3QLuGhGnN1T8MohRet6VmYWZc-bKlcAJciy_4ea7rHy1zMGyXY2LRI-7vvd65JM_UCwQ",
    keys : {
        p256dh : "BDzqqCUNL7ICRrVsMotFELvyi7QWb+CA6+Y9Bbn9AoORslz6RZXpaObcwZFoM9B01Vf69RPlBE/lFLcvPUTfVxw=",
        auth : "XuUSQvkCGA7WpPM5aJeTKA=="
    }
}

const options = {
    gcmAPIKey : "397944144052",
    TTL : 60
}

webPush.setVapidDetails('mailto:fauzanfm375@gmail.com',vapidKeys.publicKey,vapidKeys.privateKey)

let payloads = "selamat! push notification dan subscription berhasil di gunakan"

webPush.sendNotification(
    subscription,
    payloads,
    options
)