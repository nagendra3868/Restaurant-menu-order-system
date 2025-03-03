let cart = [];
let wishlist = [];
let total = 0.00;
let orders = [];
let orderTimerInterval;
const menuItems = [
    { name: 'Caesar Salad', price: 150, img: 'https://pinchandswirl.com/wp-content/uploads/2022/01/Caesar-Salad-sq.jpg', category: 'Starters' },
    { name: 'Bruschetta', price: 120, img: 'https://i0.wp.com/spainonafork.com/wp-content/uploads/2017/11/bruschetta411.png?fit=750%2C750&ssl=1', category: 'Starters' },
    { name: 'Steak', price: 500, img: 'https://whitneybond.com/wp-content/uploads/2021/06/steak-marinade-13.jpg', category: 'Main Courses' },
    { name: 'Grilled Salmon', price: 450, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDWLZKRRL9cWQv4R6k0yCby9lvjUj0I9mwXw&s', category: 'Main Courses' },
    { name: 'Mashed Potatoes', price: 100, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8q-op9NeW9uF_cHP_o-dbEmO258bLRdM6Q&s', category: 'Side Dishes' },
    { name: 'Roasted Vegetables', price: 150, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdDfg8DMtu7mErDQqB3rVql-1wglrvHA4gsw&s', category: 'Side Dishes' },
    { name: 'Cheesecake', price: 200, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Td7SPAXtoRpotkIRxI1-Pfw3s4URpz1NjQ&s', category: 'Desserts' },
    { name: 'Chocolate Cake', price: 220, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM2jWA0VaTu_McECyx9xloy_Socgev8HoIag&s', category: 'Desserts' }
];

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    updateBackgroundImage(sectionId);
}

function updateBackgroundImage(sectionId) {
    const body = document.querySelector('body');
    switch (sectionId) {
        case 'about':
        body.style.backgroundImage = 'url("https://thumbs.dreamstime.com/b/abstract-food-background-ingredients-such-as-fruits-sweets-berries-pastel-colors-abstract-food-background-314327365.jpg")'
            break;
        case 'menu':
            body.style.backgroundImage ='url("https://t4.ftcdn.net/jpg/02/78/69/37/360_F_278693728_O7t0fe2oDwwucHisBR1i8UhVxE5N229G.jpg)")'
            break;
        case 'wishlist':
            body.style.backgroundImage = 'url("https://img.freepik.com/premium-photo/pizza-drawing-italian-cuisine-drawing-pizzeria-illustration-cafe-restaurant-menu-item_1022029-39269.jpg")';
            break;
        case 'cart':
            body.style.backgroundImage = 'url("https://c0.wallpaperflare.com/preview/169/14/567/breakfast-colorful-colors-donuts.jpg")';
            break;
        case 'owner-login':
            body.style.backgroundImage = 'url("https://img.freepik.com/premium-photo/food-cooking-background-grey-stone-rustic-table-with-fresh-ingredients-vegetables-herbs-spices-olive-oil-kitchen-spoon-from-with-space-text_92134-2352.jpg")';
            break;
        case 'owner-dashboard':
            body.style.backgroundImage = 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzPZynQlFt0D_s9mC-gI516lgXHHl0yyuo5g&s")';
            break;
        default:
            body.style.backgroundImage = 'none';
            break;
    }
}

function addToCart(itemName, itemPrice) {
    const itemElement = [...document.querySelectorAll('.menu-item')].find(el => el.querySelector('.item-name').textContent.trim() === itemName);

    if (itemElement) {
        const quantity = parseInt(itemElement.querySelector('.item-quantity').value, 10);
        if (quantity > 0) {
            const cartItem = cart.find(cartItem => cartItem.item === itemName);
            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                cart.push({ item: itemName, price: itemPrice, quantity });
            }
            total += itemPrice * quantity;
            updateCart();
        } else {
            alert('Please enter a valid quantity.');
        }
    } else {
    console.error(`Item element not found for:${itemName}`);
    }
}

function addToWishlist(itemName) {
    if (!wishlist.includes(itemName)) {
        wishlist.push(itemName);
        updateWishlist();
        updateWishlistCount();
    } else {
        alert(`${itemName} is already in the wishlist.`);
    }
}

function removeFromWishlist(itemName) {
    const index = wishlist.indexOf(itemName);
    if (index !== -1) {
        wishlist.splice(index, 1);
        updateWishlist();
        updateWishlistCount();
    }
}

function updateCart() {
    const cartList = document.getElementById('cart-list');
    const totalPrice = document.getElementById('total-price');

    cartList.innerHTML = '';
    cart.forEach(cartItem => {
        const li = document.createElement('li');
        li.textContent =` ${cartItem.item} x ${cartItem.quantity} - ₹${(cartItem.price * cartItem.quantity).toFixed(2)}`;
        cartList.appendChild(li);
    });

    totalPrice.textContent = total.toFixed(2);
}

function updateWishlist() {
    const wishlistList = document.getElementById('wishlist-list');
    wishlistList.innerHTML = '';
    wishlist.forEach(itemName => {
        const menuItem = menuItems.find(item => item.name === itemName);
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${menuItem.img}" alt="${itemName}" class="wishlist-image">
            ${itemName}
        `;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromWishlist(itemName);
        li.appendChild(removeButton);
        wishlistList.appendChild(li);
    });
}

function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlist-count');
    wishlistCount.textContent = wishlist.length;
}

function placeOrder() {
    const tableNumber = document.getElementById('table-number').value;
    alert(`Order placed for table number ${tableNumber}!\nTotal: ₹${total.toFixed(2)}`);

    const newOrder = {
        table: tableNumber,
        items: [...cart],
        total: total,
        delivered: false
    };
    orders.push(newOrder);

    startOrderTimer();

    cart = [];
    total = 0.00;
    updateCart();

    displayOrders();

    saveOrdersToDatabase();
}

function startOrderTimer() {
    clearInterval(orderTimerInterval);
    let countdown = 600; // 10 minutes in seconds
    let timerElement = document.getElementById('order-timer');

    if (!timerElement){
    timerElement = document.createElement('p');
    timerElement.id = 'order-timer';
    document.getElementById('cart').appendChild(timerElement);
    }

    orderTimerInterval = setInterval(() => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        timerElement.textContent =`Time remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (countdown > 0) {
            countdown--;
        } else {
            clearInterval(orderTimerInterval);
            alert('Order time has expired.');
            cart = [];
            total = 0.00;
            updateCart();
            timerElement.remove();
        }
    }, 1000);
}

function ownerLogin() {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username === 'nagendrakondramuchu@gmail.com' && password === '12345678') {
        showSection('owner-dashboard');
        displayOrders();
        displayMenuItemsOwner();
    } else {
        alert('Invalid login credentials');
    }
}

function saveOrdersToDatabase() {
    fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            table: document.getElementById('table-number').value,
            items: cart,
            total: total
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function displayOrders() {
    const ordersList = document.getElementById('orders');
    ordersList.innerHTML = '';

    orders.forEach((order, index) => {
        const li = document.createElement('li');
        li.textContent = `Table ${order.table}: ${order.items.map(i =>`${i.item} x ${i.quantity}`).join(', ')} - Total: ₹${order.total.toFixed(2)}`;
        const button = document.createElement('button');
        button.textContent = 'Mark as Delivered';
        button.disabled = order.delivered;
        button.style.backgroundColor = order.delivered ? 'green' : ''; // Change button color if delivered
        button.onclick = () => {
            markAsDelivered(index);
            button.style.backgroundColor = 'green'; // Change button color after clicking
        };
        li.appendChild(button);
        ordersList.appendChild(li);
    });
}

function markAsDelivered(index) {
    orders[index].delivered = true;
    displayOrders();

    const currentTableNumber = document.getElementById('table-number').value;
    if (orders[index].table === currentTableNumber) {
    clearInterval(orderTimerInterval); // Stop the current timer
    cart = []; // Reset the cart
    total = 0.00; // Reset the total
    updateCart(); // Update the cart display
    document.getElementById('order-timer').remove(); // Remove the timer element
}
}

function addNewItem() {
    const newItemName = prompt('Enter item name:');
    const newItemPrice = prompt('Enter item price:');
    const newItemImg = prompt('Enter item image URL:');
    const newItemCategory = prompt('Enter item category:');

    if (newItemName && newItemPrice && newItemImg && newItemCategory) {
        const newItem = { name: newItemName, price: parseFloat(newItemPrice), img: newItemImg, category: newItemCategory };
        console.log('Adding new item:', newItem);
        menuItems.push(newItem);
        console.log('Updated menu items:', menuItems);
        displayMenuItems();
        displayMenuItemsOwner();
    }
}

function displayMenuItems() {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = '';

    const categories = ['Starters', 'Main Courses', 'Side Dishes', 'Desserts'];
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'menu-category';
        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = category;
        categoryDiv.appendChild(categoryHeader);

        menuItems.filter(item => item.category === category).forEach(item => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="food-image">
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">₹${item.price}</span>
                    <input type="number" value="1" min="1" class="item-quantity">
                    <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
                    <button onclick="addToWishlist('${item.name}')">Add to Wishlist</button>
                </div>
            `;
            categoryDiv.appendChild(div);
        });

        menuContainer.appendChild(categoryDiv);
    });
}

function displayMenuItemsOwner() {
    const menuContainer = document.getElementById('menu-items-owner');
    menuContainer.innerHTML = '';

    menuItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="food-image">
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="item-price">₹${item.price}</span>
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </div>
        `;
        menuContainer.appendChild(div);
    });
}

function editItem(index) {
    const newItemName = prompt('Enter new item name:', menuItems[index].name);
    const newItemPrice = prompt('Enter new item price:', menuItems[index].price);
    const newItemImg = prompt('Enter new item image URL:', menuItems[index].img);
    const newItemCategory = prompt('Enter new item category:',menuItems[index].category);

    if (newItemName && newItemPrice && newItemImg) {
        menuItems[index] = { name: newItemName, price: parseFloat(newItemPrice), img: newItemImg ,category: newItemCategory };
        displayMenuItems();
        displayMenuItemsOwner();
    }
}

function deleteItem(index) {
    menuItems.splice(index, 1);
    displayMenuItems();
    displayMenuItemsOwner();
}

function saveOrdersToDatabase() {
    // Logic to save orders to the database or local storage
}

displayMenuItems();              

