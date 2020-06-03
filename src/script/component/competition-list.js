import "./competition-item.js"

class CompList extends HTMLElement{
    set competitions(competitions){
        this._competitions = competitions
        this.render();
    }

    render(){
        this.innerHTML = "";
        if(this._competitions != undefined){
            this._competitions.forEach(competition => {
                const competitionItemElement = document.createElement("competition-item")
                competitionItemElement.id = competition.id
                competitionItemElement.competition = competition
                this.appendChild(competitionItemElement)
            })
        }else{
            console.log("not result")
        }
    }
}

customElements.define('competition-list', CompList)