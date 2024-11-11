// detail.js

document.addEventListener('DOMContentLoaded', () => {
   // Get the card ID from URL parameters
   const urlParams = new URLSearchParams(window.location.search);
   const cardId = urlParams.get('id');

   // Find the matching feature data
   const featureData = websiteData.features.find(feature => feature.id === cardId);

   if (!featureData) {
       // Handle case where ID is not found
       console.error('Feature not found');
       return;
   }

   // Populate the page with data
   function populateDetailPage(data) {
       // Update hero section
       document.querySelector('.detail-hero-image img').src = data.detailContent.heroImage;
       document.querySelector('.detail-hero-content h1').textContent = data.title;
       document.querySelector('.detail-category').textContent = data.detailContent.category;
       document.querySelector('.detail-price').textContent = data.detailContent.price;

       // Update description
       document.querySelector('.detail-description').innerHTML += data.detailContent.fullDescription;

       // Update page title
       document.title = `${data.title} - Sono Restaurant`;

       // Populate items
       const itemsGrid = document.querySelector('.items-grid');
       itemsGrid.innerHTML = ''; // Clear existing items

       data.detailContent.items.forEach(item => {
           const itemElement = document.createElement('div');
           itemElement.className = 'detail-item';
           itemElement.innerHTML = `
               <img src="${item.image}" alt="${item.name}">
               <div class="item-content">
                   <h3>${item.name}</h3>
                   <p>${item.description}</p>
                   <span class="item-price">${item.price}</span>
               </div>
           `;
           itemsGrid.appendChild(itemElement);
       });
   }

   // Initialize the page
   populateDetailPage(featureData);
});