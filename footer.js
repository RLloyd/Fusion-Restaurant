// footer.js
class Footer extends HTMLElement {
   constructor() {
       super();
   }

   connectedCallback() {
       this.innerHTML = `
           <footer class="site-footer" role="contentinfo">
               <div class="footer-content">
                   <!-- Contact & Hours Section -->
                   <div class="footer-info">
                       <div class="contact-info">
                           <h3>Contact Us</h3>
                           <address>
                               <p>123 Cuisine Street</p>
                               <p>New York, NY 10001</p>
                               <p>
                                   <a href="tel:+12125551234">
                                       <i class="fa-solid fa-phone"></i> (212) 555-1234
                                   </a>
                               </p>
                               <p>
                                   <a href="mailto:info@sonorestaurant.com">
                                       <i class="fa-solid fa-envelope"></i> info@sonorestaurant.com
                                   </a>
                               </p>
                           </address>
                       </div>

                       <div class="hours-info">
                           <h3>Hours</h3>
                           <div class="hours-grid">
                               <div class="meal-hours">
                                   <h4>Lunch</h4>
                                   <p>Monday - Friday</p>
                                   <p>11:30 AM - 2:30 PM</p>
                               </div>
                               <div class="meal-hours">
                                   <h4>Dinner</h4>
                                   <p>Monday - Sunday</p>
                                   <p>5:00 PM - 10:00 PM</p>
                               </div>
                           </div>
                       </div>
                   </div>

                   <!-- Gallery Section -->
                   <div class="footer-gallery">
                       <h3>Gallery</h3>
                       <div class="gallery-grid">
                           <div class="gallery-item">
                               <img src="./images/gallery-1.webp" alt="Interior dining room" loading="lazy">
                           </div>
                           <div class="gallery-item">
                               <img src="./images/gallery-2.webp" alt="Signature dish" loading="lazy">
                           </div>
                           <div class="gallery-item">
                               <img src="./images/gallery-3.webp" alt="Bar area" loading="lazy">
                           </div>
                           <div class="gallery-item">
                               <img src="./images/gallery-4.webp" alt="Private dining room" loading="lazy">
                           </div>
                           <div class="gallery-item">
                               <img src="./images/gallery-5.webp" alt="Wine cellar" loading="lazy">
                           </div>
                           <div class="gallery-item">
                               <img src="./images/gallery-6.webp" alt="Outdoor seating" loading="lazy">
                           </div>
                           <div class="gallery-item">
                               <img src="./images/gallery-7.webp" alt="Chef plating" loading="lazy">
                           </div>
                           <div class="gallery-item">
                               <img src="./images/gallery-8.webp" alt="Dessert selection" loading="lazy">
                           </div>
                       </div>
                   </div>

                   <!-- Newsletter Section -->
                   <div class="newsletter-section">
                       <h3>Stay Updated</h3>
                       <form id="newsletterForm">
                           <div class="form-group">
                               <input
                                   type="text"
                                   id="name"
                                   name="name"
                                   aria-label="Your name"
                                   placeholder="Your Name"
                                   required
                               >
                           </div>
                           <div class="form-group">
                               <input
                                   type="email"
                                   id="email"
                                   name="email"
                                   aria-label="Your email address"
                                   placeholder="Your Email"
                                   required
                               >
                           </div>
                           <button type="submit" class="subscribe-btn">Subscribe</button>
                       </form>
                   </div>

                   <!-- Social Links -->
                   <div class="social-links">
                       <a href="#" aria-label="Follow us on Facebook">
                           <i class="fa-brands fa-facebook"></i>
                       </a>
                       <a href="#" aria-label="Follow us on Instagram">
                           <i class="fa-brands fa-instagram"></i>
                       </a>
                       <a href="#" aria-label="Follow us on Twitter">
                           <i class="fa-brands fa-twitter"></i>
                       </a>
                       <a href="#" aria-label="Follow us on LinkedIn">
                           <i class="fa-brands fa-linkedin"></i>
                       </a>
                   </div>

                   <!-- Copyright -->
                   <div class="copyright">
                       <p>&copy; ${new Date().getFullYear()} Sono Restaurant. All rights reserved.</p>
                   </div>
               </div>
           </footer>
       `;

       this.initNewsletter();
   }

   initNewsletter() {
       const form = this.querySelector('#newsletterForm');
       if (form) {
           form.addEventListener('submit', (e) => {
               e.preventDefault();
               const name = form.querySelector('#name').value;
               const email = form.querySelector('#email').value;
               console.log('Newsletter Signup:', { name, email });
               alert('Thank you for subscribing!');
               form.reset();
           });
       }
   }
}

// Register the custom element
customElements.define('site-footer', Footer);