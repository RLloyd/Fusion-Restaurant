// data.js
const websiteData = {
   slides: [
       {
           image: "./images/coupleDining.webp",
           title: "Modern Fine Dining",
           description: "Experience culinary excellence in a contemporary setting",
           link: "/dining-experience"
       },
       {
           image: "./images/sono-1.jpg",
           title: "Seasonal Menu",
           description: "Fresh, local ingredients crafted into extraordinary dishes",
           link: "/menu"
       },
       {
           image: "./images/sono-2.jpg",
           title: "Private Events",
           description: "Create unforgettable moments in our exclusive spaces",
           link: "/events"
       },
       {
           image: "./images/sono-3.jpg",
           title: "Private Events",
           description: "Create unforgettable moments in our exclusive spaces",
           link: "/events"
       }
   ],
   features: [
       {
           id: "chefs-special",
           title: "Chef's Special",
           image: "./images/chefSpecial.webp",
           description: "Our signature dish crafted with passion",
           ctaText: "View Details",
           ctaLink: "detail.html?id=chefs-special",
           detailContent: {
               heroImage: "./images/chefSpecial.webp",
               category: "Signature Dishes",
               price: "$45",
               fullDescription: `
                   <p>Our Chef's Special represents the pinnacle of culinary excellence,
                   where tradition meets innovation. Each dish is meticulously crafted
                   using the finest seasonal ingredients sourced from local producers.</p>

                   <p>Under the guidance of our Executive Chef, these signature dishes
                   showcase both classic techniques and contemporary creativity,
                   delivering an unforgettable dining experience.</p>

                   <p>Every dish is crafted with precision and care, ensuring that each
                   plate that leaves our kitchen is not just a meal, but a masterpiece
                   that engages all your senses.</p>
               `,
               items: [
                   {
                       name: "Wagyu Beef Tenderloin",
                       description: "Grade A5 Wagyu beef served with truffle potato puree and seasonal vegetables",
                       price: "$65",
                       image: "./images/wagyu.webp"
                   },
                   {
                       name: "Wild-Caught Sea Bass",
                       description: "Pan-seared sea bass with saffron risotto and citrus butter sauce",
                       price: "$45",
                       image: "./images/seabass.webp"
                   },
                   {
                       name: "Duck Confit",
                       description: "Traditional French duck confit with cherry gastrique and root vegetables",
                       price: "$40",
                       image: "./images/duck.webp"
                   }
               ]
           }
       },
       {
           id: "wine-collection",
           title: "Wine Collection",
           image: "./images/wineCollection.webp",
           description: "Curated selection of finest wines",
           ctaText: "View Details",
           ctaLink: "detail.html?id=wine-collection",
           detailContent: {
               heroImage: "./images/wineCollection.webp",
               category: "Beverages",
               price: "Various",
               fullDescription: `
                   <p>Our extensively curated wine collection represents the finest
                   selections from renowned vineyards across the globe. Each wine
                   has been carefully chosen to complement our menu and enhance
                   your dining experience.</p>

                   <p>Our sommeliers are always available to help you discover
                   the perfect pairing for your meal, whether you're a wine
                   connoisseur or just beginning your wine journey.</p>

                   <p>With over 300 labels in our cellar, including rare vintages
                   and exclusive releases, we pride ourselves on offering one of the
                   most comprehensive wine lists in the region.</p>
               `,
               items: [
                   {
                       name: "Vintage Bordeaux Collection",
                       description: "Premium French wines from the finest châteaux, featuring exceptional vintages from 1982-2010",
                       price: "$200-$1000",
                       image: "./images/bordeaux.webp"
                   },
                   {
                       name: "Italian Classics",
                       description: "Selection of prestigious Italian wines including Barolo, Brunello, and Super Tuscans",
                       price: "$150-$500",
                       image: "./images/italian-wines.webp"
                   },
                   {
                       name: "New World Discoveries",
                       description: "Outstanding wines from California, Australia, and South America, showcasing unique terroirs",
                       price: "$80-$300",
                       image: "./images/new-world-wines.webp"
                   }
               ]
           }
       },
       {
           id: "private-dining",
           title: "Private Dining",
           image: "./images/privateDining.webp",
           description: "Exclusive spaces for special occasions",
           ctaText: "View Details",
           ctaLink: "detail.html?id=private-dining",
           detailContent: {
               heroImage: "./images/privateDining.webp",
               category: "Events",
               price: "Custom",
               fullDescription: `
                   <p>Experience the epitome of luxury dining in our private rooms,
                   designed to create intimate and memorable occasions. Whether you're
                   celebrating a special milestone or hosting a corporate event, our
                   private dining spaces offer the perfect setting.</p>

                   <p>Each room is uniquely designed with its own character and charm,
                   featuring elegant décor and state-of-the-art amenities. Our dedicated
                   events team ensures every detail is perfected to your specifications.</p>

                   <p>Customized menus, expert service, and attention to every detail
                   make our private dining experiences truly exceptional.</p>
               `,
               items: [
                   {
                       name: "The Vintage Room",
                       description: "An intimate space featuring exposed brick walls and wine displays, perfect for gatherings of up to 12 guests",
                       price: "Starting at $1000",
                       image: "./images/vintage-room.webp"
                   },
                   {
                       name: "The Garden Terrace",
                       description: "A beautiful outdoor space with retractable roof, accommodating up to 30 guests with stunning city views",
                       price: "Starting at $2000",
                       image: "./images/garden-terrace.webp"
                   },
                   {
                       name: "The Grand Hall",
                       description: "Our largest private space featuring crystal chandeliers and a private bar, perfect for events up to 50 guests",
                       price: "Starting at $3000",
                       image: "./images/grand-hall.webp"
                   }
               ]
           }
       },
       {
           id: "weekend-brunch",
           title: "Weekend Brunch",
           image: "./images/weekendBrunch.webp",
           description: "A perfect start to your weekend",
           ctaText: "View Details",
           ctaLink: "detail.html?id=weekend-brunch",
           detailContent: {
               heroImage: "./images/weekendBrunch.webp",
               category: "Dining",
               price: "$35 per person",
               fullDescription: `
                   <p>Join us for an unforgettable weekend brunch experience that
                   combines classic favorites with innovative culinary creations.
                   Our brunch menu changes seasonally to showcase the freshest
                   ingredients and inspiring flavor combinations.</p>

                   <p>From house-made pastries to elegant egg dishes and creative
                   cocktails, our weekend brunch offers something for everyone.
                   Each dish is prepared with the same attention to detail and
                   quality that defines all our culinary offerings.</p>

                   <p>Complementing our food menu is an extensive selection of
                   breakfast cocktails, fresh-pressed juices, and premium coffee
                   and tea selections.</p>
               `,
               items: [
                   {
                       name: "Classic Benedict",
                       description: "Poached eggs on toasted brioche with Canadian bacon and hollandaise, served with breakfast potatoes",
                       price: "$24",
                       image: "./images/benedict.webp"
                   },
                   {
                       name: "French Toast",
                       description: "Thick-cut brioche French toast with maple butter, fresh berries, and whipped cream",
                       price: "$18",
                       image: "./images/french-toast.webp"
                   },
                   {
                       name: "Brunch Cocktails",
                       description: "Selection of classic and innovative brunch cocktails including Mimosas, Bloody Marys, and seasonal specials",
                       price: "$12-$16",
                       image: "./images/brunch-cocktails.webp"
                   }
               ]
           }
       }
   ]
};

