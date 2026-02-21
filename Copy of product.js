// ==========================================
// COFFEE SHOP PRODUCTS PAGE - STUDENT LAB
// ==========================================
// Your mission: Fetch coffee data from an API and display it as cards

// This array will store all our coffee data
let allCoffees = [];

// ==========================================
// TODO #1: FETCH DATA FROM API
// ==========================================
async function fetchCoffees() {
    try {
        // STEP 1: Fetch data from the API
        // API URL: 'https://api.sampleapis.com/coffee/hot'
        // HINT: const response = await fetch('URL_HERE');
        const response = // YOUR CODE HERE
        
        // STEP 2: Convert response to JSON
        // HINT: const data = await response.json();
        const data = // YOUR CODE HERE
        
        // ==========================================
        // TODO #2: TRANSFORM THE DATA
        // ==========================================
        // The API returns coffee objects with these properties:
        // - id, title, description, ingredients, image
        // 
        // We need to transform them to:
        // - id, name, description, category, ingredients, image_url
        //
        // Use .map() to transform each coffee object:
        // HINT: allCoffees = data.map(coffee => ({ ... }));
        
        allCoffees = data.map(coffee => ({
            id: coffee.id,
            name: // YOUR CODE HERE (use coffee.title)
            description: // YOUR CODE HERE
            category: getCoffeeCategory(coffee.title, coffee.ingredients),
            ingredients: // YOUR CODE HERE
            image_url: // YOUR CODE HERE (use coffee.image)
        }));
        
        // Display all coffees when page loads
        displayCoffees(allCoffees);
        console.log('Loaded coffees from API:', allCoffees.length);
        
    } catch (error) {
        console.error('Error fetching coffees:', error);
        document.getElementById('product-grid').innerHTML = 
            '<p>Sorry, unable to load products. Please try again later.</p>';
    }
}

// ==========================================
// TODO #3: CATEGORIZE COFFEES
// ==========================================
// This function determines the category based on ingredients
function getCoffeeCategory(title, ingredients) {
    // Convert ingredients array to lowercase string
    const ingredientsStr = Array.isArray(ingredients) 
        ? ingredients.join(' ').toLowerCase() 
        : '';
    
    // Check if it contains 'espresso'
    // HINT: if (ingredientsStr.includes('espresso')) { return 'espresso'; }
    if (/* YOUR CODE HERE */) {
        return 'espresso';
    }
    
    // Check if it contains 'coffee'
    if (/* YOUR CODE HERE */) {
        return 'coffee';
    }
    
    // Everything else (tea, hot chocolate, etc.)
    return 'other';
}

// ==========================================
// TODO #4: DISPLAY COFFEE CARDS
// ==========================================
function displayCoffees(coffeesToShow) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; // Clear existing cards
    
    // Loop through each coffee
    coffeesToShow.forEach(coffee => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="YOUR CODE HERE CALL THE COFFEE IMAGE" alt="${coffee.name}">
            <h3> YOUR CODE HERE CALL THE COFFEE NAME </h3>
            <div class="product-info">
                <div class="description-section">
                    <p class="section-label">Description:</p>
                    <p class="section-content"> YOUR CODE HERE ADD THE DESCRIPTION INFORMATION </p>
                </div>
                <div class="ingredients-section">
                    <p class="section-label">Ingredients:</p>
                    <p class="section-content">${Array.isArray(coffee.ingredients) ? coffee.ingredients.join(', ') : coffee.ingredients}</p>
                </div>
            </div>
        `;
        
        // After formatting and adding the content to the card push it to the grid
        // HINT: productGrid.appendChild(productCard);
        // YOUR CODE HERE
    });
}

// ==========================================
// TODO #6: FILTER BY CATEGORY
// ==========================================
function filterByCategory(category) {
    if (category === 'all') {
        // Display all coffees
        // HINT: displayCoffees(allCoffees);
        // YOUR CODE HERE
    } else {
        // Filter coffees where category matches
        // HINT: const filtered = allCoffees.filter(c => c.category === category);
        const filtered = // YOUR CODE HERE
        displayCoffees(filtered);
    }
}

// ==========================================
// EVENT LISTENERS (Complete - No changes needed)
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

// ==========================================
// TESTING CHECKLIST
// ==========================================
// ✓ Coffee cards appear on page
// ✓ Each card shows: image, name, description, ingredients
// ✓ Filter buttons work correctly
// ✓ No errors in console (F12)