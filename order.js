// new code
// order.js

// import CheckoutSystem from './checkout.js'; //don't need this if using global window

class Cart {
	constructor() {
		this.items = [];
		this.taxRate = 0.08875; // 8.875%
		this.init();
	}

	/**
	 * Initializes the cart. This method is called once when the page is loaded.
	 * It renders the menu, sets up event listeners, and sets up the cart toggle.
	 */
	init() {
		this.renderMenu();
		this.setupEventListeners();
		this.setupCartToggle();
      this.initCheckout();
	}

	setupEventListeners() {
		// Search functionality
		document.getElementById("menuSearch").addEventListener("input", (e) => {
			this.filterMenuItems(e.target.value);
		});

		// Category filter buttons
		document.querySelectorAll(".filter-btn").forEach((button) => {
			button.addEventListener("click", (e) => {
				this.filterByCategory(e.target.dataset.category);
				// Toggle active class
				document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
				e.target.classList.add("active");
			});
		});

		// Dietary filter buttons
		document.querySelectorAll(".dietary-btn").forEach((button) => {
			button.addEventListener("click", (e) => {
				e.target.classList.toggle("active");
				this.filterByDietary();
			});
		});
	}

	setupCartToggle() {
		// Mobile cart toggle functionality
		if (window.innerWidth <= 1024) {
			const cartContainer = document.querySelector(".cart-container");
			const cartHeader = document.createElement("div");
			cartHeader.className = "cart-header";
			cartHeader.innerHTML = `
               <h2>Your Order</h2>
               <i class="fas fa-chevron-up"></i>
           `;
			cartContainer.insertBefore(cartHeader, cartContainer.firstChild);

			cartHeader.addEventListener("click", () => {
				cartContainer.classList.toggle("expanded");
			});
		}
	}

	renderMenu() {
		const menuSection = document.querySelector(".menu-section");
		let menuHTML = "";

		websiteData.menu.categories.forEach((category) => {
			category.items.forEach((item) => {
				menuHTML += `
                   <div class="menu-item" data-category="${category.id}" data-dietary="${(item.dietary || []).join(" ")}">
                       <img src="${item.image}" alt="${item.name}">
                       <div class="menu-item-content">
                           <h3>
                               ${item.name}
                               <span class="price">$${item.price.toFixed(2)}</span>
                           </h3>
                           <p class="description">${item.description}</p>
                           <div class="dietary-info">
                               ${this.getDietaryIcons(item)}
                               ${this.getSpiceLevelIcon(item)}
                           </div>
                           ${this.getCookingOptions(item)}
                           <button class="add-to-cart" data-item-id="${item.id}">
                               Add to Cart
                           </button>
                       </div>
                   </div>
               `;
			});
		});

		menuSection.innerHTML = menuHTML;

		// Add event listeners to "Add to Cart" buttons
		document.querySelectorAll(".add-to-cart").forEach((button) => {
			button.addEventListener("click", (e) => {
				const itemId = e.target.dataset.itemId;
				this.addToCart(itemId);
			});
		});
	}

	getDietaryIcons(item) {
		if (!item.dietary) return "";
		return item.dietary.map((diet) => `<span>${websiteData.menu.dietary[diet]} ${diet}</span>`).join("");
	}

	getSpiceLevelIcon(item) {
		if (typeof item.spiceLevel === "undefined") return "";
		return `<span>🌶️ ${websiteData.menu.spiceLevels[item.spiceLevel]}</span>`;
	}

	getCookingOptions(item) {
		if (!item.cookingOptions) return "";
		return `
           <div class="cooking-options">
               <select class="cooking-preference">
                   <option value="">Select cooking preference</option>
                   ${item.cookingOptions.map((option) => `<option value="${option}">${option}</option>`).join("")}
               </select>
           </div>
       `;
	}

	findMenuItem(itemId) {
		for (const category of websiteData.menu.categories) {
			const item = category.items.find((item) => item.id === itemId);
			if (item) return item;
		}
		return null;
	}

