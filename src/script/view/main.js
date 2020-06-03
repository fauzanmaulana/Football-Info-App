import "../component/competition-list.js"
import Datafilms from "../data/football.js"

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
        // if('caches' in window){
        //     caches.match('https://api.football-data.org/v2/competitions').then(response => {
        //         if(response){
        //             response.json().then(result => {
        //                 const compList = document.querySelector('competition-list')
        //                 compList.competitions = result
        //             })
        //         }
        //     })
        // }
        const results = await Datafilms.competitions()
        const leagues = results.filter(league => league.id === 2001 || league.id === 2002 || league.id === 2003 || league.id === 2021 || league.id === 2014 || league.id === 2015)
        renderResult(leagues)
    }

    const detailComp = items => {
        items.forEach(item => {
            item.addEventListener('click', e => {
                let page = e.target.parentNode.getAttribute("href").substr(1)
                pageLoaded(page)
            })
        })
    }

    const renderResult = result => {
        const compList = document.querySelector('competition-list')
        compList.competitions = result

        const compItem = document.querySelectorAll('competition-item')
        detailComp(compItem)
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
}

export default main