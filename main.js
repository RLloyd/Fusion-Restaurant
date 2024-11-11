// main.js
document.addEventListener("DOMContentLoaded", () => {
	// Initialize slides
	const slider = document.querySelector(".slider");
	if (slider) {
		initializeSlider(slider);
	}

	// Initialize cards
	const cardsContainer = document.querySelector(".cards-container");
	if (cardsContainer) {
		initializeCards(cardsContainer);
	}

	// Mobile Menu Variables
	const mobileMenuBtn = document.getElementById("mobileMenuBtn");
	const mainNav = document.querySelector(".main-nav");
	const navButtons = document.querySelectorAll(".nav-button");
	let isMenuOpen = false;

	// Mobile Menu Toggle
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

	// Enhanced scroll handler for navigation opacity
function handleNavScroll() {
   const mainNav = document.querySelector('.main-nav');
   const hero = document.querySelector('.hero'); // Home page hero
   const detailHero = document.querySelector('.detail-hero'); // Detail page hero

   if (mainNav && (hero || detailHero)) {
       const targetSection = hero || detailHero;

       window.addEventListener('scroll', () => {
           const heroBottom = targetSection.offsetTop + targetSection.offsetHeight;
           const scrollPosition = window.scrollY;

           if (scrollPosition > heroBottom - 100) {
               mainNav.classList.add('nav-scrolled');
           } else {
               mainNav.classList.remove('nav-scrolled');
           }
       });

       // Initial check in case page is loaded scrolled down
       const scrollPosition = window.scrollY;
       const heroBottom = targetSection.offsetTop + targetSection.offsetHeight;
       if (scrollPosition > heroBottom - 100) {
           mainNav.classList.add('nav-scrolled');
       }
   }
}

	// Initialize scroll handler
	handleNavScroll();

	// Newsletter Form
	const newsletterForm = document.getElementById("newsletterForm");
	if (newsletterForm) {
		newsletterForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const name = document.getElementById("name").value;
			const email = document.getElementById("email").value;
			console.log("Newsletter Signup:", { name, email });
			alert("Thank you for subscribing!");
			newsletterForm.reset();
		});
	}
});

function initializeSlider(slider) {
	// Create slides
	if (websiteData && websiteData.slides) {
		websiteData.slides.forEach((slide, index) => {
			const slideDiv = document.createElement("div");
			slideDiv.className = `slide ${index === 0 ? "active" : ""}`;
			slideDiv.style.backgroundImage = `url(${slide.image})`;
			slideDiv.style.backgroundSize = "cover";
			slideDiv.style.backgroundPosition = "center";

			const content = document.createElement("div");
			content.className = "slide-content";
			content.innerHTML = `
               <h2>${slide.title}</h2>
               <p>${slide.description}</p>
               <a href="${slide.link}" class="cta-button">Learn More</a>
           `;

			slideDiv.appendChild(content);
			slider.appendChild(slideDiv);
		});

		// Set up navigation
		const slides = document.querySelectorAll(".slide");
		let currentSlide = 0;
		let autoSlideInterval;

		function changeSlide(direction) {
			slides[currentSlide].classList.remove("active");
			if (direction === "next") {
				currentSlide = (currentSlide + 1) % slides.length;
			} else {
				currentSlide = (currentSlide - 1 + slides.length) % slides.length;
			}
			slides[currentSlide].classList.add("active");
		}

		// Manual Navigation
		const nextButton = document.querySelector(".next");
		const prevButton = document.querySelector(".prev");

		if (nextButton) {
			nextButton.addEventListener("click", () => {
				changeSlide("next");
			});
		}

		if (prevButton) {
			prevButton.addEventListener("click", () => {
				changeSlide("prev");
			});
		}

		// Auto-advance slider
		function startAutoSlide() {
			autoSlideInterval = setInterval(() => {
				changeSlide("next");
			}, 5000);
		}

		// Start auto-slide
		startAutoSlide();

		// Pause auto-slide when window loses focus
		window.addEventListener("blur", () => {
			clearInterval(autoSlideInterval);
		});

		// Resume auto-slide when window gains focus
		window.addEventListener("focus", () => {
			startAutoSlide();
		});
	}
}

