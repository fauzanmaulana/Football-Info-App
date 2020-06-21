import idb from "idb"
import pages from './pages.js'

class database{
    static connection(){
        return idb.open('football', 1, upgradedb => {
            upgradedb.createObjectStore('liked', {keyPath: 'id'})
        })
    }

    static async getAllLiked(){
        const dbPromise = await this.connection()
        const tx = dbPromise.transaction("liked", "readonly")
        const store = tx.objectStore('liked')
        return store.getAll()
    }

    static async getLikedById(id){
        const dbPromise = await this.connection()
        const tx = dbPromise.transaction("liked", "readonly")
        const store = tx.objectStore('liked')
        return store.get(id)
    }

    static async addLiked(data, id, name){
        const dbPromise = await this.connection()
        const tx = dbPromise.transaction("liked", "readonly")
        const store = tx.objectStore('liked')
        const checkId = store.get(id)
        checkId.then(result => {
            if(result !== undefined){
                M.toast({html: 'your has been like this standing', classes: 'rounded'})
            }else{
                const tx = dbPromise.transaction('liked', 'readwrite')
                const store = tx.objectStore('liked')
                store.add(data)
                M.toast({html: `your like ${name}!, go liked standings at home page to check it!`, classes: 'rounded'})
                return tx.complete
            }
        })
    }

    static async deleteLiked(id){
        const dbPromise = await this.connection()
        const tx = dbPromise.transaction("liked", "readwrite")
        const store = tx.objectStore('liked')
        return store.delete(id)
    }
}

export default database