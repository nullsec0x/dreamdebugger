if (document.querySelector('.dream-page')) {
    const text = "Cognitive Fragment Detected... Initiating Debug Mode...";
    const typingText = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');
    const nextPageButton = document.getElementById('next-page-button');
    
    typingText.style.display = 'inline-block';
    cursor.style.position = 'relative';
    cursor.style.left = '-10px';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, Math.random() * 50 + 50);
        } else {
            cursor.style.transition = 'opacity 1.5s ease-out';
            cursor.style.opacity = '0';
            
            setTimeout(() => {
                nextPageButton.classList.add('visible');
            }, 1500);
        }
    }
    
    setTimeout(typeWriter, 1000);
}
document.addEventListener('click', () => {
    const audio = document.getElementById('bgAudio');
    if (audio) {
        audio.muted = false;
        audio.play().catch(e => console.log("Autoplay blocked:", e));
    }
}, { once: true });

function playGlitchSound() {
    new Audio('./assets/glitch_sound.mp3').play()
        .catch(e => console.log("Glitch sound failed:", e));
}

if (document.querySelector('.memory-page')) {
    const memoryTexts = [
        "The console was showing errors I'd never seen before...\nERR_DREAM_VIOLATION...\nWARNING: REALITY_CORRUPTION...",
        "I tried to debug but the lines kept shifting...\nVariables mutated when I looked away...\nStack traces pointed to places that didn't exist...",
        "Fragments of yesterday's code review linger...\n'This implementation shouldn't work'...\nyet it does... only in the dream...",
        "Somewhere between sleep and wakefulness,\nI found the bug...\nbut it escaped into the shadows of REM cycles..."
    ];

    const typingMemory = document.getElementById('typing-memory');
    const patchButton = document.getElementById('patch-button');
    const wakeupButton = document.getElementById('wakeup-button');

    typingMemory.innerHTML = '';
    
    const typingCursor = document.createElement('span');
    typingCursor.className = 'typing-cursor';
    typingCursor.innerHTML = '|';
    typingMemory.appendChild(typingCursor);

    let currentFragment = 0;
    let currentPosition = 0;
    let isTyping = true;
    
    function typeMemory() {
        if (!isTyping) return;
        
        if (currentFragment < memoryTexts.length) {
            if (currentPosition < memoryTexts[currentFragment].length) {
                const char = memoryTexts[currentFragment].charAt(currentPosition);
                if (char === '\n') {
                    typingMemory.insertBefore(document.createElement('br'), typingCursor);
                } else {
                    typingMemory.insertBefore(document.createTextNode(char), typingCursor);
                }
                currentPosition++;
                setTimeout(typeMemory, Math.random() * 30 + 30);
            } else {
                currentFragment++;
                currentPosition = 0;
                
                if (currentFragment < memoryTexts.length) {
                    typingMemory.insertBefore(document.createElement('br'), typingCursor);
                    typingMemory.insertBefore(document.createElement('br'), typingCursor);
                    setTimeout(typeMemory, 1000);
                } else {
                    setTimeout(() => {
                        patchButton.style.opacity = '1';
                        patchButton.style.pointerEvents = 'auto';
                        isTyping = false;
                    }, 1000);
                }
            }
        }
    }

    setTimeout(typeMemory, 1500);

    patchButton.addEventListener('click', (e) => {
        if (patchButton.style.opacity !== '1' || patchButton.disabled) return;
        
        patchButton.disabled = true;
        patchButton.innerHTML = "Patching corrupted dream fragments...";
        patchButton.style.width = patchButton.offsetWidth + 'px';
        
        setTimeout(() => {
            patchButton.style.opacity = '0';
            patchButton.style.pointerEvents = 'none';
            
            setTimeout(() => {
                patchButton.style.display = 'none';
                wakeupButton.style.display = 'block';
                wakeupButton.style.opacity = '1';
                wakeupButton.style.pointerEvents = 'auto';
            }, 500);
        }, 2500);
    });
}

if (document.querySelector('.wakeup-page')) {
    document.getElementById('wake-button').addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.transition = 'background-color 2s ease';
        document.body.style.backgroundColor = 'white';
        
        setTimeout(() => {
            window.location.href = e.target.href;
        }, 2000);
    });
}

if (document.querySelector('.error-page')) {
    const reconnectLink = document.querySelector('.error-page a');
    if (reconnectLink) {
        reconnectLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.altKey && e.key.toUpperCase() === 'U') {
        e.preventDefault();
        
        console.log("%cDREAM DEBUGGER SECRET:", "color: #ff80bf; font-size: 16px; font-weight: bold;");
        console.log("%cYou've found the hidden console message.%c\nIf you are reading this, you are awesome sauce :P", 
                   "color: #8aff80; font-size: 14px;", 
                   "color: #80b3ff; font-size: 12px;");
    }
});