let cart = [];

const cartContent = document.querySelector('.cart-content');
const cartTotal = document.querySelector('.cart-total');
const backBtn = document.querySelector('.back');

const clearCartBtn = document.querySelector('.clear-cart');

backBtn.addEventListener('click', () => {
  history.go(-1);
});

cart = JSON.parse(localStorage.getItem('cart'));

function setcartvalues() {
  let tempTotal = 0;
  let itemsTotal = 0;
  cart.map(item => {
    tempTotal += item.price * item.amount;
    itemsTotal += item.amount;
  });
  localStorage.setItem('cartTotal', JSON.stringify(tempTotal));
  localStorage.setItem('cartLength', JSON.stringify(itemsTotal));
  cartTotal.innerHTML = tempTotal;
}

const total = Number(localStorage.getItem('cartTotal'));
if (total !== null) {
  cartTotal.innerHTML = parseFloat(total.toFixed(2));
}

if (cart.length > 0) {
  clearCartBtn.classList.remove('none');
}

cart.forEach(item => {
  addcartItem(item);
});

function addcartItem(item) {
  const div = document.createElement('div');
  div.classList.add('bigcart');
  div.innerHTML = `
            <div class="cart-item">
                <img
                src=${item.image}
                alt="product"
                />
                <div>
                <h4>${item.title}</h4>
                <h5>Black / 36</h5>
                </div>
                <div>
                <p class="price">$${item.price}</p>
                <div class="remove-item" data-id=${item.id}>remove</div>
                </div>
            </div>
            <div class="pagination cart-footer">
                <button class="decrease" data-id=${item.id}>-</button>
                <button data-id="1" class="active" ${item.amount}>1</button>
                <button class="increase" data-id=${item.id}>+</button>
            </div>
            <div class="cartborder"></div>`;
  cartContent.appendChild(div);
}

clearCartBtn.addEventListener('click', () => {
  let cartItems = cart.map(item => item.id);
  console.log(cartItems);

  cartItems.forEach(id => {
    removeItem(id);
    setcartvalues();
    setcartvalues();
  });

  clearCartBtn.classList.add('none');
  cartContent.innerHTML = '';
});

// cart items logic
cartContent.addEventListener('click', e => {
  // remove single item
  if (e.target.classList.contains('remove-item')) {
    let removeItem = e.target;
    let id = removeItem.dataset.id;
    let eachChild = removeItem.parentElement.parentElement.parentElement;
    cartContent.removeChild(eachChild);

    cart.forEach(singleItem => {
      if (singleItem.id == id) {
        const index = cart.findIndex(
          singleItemIndex => singleItemIndex.id === id
        );
        cart.splice(index, 1);
        console.log(cart);
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartLength', JSON.stringify(cart.length));
    setcartvalues();
  }
  // second if-else here
});

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartLength', JSON.stringify(cart.length));
}
