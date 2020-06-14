import "../component/competition-list.js"
import "../component/nav-bar.js"
import ballData from "../data/football.js"

const main = () => {

    const loadPage = page => {
        return fetch(`src/pages/${page}.html`, {mode: 'no-cors'})
        .then(response => response.text())
    }

    const pageLoaded = async url => {
        const thisPage = await loadPage(url)
        document.querySelector('#content').innerHTML = thisPage
    }

    const competitionsList = async () => {
        if('caches' in window){
            caches.match('https://api.football-data.org/v2/competitions').then(response => {
                if(response){
                    response.json().then(results => {
                        const result = results.competitions
                        const league = result.filter(league => league.id === 2001 || league.id === 2002 || league.id === 2003 || league.id === 2021 || league.id === 2014 || league.id === 2015)
                        console.log('menggunakan cache')
                        renderResultComp(league)
                    })
                }
            })
        }
        const results = await ballData.competitions()
        const leagues = results.filter(league => league.id === 2001 || league.id === 2002 || league.id === 2003 || league.id === 2021 || league.id === 2014 || league.id === 2015)
        renderResultComp(leagues)
    }

    const matchesLists = async id => {
        const results = await ballData.matches(id)
        const matches = results.matches
        const navBar = document.querySelector('nav-bar')
        navBar.leagueName = results.competition.name
        renderResultListMatch(matches)
        const tabLink = document.querySelectorAll('.tab-link')
        const backBtn = document.querySelector('.btn-home')
        backBtn.addEventListener('click', function(){
            let page = this.getAttribute('href').substr(1)
            competitionsList()
            pageLoaded(page)
        })
        console.log(tabLink)
        tabLink.forEach(tab => {
            tab.addEventListener('click', e => {
                standingsList(id)
                let page = e.target.getAttribute('href').substr(1)
                pageLoaded(page)
            })
        })
    }

    const standingsList = async id => {
        const results = await ballData.standings(id)
        const navBar = document.querySelector('nav-bar')
        navBar.leagueName = results.competition.name
        renderResultListStandings(results.standings[0].table)
        const tabLink = document.querySelectorAll('.tab-link')
        const backBtn = document.querySelector('.btn-home')
        backBtn.addEventListener('click', function(){
            let page = this.getAttribute('href').substr(1)
            competitionsList()
            pageLoaded(page)
        })
        console.log(tabLink)
        tabLink.forEach(tab => {
            tab.addEventListener('click', e => {
                matchesLists(id)
                let page = e.target.getAttribute('href').substr(1)
                pageLoaded(page)
            })
        })
    }

    const detailComp = items => {
        items.forEach(item => {
            item.addEventListener('click', e => {
                let page = e.target.parentNode.getAttribute("href").substr(1)
                matchesLists(e.target.id)
                pageLoaded(page)
            })
        })
    }

    const renderResultComp = result => {
        console.log(result)
        const compList = document.querySelector('competition-list')
        compList.competitions = result

        const compItem = document.querySelectorAll('competition-item')
        detailComp(compItem)
    }

    const renderResultListStandings = results => {
        if(results.length > 0){
            let component = ''
            results.forEach(result => {
                console.log(result)
                component += `
                    <div class="card-panel blue lighten-2 white-text">
                        <div class="row">
                            <div class="container">
                                <div class="col s12">
                                    <div class="team-standings" style="display: flex; align-items: center; justify-content: space-between;">
                                        <img src="${result.team.crestUrl}" alt="team" width="40">
                                        <h6><b>${result.team.name}</b></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row center-align">
                            <div class="col s2">
                                <p>M</p>
                            </div>
                            <div class="col s2">
                                <p>M</p>
                            </div>
                            <div class="col s2">
                                <p>S</p>
                            </div>
                            <div class="col s2">
                                <p>K</p>
                            </div>
                            <div class="col s2">
                                <p>GM</p>
                            </div>
                            <div class="col s2">
                                <p>POINT</p>
                            </div>
                        </div>
                        <div class="row center-align">
                            <div class="col s2">
                                <p>${result.playedGames}</p>
                            </div>
                            <div class="col s2">
                                <p>${result.won}</p>
                            </div>
                            <div class="col s2">
                                <p>${result.lost}</p>
                            </div>
                            <div class="col s2">
                                <p>${result.draw}</p>
                            </div>
                            <div class="col s2">
                                <p>${result.goalsFor}</p>
                            </div>
                            <div class="col s2">
                                <p>${result.points}</p>
                            </div>
                        </div>
                    </div>
                `
                document.querySelector('.standings-list').innerHTML = component
            })
            return
        }
        document.querySelector('.matches-list').innerHTML = "<h3 class='center-align white-text'>no standings</h3>"
    }

    const renderResultListMatch = results => {
        if(results.length > 0){
            let component = ''
            results.forEach(result => {
                if(result.score.winner === null){
                    result.score.winner = 'belum tanding'
                }
                component += `
                    <div class="card-panel blue lighten-2 white-text">
                        <div class="row center-align">
                            <div class="col s4">
                                <h6>${result.awayTeam.name}</h6>
                            </div>
                            <div class="col s4">
                                <h6>vs</h6>
                            </div>
                            <div class="col s4">
                                <h6>${result.homeTeam.name}</h6>
                            </div>
                        </div>
                        <div class="row center-align" style="margin: 0;">
                            <div class="col s4">
                                <p>${result.score.winner}</p>
                            </div>
                            <div class="col s4">
                                <p>${String(utcDateConv(result.utcDate)).substr(16, 5)}</p>
                            </div>
                            <div class="col s4">
                                <p>${String(utcDateConv(result.utcDate)).substr(0,16)}</p>
                            </div>
                        </div>
                    </div>
                `
                document.querySelector('.matches-list').innerHTML = component
            });

            const compItem = document.querySelectorAll('.competition-item')
            detailComp(compItem)
            return
        }
        document.querySelector('.matches-list').innerHTML = "<h3 class='center-align white-text'>no matches</h3>"
    }

    let page = window.location.hash.substr(1)

    if(page === ''){
        page = 'home'
        pageLoaded(page)
        competitionsList()
    }else{
        pageLoaded(page)
        competitionsList()
    }

    function utcDateConv(times){
        let uctTime = times.replace(/-/g, ",")
        let utc = uctTime.replace("T", ",")
        let time = utc.replace(/:/g, ",")
        let tm = time.substr(0, 19)
        let t = tm.split(',')
        return new Date(Date.UTC(t[0], t[1], t[2], t[3], t[4], t[5]))
    }
}

export default main