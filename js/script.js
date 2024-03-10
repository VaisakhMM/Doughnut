let cartItems = [];
let cartTotal = 0;
let cartCount = 0;
let wishlistCount = 0;

function addToCart(productName, price) {
    
    const existingItem = cartItems.find(item => item.name === productName);

    if (existingItem) {
      
        existingItem.quantity++;
    } else {
       
        cartItems.push({ name: productName, price: price, quantity: 1 });
    }

    cartCount++;
    updateCart();
    toggleSidebar(true);
}

function updateCart() {
    let cartItemsElement = document.querySelector('.cart-tems');
    let cartTotalElement = document.querySelector('.cart-total');

    cartItemsElement.innerHTML = '';

    cartTotal = 0;
    cartItems.forEach((item, index) => {
        cartTotal += item.price;
        cartItemsElement.innerHTML += `
            <div>${item.name} - $${item.price.toFixed(0)}
                <button class="delete-item" onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>`;
    });

    cartTotalElement.textContent = `$${cartTotal.toFixed(3)}`;
    updateCartCount();
}

function checkout() {
    Swal.fire({
        title: "Good job!",
        text: "Your item has successfully purchased",
        icon: "success"
    });
    cartItems = [];
    cartCount = 0;
    updateCartCount();
    updateCart();
    toggleSidebar(false);
}

function removeFromCart(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You want to remove this item from your cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!"
    }).then((result) => {
        if (result.isConfirmed) {
            cartItems.splice(index, 1);
            cartCount--;
            updateCart();
            Swal.fire({
                title: "Removed!",
                text: "The item has been removed from your cart.",
                icon: "success"
            });
        }
    });
}

function updateCartCount() {
    document.querySelector('.whistlist .cart span').textContent = cartCount;
}

function updateWishlistCount() {
    document.querySelector('.whistlist span').textContent = wishlistCount;
}

function toggleSidebar(show) {
    var sidebar = document.querySelector('.sidebar');
    sidebar.style.display = show ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    toggleSidebar(false);
});

document.querySelector('.sidebar-close').addEventListener('click', function () {
    toggleSidebar(false);
});



var checkoutButton = document.querySelector('.Checkout-btn');
checkoutButton.addEventListener('click', checkout);

var addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        console.log('Add to Cart button clicked');
        var card = button.closest('.card');
        var productName = card.querySelector('h3').textContent;
        var price = parseFloat(card.querySelector('.price').textContent.replace('$', ''));

        addToCart(productName, price);
    });
});

document.querySelectorAll('.add-to-wishlist').forEach(function (button) {
    button.addEventListener('click', addToWishlist);
});


