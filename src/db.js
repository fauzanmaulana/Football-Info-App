import idb from "idb"

const db = () => {
    return idb.open('football', 1, upgradedb => {
        upgradedb.createObjectStore('liked', {keyPath: 'id'})
    })
}

export default db