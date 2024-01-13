
let slideIndex2 = 0;
showSlides(slideIndex2);
function plusSlides(n) {
  showSlides(slideIndex2 += n);
}
function currentSlide(n) {
  showSlides(slideIndex2 = n);
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex2 = 1}    
  if (n < 1) {slideIndex2 = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex2-1].style.display = "block";  
  dots[slideIndex2-1].className += " active";
}
function showSlides1() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex2++;
    if (slideIndex2 > slides.length) {slideIndex2 = 1}    
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex2-1].style.display = "block";  
    dots[slideIndex2-1].className += " active";
    timeOutId = setTimeout(showSlides1, 2000); // Change image every 2 seconds
  }
  showSlides1()
function openNav(){
  var sidebar = document.getElementById("Sidebar");
  sidebar.style.transform="translateX(0px)";
  document.getElementById("SidebarContainerr").style.visibility="visible"
 
}
function hideSidebar(){
  var sidebar = document.getElementById("Sidebar");
  sidebar.style.transform="translateX(-250px)";
  document.getElementById("SidebarContainerr").style.visibility="hidden"
} 

var addToCartButtons = document.querySelectorAll('.add-to-cart-button');

  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', async function(event) {
      event.preventDefault();
      var productId = this.dataset.productId;
      try {
        var response = await fetch(`/user/myCart/${productId}`, { method: 'POST' });
        var data = await response.json();
        var cartNotification = button.querySelector('.cartNotification');
        cartNotification.textContent = 'Item added to cart: ' + data.productName;
        cartNotification.style.display = 'block';
        setTimeout(function() {
          cartNotification.style.display = 'none';
        }, 3000);
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    });
  });
function logOut(){
  document.getElementById('logOutForm').submit()
}