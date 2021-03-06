class Navbar extends HTMLElement{
    connectedCallback(){
        this.render()
    }

    set leagueName(name){
        this.leaguename = name
        this.render()
    }

    set leagueId(id){
        this.id = id
        console.log(`ini dari component navbar ${this.id}`)
        this.render()
    }

    render(){
        this.innerHTML = `
            <div class="navbar-fixed">
                <nav class="nav-extended blue lighten-2">
                    <div class="nav-wrapper">
                        <div class="nav-info">
                            <a href="#home" class="btn-home">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="26" height="26"
                                viewBox="0 0 172 172"
                                style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ecf0f1"><path d="M70.08173,86l56.79928,-57.98798c2.53245,-2.58413 2.50661,-6.71875 -0.05169,-9.30288l-10.15565,-10.15565c-2.60997,-2.58413 -6.79628,-2.58413 -9.38041,0.02584l-72.27824,72.74339c-1.29207,1.29206 -1.9381,2.97176 -1.9381,4.67728c0,1.70553 0.64603,3.38522 1.9381,4.67728l72.27824,72.74339c2.58413,2.60997 6.77044,2.60997 9.38041,0.02584l10.15565,-10.15565c2.55829,-2.58413 2.58413,-6.71875 0.05169,-9.30288z"></path></g></g>
                                </svg>
                            </a>
                            <h6>${this.leaguename === undefined ? "wait.." : this.leaguename}</h6>
                        </div>
                    </div>
                    <div class="nav-content">
                        <ul class="tabs tabs-transparent">
                            <li class="tab"><a href="#matches?id=${this.id}" class="tab-link">Matches</a></li>
                            <li class="tab"><a href="#standings?id=${this.id}" class="tab-link">Standings</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        `
    }
}

customElements.define('nav-bar', Navbar)