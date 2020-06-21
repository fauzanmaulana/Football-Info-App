import "../component/competition-list.js"
import "../component/standing-list.js"
import "../component/match-list.js"
import "../component/nav-bar.js"
import pages from '../../pages.js'
import indexdb from "../../db.js"
import ballData from "../data/football.js"

const main = () => {

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
                            pages.pageLoaded(page).then(() => {
                                indexdb.getAllLiked()
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
            pages.pageLoaded(page).then(() => {
                likedList()
            })
        })
    }

    const likedList = async () => {
        const likes = await indexdb.getAllLiked()
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
            pages.pageLoaded(page).then(() => {
                competitionsList()
            })
        })

        document.querySelectorAll('.likeds').forEach(like => {
            like.addEventListener('click', function(){
                page = this.parentNode.getAttribute('href').substr(1)
                pages.pageLoaded(page).then(() => {
                    indexdb.getLikedById(Number(this.id)).then(res => {
                        likedDetailList(Number(this.id), res)
                    })
                })
            })
        })
    }

    const likedDetailList = (id, res) => {
        document.querySelector('.title-competition').innerText = `${res.competition.name}`
        document.querySelector('.back-liked-list').addEventListener('click', function(){
            let page = this.getAttribute("href").substr(1)
            pages.pageLoaded(page).then(() => {
                console.log('kembali ke list liked')
                likedList()
            })
        })

        document.querySelector('#delete-liked').addEventListener('click', function(){
            indexdb.deleteLiked(id).then(() => {
                pages.pageLoaded('liked').then(() => {
                    likedList()
                })
            })
        })

        const itList = document.querySelector('standing-list')
        itList.standings = res.standing
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
                            pages.pageLoaded(page).then(() => {
                                competitionsList()
                            })
                        })
                        console.log(tabLink)
                        tabLink.forEach(tab => {
                            tab.addEventListener('click', e => {
                                let page = e.target.getAttribute('href').substr(1)
                                pages.pageLoaded(page).then(() => {
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
                pages.pageLoaded(page).then(() => {
                    competitionsList()
                })
            })
            tabLink.forEach(tab => {
                tab.addEventListener('click', e => {
                    let page = e.target.getAttribute('href').substr(1)
                    pages.pageLoaded(page).then(() => {
                        standingsList(id)
                    })
                })
            })
        }catch(er){
            const tabLink = document.querySelectorAll('.tab-link')
            const backBtn = document.querySelector('.btn-home')
            backBtn.addEventListener('click', function(){
                let page = this.getAttribute('href').substr(1)
                pages.pageLoaded(page).then(() => {
                    competitionsList()
                })
            })
            tabLink.forEach(tab => {
                tab.addEventListener('click', e => {
                    let page = e.target.getAttribute('href').substr(1)
                    pages.pageLoaded(page).then(() => {
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
                            pages.pageLoaded(page).then(() => {
                                competitionsList()
                            })
                        })
                        console.log(tabLink)
                        tabLink.forEach(tab => {
                            tab.addEventListener('click', e => {
                                let page = e.target.getAttribute('href').substr(1)
                                pages.pageLoaded(page).then(() => {
                                    matchesLists(id)
                                })
                            })
                        })
                        document.querySelector('#liked').addEventListener('click', () => {
                            let standings = results.standings[0].table
                            const dataSt = {id: results.competition.id, standing: standings, competition: results.competition}
                            indexdb.addLiked(dataSt, results.competition.id, results.competition.name)
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
            pages.pageLoaded(page).then(() => {
                competitionsList()
            })
        })
        tabLink.forEach(tab => {
            tab.addEventListener('click', e => {
                let page = e.target.getAttribute('href').substr(1)
                pages.pageLoaded(page).then(() => {
                    matchesLists(id)
                })
            })
        })
        document.querySelector('#liked').addEventListener('click', () => {
            let standings = results.standings[0].table
            const dataSt = {id: results.competition.id, standing: standings, competition: results.competition}
            indexdb.addLiked(dataSt, results.competition.id, results.competition.name)
        })
    }

    const detailComp = items => {
        items.forEach(item => {
            item.addEventListener('click', e => {
                let page = e.target.parentNode.getAttribute("href").substr(1)
                pages.pageLoaded(page).then(() => {
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
        pages.pageLoaded(page).then(() => {
            competitionsList()
        })
    }
}

export default main