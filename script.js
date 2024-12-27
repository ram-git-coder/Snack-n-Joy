let cart = [];

// Function to add items to the cart
function addToCart(item, price) {
    cart.push({ item, price });
    updateCartDisplay();
}

// Update the cart display
function updateCartDisplay() {
    const orderList = document.getElementById('order-list');
    
    let cartHTML = '<ul>';
    let total = 0;

    cart.forEach(item => {
        cartHTML += <li>${item.item} - ₹${(item.price * 75).toFixed(2)}</li>; // Converted to INR
        total += item.price;
    });

    cartHTML += '</ul>';
    orderList.innerHTML = cartHTML;

    // Show the checkout button only if there are items in the cart
    const checkoutButton = document.getElementById('checkout-btn');
    if (cart.length > 0) {
        checkoutButton.style.display = 'block';  // Show the button
    } else {
        checkoutButton.style.display = 'none';  // Hide the button
    }
}

// Checkout function
function checkout(event) {
    event.preventDefault();  // Prevent default form submission

    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (!name || !mobile || !paymentMethod) {
        alert("Please fill all the details.");
        return false;
    }

    if (cart.length === 0) {
        alert("Please add items to your cart.");
        return false;
    }

    // Generate order number
    const orderNo = Math.floor(Math.random() * 10000);

    // Create order summary in a new window
    const orderTab = window.open('', '_blank');
    let orderSummary = `
        <html>
            <head>
                <title>Order Confirmation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                        margin: 0;
                        padding: 20px;
                    }
                    h2 {
                        color: #27AE60;
                    }
                    .order-details {
                        background-color: #fff;
                        padding: 20px;
                        margin-top: 20px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    ul {
                        list-style-type: none;
                        padding-left: 0;
                    }
                    li {
                        margin-bottom: 10px;
                    }
                    .total-price {
                        font-size: 1.5em;
                        color: #2C3E50;
                    }
                </style>
            </head>
            <body>
                <h2>Thank You for Your Order!</h2>
                <p>Your order has been successfully placed. Below are your order details:</p>
                <div class="order-details">
                    <p><strong>Order No:</strong> #${orderNo}</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Mobile:</strong> ${mobile}</p>
                    <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                    <h3>Your Order:</h3>
                    <ul>`;

    cart.forEach(item => {
        orderSummary += <li>${item.item} - ₹${(item.price * 75).toFixed(2)}</li>;
    });

    const totalAmount = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    orderSummary += `
                    </ul>
                    <p class="total-price"><strong>Total: ₹${(totalAmount * 75).toFixed(2)}</strong></p>
                    <p>We will contact you soon for delivery.</p>
                </div>
            </body>
        </html>
    `;
    orderTab.document.write(orderSummary);

    // Reset the page after checkout
    resetPage();
}

// Reset the page after checkout
function resetPage() {
    // Clear cart array and update display
    cart = [];
    updateCartDisplay();

    // Reset customer form fields
    document.getElementById('checkout-form').reset();

    // Optionally hide customer details form or show an empty cart message
    document.getElementById('customer-details').style.display = 'none';
    document.getElementById('order-list').innerHTML = '<p>Your cart is empty.</p>';
}