// Games listing page functionality

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
            
            // Reset category filter when searching
            if (searchTerm.length > 0) {
                const categoryBtns = document.querySelectorAll('.category-btn');
                categoryBtns.forEach(btn => btn.classList.remove('active'));
                document.querySelector('.category-btn[data-category="all"]').classList.add('active');
            }
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

// Add loading animation to play buttons
function initPlayButtonEffects() {
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.textContent;
            this.innerHTML = '⏳ Loading...';
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            // Reset after navigation (in case user comes back)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 3000);
        });
    });
}

// Random game suggestion
function addRandomGameFeature() {
    const gameCards = document.querySelectorAll('.game-card');
    
    // Add "Random Game" button
    const randomButton = document.createElement('button');
    randomButton.textContent = '🎲 Random Game';
    randomButton.className = 'category-btn';
    randomButton.style.background = 'linear-gradient(45deg, #FF6B6B, #4ECDC4)';
    
    randomButton.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * gameCards.length);
        const randomGame = gameCards[randomIndex];
        const playButton = randomGame.querySelector('.play-btn');
        
        // Highlight the random game
        randomGame.style.border = '3px solid #FFD700';
        randomGame.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
            randomGame.style.border = '2px solid transparent';
        }, 3000);
        
        // Optional: Auto-play after highlighting
        setTimeout(() => {
            playButton.click();
        }, 1500);
    });
    
    // Add to categories section
    const categoriesSection = document.querySelector('.categories');
    if (categoriesSection) {
        categoriesSection.appendChild(randomButton);
    }
}

// Initialize all functions when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initCategoryFiltering();
    initSearchFunction();
    initGameCardEffects();
    initPlayButtonEffects();
    addRandomGameFeature();
    
    // Add entrance animations
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100); // Staggered animation
    });
});
