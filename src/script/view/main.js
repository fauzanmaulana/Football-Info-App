import "../component/competition-list.js"
import "../component/standing-list.js"
import "../component/match-list.js"
import "../component/nav-bar.js"
import indexdb from "../../db.js"
import ballData from "../data/football.js"

const main = () => {

    const loadPage = page => {
        return fetch(`src/pages/${page}.html`)
        .then(response => response.text())
    }

    const pageLoaded = async (url) => {
        const thisPage = await loadPage(url)
        document.querySelector('#content').innerHTML = thisPage
    }

    const addLiked = async (data, id, name) => {
        const dbPromise = await indexdb()
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

    const getLiked = async () => {
        const dbPromise = await indexdb()
        const tx = dbPromise.transaction("liked", "readonly")
        const store = tx.objectStore('liked')
        return store.getAll()
    }

    const likedList = async () => {
        const likes = await getLiked()
        const likedComponent = document.querySelector('.list-liked')
        if(likes.length > 0){
            let component = ''
            likes.forEach(result => {
                component += `
                    <a href="#likedDetail"><p id="${result.id}" class="card-panel hoverable blue lighten-2 white-text likeds">${result.competition.name}</p></a>
                `
            })
            likedComponent.innerHTML = component
        }else{
            likedComponent.innerHTML = "<h3 class='center-align white-text'>nothing liked</h3>"
        }

        document.querySelector('.btn-home').addEventListener('click', function(){
            page = this.getAttribute('href').substr(1)
            pageLoaded(page).then(() => {
                competitionsList()
            })
        })

        document.querySelectorAll('.likeds').forEach(like => {
            like.addEventListener('click', function(){
                page = this.parentNode.getAttribute('href').substr(1)
                pageLoaded(page).then(() => {
                    likedByIdList(Number(this.id))
                })
            })
        })
    }

    const getDeleteLiked = async id => {
        const dbPromise = await indexdb()
        const tx = dbPromise.transaction("liked", "readwrite")
        const store = tx.objectStore('liked')
        return store.delete(id)
    }

    const deleteLiked = async id => {
        const delLiked = await getDeleteLiked(id)
        console.log(delLiked)
        pageLoaded('liked').then(() => {
            likedList()
        })
    }

    const getLikedById = async id => {
        const dbPromise = await indexdb()
        const tx = dbPromise.transaction("liked", "readonly")
        const store = tx.objectStore('liked')
        return store.get(id)
    }

    const likedByIdList = async id => {
        const likedByid = await getLikedById(id)
        document.querySelector('.title-competition').innerText = `${likedByid.competition.name}`
        document.querySelector('.back-liked-list').addEventListener('click', function(){
            let page = this.getAttribute("href").substr(1)
            pageLoaded(page).then(() => {
                likedList()
            })
        })

        document.querySelector('#delete-liked').addEventListener('click', function(){
            deleteLiked(id)
        })

        const itList = document.querySelector('standing-list')
        itList.standings = likedByid.standing
    }

    const competitionsList = async () => {
        if('caches' in window){
            caches.match('https://api.football-data.org/v2/competitions').then(response => {
                if(response){
                    console.log(response)
                    response.json().then(results => {
                        const result = results.competitions
                        const league = result.filter(league => league.id === 2001 || league.id === 2002 || league.id === 2003 || league.id === 2021 || league.id === 2014 || league.id === 2015)
                        console.log('menggunakan cache')
                        renderResultComp(league)
                        document.querySelector('#liked-league').addEventListener('click', e => {
                            let page = e.target.parentNode.getAttribute("href").substr(1)
                            pageLoaded(page).then(() => {
                                likedList()
                            })
                        })
                    })
                }
            })
        }
        const results = await ballData.competitions()
        const leagues = results.filter(league => league.id === 2001 || league.id === 2002 || league.id === 2003 || league.id === 2021 || league.id === 2014 || league.id === 2015)
        renderResultComp(leagues)
        document.querySelector('#liked-league').addEventListener('click', e => {
            let page = e.target.parentNode.getAttribute("href").substr(1)
            pageLoaded(page).then(() => {
                likedList()
            })
        })
    }

    const matchesLists = async id => {
        if('caches' in window){
            caches.match(`https://api.football-data.org/v2/competitions/${id}/matches?status=SCHEDULED`).then(response => {
                if(response){
                    console.log(response)
                    response.json().then(results => {
                        const matches = results.matches
                        const navBar = document.querySelector('nav-bar')
                        navBar.leagueName = results.competition.name
                        const mcList = document.querySelector('match-list')
                        mcList.matchs = matches
                        const tabLink = document.querySelectorAll('.tab-link')
                        const backBtn = document.querySelector('.btn-home')
                        backBtn.addEventListener('click', function(){
                            let page = this.getAttribute('href').substr(1)
                            pageLoaded(page).then(() => {
                                competitionsList()
                            })
                        })
                        console.log(tabLink)
                        tabLink.forEach(tab => {
                            tab.addEventListener('click', e => {
                                let page = e.target.getAttribute('href').substr(1)
                                pageLoaded(page).then(() => {
                                    standingsList(id)
                                })
                            })
                        })
                    })
                }
            })
        }
        try{
            const results = await ballData.matches(id)
            const matches = results.matches
            const navBar = document.querySelector('nav-bar')
            navBar.leagueName = results.competition.name
            const mcList = document.querySelector('match-list')
            mcList.matchs = matches
            const tabLink = document.querySelectorAll('.tab-link')
            const backBtn = document.querySelector('.btn-home')
            backBtn.addEventListener('click', function(){
                let page = this.getAttribute('href').substr(1)
                pageLoaded(page).then(() => {
                    competitionsList()
                })
            })
            tabLink.forEach(tab => {
                tab.addEventListener('click', e => {
                    let page = e.target.getAttribute('href').substr(1)
                    pageLoaded(page).then(() => {
                        standingsList(id)
                    })
                })
            })
        }catch(er){
            const tabLink = document.querySelectorAll('.tab-link')
            const backBtn = document.querySelector('.btn-home')
            backBtn.addEventListener('click', function(){
                let page = this.getAttribute('href').substr(1)
                pageLoaded(page).then(() => {
                    competitionsList()
                })
            })
            tabLink.forEach(tab => {
                tab.addEventListener('click', e => {
                    let page = e.target.getAttribute('href').substr(1)
                    pageLoaded(page).then(() => {
                        standingsList(id)
                    })
                })
            })
        }
    }

    const standingsList = async id => {
        if('caches' in window){
            caches.match(`https://api.football-data.org/v2/competitions/${id}/standings`).then(response => {
                if(response){
                    console.log(response)
                    response.json().then(results => {
                        console.log('ini result dari standing')
                        const navBar = document.querySelector('nav-bar')
                        navBar.leagueName = results.competition.name
                        const stList = document.querySelector('standing-list')
                        stList.standings = results.standings[0].table
                        const tabLink = document.querySelectorAll('.tab-link')
                        const backBtn = document.querySelector('.btn-home')
                        backBtn.addEventListener('click', function(){
                            let page = this.getAttribute('href').substr(1)
                            pageLoaded(page).then(() => {
                                competitionsList()
                            })
                        })
                        console.log(tabLink)
                        tabLink.forEach(tab => {
                            tab.addEventListener('click', e => {
                                let page = e.target.getAttribute('href').substr(1)
                                pageLoaded(page).then(() => {
                                    matchesLists(id)
                                })
                            })
                        })
                        document.querySelector('#liked').addEventListener('click', () => {
                            let standing = results.standings[0].table
                            standing.push(results.competition)
                            addLiked(standing)
                        })
                    })
                }
            })
        }
        const results = await ballData.standings(id)
        const navBar = document.querySelector('nav-bar')
        navBar.leagueName = results.competition.name
        const stList = document.querySelector('standing-list')
        stList.standings = results.standings[0].table
        const tabLink = document.querySelectorAll('.tab-link')
        const backBtn = document.querySelector('.btn-home')
        backBtn.addEventListener('click', function(){
            let page = this.getAttribute('href').substr(1)
            pageLoaded(page).then(() => {
                competitionsList()
            })
        })
        tabLink.forEach(tab => {
            tab.addEventListener('click', e => {
                let page = e.target.getAttribute('href').substr(1)
                pageLoaded(page).then(() => {
                    matchesLists(id)
                })
            })
        })
        document.querySelector('#liked').addEventListener('click', () => {
            let standings = results.standings[0].table
            const dataSt = {id: results.competition.id, standing: standings, competition: results.competition}
            addLiked(dataSt, results.competition.id, results.competition.name)
        })
    }

    const detailComp = items => {
        items.forEach(item => {
            item.addEventListener('click', e => {
                let page = e.target.parentNode.getAttribute("href").substr(1)
                pageLoaded(page).then(() => {
                    matchesLists(e.target.id)
                })
            })
        })
    }

    const renderResultComp = result => {
        const compList = document.querySelector('competition-list')
        compList.competitions = result

        const compItem = document.querySelectorAll('competition-item')
        detailComp(compItem)
    }

    let page = window.location.hash.substr(1)

    if(page === '' || page === 'home'){
        page = 'home'
        pageLoaded(page).then(() => {
            competitionsList()
        })
    }
}

export default main