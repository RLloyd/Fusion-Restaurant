// nav.js
class Navigation extends HTMLElement {
	constructor() {
		super();
	}

	/**
	 * Sets up the navigation bar.
	 *
	 * This method is called whenever the element is inserted into the DOM.
	 * It sets up the navigation bar by creating all the necessary HTML elements
	 * and adding event listeners to the buttons.
	 */
	connectedCallback() {
		this.innerHTML = `
           <!-- Mobile Menu Toggle -->
           <div class="mobile-menu-toggle">
               <button id="mobileMenuBtn" aria-label="Toggle mobile menu">
                   <span class="hamburger-line"></span>
                   <span class="hamburger-line"></span>
                   <span class="hamburger-line"></span>
               </button>
           </div>

           <!-- Navigation -->
           <nav class="main-nav" role="navigation" aria-label="Main navigation">
               <div class="nav-links">
                   <div class="nav-item">
                       <button class="nav-button" aria-haspopup="true" aria-expanded="false" aria-label="Menu navigation">Menu</button>
                       <div class="dropdown" role="menu" aria-label="Menu options">
                           <a href="#" role="menuitem" aria-label="View lunch menu">Lunch</a>
                           <a href="#" role="menuitem" aria-label="View dinner menu">Dinner</a>
                           <a href="#" role="menuitem" aria-label="View wine list">Wine List</a>
                       </div>
                   </div>

                   <div class="nav-item">
                       <button class="nav-button" aria-haspopup="true" aria-expanded="false" aria-label="Specialties navigation">Our Specialties</button>
                       <div class="dropdown" role="menu" aria-label="Events options">
                           <a href="detail.html?id=chefs-special" role="menuitem" aria-label="Our Chef's Special">Chef's Special</a>
                           <a href="detail.html?id=wine-collection" role="menuitem" aria-label="View our Wine Collection">Wine Collection</a>
                           <a href="detail.html?id=private-dining" role="menuitem" aria-label="Learn more about our Private Dining">Private Dining</a>
                           <a href="detail.html?id=weekend-brunch" role="menuitem" aria-label="More about our Weekend Brunch">Weekend Brunch</a>

                       </div>
                   </div>

               </div>

               <div class="logo" role="banner">
                   <a href="index.html">
                       <img src="./images/Fusion-logo.png" alt="Restaurant Logo" aria-label="Restaurant logo">
                   </a>
               </div>

               <div class="nav-links">
                   <div class="nav-item">
                     <a href="#reservations" class="nav-button reservations" aria-label="Reservations navigation">Reservations</a>
                  </div>

                   <div class="nav-item">
                       <button class="nav-button" aria-haspopup="true" aria-expanded="false" aria-label="Events navigation">Events</button>
                       <div class="dropdown" role="menu" aria-label="Events options">
                           <a href="#" role="menuitem" aria-label="Learn about private dining">Private Dining</a>
                           <a href="#" role="menuitem" aria-label="View special events">Special Events</a>
                       </div>
                   </div>

               </div>
           </nav>
       `;

		// Initialize mobile menu functionality
		this.initMobileMenu();
	}

	initMobileMenu() {
		const mobileMenuBtn = this.querySelector("#mobileMenuBtn");
		const mainNav = this.querySelector(".main-nav");
		const navButtons = this.querySelectorAll(".nav-button");
		let isMenuOpen = false;

		if (mobileMenuBtn) {
			mobileMenuBtn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				isMenuOpen = !isMenuOpen;
				mobileMenuBtn.classList.toggle("active");
				mainNav.classList.toggle("mobile-active");
			});
		}

		// Handle dropdown toggles on mobile
		navButtons.forEach((button) => {
			button.addEventListener("click", (e) => {
				if (window.innerWidth <= 768) {
					e.preventDefault();
					e.stopPropagation();

					const dropdown = button.nextElementSibling;
					const isExpanded = button.getAttribute("aria-expanded") === "true";

					// Close all other dropdowns
					navButtons.forEach((otherButton) => {
						if (otherButton !== button) {
							otherButton.setAttribute("aria-expanded", "false");
							const otherDropdown = otherButton.nextElementSibling;
							if (otherDropdown) {
								otherDropdown.classList.remove("show");
							}
						}
					});

					// Toggle current dropdown
					button.setAttribute("aria-expanded", !isExpanded);
					if (dropdown) {
						dropdown.classList.toggle("show");
					}
				}
			});
		});

		// Close menu when clicking outside
		document.addEventListener("click", (e) => {
			if (window.innerWidth <= 768 && isMenuOpen) {
				const isClickInsideMenu = mainNav.contains(e.target);
				const isClickOnMenuButton = mobileMenuBtn.contains(e.target);

				if (!isClickInsideMenu && !isClickOnMenuButton) {
					isMenuOpen = false;
					mobileMenuBtn.classList.remove("active");
					mainNav.classList.remove("mobile-active");

					// Close all dropdowns
					navButtons.forEach((button) => {
						button.setAttribute("aria-expanded", "false");
						const dropdown = button.nextElementSibling;
						if (dropdown) {
							dropdown.classList.remove("show");
						}
					});
				}
			}
		});

		// Stop event propagation for menu content
		mainNav.addEventListener("click", (e) => {
			if (window.innerWidth <= 768) {
				e.stopPropagation();
			}
		});
	}
}

// Register the custom element
customElements.define("site-navigation", Navigation);
