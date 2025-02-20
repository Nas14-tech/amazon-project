import {cart, checkoutQuantity, removeCart, updateOrder} from '../../data/cart.js';
import{getProduct, products} from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryProduct } from '../../data/deliveryOptions.js';
import { renderPayment } from './paymentSummary.js';



export function renderSummary(){

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);
    // console.log(matchingProduct);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryProduct(deliveryOptionId);

    

    const today = dayjs();
    const delieryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = delieryDate.format('dddd, MMMM D');
    
    
    cartSummaryHTML += 
    `
      <div class="cart-item-container js-cart-item-container-${matchingProduct?.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct?.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct?.name}
          </div>
          <div class="product-price">
            $${(matchingProduct?.priceCents/100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProduct?.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options js-delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
        
        ${deliveryOptionHTML(matchingProduct, cartItem)}
          
        </div>
      </div>
    </div>
    `;

  });

  // console.log(cartSummaryHTML)

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;



  function deliveryOptionHTML(matchingProduct, cartItem) {

    let html = '';


    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const delieryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = delieryDate.format('dddd, MMMM D');
    
      // console.log(dateString);
    
    
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `${(deliveryOption.priceCents/100).toFixed(2)} - `;
    
      // console.log(priceString)

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    
    
      html += `
      
      <div class="delivery-option js-delivery-option"
      data-product-id = "${matchingProduct.id}"
      data-delivery-option-id = "${deliveryOption.id}"

      >
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct?.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            $${priceString} Shipping
          </div>
        </div>
      </div>
      `
    })

    return html;
    

  }

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click', ()=>{

      const {productId, deliveryOptionId} = element.dataset;

      updateOrder(productId, deliveryOptionId);
      renderSummary();
      renderPayment();

    })
  })


  document.querySelectorAll('.js-delete-link').forEach((link) =>{
    link.addEventListener('click', () => {
      const product = link.dataset.productId;

      removeCart(product);

      const container = document.querySelector(`.js-cart-item-container-${product}`);

      container.remove();
      renderPayment();
      document.querySelector('.js-return').innerHTML = checkoutQuantity();

    })
  })

}

