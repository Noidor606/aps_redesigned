document.addEventListener('DOMContentLoaded', () => {

    // --- Логика для анимации дождя на втором блоке ---
    const rainCanvas = document.getElementById('rain-canvas');
    if (rainCanvas) {
        const ctx = rainCanvas.getContext('2d');
        let drops = [];
        const section = document.getElementById('about');

        // Класс для капли
        class Drop {
            constructor(width, height) {
                this.x = Math.random() * width;
                this.y = Math.random() * height - height;
                this.speed = Math.random() * 4 + 2;
                this.length = Math.random() * 15 + 10;
                this.width = 1.5;
                this.color = 'rgba(52, 152, 219, 0.5)'; // Голубой цвет капель
            }

            draw(context) {
                context.beginPath();
                context.lineWidth = this.width;
                context.strokeStyle = this.color;
                context.moveTo(this.x, this.y);
                context.lineTo(this.x, this.y + this.length);
                context.stroke();
            }

            update(height) {
                this.y += this.speed;
                if (this.y > height) {
                    this.y = -this.length;
                }
            }
        }
        
        function setupCanvas() {
            rainCanvas.width = section.offsetWidth;
            rainCanvas.height = section.offsetHeight;
            drops = [];
            const dropsCount = Math.floor(rainCanvas.width / 25);
            for (let i = 0; i < dropsCount; i++) {
                drops.push(new Drop(rainCanvas.width, rainCanvas.height));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
            drops.forEach(drop => {
                drop.update(rainCanvas.height);
                drop.draw(ctx);
            });
            requestAnimationFrame(animate);
        }
        
        setupCanvas();
        animate();
        window.addEventListener('resize', setupCanvas);
    }


    // --- Логика для эффекта "прилипающей" шапки при скролле ---
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- Логика для бургер-меню ---
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    burger.addEventListener('click', () => {
        nav.classList.toggle('open');
        burger.classList.toggle('open');
    });
    
    // Закрывать меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
             nav.classList.remove('open');
             burger.classList.remove('open');
        });
    });


    // --- Логика для плавной анимации элементов при скролле ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
});