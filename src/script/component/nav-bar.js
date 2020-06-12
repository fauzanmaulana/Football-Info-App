class Navbar extends HTMLElement{
    connectedCallback(){
        this.render()
    }

    render(){
        this.innerHTML = `
            <div class="navbar-fixed">
                <nav class="nav-extended blue lighten-2">
                    <div class="nav-content">
                        <ul class="tabs tabs-transparent">
                            <li class="tab"><a href="#matches" class="tab-link">Matches</a></li>
                            <li class="tab"><a href="#standings" class="tab-link">Standings</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        `
    }
}

customElements.define('nav-bar', Navbar)