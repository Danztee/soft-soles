let cart = [];

const cartContent = document.querySelector('.cart-content');
const cartTotal = document.querySelector('.cart-total');
const backBtn = document.querySelector('.back');

backBtn.addEventListener('click', () => {
  history.go(-1);
});

let cartItem = JSON.parse(localStorage.getItem('cart'));
console.log(cartItem);

const total = localStorage.getItem('cartTotal');
if (total !== null) {
  cartTotal.innerHTML = total;
}

// let item;
cartItem.forEach(item => {
  console.log(item);
  addcartItem(item);
});
// console.log(item);

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
                <h5>Black / 35</h5>
                </div>
                <div>
                <p class="price">$${item.price}</p>
                <div class="remove-item" data-id=${item.id}>remove</div>
                </div>
            </div>
            <div class="pagination cart-footer">
                <button data-id="prev" data-id=${item.id}>-</button>
                <button data-id="1" class="active" ${item.amount}>1</button>
                <button data-id="next" data-id=${item.id}>+</button>
            </div>
            <div class="cartborder"></div>`;
  cartContent.appendChild(div);
}
