import "./match-item.js"

class matchList extends HTMLElement{
    set matchs(matchs){
        this._matchs = matchs
        this.render();
    }

    render(){
        this.innerHTML = "";
        if(this._matchs.length > 0){
            this._matchs.forEach(match => {
                if(match.score.winner === null){
                    match.score.winner = 'belum tanding'
                }
                const matchItemElement = document.createElement("match-item")
                matchItemElement.id = match.id
                matchItemElement.match = match
                this.appendChild(matchItemElement)
            })
        }else{
            const matchItemElement = document.createElement("match-item")
            matchItemElement.noresult = "no matches"
            this.appendChild(matchItemElement)
        }
    }
}

customElements.define('match-list', matchList)