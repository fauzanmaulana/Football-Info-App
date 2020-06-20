class matchItem extends HTMLElement{

    set match(match){
        this._match = match;
        this.isNoResult = ""
        this.render();
    }

    set noresult(message){
        this.isNoResult = message
    }

    render(){
        if(this.isNoResult === ""){
            this.innerHTML = `
            <div class="card-panel blue lighten-2 white-text">
                <div class="row center-align">
                    <div class="col s4">
                        <h6>${this._match.awayTeam.name}</h6>
                    </div>
                    <div class="col s4">
                        <h6>vs</h6>
                    </div>
                    <div class="col s4">
                        <h6>${this._match.homeTeam.name}</h6>
                    </div>
                </div>
                <div class="row center-align" style="margin: 0;">
                    <div class="col s4">
                        <p>${this._match.score.winner}</p>
                    </div>
                    <div class="col s4">
                        <p>${new Date(this._match.utcDate).toLocaleTimeString('en-ID')}</p>
                    </div>
                    <div class="col s4">
                        <p>${new Date(this._match.utcDate).toLocaleDateString('en-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </div>
            </div>
            `
        }else{
            this.innerHTML = `<h3 class='center-align white-text'>${this.isNoResult}</h3>`
        }
    }
}

customElements.define("match-item", matchItem);