	addToCart(itemId) {
		const item = this.findMenuItem(itemId);
		if (!item) return;

		const cookingPreference = this.getCookingPreference(itemId);

		// Check if item with same cooking preference exists
		const existingItemIndex = this.items.findIndex((cartItem) => cartItem.id === itemId && cartItem.cookingPreference === cookingPreference);

		if (existingItemIndex !== -1) {
			this.items[existingItemIndex].quantity += 1;
		} else {
			this.items.push({
				id: itemId,
				name: item.name,
				price: item.price,
				quantity: 1,
				cookingPreference,
			});
		}

		this.updateCart();
	}

	getCookingPreference(itemId) {
		const menuItem = document.querySelector(`[data-item-id="${itemId}"]`).closest(".menu-item-content");
		const select = menuItem.querySelector(".cooking-preference");
		return select ? select.value : null;
	}

	updateCart() {
		this.renderCartItems();
		this.updateCartTotals();
		this.updateCheckoutButton();
	}

	renderCartItems() {
		const cartItemsContainer = document.querySelector(".cart-items");
		let cartHTML = "";

		this.items.forEach((item, index) => {
			cartHTML += `
               <div class="cart-item">
                   <div class="item-details">
                       <div class="item-name">${item.name}</div>
                       ${item.cookingPreference ? `<div class="item-options">${item.cookingPreference}</div>` : ""}
                   </div>
                   <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                   <div class="item-quantity">
                       <button class="decrease-quantity" data-index="${index}">-</button>
                       <span>${item.quantity}</span>
                       <button class="increase-quantity" data-index="${index}">+</button>
                   </div>
               </div>
           `;
		});

		cartItemsContainer.innerHTML = cartHTML;

		// Add event listeners for quantity buttons
		this.setupQuantityButtons();
	}

	setupQuantityButtons() {
		document.querySelectorAll(".decrease-quantity").forEach((button) => {
			button.addEventListener("click", (e) => {
				const index = parseInt(e.target.dataset.index);
				this.decreaseQuantity(index);
			});
		});

		document.querySelectorAll(".increase-quantity").forEach((button) => {
			button.addEventListener("click", (e) => {
				const index = parseInt(e.target.dataset.index);
				this.increaseQuantity(index);
			});
		});
	}

	decreaseQuantity(index) {
		if (this.items[index].quantity > 1) {
			this.items[index].quantity -= 1;
		} else {
			this.items.splice(index, 1);
		}
		this.updateCart();
	}

	increaseQuantity(index) {
		this.items[index].quantity += 1;
		this.updateCart();
	}

	updateCartTotals() {
		const subtotal = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
		const tax = subtotal * this.taxRate;
		const total = subtotal + tax;

		document.querySelector(".subtotal span:last-child").textContent = `$${subtotal.toFixed(2)}`;
		document.querySelector(".tax span:last-child").textContent = `$${tax.toFixed(2)}`;
		document.querySelector(".total span:last-child").textContent = `$${total.toFixed(2)}`;
	}

	updateCheckoutButton() {
		const checkoutBtn = document.querySelector(".checkout-btn");
		const total = this.items.reduce((total, item) => total + item.price * item.quantity, 0) * (1 + this.taxRate);

		checkoutBtn.disabled = this.items.length === 0;
		checkoutBtn.textContent = `Checkout ($${total.toFixed(2)})`;
	}

	filterMenuItems(searchTerm) {
		const menuItems = document.querySelectorAll(".menu-item");
		searchTerm = searchTerm.toLowerCase();

		menuItems.forEach((item) => {
			const name = item.querySelector("h3").textContent.toLowerCase();
			const description = item.querySelector(".description").textContent.toLowerCase();
			const isVisible = name.includes(searchTerm) || description.includes(searchTerm);
			item.style.display = isVisible ? "" : "none";
		});
	}

	filterByCategory(category) {
		const menuItems = document.querySelectorAll(".menu-item");

		menuItems.forEach((item) => {
			if (category === "all" || item.dataset.category === category) {
				item.style.display = "";
			} else {
				item.style.display = "none";
			}
		});
	}

