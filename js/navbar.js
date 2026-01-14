class AppNavbar extends HTMLElement {
    connectedCallback() {
        const prefix = this.getAttribute('prefix') || '';
        const currentPage = this.getAttribute('current-page') || 'quant'; 
        
        // Check if we are currently on a project page (sub-page)
        const isProjectPage = this.hasAttribute('is-project');

        // Logic to determine the switch button destination
        const isQuant = currentPage === 'quant';
        const homePageFile = isQuant ? 'index.html' : 'tech.html';
        
        const switchTarget = isQuant ? 'tech.html' : 'index.html';
        const switchLabel = isQuant ? 'Switch to: Engineer' : 'Switch to: Quant';
        const switchIcon = isQuant ? '⚡' : 'π'; 

        // 1. DETERMINE LINK PATH
        const linkBase = isProjectPage ? `${prefix}${homePageFile}` : '';

        // 2. GENERATE NAV LINKS DYNAMICALLY
        // Start with the common links (About & Lab)
        let navLinksHTML = `
            <li><a href="${linkBase}#about">01. About</a></li>
            <li><a href="${linkBase}#lab">02. Lab</a></li>
        `;

        // Only add '03. Projects' if we are in Quant mode (index.html)
        if (isQuant) {
            navLinksHTML += `<li><a href="${linkBase}#projects">03. Projects</a></li>`;
        }

        // Add Contact link
        // Dynamic numbering: '04' if Projects exists, '03' if it doesn't
        const contactNum = isQuant ? '04' : '03';
        
        navLinksHTML += `<li><a href="${linkBase}#contact">${contactNum}. Contact</a></li>`;

        const switchBtnStyle = `
            border: 1px solid var(--accent);
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        `;

        this.innerHTML = `
            <nav class="navbar">
                <div class="logo">
                    <span class="cursor">></span> 
                    <a href="${prefix}${homePageFile}">AM</a>
                </div>
                
                <ul class="nav-links">
                    ${navLinksHTML}
                    <li>
                        <a href="${prefix}${switchTarget}" style="${switchBtnStyle}">
                            <span>${switchIcon}</span> ${switchLabel}
                        </a>
                    </li>
                </ul>
            </nav>
        `;
    }
}
customElements.define('app-navbar', AppNavbar);