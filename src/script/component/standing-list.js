import "./standing-item.js"

class standingList extends HTMLElement{
    set standings(standings){
        this._standings = standings
        this.render();
    }

    render(){
        this.innerHTML = "";
        if(this._standings != undefined){
            this._standings.forEach(standing => {
                const standingItemElement = document.createElement("standing-item")
                standingItemElement.id = standing.id
                standingItemElement.standing = standing
                this.appendChild(standingItemElement)
            })
        }else{
            console.log("not result")
        }
    }
}

customElements.define('standing-list', standingList)