function initializeCards(cardsContainer) {
	if (websiteData && websiteData.features) {
		websiteData.features.forEach((feature) => {
			const card = document.createElement("div");
			card.className = "card";
			card.innerHTML = `
               <img src="${feature.image}" alt="${feature.title}">
               <div class="card-content">
                   <h3 class="card-title">${feature.title}</h3>
                   <p class="card-description">${feature.description}</p>
                   <a href="${feature.ctaLink}" class="cta-button">${feature.ctaText}</a>
               </div>
           `;
			cardsContainer.appendChild(card);
		});
	}
}

// document.addEventListener("DOMContentLoaded", () => {
// 	// Theme Toggle
// 	const themeToggle = document.getElementById("themeToggle");
// 	const root = document.documentElement;
// 	themeToggle.addEventListener("click", () => {
// 		document.body.classList.toggle("light-theme");
// 		document.body.classList.toggle("dark-theme");
// 		// Optional: Save theme preference
// 		const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
// 		localStorage.setItem("theme", theme);

// 		// Add animation class
// 		themeToggle.classList.add("theme-transition");
// 		setTimeout(() => {
// 			themeToggle.classList.remove("theme-transition");
// 		}, 300);
// 	});

// 	// Optional: Load saved theme preference
// 	const savedTheme = localStorage.getItem("theme");
// 	if (savedTheme) {
// 		document.body.classList.remove("light-theme", "dark-theme");
// 		document.body.classList.add(`${savedTheme}-theme`);
// 	}

// 	// Mobile Menu Variables
// 	const mobileMenuBtn = document.getElementById("mobileMenuBtn");
// 	const mainNav = document.querySelector(".main-nav");
// 	const navButtons = document.querySelectorAll(".nav-button");
// 	let isMenuOpen = false;

// 	// Hero Slider Variables
// 	let currentSlide = 0;
// 	const slider = document.querySelector(".slider");
// 	let autoSlideInterval;

// 	// Mobile Menu Toggle
// 	if (mobileMenuBtn) {
// 		mobileMenuBtn.addEventListener("click", (e) => {
// 			e.preventDefault();
// 			e.stopPropagation();
// 			isMenuOpen = !isMenuOpen;
// 			mobileMenuBtn.classList.toggle("active");
// 			mainNav.classList.toggle("mobile-active");

// 			// Pause slider auto-advance when menu is open
// 			if (isMenuOpen) {
// 				clearInterval(autoSlideInterval);
// 			} else {
// 				startAutoSlide();
// 			}
// 		});
// 	}

// 	// Create slides
// 	websiteData.slides.forEach((slide, index) => {
// 		const slideDiv = document.createElement("div");
// 		slideDiv.className = `slide ${index === 0 ? "active" : ""}`;
// 		slideDiv.style.backgroundImage = `url(${slide.image})`;
// 		slideDiv.style.backgroundSize = "cover";
// 		slideDiv.style.backgroundPosition = "center";

// 		const content = document.createElement("div");
// 		content.className = "slide-content";
// 		content.innerHTML = `
//            <h2>${slide.title}</h2>
//            <p>${slide.description}</p>
//            <a href="${slide.link}" class="cta-button">Learn More</a>
//        `;

// 		slideDiv.appendChild(content);
// 		slider.appendChild(slideDiv);
// 	});

// 	// Slider Navigation
// 	const slides = document.querySelectorAll(".slide");

// 	function changeSlide(direction) {
// 		if (!isMenuOpen) {
// 			// Only change slides if menu is closed
// 			slides[currentSlide].classList.remove("active");
// 			if (direction === "next") {
// 				currentSlide = (currentSlide + 1) % slides.length;
// 			} else {
// 				currentSlide = (currentSlide - 1 + slides.length) % slides.length;
// 			}
// 			slides[currentSlide].classList.add("active");
// 		}
// 	}

// 	// Manual Navigation
// 	document.querySelector(".next").addEventListener("click", () => {
// 		changeSlide("next");
// 	});

// 	document.querySelector(".prev").addEventListener("click", () => {
// 		changeSlide("prev");
// 	});

// 	// Auto-advance slider
// 	function startAutoSlide() {
// 		autoSlideInterval = setInterval(() => {
// 			if (!isMenuOpen) {
// 				// Only auto-advance if menu is closed
// 				changeSlide("next");
// 			}
// 		}, 5000);
// 	}

// 	// Initial start of auto-slide
// 	startAutoSlide();

// 	// Create Feature Cards
// 	const cardsContainer = document.querySelector(".cards-container");

