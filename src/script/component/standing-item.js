class standingItem extends HTMLElement{

    set standing(standing){
        this._standing = standing;
        this.render();
    }

    render(){
        this.innerHTML = `
        <div class="card-panel blue lighten-2 white-text">
            <div class="row">
                <div class="container">
                    <div class="col s12">
                        <div class="team-standings" style="display: flex; align-items: center; justify-content: space-between;">
                            <img src="${this._standing.team.crestUrl}" alt="team" width="40">
                            <h6><b>${this._standing.team.name}</b></h6>
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
                    <p>${this._standing.playedGames}</p>
                </div>
                <div class="col s2">
                    <p>${this._standing.won}</p>
                </div>
                <div class="col s2">
                    <p>${this._standing.lost}</p>
                </div>
                <div class="col s2">
                    <p>${this._standing.draw}</p>
                </div>
                <div class="col s2">
                    <p>${this._standing.goalsFor}</p>
                </div>
                <div class="col s2">
                    <p>${this._standing.points}</p>
                </div>
            </div>
        </div>
        `
    }
}

customElements.define("standing-item", standingItem);