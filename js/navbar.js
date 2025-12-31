class AppNavbar extends HTMLElement {
    connectedCallback() {
        const prefix = this.getAttribute('prefix') || '';
        const isProject = this.hasAttribute('is-project');

        let navLinksHTML;

        if (isProject) {
            navLinksHTML = `
                <li><a href="${prefix}index.html#projects">Back to Projects</a></li>
            `;
        } else {
            navLinksHTML = `
                <li><a href="${prefix}index.html#about">01. About</a></li>
                <li><a href="${prefix}index.html#projects">02. Models & Code</a></li>
                <li><a href="${prefix}index.html#contact">03. Contact</a></li>
            `;
        }

        this.innerHTML = `
            <nav class="navbar">
                <div class="logo">
                    <span class="cursor">></span> 
                    <a href="${prefix}index.html">AM</a>
                </div>
                <ul class="nav-links">
                    ${navLinksHTML}
                </ul>
            </nav>
        `;
    }
}

customElements.define('app-navbar', AppNavbar);