// 	websiteData.features.forEach((feature) => {
// 		//  const card = document.createElement('div');
// 		//  card.className = 'card';
// 		//  card.innerHTML = `
// 		//      <img src="${feature.image}" alt="${feature.title}">
// 		//      <div class="card-content">
// 		//          <h3 class="card-title">${feature.title}</h3>
// 		//          <p class="card-description">${feature.description}</p>
// 		//          <a href="${feature.ctaLink}" class="cta-button">${feature.ctaText}</a>
// 		//      </div>
// 		//  `;
// 		//  cardsContainer.appendChild(card);
// 		const card = document.createElement("div");
// 		card.className = "card";
// 		card.innerHTML = `
//         <img src="${feature.image}" alt="${feature.title}">
//         <div class="card-content">
//             <h3 class="card-title">${feature.title}</h3>
//             <p class="card-description">${feature.description}</p>
//             <a href="${feature.ctaLink}" class="cta-button" data-card-id="${feature.id}">${feature.ctaText}</a>
//         </div>
//     `;
// 		cardsContainer.appendChild(card);

// 		// Optional: Add click event to track analytics or handle navigation
// 		const ctaButton = card.querySelector(".cta-button");
// 		ctaButton.addEventListener("click", (e) => {
// 			// You could add analytics tracking here
// 			console.log(`Clicked card: ${feature.id}`);
// 		});
// 	});

// 	// Handle dropdown toggles on mobile
// 	navButtons.forEach((button) => {
// 		button.addEventListener("click", (e) => {
// 			if (window.innerWidth <= 768) {
// 				e.preventDefault();
// 				e.stopPropagation();

// 				const dropdown = button.nextElementSibling;
// 				const isExpanded = button.getAttribute("aria-expanded") === "true";

// 				// Close all other dropdowns
// 				navButtons.forEach((otherButton) => {
// 					if (otherButton !== button) {
// 						otherButton.setAttribute("aria-expanded", "false");
// 						const otherDropdown = otherButton.nextElementSibling;
// 						if (otherDropdown) {
// 							otherDropdown.classList.remove("show");
// 						}
// 					}
// 				});

// 				// Toggle current dropdown
// 				button.setAttribute("aria-expanded", !isExpanded);
// 				if (dropdown) {
// 					dropdown.classList.toggle("show");
// 				}
// 			}
// 		});
// 	});

// 	// Newsletter Form
// 	const newsletterForm = document.getElementById("newsletterForm");
// 	newsletterForm.addEventListener("submit", (e) => {
// 		e.preventDefault();
// 		const name = document.getElementById("name").value;
// 		const email = document.getElementById("email").value;

// 		// Here you would typically send this data to your server
// 		console.log("Newsletter Signup:", { name, email });
// 		alert("Thank you for subscribing!");
// 		newsletterForm.reset();
// 	});

// 	// Close menu when clicking outside
// 	document.addEventListener("click", (e) => {
// 		if (window.innerWidth <= 768 && isMenuOpen) {
// 			const isClickInsideMenu = mainNav.contains(e.target);
// 			const isClickOnMenuButton = mobileMenuBtn.contains(e.target);

// 			if (!isClickInsideMenu && !isClickOnMenuButton) {
// 				isMenuOpen = false;
// 				mobileMenuBtn.classList.remove("active");
// 				mainNav.classList.remove("mobile-active");
// 				startAutoSlide(); // Restart auto-slide when menu closes

// 				// Close all dropdowns
// 				navButtons.forEach((button) => {
// 					button.setAttribute("aria-expanded", "false");
// 					const dropdown = button.nextElementSibling;
// 					if (dropdown) {
// 						dropdown.classList.remove("show");
// 					}
// 				});
// 			}
// 		}
// 	});

// 	// Stop event propagation for menu content
// 	mainNav.addEventListener("click", (e) => {
// 		if (window.innerWidth <= 768) {
// 			e.stopPropagation();
// 		}
// 	});

// 	// Handle window resize
// 	window.addEventListener("resize", () => {
// 		if (window.innerWidth > 768 && isMenuOpen) {
// 			isMenuOpen = false;
// 			mobileMenuBtn.classList.remove("active");
// 			mainNav.classList.remove("mobile-active");
// 			startAutoSlide();
// 		}
// 	});

// 	// Pause auto-slide when window loses focus
// 	window.addEventListener("blur", () => {
// 		clearInterval(autoSlideInterval);
// 	});

// 	// Resume auto-slide when window gains focus (only if menu is closed)
// 	window.addEventListener("focus", () => {
// 		if (!isMenuOpen) {
// 			startAutoSlide();
// 		}
// 	});
// });
