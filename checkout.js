// checkout.js
class CheckoutSystem {
   constructor(cart) {
       this.cart = cart;
       this.init();
   }

   init() {
       // Initialize checkout button listener
       const checkoutBtn = document.querySelector('.checkout-btn');
       checkoutBtn.addEventListener('click', () => this.startCheckout());
   }

   findMenuItem(itemId) {
      for (const category of websiteData.menu.categories) {
          const item = category.items.find(item => item.id === itemId);
          if (item) return item;
      }
      return null;
  }

   startCheckout() {
      if (this.cart.items.length === 0) {
         this.showError('Your cart is empty. Please add items before checkout.');
         return;
     }
     this.createCheckoutModal();
     this.setupFormValidation();
   }

   /**
    * Creates the checkout modal and appends it to the body.
    *
    * @description
    * This function generates the HTML content for the checkout modal, including
    * the main form with three steps: customer details, payment details, and order
    * review. It also generates the cart summary sidebar on the right side of the
    * modal.
    *
    * @memberof CheckoutSystem
    */
   createCheckoutModal() {
      const modal = document.createElement('div');
      modal.className = 'checkout-modal';
      modal.innerHTML = `
          <div class="checkout-content">
              <button class="close-modal">&times;</button>
              <div class="checkout-layout">
                  <!-- Main Checkout Flow -->
                  <div class="checkout-main">
                      <h2>Checkout</h2>

                      <div class="checkout-steps">
                          <div class="step active" data-step="1">1. Details</div>
                          <div class="step" data-step="2">2. Payment</div>
                          <div class="step" data-step="3">3. Confirm</div>
                      </div>

                      <form id="checkoutForm">
                          <!-- Step 1: Customer Details -->
                          <div class="form-step active" id="step1">
                              <h3>Delivery Details</h3>
                              <div class="form-group">
                                  <label for="name">Full Name</label>
                                  <input type="text" id="name" name="name" required>
                              </div>
                              <div class="form-group">
                                  <label for="email">Email</label>
                                  <input type="email" id="email" name="email" required>
                              </div>
                              <div class="form-group">
                                  <label for="phone">Phone</label>
                                  <input type="tel" id="phone" name="phone" required>
                              </div>
                              <div class="form-group">
                                  <label for="address">Delivery Address</label>
                                  <input type="text" id="address" name="address" required>
                              </div>
                              <div class="form-group">
                                  <label for="deliveryTime">Preferred Delivery Time</label>
                                  <select id="deliveryTime" name="deliveryTime" required>
                                      <option value="">Select time</option>
                                      ${this.generateDeliveryTimeOptions()}
                                  </select>
                              </div>
                              <div class="form-group">
                                  <label for="notes">Order Notes (Optional)</label>
                                  <textarea id="notes" name="notes"></textarea>
                              </div>
                              <button type="button" class="next-step">Continue to Payment</button>
                          </div>

                          <!-- Step 2: Payment Details -->
                          <div class="form-step" id="step2">
                              <h3>Payment Details</h3>
                              <div class="form-group">
                                  <label for="cardName">Name on Card</label>
                                  <input type="text" id="cardName" name="cardName" required>
                              </div>
                              <div class="form-group">
                                  <label for="cardNumber">Card Number</label>
                                  <input type="text" id="cardNumber" name="cardNumber" required
                                      pattern="[0-9]{16}" maxlength="16">
                              </div>
                              <div class="form-row">
                                  <div class="form-group">
                                      <label for="expiry">Expiry Date</label>
                                      <input type="text" id="expiry" name="expiry" required
                                          placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\/([0-9]{2})" maxlength="5">
                                  </div>
                                  <div class="form-group">
                                      <label for="cvv">CVV</label>
                                      <input type="text" id="cvv" name="cvv" required
                                          pattern="[0-9]{3,4}" maxlength="4">
                                  </div>
                              </div>
                              <div class="form-group">
                                  <label for="billingAddress">Billing Address</label>
                                  <input type="text" id="billingAddress" name="billingAddress" required>
                              </div>
                              <div class="button-group">
                                  <button type="button" class="prev-step">Back</button>
                                  <button type="button" class="next-step">Review Order</button>
                              </div>
                          </div>

                          <!-- Step 3: Order Review -->
                          <div class="form-step" id="step3">
                              <h3>Order Review</h3>
                              <div class="delivery-summary">
                                  <h4>Delivery Details</h4>
                                  <div id="deliverySummary"></div>
                              </div>
                              <div class="button-group">
                                  <button type="button" class="prev-step">Back</button>
                                  <button type="submit" class="place-order">Place Order</button>
                              </div>
                          </div>
                      </form>
                  </div>

                  <!-- Cart Summary Sidebar -->
                  <div class="cart-summary-sidebar">
                      <div class="cart-summary-content">
                          <h3>Order Summary</h3>
                          <div class="cart-items-summary">
                              ${this.generateCartItemsHTML()}
                          </div>
                          <div class="cart-totals">
                              <div class="subtotal">
                                  <span>Subtotal:</span>
                                  <span>$${this.calculateSubtotal().toFixed(2)}</span>
                              </div>
                              <div class="tax">
                                  <span>Tax (${(this.cart.taxRate * 100).toFixed(3)}%):</span>
                                  <span>$${this.calculateTax().toFixed(2)}</span>
                              </div>
                              <div class="total">
                                  <span>Total:</span>
                                  <span>$${this.calculateTotal().toFixed(2)}</span>
                              </div>
                          </div>
                          <div class="estimated-time">
                              <i class="fas fa-clock"></i>
                              <span>Estimated Delivery: 30-45 minutes</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;

      document.body.appendChild(modal);
      this.setupModalListeners(modal);
  }

  generateCartItemsHTML() {
   return this.cart.items.map(cartItem => {
       const menuItem = this.findMenuItem(cartItem.id);
       if (!menuItem) return ''; // Skip if item not found

       return `
           <div class="cart-summary-item">
               <div class="item-details">
                   <div class="item-image-name">
                       <img src="${menuItem.image}" alt="${menuItem.name}">
                       <div class="item-text">
                           <span class="item-name">${menuItem.name}</span>
                           ${cartItem.cookingPreference ?
                               `<span class="item-preference">${cartItem.cookingPreference}</span>` :
                               ''}
                           ${menuItem.spiceLevel !== undefined ?
                               `<span class="spice-level">${websiteData.menu.spiceLevels[menuItem.spiceLevel]}</span>` :
                               ''}
                       </div>
                   </div>
                   <div class="item-price-qty">
                       <span class="item-quantity">Qty: ${cartItem.quantity}</span>
                       <span class="item-price">$${(menuItem.price * cartItem.quantity).toFixed(2)}</span>
                   </div>
               </div>
           </div>
       `;
   }).join('');
}

  calculateSubtotal() {
   return this.cart.items.reduce((total, cartItem) => {
       const menuItem = this.findMenuItem(cartItem.id);
       return total + (menuItem ? menuItem.price * cartItem.quantity : 0);
   }, 0);
}

  calculateTax() {
      return this.calculateSubtotal() * this.cart.taxRate;
  }

  calculateTotal() {
      return this.calculateSubtotal() + this.calculateTax();
  }

  showError(message) {
      // Create a floating error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'floating-error';
      errorDiv.textContent = message;
      document.body.appendChild(errorDiv);

      // Remove after 3 seconds
      setTimeout(() => {
          errorDiv.remove();
      }, 3000);
  }

   generateDeliveryTimeOptions() {
       const options = [];
       const now = new Date();
       const currentHour = now.getHours();
       const currentMinute = now.getMinutes();

       // Restaurant hours: 11 AM to 10 PM
       const startHour = 11;
       const endHour = 22;

       // Generate time slots in 30-minute intervals
       for (let hour = startHour; hour < endHour; hour++) {
           for (let minute = 0; minute < 60; minute += 30) {
               const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
               const optionDate = new Date();
               optionDate.setHours(hour, minute, 0);

               // Only show times at least 45 minutes from now
               if (optionDate.getTime() - now.getTime() >= 45 * 60 * 1000) {
                   options.push(`<option value="${timeString}">${timeString}</option>`);
               }
           }
       }

       return options.join('');
   }

   generateOrderSummaryHTML() {
       let summaryHTML = '<div class="cart-items-review">';

       this.cart.items.forEach(item => {
           summaryHTML += `
               <div class="review-item">
                   <span class="item-name">${item.name}</span>
                   <span class="item-quantity">×${item.quantity}</span>
                   <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
               </div>
           `;
       });

       const subtotal = this.cart.items.reduce((total, item) =>
           total + (item.price * item.quantity), 0);
       const tax = subtotal * this.cart.taxRate;
       const total = subtotal + tax;

       summaryHTML += `
           </div>
           <div class="cart-totals-review">
               <div class="subtotal">
                   <span>Subtotal:</span>
                   <span>$${subtotal.toFixed(2)}</span>
               </div>
               <div class="tax">
                   <span>Tax (${(this.cart.taxRate * 100).toFixed(3)}%):</span>
                   <span>$${tax.toFixed(2)}</span>
               </div>
               <div class="total">
                   <span>Total:</span>
                   <span>$${total.toFixed(2)}</span>
               </div>
           </div>
       `;

       return summaryHTML;
   }

   setupModalListeners(modal) {
       // Close modal button
       modal.querySelector('.close-modal').addEventListener('click', () => {
           document.body.removeChild(modal);
       });

       // Step navigation
       modal.querySelectorAll('.next-step').forEach(button => {
           button.addEventListener('click', () => this.nextStep(modal));
       });

       modal.querySelectorAll('.prev-step').forEach(button => {
           button.addEventListener('click', () => this.prevStep(modal));
       });

       // Form submission
       modal.querySelector('#checkoutForm').addEventListener('submit', (e) => {
           e.preventDefault();
           this.processOrder(modal);
       });
   }

   setupFormValidation() {
       // Card number formatting
       const cardNumber = document.getElementById('cardNumber');
       cardNumber.addEventListener('input', (e) => {
           e.target.value = e.target.value.replace(/\D/g, '');
       });

       // Expiry date formatting
       const expiry = document.getElementById('expiry');
       expiry.addEventListener('input', (e) => {
           let value = e.target.value.replace(/\D/g, '');
           if (value.length >= 2) {
               value = value.slice(0, 2) + '/' + value.slice(2);
           }
           e.target.value = value;
       });

       // CVV formatting
       const cvv = document.getElementById('cvv');
       cvv.addEventListener('input', (e) => {
           e.target.value = e.target.value.replace(/\D/g, '');
       });
   }

   nextStep(modal) {
       const currentStep = modal.querySelector('.form-step.active');
       const currentStepNum = parseInt(currentStep.id.replace('step', ''));

       if (this.validateStep(currentStepNum)) {
           currentStep.classList.remove('active');
           modal.querySelector(`#step${currentStepNum + 1}`).classList.add('active');

           // Update step indicators
           modal.querySelector(`.step[data-step="${currentStepNum}"]`).classList.remove('active');
           modal.querySelector(`.step[data-step="${currentStepNum + 1}"]`).classList.add('active');

           // Update delivery summary in step 3
           if (currentStepNum === 1) {
               this.updateDeliverySummary();
           }
       }
   }

   prevStep(modal) {
       const currentStep = modal.querySelector('.form-step.active');
       const currentStepNum = parseInt(currentStep.id.replace('step', ''));

       currentStep.classList.remove('active');
       modal.querySelector(`#step${currentStepNum - 1}`).classList.add('active');

       // Update step indicators
       modal.querySelector(`.step[data-step="${currentStepNum}"]`).classList.remove('active');
       modal.querySelector(`.step[data-step="${currentStepNum - 1}"]`).classList.add('active');
   }

   validateStep(step) {
       const form = document.getElementById('checkoutForm');
       const stepElement = document.getElementById(`step${step}`);
       const inputs = stepElement.querySelectorAll('input[required], select[required]');

       let isValid = true;
       inputs.forEach(input => {
           if (!input.value || !input.checkValidity()) {
               input.classList.add('invalid');
               isValid = false;
           } else {
               input.classList.remove('invalid');
           }
       });

       return isValid;
   }

   updateDeliverySummary() {
       const summaryDiv = document.getElementById('deliverySummary');
       const name = document.getElementById('name').value;
       const address = document.getElementById('address').value;
       const time = document.getElementById('deliveryTime').value;
       const notes = document.getElementById('notes').value;

       summaryDiv.innerHTML = `
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Delivery Address:</strong> ${address}</p>
           <p><strong>Delivery Time:</strong> ${time}</p>
           ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
       `;
   }

   async processOrder(modal) {
       try {
           // Show loading state
           const submitButton = modal.querySelector('.place-order');
           submitButton.disabled = true;
           submitButton.textContent = 'Processing...';

           // Gather form data
           const formData = new FormData(document.getElementById('checkoutForm'));
           const orderData = {
               customer: {
                   name: formData.get('name'),
                   email: formData.get('email'),
                   phone: formData.get('phone'),
                   address: formData.get('address')
               },
               delivery: {
                   time: formData.get('deliveryTime'),
                   notes: formData.get('notes')
               },
               items: this.cart.items,
               totals: {
                   subtotal: this.cart.items.reduce((total, item) =>
                       total + (item.price * item.quantity), 0),
                   tax: this.cart.items.reduce((total, item) =>
                       total + (item.price * item.quantity), 0) * this.cart.taxRate,
                   total: this.cart.items.reduce((total, item) =>
                       total + (item.price * item.quantity), 0) * (1 + this.cart.taxRate)
               }
           };

           // Here you would typically send the order to your backend
           // For demo purposes, we'll simulate a server delay
           await new Promise(resolve => setTimeout(resolve, 1500));

           // Show success message and clear cart
           this.showOrderConfirmation(orderData, modal);
           this.cart.items = [];
           this.cart.updateCart();

       } catch (error) {
           console.error('Order processing failed:', error);
           // Show error message
           this.showError(modal);
       }
   }

   showOrderConfirmation(orderData, modal) {
       modal.querySelector('.checkout-content').innerHTML = `
           <div class="order-confirmation">
               <i class="fas fa-check-circle"></i>
               <h2>Order Confirmed!</h2>
               <p>Thank you for your order, ${orderData.customer.name}!</p>
               <div class="order-details">
                   <p>Order Number: #${this.generateOrderNumber()}</p>
                   <p>Delivery Time: ${orderData.delivery.time}</p>
                   <p>Total Amount: $${orderData.totals.total.toFixed(2)}</p>
               </div>
               <p>We've sent a confirmation email to ${orderData.customer.email}</p>
               <button class="close-confirmation">Close</button>
           </div>
       `;

       modal.querySelector('.close-confirmation').addEventListener('click', () => {
           document.body.removeChild(modal);
       });
   }

   showError(modal) {
       const submitButton = modal.querySelector('.place-order');
       submitButton.disabled = false;
       submitButton.textContent = 'Place Order';

       const errorDiv = document.createElement('div');
       errorDiv.className = 'error-message';
       errorDiv.textContent = 'There was an error processing your order. Please try again.';

       modal.querySelector('#step3').appendChild(errorDiv);
       setTimeout(() => errorDiv.remove(), 5000);
   }

   /**
    * Generates a random order number with a date prefix.
    * The date prefix is in the format "YYMMDD", and the random number is a 4-digit number.
    * For example, "210630-0123".
    * @returns {string} The generated order number.
    */
   generateOrderNumber() {
      // Generate a random order number with date prefix
      const date = new Date();
      const prefix = date.getFullYear().toString().substr(-2) +
          (date.getMonth() + 1).toString().padStart(2, '0') +
          date.getDate().toString().padStart(2, '0');
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `${prefix}-${random}`;
  }

  sendConfirmationEmail(orderData) {
      // This would typically be handled by your backend
      console.log('Sending confirmation email to:', orderData.customer.email);
  }
}

// Export the CheckoutSystem class
// export default CheckoutSystem; //doesn't work

// Make CheckoutSystem available globally
window.CheckoutSystem = CheckoutSystem;