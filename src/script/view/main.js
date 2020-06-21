import "../component/competition-list.js"
import "../component/standing-list.js"
import "../component/match-list.js"
import "../component/nav-bar.js"
import pages from '../../pages.js'
import indexdb from "../../db.js"
import ballData from "../data/football.js"

const main = () => {

    const likedList = async () => {
        const likes = await indexdb.getAllLiked()
        const likedComponent = document.querySelector('.list-liked')
        if(likes.length > 0){
            let component = ''
            likes.forEach(result => {
                component += `
                    <a href="#likedDetail?id=${result.id}"><p id="${result.id}" class="card-panel hoverable blue lighten-2 white-text likeds">${result.competition.name}</p></a>
                `
            })
            likedComponent.innerHTML = component
        }else{
            likedComponent.innerHTML = "<h3 class='center-align white-text'>nothing liked</h3>"
        }

        document.querySelector('.btn-home').addEventListener('click', function(){
            const page = this.getAttribute('href').substr(1)
            parseUrl(page)
        })

        document.querySelectorAll('.likeds').forEach(like => {
            like.addEventListener('click', function(){
                const page = this.parentNode.getAttribute('href').substr(1)
                console.log(page)
                parseUrl(page)
            })
        })
    }

    const likedDetailList = (id, res) => {
        document.querySelector('.title-competition').innerText = `${res.competition.name}`
        document.querySelector('.back-liked-list').addEventListener('click', function(){
            const page = this.getAttribute("href").substr(1)
            parseUrl(page)
        })

        document.querySelector('#delete-liked').addEventListener('click', function(){
            const page = this.parentNode.getAttribute('href').substr(1)
            indexdb.deleteLiked(Number(id)).then(() => {
                parseUrl(page)
            })
        })

        const itList = document.querySelector('standing-list')
        itList.standings = res.standing
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
                            const page = e.target.parentNode.getAttribute("href").substr(1)
                            parseUrl(page)
                        })
                    })
                }
            })
        }
        const results = await ballData.competitions()
        const leagues = results.filter(league => league.id === 2001 || league.id === 2002 || league.id === 2003 || league.id === 2021 || league.id === 2014 || league.id === 2015)
        renderResultComp(leagues)
        document.querySelector('#liked-league').addEventListener('click', e => {
            const page = e.target.parentNode.getAttribute("href").substr(1)
            parseUrl(page)
        })
    }

    const detailComp = items => {
        items.forEach(item => {
            item.addEventListener('click', e => {
                const page = e.target.parentNode.getAttribute('href').substr(1)
                parseUrl(page)
            })
        })
    }

    const renderResultComp = result => {
        const compList = document.querySelector('competition-list')
        compList.competitions = result

        const compItem = document.querySelectorAll('competition-item')
        detailComp(compItem)
    }

    const matchesLists = async id => {
        console.log(id)
        if('caches' in window){
            caches.match(`https://api.football-data.org/v2/competitions/${id}/matches?status=SCHEDULED`).then(response => {
                if(response){
                    console.log(response)
                    response.json().then(results => {
                        const matches = results.matches
                        const navBar = document.querySelector('nav-bar')
                        navBar.leagueId = id
                        navBar.leagueName = results.competition.name
                        const mcList = document.querySelector('match-list')
                        mcList.matchs = matches
                        const tabLink = document.querySelectorAll('.tab-link')
                        const backBtn = document.querySelector('.btn-home')
                        backBtn.addEventListener('click', function(){
                            const page = this.getAttribute('href').substr(1)
                            parseUrl(page)
                        })
                        console.log(tabLink)
                        tabLink.forEach(tab => {
                            tab.addEventListener('click', e => {
                                const page = e.target.getAttribute('href').substr(1)
                                parseUrl(page)
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
            navBar.leagueId = id
            navBar.leagueName = results.competition.name
            const mcList = document.querySelector('match-list')
            mcList.matchs = matches
            const tabLink = document.querySelectorAll('.tab-link')
            const backBtn = document.querySelector('.btn-home')
            backBtn.addEventListener('click', function(){
                const page = this.getAttribute('href').substr(1)
                parseUrl(page)
            })
            tabLink.forEach(tab => {
                tab.addEventListener('click', e => {
                    const page = e.target.getAttribute('href').substr(1)
                    parseUrl(page)
                })
            })
        }catch(er){
            const tabLink = document.querySelectorAll('.tab-link')
            const backBtn = document.querySelector('.btn-home')
            backBtn.addEventListener('click', function(){
                const page = this.getAttribute('href').substr(1)
                parseUrl(page)
            })
            tabLink.forEach(tab => {
                tab.addEventListener('click', e => {
                    const page = e.target.getAttribute('href').substr(1)
                    parseUrl(page)
                })
            })
        }
    }

    const standingsList = async id => {
        console.log(id)
        if('caches' in window){
            caches.match(`https://api.football-data.org/v2/competitions/${id}/standings`).then(response => {
                if(response){
                    console.log(response)
                    response.json().then(results => {
                        console.log('ini result dari standing')
                        const navBar = document.querySelector('nav-bar')
                        navBar.leagueId = id
                        navBar.leagueName = results.competition.name
                        const stList = document.querySelector('standing-list')
                        stList.standings = results.standings[0].table
                        const tabLink = document.querySelectorAll('.tab-link')
                        const backBtn = document.querySelector('.btn-home')
                        backBtn.addEventListener('click', function(){
                            const page = this.getAttribute('href').substr(1)
                            parseUrl(page)
                        })
                        console.log(tabLink)
                        tabLink.forEach(tab => {
                            tab.addEventListener('click', e => {
                                const page = e.target.getAttribute('href').substr(1)
                                parseUrl(page)
                            })
                        })
                        document.querySelector('#liked').addEventListener('click', () => {
                            const standings = results.standings[0].table
                            const dataSt = {id: results.competition.id, standing: standings, competition: results.competition}
                            indexdb.addLiked(dataSt, results.competition.id, results.competition.name)
                        })
                    })
                }
            })
        }
        const results = await ballData.standings(id)
        const navBar = document.querySelector('nav-bar')
        navBar.leagueId = id
        navBar.leagueName = results.competition.name
        const stList = document.querySelector('standing-list')
        stList.standings = results.standings[0].table
        const tabLink = document.querySelectorAll('.tab-link')
        const backBtn = document.querySelector('.btn-home')
        backBtn.addEventListener('click', function(){
            const page = this.getAttribute('href').substr(1)
            parseUrl(page)
        })
        tabLink.forEach(tab => {
            tab.addEventListener('click', e => {
                const page = e.target.getAttribute('href').substr(1)
                parseUrl(page)
            })
        })
        document.querySelector('#liked').addEventListener('click', () => {
            const standings = results.standings[0].table
            const dataSt = {id: results.competition.id, standing: standings, competition: results.competition}
            indexdb.addLiked(dataSt, results.competition.id, results.competition.name)
        })
    }

    // * routing
    let page = window.location.hash.substr(1)

    parseUrl(page)

    function parseUrl(url){
        let page = url.split('?')
        if(page.length <= 1){
            switch (page[0]){
                case '':
                    page[0] = 'home'
                    pages.pageLoaded(page[0]).then(() => {
                        competitionsList()
                    })
                    break
                case 'home':
                    pages.pageLoaded(page[0]).then(() => {
                        competitionsList()
                    })
                    break
                case 'liked':
                    pages.pageLoaded(page[0]).then(() => {
                        likedList()
                    })
                    break

            }
        }else{
            console.log('ada id')
            let id = page[1].substr(3)
            switch (page[0]){
                case 'matches':
                    pages.pageLoaded(page[0]).then(() => {
                        matchesLists(id)
                    })
                    break
                case 'standings':
                    pages.pageLoaded(page[0]).then(() => {
                        standingsList(id)
                    })
                    break
                case 'likedDetail':
                    pages.pageLoaded(page[0]).then(() => {
                        indexdb.getLikedById(Number(id)).then(res => {
                            likedDetailList(id, res)
                        })
                    })
                    break
            }
        }
        
    }
}

export default main