// Add this to your data.js
const menuData = {
   categories: [
       {
           id: 'appetizers',
           name: 'Appetizers',
           items: [
               {
                   id: 'app1',
                   name: 'Truffle Fries',
                   description: 'Hand-cut fries drizzled with truffle oil and parmesan',
                   price: 12.99,
                   image: './images/truffle-fries.webp',
                   dietary: ['vegetarian'],
                   spiceLevel: 1
               },
               {
                   id: 'app2',
                   name: 'Calamari',
                   description: 'Crispy fried calamari with spicy marinara sauce',
                   price: 15.99,
                   image: './images/calamari.webp',
                   spiceLevel: 2
               },
               // Add more appetizers...
           ]
       },
       {
           id: 'mains',
           name: 'Main Courses',
           items: [
               {
                   id: 'main1',
                   name: 'Wagyu Steak',
                   description: 'Grade A5 Japanese Wagyu with seasonal vegetables',
                   price: 89.99,
                   image: './images/wagyu-steak.webp',
                   spiceLevel: 0,
                   cookingOptions: ['rare', 'medium-rare', 'medium', 'medium-well', 'well-done']
               },
               {
                  id: 'main2',
                  name: 'Maine Lobster',
                  description: 'Butter-poached Maine lobster, truffle mash, asparagus, lemon beurre blanc.',
                  price: 89.99,
                  image: './images/maine-lobster.webp',
                  spiceLevel: 0,
                  // cookingOptions: ['rare', 'medium-rare', 'medium', 'medium-well', 'well-done']
              },
              {
               id: 'main3',
               name: 'Seafood',
               description: 'Seared scallops, garlic prawns, saffron risotto, basil-infused citrus sauce.',
               price: 89.99,
               image: './images/seafood.webp',
               spiceLevel: 0,
               // cookingOptions: ['rare', 'medium-rare', 'medium', 'medium-well', 'well-done']
           },
               // Add more main courses...
           ]
       },
       {
           id: 'desserts',
           name: 'Desserts',
           items: [
               {
                   id: 'dessert1',
                   name: 'Crème Brûlée',
                   description: 'Classic French vanilla custard with caramelized sugar',
                   price: 12.99,
                   image: './images/creme-brulee.webp',
                   dietary: ['vegetarian']
               },
               // Add more desserts...
           ]
       }
   ],
   dietary: {
       vegetarian: '🥬',
       vegan: '🌱',
       glutenFree: 'GF',
       spicy: '🌶️'
   },
   spiceLevels: {
       0: 'Not Spicy',
       1: 'Mild',
       2: 'Medium',
       3: 'Hot',
       4: 'Extra Hot'
   }
};

// Add to your existing websiteData object
websiteData.menu = menuData;