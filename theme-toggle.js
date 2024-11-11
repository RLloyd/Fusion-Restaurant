// theme-toggle.js
class ThemeToggle extends HTMLElement {
   constructor() {
       super();
   }

   connectedCallback() {
       // Create the toggle button HTML
       const toggleHtml = `
           <button class="theme-toggle-btn" aria-label="Toggle theme">
               <i class="fa-solid fa-sun"></i>
               <i class="fa-solid fa-moon"></i>
           </button>
       `;
       this.innerHTML = toggleHtml;

       // Initial theme setup
       const savedTheme = localStorage.getItem('theme') || 'dark';
       document.body.className = `${savedTheme}-theme`;

       // Add click listener
       const button = this.querySelector('.theme-toggle-btn');
       button.addEventListener('click', () => this.toggleTheme());
   }

   toggleTheme() {
       const isDark = document.body.className === 'dark-theme';
       const newTheme = isDark ? 'light' : 'dark';

       // Update body class
       document.body.className = `${newTheme}-theme`;

       // Save preference
       localStorage.setItem('theme', newTheme);

       console.log('Theme switched to:', newTheme);
   }
}

customElements.define('theme-toggle', ThemeToggle);

// // theme-toggle.js
// class ThemeToggle extends HTMLElement {
//    constructor() {
//        super();
//        this.handleClick = this.handleClick.bind(this);
//    }

//    connectedCallback() {
//        this.innerHTML = `
//            <div class="theme-toggle">
//                <button id="themeToggle" aria-label="Toggle theme">
//                    <i class="fa-solid fa-sun"></i>
//                    <i class="fa-solid fa-moon"></i>
//                </button>
//            </div>
//        `;

//        // Initial theme setup
//        const savedTheme = localStorage.getItem('theme');
//        if (savedTheme) {
//            document.body.className = savedTheme === 'light' ? 'light-theme' : 'dark-theme';
//        } else {
//            // Default to dark theme if no theme is saved
//            document.body.className = 'dark-theme';
//            localStorage.setItem('theme', 'dark');
//        }

//        // Add click listener
//        const button = this.querySelector('#themeToggle');
//        button.addEventListener('click', this.handleClick);
//    }

//    handleClick(e) {
//        e.preventDefault();

//        // Get current theme state
//        const currentTheme = document.body.className;
//        console.log('Current theme:', currentTheme);

//        // Set new theme
//        if (currentTheme === 'dark-theme') {
//            document.body.className = 'light-theme';
//            localStorage.setItem('theme', 'light');
//            console.log('Switching to light theme');
//        } else {
//            document.body.className = 'dark-theme';
//            localStorage.setItem('theme', 'dark');
//            console.log('Switching to dark theme');
//        }

//        // Add transition effect to button
//        const button = this.querySelector('#themeToggle');
//        button.classList.add('theme-transition');
//        setTimeout(() => {
//            button.classList.remove('theme-transition');
//        }, 300);
//    }

//    disconnectedCallback() {
//        const button = this.querySelector('#themeToggle');
//        if (button) {
//            button.removeEventListener('click', this.handleClick);
//        }
//    }
// }

// customElements.define('theme-toggle', ThemeToggle);