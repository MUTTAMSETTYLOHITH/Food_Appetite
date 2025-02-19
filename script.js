// Initialize an empty cart
let cart = [];

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('Cart');
    const totalPriceElement = document.getElementById('total-price');

    // Clear the current cart display
    cartContainer.innerHTML = '';

    // Add the updated cart items to the DOM
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button class="remove-btn" data-index="${index}">X</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    // Calculate the total price
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

    // Attach event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            cart.splice(index, 1); // Remove the item from cart
            updateCartDisplay(); // Update the display
        });
    });
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const itemName = this.getAttribute('data-name');
        const itemPrice = parseFloat(this.getAttribute('data-price'));

        // Add item to the cart array
        cart.push({ name: itemName, price: itemPrice });

        // Update the cart display
        updateCartDisplay();
    });
});

// Event listener for checkout button
document.getElementById('checkoutBtn').addEventListener('click', function () {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    alert('Proceeding to checkout with items: ' + JSON.stringify(cart));

    // Clear cart after checkout
    cart = [];
    updateCartDisplay();
});
