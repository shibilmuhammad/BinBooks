
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


// let container = document.getElementById("TopCategorycontainer");
// let rightScrollButton =document.getElementById("topCategoryScrollRight"); 
// rightScrollButton.addEventListener("click",function(){
//   container.scrollLeft += 600;

// })
  

// container.addEventListener('scroll', function () {
//   rightScrollButton.style.right=0+'px' ;
// });
// document.getElementById('menuButton').addEventListener('click',function(){
//   openNav()
// })
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
