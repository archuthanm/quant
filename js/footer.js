class AppFooter extends HTMLElement {
    connectedCallback() {
        const currentYear = new Date().getFullYear();

        this.innerHTML = `
            <footer>
                <div class="footer-content">
                    <div class="social-links">
                        <a href="https://github.com/archuthanm" target="_blank">GitHub</a>
                        <a href="https://www.linkedin.com/in/archuthan-mohanathasan-63187424b/" target="_blank">LinkedIn</a>
                    </div>
                    <p class="copyright">&copy; ${currentYear} Archuthan Mohanathasan.</p>
                </div>
            </footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);