const foodItems = [
    { name: "🍕 Pizza", price: 12 },
    { name: "🍔 Burger", price: 8 },
    { name: "🌭 Hot Dog", price: 6 },
    { name: "🍟 Fries", price: 5 },
    { name: "🥗 Salad", price: 7 },
    { name: "🍝 Pasta", price: 10 },
    { name: "🍩 Donut", price: 3 },
    { name: "🍚 Rice Bowl", price: 9 },
    { name: "🥪 Sandwich", price: 6 },
    { name: "🍛 Curry", price: 11 }
];

const cart = {};

function addToCart(itemName, itemPrice) {
    if (cart[itemName]) {
        cart[itemName].quantity++;
    } else {
        cart[itemName] = { price: itemPrice, quantity: 1 };
    }
    updateCart();
}

function removeFromCart(itemName) {
    if (cart[itemName]) {
        if (cart[itemName].quantity > 1) {
            cart[itemName].quantity--;
        } else {
            delete cart[itemName];
        }
    }
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";
    let total = 0;

    Object.keys(cart).forEach(item => {
        const itemTotal = cart[item].price * cart[item].quantity;
        total += itemTotal;
        cartDiv.innerHTML += `
            <div class='cart-item'>
                <span>${item} x ${cart[item].quantity}</span>
                <span>$${itemTotal}</span>
                <button class='btn btn-danger btn-sm' onclick='removeFromCart("${item}")'>Remove</button>
            </div>`;
    });

    document.getElementById("total").textContent = total;
}

function printBill() {
    let billText = "Date & Time: " + new Date().toLocaleString() + "\n\nItems Purchased:\n";
    let total = 0;
    Object.keys(cart).forEach(item => {
        let itemTotal = cart[item].price * cart[item].quantity;
        total += itemTotal;
        billText += `${item} x ${cart[item].quantity} = $${itemTotal}\n`;
    });
    billText += `\nTotal: $${total}`;
    let printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write('<pre>' + billText + '</pre>');
    printWindow.document.close();
    printWindow.print();
}

function renderMenu() {
    const menuDiv = document.getElementById("menu");
    foodItems.forEach(item => {
        const foodDiv = document.createElement("div");
        foodDiv.classList.add("menu-item");
        foodDiv.innerHTML = `
            <span>${item.name}</span><span>$${item.price}</span> 
            <button class='btn btn-primary btn-sm' onclick='addToCart("${item.name}", ${item.price})'>Add</button>`;
        menuDiv.appendChild(foodDiv);
    });
}

renderMenu();