	filterByDietary() {
		const activeFilters = Array.from(document.querySelectorAll(".dietary-btn.active")).map((btn) => btn.dataset.dietary);

		const menuItems = document.querySelectorAll(".menu-item");

		menuItems.forEach((item) => {
			const itemDietary = item.dataset.dietary ? item.dataset.dietary.split(" ") : [];
			const isVisible = activeFilters.length === 0 || activeFilters.every((filter) => itemDietary.includes(filter));

			item.style.display = isVisible ? "" : "none";
		});
	}


	/**
	 * Initializes the checkout system.
	 *
	 * This method should be called once, when the DOM is loaded.
	 * It creates a new instance of the CheckoutSystem class and assigns it to the `checkoutSystem` property.
	 */
	initCheckout() {
		this.checkoutSystem = new CheckoutSystem(this);
	}
}

// Initialize the cart when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
   new Cart();
});

// older code // order.js

// document.addEventListener('DOMContentLoaded', () => {
//    // Cart state
//    const cart = {
//        items: [],
//        tax: 0.08875, // 8.875% tax rate

//        // Add item to cart
//        addItem(item, quantity = 1, options = {}) {
//            const existingItem = this.items.find(
//                cartItem =>
//                    cartItem.id === item.id &&
//                    JSON.stringify(cartItem.options) === JSON.stringify(options)
//            );

//            if (existingItem) {
//                existingItem.quantity += quantity;
//            } else {
//                this.items.push({
//                    ...item,
//                    quantity,
//                    options
//                });
//            }

//            this.updateCart();
//            this.saveCart();
//        },

//        // Remove item from cart
//        removeItem(itemId, options = {}) {
//            this.items = this.items.filter(
//                item =>
//                    !(item.id === itemId &&
//                    JSON.stringify(item.options) === JSON.stringify(options))
//            );
//            this.updateCart();
//            this.saveCart();
//        },

//        // Update item quantity
//        updateQuantity(itemId, quantity, options = {}) {
//            const item = this.items.find(
//                item =>
//                    item.id === itemId &&
//                    JSON.stringify(item.options) === JSON.stringify(options)
//            );

//            if (item) {
//                if (quantity <= 0) {
//                    this.removeItem(itemId, options);
//                } else {
//                    item.quantity = quantity;
//                    this.updateCart();
//                    this.saveCart();
//                }
//            }
//        },

//        // Calculate subtotal
//        getSubtotal() {
//            return this.items.reduce((sum, item) =>
//                sum + (item.price * item.quantity), 0
//            );
//        },

//        // Calculate tax
//        getTax() {
//            return this.getSubtotal() * this.tax;
//        },

//        // Calculate total
//        getTotal() {
//            return this.getSubtotal() + this.getTax();
//        },

//        // Save cart to localStorage
//        saveCart() {
//            localStorage.setItem('cart', JSON.stringify(this.items));
//        },

//        // Load cart from localStorage
//        loadCart() {
//            const savedCart = localStorage.getItem('cart');
//            if (savedCart) {
//                this.items = JSON.parse(savedCart);
//                this.updateCart();
//            }
//        },

//        // Update cart UI
//        updateCart() {
//            const cartItemsContainer = document.querySelector('.cart-items');
//            const subtotalElement = document.querySelector('.subtotal span:last-child');
//            const taxElement = document.querySelector('.tax span:last-child');
//            const totalElement = document.querySelector('.total span:last-child');
//            const checkoutButton = document.querySelector('.checkout-btn');

//            // Update cart items
//            if (cartItemsContainer) {
//                cartItemsContainer.innerHTML = this.items.map(item => `
//                    <div class="cart-item" data-id="${item.id}">
//                        <div class="item-details">
//                            <div class="item-name">${item.name}</div>
//                            ${item.options && Object.keys(item.options).length > 0 ? `
//                                <div class="item-options">
//                                    ${Object.entries(item.options)
//                                        .map(([key, value]) => `${key}: ${value}`)
//                                        .join(' | ')}
//                                </div>
//                            ` : ''}
//                        </div>
//                        <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
//                        <div class="item-quantity">
//                            <button class="quantity-decrease" aria-label="Decrease quantity">
//                                <i class="fas fa-minus"></i>
//                            </button>
//                            <span>${item.quantity}</span>
//                            <button class="quantity-increase" aria-label="Increase quantity">
//                                <i class="fas fa-plus"></i>
//                            </button>
//                            <button class="remove-item" aria-label="Remove item">
//                                <i class="fas fa-trash"></i>
//                            </button>
//                        </div>
//                    </div>
//                `).join('');

