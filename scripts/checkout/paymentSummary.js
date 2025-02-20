import { getProduct, products } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { deliveryOptions, getDeliveryProduct } from "../../data/deliveryOptions.js";
import { formatCurrency } from "./utils/formatCurrency.js";
import { checkoutQuantity } from "../../data/cart.js";

export function renderPayment(){

  let paymentHTML = '';
  let productPrice = 0;
  let shippingPrice = 0;

  cart.forEach((cartItem)=>{

    const product = getProduct(cartItem.productId);

    productPrice += ((product.priceCents * cartItem.quantity));

    const deliveryOption = getDeliveryProduct(cartItem.deliveryOptionId);

    shippingPrice += deliveryOption.priceCents;
  })

  console.log(productPrice)
  console.log(shippingPrice);

  const totalBeforeTax = (productPrice + shippingPrice);

  console.log(totalBeforeTax);

  const tax = (totalBeforeTax * 0.1);

  const total = (totalBeforeTax + tax);

  console.log(total);


  paymentHTML = `
   
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$${formatCurrency(productPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(total)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>

`
  document.querySelector('.js-payment-summary').innerHTML = paymentHTML;
}

document.querySelector('.js-return').innerHTML = checkoutQuantity();

