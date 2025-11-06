// Menu open/close functionality
const menuBtn = document.getElementById('menu-btn');
const menuClose = document.getElementById('menu-close');
const navigation = document.querySelector('.navigation ul');

// Toggle menu visibility and button states
function toggleMenu(show) {
    navigation.classList.toggle('active', show);
    menuBtn.style.opacity = show ? '0' : '1';
    menuBtn.style.visibility = show ? 'hidden' : 'visible';
    menuClose.style.opacity = show ? '1' : '0';
    menuClose.style.visibility = show ? 'visible' : 'hidden';
}

// Open menu when hamburger is clicked
menuBtn.addEventListener('click', () => {
    toggleMenu(true);
});

// Close menu when X is clicked
menuClose.addEventListener('click', () => {
    toggleMenu(false);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navigation.contains(e.target) && !menuBtn.contains(e.target)) {
        toggleMenu(false);
    }
});

// Close menu when window is resized past mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 769) {
        toggleMenu(false);
    }
});

// Initialize button states
document.addEventListener('DOMContentLoaded', () => {
    menuClose.style.opacity = '0';
    menuClose.style.visibility = 'hidden';
    menuBtn.style.opacity = '1';
    menuBtn.style.visibility = 'visible';
});

//selecting all required elements
const filterItem = document.querySelector(".items");
const filterImg = document.querySelectorAll(".gallery .image");

window.onload = ()=>{ //after window loaded
  filterItem.onclick = (selectedItem)=>{ //if user click on filterItem div
    if(selectedItem.target.classList.contains("item")){ //if user selected item has .item class
      filterItem.querySelector(".active").classList.remove("active"); //remove the active class which is in first item
      selectedItem.target.classList.add("active"); //add that active class on user selected item
      let filterName = selectedItem.target.getAttribute("data-name"); //getting data-name value of user selected item and store in a filtername variable
      filterImg.forEach((image) => {
        let filterImges = image.getAttribute("data-name"); //getting image data-name value
        //if user selected item data-name value is equal to images data-name value
        //or user selected item data-name value is equal to "all"
        if((filterImges == filterName) || (filterName == "all")){
          image.classList.remove("hide"); //first remove the hide class from the image
          image.classList.add("show"); //add show class in image
        }else{
          image.classList.add("hide"); //add hide class in image
          image.classList.remove("show"); //remove show class from the image
        }
      });
    }
  }
  for (let i = 0; i < filterImg.length; i++) {
    filterImg[i].setAttribute("onclick", "preview(this)"); //adding onclick attribute in all available images
  }
}
document.addEventListener("DOMContentLoaded", () => {
    
    const statsContainer = document.querySelector('.accomplishments');
    
    // Function to animate the number count-up
    function animateCount(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000; // 2 seconds
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            
            el.innerText = Math.floor(percentage * target);

            if (percentage < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.innerText = target; // Ensure it ends on the exact target
            }
        }
        window.requestAnimationFrame(step);
    }

    // Function to animate the SVG circle
    function animateCircle(circle) {
        const percent = parseInt(circle.dataset.percent, 10);
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        // Set the initial state (empty)
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        // Calculate the final offset
        const offset = circumference - (percent / 100) * circumference;
        
        // Use a small timeout to ensure the CSS transition applies
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);
    }

    // Use Intersection Observer to trigger animations on scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate numbers
                const counts = entry.target.querySelectorAll('.count');
                counts.forEach(animateCount);
                
                // Animate circles
                const circles = entry.target.querySelectorAll('.stat-circle-progress');
                circles.forEach(animateCircle);
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    // Start observing the section
    if (statsContainer) {
        observer.observe(statsContainer);
    }
});

//IMPACT//
document.addEventListener("DOMContentLoaded", () => {
    
    const statsContainer = document.querySelector('.impact-stats-container');
    
    // Function to animate the number count-up
    function animateCount(el) {
        // Stop if the element has already been animated
        if (el.classList.contains('animated')) return;

        const target = parseInt(el.dataset.target, 10);
        const duration = 2000; // 2 seconds
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            
            // Update the display with the current count value
            el.innerText = Math.floor(percentage * target);

            if (percentage < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.innerText = target; // Ensure it ends on the exact target
                el.classList.add('animated'); // Mark as animated
            }
        }
        window.requestAnimationFrame(step);
    }

    // Use Intersection Observer to trigger animations on scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all elements with the class 'count' inside the container
                const counts = entry.target.querySelectorAll('.count');
                
                // Animate each number
                counts.forEach(animateCount);
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    // Start observing the stats container
    if (statsContainer) {
        observer.observe(statsContainer);
    }
});
