// Individual Game Page JavaScript - Fixed Version

// Fullscreen functionality
function toggleFullscreen() {
    const gameWrapper = document.querySelector('.game-wrapper');
    const gameFrame = document.getElementById('gameFrame');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    
    if (!document.fullscreenElement) {
        // Enter fullscreen
        if (gameWrapper.requestFullscreen) {
            gameWrapper.requestFullscreen();
        } else if (gameWrapper.webkitRequestFullscreen) {
            gameWrapper.webkitRequestFullscreen();
        } else if (gameWrapper.msRequestFullscreen) {
            gameWrapper.msRequestFullscreen();
        }
        
        // Hide the fullscreen button completely when in fullscreen
        fullscreenBtn.style.display = 'none';
        
        // Focus the iframe to ensure it receives input
        setTimeout(() => {
            gameFrame.focus();
        }, 100);
        
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Listen for fullscreen changes
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const gameFrame = document.getElementById('gameFrame');
    
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // Exited fullscreen - show button again
        fullscreenBtn.style.display = 'block';
        fullscreenBtn.textContent = '⛶ Play Fullscreen';
        fullscreenBtn.style.position = 'static';
        fullscreenBtn.style.bottom = 'auto';
        fullscreenBtn.style.left = 'auto';
        fullscreenBtn.style.transform = 'none';
        fullscreenBtn.style.zIndex = 'auto';
        fullscreenBtn.style.width = '100%';
        fullscreenBtn.style.padding = '1rem';
    } else {
        // In fullscreen - keep button hidden and focus iframe
        fullscreenBtn.style.display = 'none';
        setTimeout(() => {
            gameFrame.focus();
        }, 100);
    }
}

// Hide fullscreen button on iOS devices
function checkMobileDevice() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn) {
            fullscreenBtn.style.display = 'none';
        }
    }
}

// Game loading indicator
function showGameLoading() {
    const gameFrame = document.getElementById('gameFrame');
    const loadingDiv = document.createElement('div');
    
    loadingDiv.innerHTML = `
        <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 1.5rem;
            text-align: center;
            z-index: 10;
        ">
            🎮 Loading Game...<br>
            <div style="font-size: 1rem; margin-top: 1rem; opacity: 0.8;">
                Please wait while the game loads
            </div>
        </div>
    `;
    
    loadingDiv.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 600px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const gameWrapper = document.querySelector('.game-wrapper');
    gameWrapper.style.position = 'relative';
    gameWrapper.appendChild(loadingDiv);
    
    // Remove loading screen after game loads
    gameFrame.addEventListener('load', function() {
        setTimeout(() => {
            if (loadingDiv.parentNode) {
                loadingDiv.remove();
            }
        }, 1000);
    });
}

// Related games hover effects
function initRelatedGamesEffects() {
    const relatedGameCards = document.querySelectorAll('.related-game-card');
    
    relatedGameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Enhanced keyboard shortcuts for fullscreen - but only when NOT in fullscreen
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Only handle shortcuts when not in fullscreen mode
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            // F11 for fullscreen (prevent default browser F11)
            if (event.key === 'F11') {
                event.preventDefault();
                toggleFullscreen();
            }
            
            // Ctrl+F for fullscreen alternative
            if (event.key === 'f' && event.ctrlKey) {
                event.preventDefault();
                toggleFullscreen();
            }
        } else {
            // In fullscreen mode, only ESC should exit
            if (event.key === 'Escape') {
                // Let the browser handle ESC naturally
                // Don't prevent default - browser will exit fullscreen
                return;
            }
            // Don't prevent any other keys in fullscreen - let the game handle them
        }
    });
}

// Prevent spacebar from triggering fullscreen when game has focus
function preventSpacebarFullscreen() {
    const gameFrame = document.getElementById('gameFrame');
    
    // Add event listener to prevent spacebar from bubbling up
    document.addEventListener('keydown', function(event) {
        // If we're in fullscreen and spacebar is pressed, make sure focus is on iframe
        if (event.key === ' ' && (document.fullscreenElement || document.webkitFullscreenElement)) {
            // Ensure the iframe has focus to receive the spacebar input
            gameFrame.focus();
        }
    });
}

// Enhanced focus management for iframe
function initGameFocus() {
    const gameFrame = document.getElementById('gameFrame');
    const gameWrapper = document.querySelector('.game-wrapper');
    
    // Click on game area should focus the iframe
    gameWrapper.addEventListener('click', function() {
        gameFrame.focus();
    });
    
    // Auto-focus iframe when page loads
    setTimeout(() => {
        gameFrame.focus();
    }, 1000);
}

// Initialize all functions when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    checkMobileDevice();
    showGameLoading();
    initRelatedGamesEffects();
    initKeyboardShortcuts();
    preventSpacebarFullscreen();
    initGameFocus();
    
    // Auto-scroll to game on mobile
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            const gameContainer = document.querySelector('.game-container');
            if (gameContainer) {
                gameContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }, 1000);
    }
});
