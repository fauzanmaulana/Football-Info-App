class matchItem extends HTMLElement{

    set match(match){
        this._match = match;
        this.isNoResult = ""
        this.render();
    }

    set noresult(message){
        this.isNoResult = message
    }

    utcDateConv(times){
        let uctTime = times.replace(/-/g, ",")
        let utc = uctTime.replace("T", ",")
        let time = utc.replace(/:/g, ",")
        let tm = time.substr(0, 19)
        let t = tm.split(',')
        return new Date(Date.UTC(t[0], t[1], t[2], t[3], t[4], t[5]))
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
                        <p>${String(this.utcDateConv(this._match.utcDate)).substr(16, 5)}</p>
                    </div>
                    <div class="col s4">
                        <p>${String(this.utcDateConv(this._match.utcDate)).substr(0,16)}</p>
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