// Games page functionality

// Game modal functions
function openGame(title, url) {
    const modal = document.getElementById('gameModal');
    const modalTitle = document.getElementById('modalTitle');
    const gameFrame = document.getElementById('gameFrame');
    
    modalTitle.textContent = title;
    gameFrame.src = url;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGame() {
    const modal = document.getElementById('gameModal');
    const gameFrame = document.getElementById('gameFrame');
    
    modal.style.display = 'none';
    gameFrame.src = '';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        closeGame();
    }
}

// ESC key to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeGame();
    }
});

// Category filtering
function initCategoryFiltering() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const gameCards = document.querySelectorAll('.game-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            gameCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Search functionality
function initSearchFunction() {
    const searchInput = document.getElementById('searchInput');
    const gameCards = document.querySelectorAll('.game-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            gameCards.forEach(card => {
                const gameTitle = card.querySelector('h3').textContent.toLowerCase();
                const gameDescription = card.querySelector('p').textContent.toLowerCase();
                
                if (gameTitle.includes(searchTerm) || gameDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Game card hover effects
function initGameCardEffects() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}

// Initialize all games page functions
document.addEventListener('DOMContentLoaded', function() {
    initCategoryFiltering();
    initSearchFunction();
    initGameCardEffects();
});

// Add loading animation to play buttons
function initPlayButtonEffects() {
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.innerHTML = '⏳ Loading...';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.innerHTML = 'Play Now';
                this.style.opacity = '1';
            }, 2000);
        });
    });
}

// Initialize play button effects
window.addEventListener('load', initPlayButtonEffects);