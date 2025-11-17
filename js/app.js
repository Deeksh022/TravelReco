// Sample destinations data
const destinations = [
    {
        id: 1,
        name: 'Bali, Indonesia',
        location: 'Indonesia',
        category: 'beach',
        image: 'https://source.unsplash.com/800x600/?bali',
        description: 'Famous for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.'
    },
    {
        id: 2,
        name: 'Santorini, Greece',
        location: 'Greece',
        category: 'beach',
        image: 'https://source.unsplash.com/800x600/?santorini',
        description: 'Known for its stunning sunsets, white-washed buildings, and crystal-clear waters.'
    },
    {
        id: 3,
        name: 'Swiss Alps',
        location: 'Switzerland',
        category: 'mountain',
        image: 'https://source.unsplash.com/800x600/?swiss-alps',
        description: 'Breathtaking mountain range known for skiing, hiking, and picturesque landscapes.'
    },
    {
        id: 4,
        name: 'Kyoto, Japan',
        location: 'Japan',
        category: 'city',
        image: 'https://source.unsplash.com/800x600/?kyoto',
        description: 'Famous for its numerous classical Buddhist temples, gardens, and traditional wooden houses.'
    },
    {
        id: 5,
        name: 'Paris, France',
        location: 'France',
        category: 'city',
        image: 'https://source.unsplash.com/800x600/?paris',
        description: 'The City of Light, famous for its art, fashion, gastronomy and culture.'
    },
    {
        id: 6,
        name: 'Banff National Park',
        location: 'Canada',
        category: 'mountain',
        image: 'https://source.unsplash.com/800x600/?banff',
        description: 'Canada\'s oldest national park, known for its turquoise lakes, mountains, and abundant wildlife.'
    }
];

// DOM Elements
const featuredContainer = document.getElementById('featured-destinations');
const destinationsContainer = document.getElementById('destinations-container');
const favoritesContainer = document.getElementById('favorites-container');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');

// State
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Initialize the app
function init() {
    if (featuredContainer) {
        displayFeaturedDestinations();
    }
    
    if (destinationsContainer) {
        displayAllDestinations();
        setupEventListeners();
    }
    
    if (favoritesContainer) {
        displayFavorites();
    }
    
    // Initialize profile modal
    setupProfileModal();
    
    // Update favorite count in profile
    updateFavoriteCount();
}

// Display featured destinations on the home page
function displayFeaturedDestinations() {
    const featured = [...destinations].slice(0, 3); // Get first 3 destinations as featured
    
    featuredContainer.innerHTML = featured.map(destination => `
        <div class="destination-card" data-id="${destination.id}">
            <img src="${destination.image}" alt="${destination.name}" class="destination-image">
            <div class="destination-info">
                <h3>${destination.name}</h3>
                <div class="destination-meta">
                    <span>${destination.location}</span>
                    <button class="favorite-btn" data-id="${destination.id}">
                        ${favorites.includes(destination.id) ? '❤️' : '🤍'}
                    </button>
                </div>
                <p>${destination.description}</p>
            </div>
        </div>
    `).join('');
    
    setupFavoriteButtons();
}

// Display all destinations on the destinations page
function displayAllDestinations(filteredDestinations = destinations) {
    if (!destinationsContainer) return;
    
    if (filteredDestinations.length === 0) {
        destinationsContainer.innerHTML = '<p class="empty-message">No destinations found matching your criteria.</p>';
        return;
    }
    
    destinationsContainer.innerHTML = filteredDestinations.map(destination => `
        <div class="destination-card" data-id="${destination.id}">
            <img src="${destination.image}" alt="${destination.name}" class="destination-image">
            <div class="destination-info">
                <h3>${destination.name}</h3>
                <div class="destination-meta">
                    <span>${destination.location} • ${destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}</span>
                    <button class="favorite-btn" data-id="${destination.id}">
                        ${favorites.includes(destination.id) ? '❤️' : '🤍'}
                    </button>
                </div>
                <p>${destination.description}</p>
            </div>
        </div>
    `).join('');
    
    setupFavoriteButtons();
}

// Display favorite destinations on the favorites page
function displayFavorites() {
    if (!favoritesContainer) return;
    
    const favoriteDestinations = destinations.filter(dest => favorites.includes(dest.id));
    
    if (favoriteDestinations.length === 0) {
        favoritesContainer.innerHTML = '<p class="empty-message">No favorites yet. Add some destinations to your favorites!</p>';
        return;
    }
    
    favoritesContainer.innerHTML = favoriteDestinations.map(destination => `
        <div class="destination-card" data-id="${destination.id}">
            <img src="${destination.image}" alt="${destination.name}" class="destination-image">
            <div class="destination-info">
                <h3>${destination.name}</h3>
                <div class="destination-meta">
                    <span>${destination.location} • ${destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}</span>
                    <button class="favorite-btn favorited" data-id="${destination.id}">
                        ❤️
                    </button>
                </div>
                <p>${destination.description}</p>
            </div>
        </div>
    `).join('');
    
    setupFavoriteButtons();
}

// Setup event listeners for search and filter
function setupEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('input', filterDestinations);
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', filterDestinations);
    }
}

// Filter destinations based on search and category
function filterDestinations() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const category = filterSelect ? filterSelect.value : 'all';
    
    const filtered = destinations.filter(destination => {
        const matchesSearch = destination.name.toLowerCase().includes(searchTerm) || 
                            destination.location.toLowerCase().includes(searchTerm) ||
                            destination.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = category === 'all' || destination.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    displayAllDestinations(filtered);
}

// Setup favorite buttons event listeners
function setupFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const destinationId = parseInt(button.getAttribute('data-id'));
            toggleFavorite(destinationId);
        });
    });
}

// Toggle a destination in favorites
function toggleFavorite(destinationId) {
    const index = favorites.indexOf(destinationId);
    
    if (index === -1) {
        // Add to favorites
        favorites.push(destinationId);
    } else {
        // Remove from favorites
        favorites.splice(index, 1);
    }
    
    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Update the UI
    if (featuredContainer) displayFeaturedDestinations();
    if (destinationsContainer) displayAllDestinations();
    if (favoritesContainer) displayFavorites();
    
    // Update favorite count in profile
    updateFavoriteCount();
}

// Setup profile modal functionality
function setupProfileModal() {
    const modal = document.getElementById('profileModal');
    const profileLinks = document.querySelectorAll('.profile-link');
    const closeModal = document.querySelector('.close-modal');
    
    // Open modal when profile is clicked
    profileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Handle edit profile button
    const editBtn = document.querySelector('.btn-edit');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            alert('Edit profile functionality will be implemented soon!');
        });
    }
    
    // Handle logout button
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            alert('Logout functionality will be implemented soon!');
        });
    }
}

// Update favorite count in profile modal
function updateFavoriteCount() {
    const favoriteCountElements = document.querySelectorAll('#favorite-count');
    favoriteCountElements.forEach(element => {
        element.textContent = favorites.length;
    });
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
