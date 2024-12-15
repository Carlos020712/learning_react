document.addEventListener('DOMContentLoaded', () => {
  renderCartItems();
  updateCartSummary();
});

// Function to render cart items dynamically
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <img src="images/plant${item.id}.jpg" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Unit Price: $${item.price.toFixed(2)}</p>
        <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div class="cart-item-quantity">
        <button onclick="updateQuantity('${item.id}', -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity('${item.id}', 1)">+</button>
      </div>
      <span class="cart-item-remove" onclick="removeItem('${item.id}')">&times;</span>
    `;
    cartItemsContainer.appendChild(itemElement);
  });
}

// Function to update item quantity
function updateQuantity(itemId, change) {
  const item = cart.find(product => product.id === itemId);
  if (item) {
    item.quantity += change;

    // Remove item if quantity is 0
    if (item.quantity <= 0) {
      removeItem(itemId);
    }
  }
  renderCartItems();
  updateCartSummary();
}

// Function to remove an item from the cart
function removeItem(itemId) {
  cart = cart.filter(product => product.id !== itemId);
  renderCartItems();
  updateCartSummary();
}

// Function to update cart summary (total items and cost)
function updateCartSummary() {
  const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
  const totalCost = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  document.getElementById('total-items').textContent = totalItems;
  document.getElementById('total-cost').textContent = totalCost.toFixed(2);
  document.getElementById('cart-count').textContent = totalItems;
}

// Checkout button event
document.getElementById('checkout-button').addEventListener('click', () => {
  if (cart.length > 0) {
    alert('Thank you for your purchase!');
    cart = [];
    renderCartItems();
    updateCartSummary();
  } else {
    alert('Your cart is empty.');
  }
});
