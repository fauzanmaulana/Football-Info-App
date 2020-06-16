class CompItem extends HTMLElement{

    set competition(competition){
        this._competition = competition;
        this.render();
    }

    render(){
        this.innerHTML = `
            <a href="#matches"><p id="${this._competition.id}" class="card-panel hoverable blue lighten-2 white-text">${this._competition.name}</p></a>
        `
    }
}

customElements.define("competition-item", CompItem);