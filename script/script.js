// Reveal Animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // ScrollSpy logic
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        // Form Logic
       emailjs.init("iwIzjRGHuMFCmbjj_");

        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
        
            const btn = this.querySelector('button');
            const status = document.getElementById('formStatus');
        
            btn.innerHTML = '<i class="fas fa-circle-notch animate-spin"></i> SENDING...';
            btn.disabled = true;
        
            const params = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            };
        
            emailjs.send(
                "service_x5fhnxp", 
                "template_rrfh9gl", 
                params
            )
            .then(function() {
            
                status.textContent = "Message sent! I will respond shortly.";
                status.classList.remove('hidden');
                status.classList.add('text-green-500');
            
                btn.innerHTML = "SENT!";
                btn.classList.replace('bg-blue-600','bg-green-600');
            
                document.getElementById('contactForm').reset();
            
            }, function(error) {
            
                status.textContent = "Failed to send message.";
                status.classList.remove('hidden');
                status.classList.add('text-red-500');
            
                btn.innerHTML = "SEND MESSAGE";
                btn.disabled = false;
            
            });
        });

        // Name Scramble Effect
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        const first = document.getElementById("scramble-first");
        const last = document.getElementById("scramble-last");

        const firstText = "DEV DEVESWAR";
        const lastText = "RANA";

        function scramble(element, finalText) {
        
            let iteration = 0;
        
            const interval = setInterval(() => {
            
                element.innerText = finalText
                    .split("")
                    .map((letter, index) => {
                    
                        if(index < iteration){
                            return finalText[index];
                        }
                    
                        return letters[Math.floor(Math.random() * 26)];
                    
                    })
                    .join("");
                
                if(iteration >= finalText.length){
                    clearInterval(interval);
                }
            
                iteration += 1/3;
            
            }, 30);
        }

        document.querySelector("h1").addEventListener("mouseover", () => {
            scramble(first, firstText);
            scramble(last, lastText);
        });

        // Theme Toggle
            const toggleBtn = document.getElementById("themeToggle")

toggleBtn.addEventListener("click",()=>{

    document.body.classList.toggle("light")

    const icon = toggleBtn.querySelector("i")

    if(document.body.classList.contains("light")){
        icon.classList.replace("fa-moon","fa-sun")
        initHalo(true)
    }else{
        icon.classList.replace("fa-sun","fa-moon")
        initHalo(false)
    }

})


    let vantaEffect

    function initHalo(light=false){

    if(vantaEffect) vantaEffect.destroy()

    vantaEffect = VANTA.HALO({
        el:"#about",
        mouseControls:false,
        touchControls:false,
        gyroControls:false,
        amplitudeFactor:0.7,
        size:0.65,

        baseColor:0x2563eb,
        backgroundColor: light ? 0xffffff : 0x030712,

        xOffset:0,
        yOffset:0.09
        })
    }

    initHalo(false)

     