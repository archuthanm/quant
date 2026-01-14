document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Detection
    const isTechTheme = document.body.classList.contains('tech-theme');

    // 2. Typewriter Logic (Quant vs Tech)
    function initTypewriter() {
        const sloganTarget = document.querySelector("#typewriter-slogan");
        
        if(sloganTarget) {
            if(sloganTarget._typeit) sloganTarget._typeit.destroy();

            // Quant Strings (Navy/Teal Theme)
            const quantSlogans = [
                'From <span class="accent">CS theory</span> to <span class="accent">market models.</span>', 
                'Bridging <span class="accent">algorithms</span> and <span class="accent">assets.</span>',
                'Turning <span class="accent">data</span> into <span class="accent">decisions.</span>'
            ];

            // Tech/Engineering Strings (Black/Amber Theme)
            const techSlogans = [
                'Architecting <span class="accent">scalable</span> distributed systems.', 
                'Bridging <span class="accent">complexity</span> and <span class="accent">reliability.</span>',
                'Writing <span class="accent">clean code</span> for the modern web.'
            ];

            new TypeIt("#typewriter-slogan", {
                strings: isTechTheme ? techSlogans : quantSlogans,
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

            // Quant Bio Strings
            const quantBio = [
                'A <span class="accent">Computer Science</span> Undergraduate.',
                'A <span class="accent">Quantitative Analyst</span>.',
                'Driven by <span class="accent">Market Challenges</span>.',
                '<span class="accent">Theory.</span> <span class="accent">Models.</span> <span class="accent">Invest.</span>'
            ];

            // Tech Bio Strings
            const techBio = [
                'A <span class="accent">Full-Stack</span> Developer.',
                'A <span class="accent">Systems</span> Enthusiast.',
                'Driven by <span class="accent">Engineering Precision</span>.',
                '<span class="accent">Build.</span> <span class="accent">Deploy.</span> <span class="accent">Scale.</span>'
            ];

            new TypeIt("#typewriter-strings", {
                strings: isTechTheme ? techBio : quantBio,
                speed: 60,
                breakLines: false,
                nextStringDelay: 2000,
                loop: true,
                waitUntilVisible: true,
                cursorChar: "|", 
            }).go();
        }
    }

    // 3. Shared Finish Loading Function
    function finishLoading() {
        const loader = document.getElementById('loader-wrapper');
        const body = document.body;

        // Mark session as visited so we don't reload animation every time
        sessionStorage.setItem('portfolioVisited', 'true');

        if(loader) {
            loader.style.opacity = '0'; // Fade out
            setTimeout(() => {
                loader.style.display = 'none'; // Remove from flow
                body.classList.remove('loading-state');
                
                // Start Typewriter ONLY after loader is gone
                initTypewriter(); 
            }, 500); 
        } else {
            body.classList.remove('loading-state');
            initTypewriter();
        }
    }

    // 4. LOADER LOGIC CONTROLLER
    const loaderWrapper = document.getElementById('loader-wrapper');
    const techLog = document.getElementById('tech-boot-log'); // Element unique to Tech Loader
    const marketCanvas = document.getElementById('market-chart'); // Element unique to Quant Loader
    const progressBar = document.querySelector('.progress-fill'); 

    // A. Check if user has already seen the loader
    if (sessionStorage.getItem('portfolioVisited')) {
        if(loaderWrapper) loaderWrapper.style.display = 'none';
        document.body.classList.remove('loading-state');
        // Immediate Typewriter Start
        setTimeout(() => { initTypewriter(); }, 50);
    } 
    // B. If not visited, determine which loader to run
    else {
        document.body.classList.add('loading-state');

        // --- OPTION 1: TECH LOADER (System Boot) ---
        if (techLog && loaderWrapper) {
            const bootMessages = [
                "Connecting to distributed nodes...",
                "Allocating cloud resources...",
                "Compiling backend modules...",
                "Verifying system integrity...",
                "Initializing engineering environment..."
            ];
            
            let msgIndex = 0;
            
            // Speed of updates
            const interval = setInterval(() => {
                if (msgIndex < bootMessages.length) {
                    techLog.innerHTML = `${bootMessages[msgIndex]}<span class="cursor-blink">.</span>`;
                    msgIndex++;
                } else {
                    clearInterval(interval);
                    // Slight pause before revealing site
                    setTimeout(() => {
                        finishLoading();
                    }, 800); 
                }
            }, 500); // 500ms per message
        }

        // --- OPTION 2: QUANT LOADER (Market Chart) ---
        else if (marketCanvas && loaderWrapper) {
            const ctx = marketCanvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;
            const rect = marketCanvas.getBoundingClientRect();
            
            // Handle HiDPI screens
            marketCanvas.width = rect.width * dpr;
            marketCanvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            const candleWidth = 15; 
            const gap = 5;          
            const totalCandles = Math.floor(rect.width / (candleWidth + gap));
            
            // Draw Background Grid
            function drawGrid() {
                ctx.strokeStyle = '#1e2d4d'; // Keep grid dark blue/navy
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
                
                // Keep chart within bounds
                if (currentPrice < 50) currentPrice += 30;
                if (currentPrice > rect.height - 50) currentPrice -= 30;

                const isUp = close < open; // Note: In canvas Y grows downwards

                // Quant Colors: Green (Up) / Red (Down)
                const color = isUp ? '#00E396' : '#FF4560'; 

                ctx.strokeStyle = color;
                ctx.fillStyle = color;
                ctx.lineWidth = 2;

                // Draw Wick
                ctx.beginPath();
                ctx.moveTo(x + candleWidth / 2, high);
                ctx.lineTo(x + candleWidth / 2, low);
                ctx.stroke();

                // Draw Body
                const bodyHeight = Math.abs(open - close) < 1 ? 1 : open - close;
                ctx.fillRect(x, Math.min(open, close), candleWidth, Math.abs(bodyHeight));

                // Update Loading Bar
                const progressPct = ((candleCount + 1) / totalCandles) * 100;
                if (progressBar) progressBar.style.width = `${progressPct}%`;

                x += candleWidth + gap;
                candleCount++;

                // Loop
                setTimeout(() => requestAnimationFrame(drawCandle), 80); 
            }

            drawCandle();
        }
        
        // --- FALLBACK (If neither exists, just finish) ---
        else {
            finishLoading();
        }
    }

    // 5. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 6. Scroll Navigation Buttons (Up/Down)
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

    // 7. Custom Cursor Logic
    const cursor = document.getElementById('cursor');
    
    // Only activate custom cursor on non-touch devices
    if (cursor && window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const hoverTargets = document.querySelectorAll('a, button, .timeline-item, .card');
        
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