//                // Add event listeners for quantity buttons
//                cartItemsContainer.querySelectorAll('.cart-item').forEach(cartItem => {
//                    const itemId = cartItem.dataset.id;
//                    const item = this.items.find(i => i.id === itemId);

//                    cartItem.querySelector('.quantity-decrease').addEventListener('click', () => {
//                        this.updateQuantity(itemId, item.quantity - 1, item.options);
//                    });

//                    cartItem.querySelector('.quantity-increase').addEventListener('click', () => {
//                        this.updateQuantity(itemId, item.quantity + 1, item.options);
//                    });

//                    cartItem.querySelector('.remove-item').addEventListener('click', () => {
//                        this.removeItem(itemId, item.options);
//                    });
//                });
//            }

//            // Update totals
//            if (subtotalElement) {
//                subtotalElement.textContent = `$${this.getSubtotal().toFixed(2)}`;
//            }
//            if (taxElement) {
//                taxElement.textContent = `$${this.getTax().toFixed(2)}`;
//            }
//            if (totalElement) {
//                totalElement.textContent = `$${this.getTotal().toFixed(2)}`;
//            }

//            // Update checkout button
//            if (checkoutButton) {
//                const total = this.getTotal();
//                checkoutButton.textContent = `Checkout ($${total.toFixed(2)})`;
//                checkoutButton.disabled = total <= 0;
//            }

//            // Update cart indicator if it exists
//            this.updateCartIndicator();
//        },

//        // Update cart indicator (optional bubble showing number of items)
//        updateCartIndicator() {
//            const cartIndicator = document.querySelector('.cart-indicator');
//            if (cartIndicator) {
//                const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
//                cartIndicator.textContent = itemCount;
//                cartIndicator.style.display = itemCount > 0 ? 'block' : 'none';
//            }
//        }
//    };

//    // Initialize cart
//    cart.loadCart();

//    // Initialize menu items
//    const menuSection = document.querySelector('.menu-section');
//    if (menuSection && websiteData.menu) {
//        websiteData.menu.categories.forEach(category => {
//            category.items.forEach(item => {
//                const menuItem = document.createElement('div');
//                menuItem.className = 'menu-item';
//                menuItem.innerHTML = `
//                    <img src="${item.image}" alt="${item.name}">
//                    <div class="menu-item-content">
//                        <h3>
//                            ${item.name}
//                            <span class="price">$${item.price.toFixed(2)}</span>
//                        </h3>
//                        <p class="description">${item.description}</p>
//                        ${item.dietary ? `
//                            <div class="dietary-info">
//                                ${item.dietary.map(diet =>
//                                    `<span>${websiteData.menu.dietary[diet]}</span>`
//                                ).join('')}
//                            </div>
//                        ` : ''}
//                        ${item.spiceLevel > 0 ? `
//                            <div class="spice-level">
//                                ${'🌶️'.repeat(item.spiceLevel)}
//                            </div>
//                        ` : ''}
//                        <button class="add-to-cart" data-id="${item.id}">
//                            Add to Cart
//                        </button>
//                    </div>
//                `;

//                // Add to cart click handler
//                menuItem.querySelector('.add-to-cart').addEventListener('click', () => {
//                    cart.addItem(item);
//                });

//                menuSection.appendChild(menuItem);
//            });
//        });
//    }

//    // Mobile cart expansion
//    const cartContainer = document.querySelector('.cart-container');
//    if (cartContainer && window.innerWidth <= 1024) {
//        cartContainer.querySelector('h2').addEventListener('click', () => {
//            cartContainer.classList.toggle('expanded');
//        });
//    }
// });
