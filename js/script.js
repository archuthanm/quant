document.addEventListener('DOMContentLoaded', () => {

    function initTypewriter() {
        const sloganTarget = document.querySelector("#typewriter-slogan");
        if(sloganTarget) {
            if(sloganTarget._typeit) sloganTarget._typeit.destroy();

            new TypeIt("#typewriter-slogan", {
                strings: [
                    'From <span class="accent">CS theory</span> to <span class="accent">market models.</span>', 
                    'Bridging <span class="accent">algorithms</span> and <span class="accent">assets.</span>',
                    'Turning <span class="accent">data</span> into <span class="accent">decisions.</span>'
                ],
                speed: 60,
                breakLines: false,
                nextStringDelay: 3000,
                loop: true,
                waitUntilVisible: true,
                cursorChar: "|", 
            }).go();
        }

        const aboutTarget = document.querySelector("#typewriter-strings");
        if(aboutTarget) {
            if(aboutTarget._typeit) aboutTarget._typeit.destroy();

            new TypeIt("#typewriter-strings", {
                strings: [
                    'A <span class="accent">Computer Science</span> Undergraduate.',
                    'A <span class="accent">Quantitative Analyst</span>.',
                    'Driven by <span class="accent">Market Challenges</span>.',
                    'A <span class="accent">Data-Driven</span> Thinker.',
                    '<span class="accent">Theory.</span> <span class="accent">Models.</span> <span class="accent">Invest.</span>'
                ],
                speed: 60,
                breakLines: false,
                nextStringDelay: 2000,
                loop: true,
                waitUntilVisible: true,
                cursorChar: "|", 
            }).go();
        }
    }

    function finishLoading() {
        const loader = document.getElementById('loader-wrapper');
        const body = document.body;

        sessionStorage.setItem('portfolioVisited', 'true');

        setTimeout(() => {
            if(loader) loader.classList.add('loaded');
            body.classList.remove('loading-state');
            
            initTypewriter(); 
        }, 300); 
    }


    const loader = document.getElementById('loader-wrapper');
    const canvas = document.getElementById('market-chart');
    const progressBar = document.querySelector('.progress-fill'); 
    const body = document.body;

    if (sessionStorage.getItem('portfolioVisited')) {
        
        if(loader) loader.style.display = 'none';
        body.classList.remove('loading-state');
        
        setTimeout(() => {
            initTypewriter();
        }, 50);

    } 
    else {
        
        body.classList.add('loading-state');

        if (canvas && loader) {
            const ctx = canvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            const candleWidth = 15; 
            const gap = 5;          
            const totalCandles = Math.floor(rect.width / (candleWidth + gap));
            
            function drawGrid() {
                ctx.strokeStyle = '#1e2d4d';
                ctx.lineWidth = 1;
                ctx.beginPath();
                for (let i = 0; i <= rect.width; i += 60) {
                    ctx.moveTo(i, 0); ctx.lineTo(i, rect.height);
                }
                for (let j = 0; j <= rect.height; j += 60) {
                    ctx.moveTo(0, j); ctx.lineTo(rect.width, j);
                }
                ctx.stroke();
            }
            drawGrid();

            let currentPrice = rect.height / 2;
            let x = 0;
            let candleCount = 0;

            function drawCandle() {
                if (candleCount >= totalCandles) {
                    finishLoading();
                    return;
                }

                const volatility = 100; 
                const movement = (Math.random() - 0.5) * volatility;
                const open = currentPrice;
                const close = currentPrice + movement;
                const high = Math.max(open, close) + Math.random() * 10;
                const low = Math.min(open, close) - Math.random() * 10;

                currentPrice = close;
                if (currentPrice < 50) currentPrice += 30;
                if (currentPrice > rect.height - 50) currentPrice -= 30;

                const isUp = close < open; 
                const color = isUp ? '#00E396' : '#FF4560'; 

                ctx.strokeStyle = color;
                ctx.fillStyle = color;
                ctx.lineWidth = 2;

                ctx.beginPath();
                ctx.moveTo(x + candleWidth / 2, high);
                ctx.lineTo(x + candleWidth / 2, low);
                ctx.stroke();

                const bodyHeight = Math.abs(open - close) < 1 ? 1 : open - close;
                ctx.fillRect(x, Math.min(open, close), candleWidth, Math.abs(bodyHeight));

                const progressPct = ((candleCount + 1) / totalCandles) * 100;
                if (progressBar) progressBar.style.width = `${progressPct}%`;

                x += candleWidth + gap;
                candleCount++;

                setTimeout(() => requestAnimationFrame(drawCandle), 80);
            }

            drawCandle();
        }
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const sections = document.querySelectorAll('header, section');
    const upBtn = document.getElementById('up-btn');
    const downBtn = document.getElementById('down-btn');

    if(upBtn && downBtn) {
        function getCurrentSectionIndex() {
            let currentIndex = 0;
            let minDistance = Infinity;
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const distance = Math.abs(rect.top); 
                if (distance < minDistance) {
                    minDistance = distance;
                    currentIndex = index;
                }
            });
            return currentIndex;
        }

        downBtn.addEventListener('click', () => {
            const current = getCurrentSectionIndex();
            if (current < sections.length - 1) {
                sections[current + 1].scrollIntoView({ behavior: 'smooth' });
            }
        });

        upBtn.addEventListener('click', () => {
            const current = getCurrentSectionIndex();
            if (current > 0) {
                sections[current - 1].scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const cursor = document.getElementById('cursor');
    
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const hoverTargets = document.querySelectorAll('a, button, .timeline-item');
        
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            target.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }

});