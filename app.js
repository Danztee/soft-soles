const about = document.querySelector('.about');
const btns = document.querySelectorAll('.tab-btn');
const articles = document.querySelectorAll('.content');

about.addEventListener('click', function (e) {
  const id = e.target.dataset.id;
  if (id) {
    // remove selected from other buttons
    btns.forEach(function (btn) {
      btn.classList.remove('active');
    });
    e.target.classList.add('active');
    // hide other articles
    articles.forEach(function (article) {
      article.classList.remove('active');
    });
    const element = document.getElementById(id);
    element.classList.add('active');
  }
});

let productGet = JSON.parse(localStorage.getItem('EachProd'));

const container = document.querySelector('.desc-container');

function descTransfer(decsPage) {
  const div = document.createElement('div');
  div.classList.add('first-des');

  div.innerHTML = `
        <div class="first-box">
          <img
            src=${decsPage.image}
            alt="responsible"
            class="product-desc"
          />
          <div class="small img-container">
            <img src=${decsPage.image} alt="" class="small-img" />
            <img src=${decsPage.image} alt="" class="small-img" />
            <img src=${decsPage.image} alt="" class="small-img" />
            <img src=${decsPage.image} alt="" class="small-img" />
          </div>
        </div>
        <div class="second-box">
          <h3>${decsPage.title}</h3>
          <p class="pri">$${decsPage.price}</p>
          <div class="star-reviews">
            <img src="./star.svg" alt="" />
            <img src="./star.svg" alt="" />
            <img src="./star.svg" alt="" />
            <img src="./star.svg" alt="" />
            <img src="./star.svg" alt="" />
            <a href="#reviews" class="revs">Read Reviews</a>
          </div>
          <div class="border-p"></div>
          <p>Black</p>
          <ul class="radio">
            <input type="radio" name="in" />
            <input type="radio" name="in" />
          </ul>
          <div class="pag">
            <p>size</p>
            <button data-id="1">35</button>
            <button data-id="2" class="active">36</button>
            <button data-id="3">37</button>
            <button data-id="4">38</button>
            <button data-id="5">39</button>
            <button data-id="5">40</button>
          </div>
          <p class="wat">What size should i order?</p>
          <div class="btn">
            <b href="cart.html"><button class="prev-btn" data-id="${decsPage.id}">Add to cart+</button></b>
            <button class="prev-btn black">Buy it now</button>
          </div>
        </div>`;
  container.appendChild(div);
}

descTransfer(productGet);

let buttonsDom = [];
const buttons = [...document.querySelectorAll('.bag-btn')];
buttonsDom = buttons;

buttons.forEach(button => {
  let id = button.dataset.id;
  button.addEventListener('click', e => {
    // get the product
    let decsPage = getProduct(id);
    localStorage.setItem('EachProd', JSON.stringify(decsPage));
  });
});

function getProduct(id) {
  let products = JSON.parse(localStorage.getItem('products'));
  return products.find(product => product.id === id);
}

const reviewsScrl = document.querySelector('.revs');
const contentDesc = document.querySelector('.content');
const contentrev = document.getElementById('reviews');

reviewsScrl.addEventListener('click', () => {
  document.querySelector('.somel').classList.remove('active');
  contentDesc.classList.remove('active');
  document.querySelector('.somer').classList.add('active');
  contentrev.classList.add('active');
});

//  cart stuffs-------------------------------------
const addcartBtn = document.querySelector('.prev-btn');
const cartItems = document.querySelector('.cart-items');

let cart = loadData('cart', []);
function loadData(key, def) {
  var data = localStorage.getItem(key);
  return null == data ? def : JSON.parse(data);
}

const item = localStorage.getItem('cartItems');
if (item !== null) {
  cartItems.innerHTML = item;
}

function getCartbtns() {
  cart.forEach(item => {
    let id = addcartBtn.dataset.id;

    let incart = cart.find(item => item.id === id);

    if (incart) {
      addcartBtn.innerText = 'In Cart';
      addcartBtn.disabled = true;
    }
  });

  addcartBtn.addEventListener('click', event => {
    event.target.innerText = 'In Cart';
    event.target.disabled = true;
    // get product from eachprod
    let cartItem = { ...productGet, amount: 1 };
    // add product to cart
    cart = [...cart, cartItem];
    // save to storage
    localStorage.setItem('cart', JSON.stringify(cart));
    // set cart values
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });

    localStorage.setItem('cartTotal', JSON.stringify(tempTotal));

    cartItems.innerText = itemsTotal;
    localStorage.setItem('cartItems', JSON.stringify(itemsTotal));
  });
}

getCartbtns();
