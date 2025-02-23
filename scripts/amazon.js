import { products } from '../data/products.js';
import { cart, addToCart } from '../data/cart.js';





let productsHTML = '';



products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${(product.priceCents/100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer js-product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
      Add to Cart
    </button>
  </div>
  `

});



document.querySelector('.js-product-grid').innerHTML = productsHTML;


 function cartQuantity(){
  let cartQuantity = 0;

   cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
   })


   document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {

    const product = button.dataset.productId

      addToCart(product);
      cartQuantity();
    // console.log(cart);
    
  })

  


})

cartQuantity();


function addedText() {
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      // Find the closest parent with class product
      const productContainer = button.closest('.product-container'); 
      
      // Find the js-product-spacer within that parent
      const productSpacer = productContainer.querySelector('.js-product-spacer');

      document.querySelectorAll('.js-product-spacer').forEach((element)=>{
        element.innerHTML='';
      });
      
      // Update the HTML of the product spacer
      productSpacer.innerHTML = '<div class="js-added">Added</div>';
    });
  });
}

addedText();



 





