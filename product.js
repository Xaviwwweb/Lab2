// ==========================================
// COFFEE SHOP PRODUCTS PAGE - STUDENT LAB
// ==========================================

// This array will store all our coffee data
let allCoffees = [];

// BACKUP DATA: Used if the API is down
const backupMenu = [
    {
        id: 1,
        title: "Classic Black Coffee",
        description: "A smooth, medium-roast blend perfect for starting your morning.",
        ingredients: ["Coffee Bean Blend", "Hot Water"],
        image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=500"
    },
    {
        id: 2,
        title: "Rich Espresso",
        description: "A double shot of our premium dark roast with a thick, golden crema.",
        ingredients: ["Fine Ground Espresso"],
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=500"
    },
    {
        id: 3,
        title: "Vanilla Latte",
        description: "Creamy steamed milk and espresso with a hint of Madagascar vanilla.",
        ingredients: ["Espresso", "Steamed Milk", "Vanilla Syrup"],
        image: "https://images.unsplash.com/photo-1595434066389-99c30150914c?q=80&w=500"
    },
    {
        id: 4,
        title: "Caramel Macchiato",
        description: "Layered espresso and milk topped with a buttery caramel drizzle.",
        ingredients: ["Espresso", "Milk", "Caramel Sauce"],
        image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=500"
    }
];

// ==========================================
// TODO #1: FETCH DATA FROM API
// ==========================================
async function fetchCoffees() {
    try {
        // STEP 1: Fetch data from the API
        const response = await fetch('https://api.sampleapis.com/coffee/hot');
        
        // Check if API response is actually OK
        if(!response.ok) throw new Error("API Network error");

        // STEP 2: Convert response to JSON
        const data = await response.json();
        
        // ==========================================
        // TODO #2: TRANSFORM THE DATA
        // ==========================================
        allCoffees = data.map(coffee => ({
            id: coffee.id,
            name: coffee.title, 
            description: coffee.description,
            category: getCoffeeCategory(coffee.title, coffee.ingredients),
            ingredients: coffee.ingredients,
            image_url: coffee.image 
        }));
        
        displayCoffees(allCoffees);
        console.log('Loaded from Live API:', allCoffees.length);
        
    } catch (error) {
        console.warn('API Unavailable. Loading Backup Menu instead.', error);
        
        // If API fails, transform our backupMenu instead
        allCoffees = backupMenu.map(coffee => ({
            id: coffee.id,
            name: coffee.title,
            description: coffee.description,
            category: getCoffeeCategory(coffee.title, coffee.ingredients),
            ingredients: coffee.ingredients,
            image_url: coffee.image
        }));

        displayCoffees(allCoffees);
    }
}

// ==========================================
// TODO #3: CATEGORIZE COFFEES
// ==========================================
function getCoffeeCategory(title, ingredients) {
    const ingredientsStr = Array.isArray(ingredients) 
        ? ingredients.join(' ').toLowerCase() 
        : '';
    
    // Check if it contains 'espresso'
    if (ingredientsStr.includes('espresso') || title.toLowerCase().includes('espresso')) {
        return 'espresso';
    }
    
    // Check if it contains 'coffee'
    if (ingredientsStr.includes('coffee') || title.toLowerCase().includes('black')) {
        return 'coffee';
    }
    
    return 'other';
}

// ==========================================
// TODO #4: DISPLAY COFFEE CARDS
// ==========================================
function displayCoffees(coffeesToShow) {
    const productGrid = document.getElementById('product-grid');
    if(!productGrid) return;

    productGrid.innerHTML = ''; 
    
    coffeesToShow.forEach(coffee => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${coffee.image_url}" alt="${coffee.name}">
            <h3>${coffee.name}</h3>
            <div class="product-info">
                <div class="description-section">
                    <p class="section-label">Description:</p>
                    <p class="section-content">${coffee.description}</p>
                </div>
                <div class="ingredients-section">
                    <p class="section-label">Ingredients:</p>
                    <p class="section-content">${Array.isArray(coffee.ingredients) ? coffee.ingredients.join(', ') : coffee.ingredients}</p>
                </div>
            </div>
        `;
        
        // Push the card to the grid
        productGrid.appendChild(productCard);
    });
}

// ==========================================
// TODO #6: FILTER BY CATEGORY
// ==========================================
function filterByCategory(category) {
    if (category === 'all') {
        displayCoffees(allCoffees);
    } else {
        const filtered = allCoffees.filter(c => c.category === category);
        displayCoffees(filtered);
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    fetchCoffees();
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });
});