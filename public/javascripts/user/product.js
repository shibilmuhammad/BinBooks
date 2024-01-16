
document.getElementById('readMoreButton').addEventListener('click',function(){
   let readMoreButton =  document.getElementById('readMoreButton');
   let showText =  document.getElementById('showText');
   let dots = document.getElementById('readmoreDots')

    if(showText.style.display==='none'){
       
        readMoreButton.innerHTML="Read less";
        showText.style.display='inline';
        dots.style.display='none'
    }else{
        readMoreButton.innerHTML="Read More";
        showText.style.display='none';
        dots.style.display='inline'
    }
})
async function favorite(element){
    let favButton = document.getElementById('favButton');
    var productId = element.dataset.productId;
    var response = await fetch(`/user/wishlist/${productId}`, { method: 'POST' });
      var data = await response.json();
      const isInWishlist = data.message === 'Added to wishlist';


     

    if(favButton.classList.contains('text-[#666666]')){
      document.getElementById('tooltip-bottom').innerText = 'Added to WishList'
      document.getElementById('tooltip-bottom').style.opacity=1
        setTimeout(() => {
        document.getElementById('tooltip-bottom').innerText = 'Add to WishList'
        document.getElementById('tooltip-bottom').style.opacity='0'
        }, 2000);
        favButton.classList.add('favFill')
        favButton.style.fontVariationSettings = "'FILL' 100"
        favButton.classList.remove('text-[#666666]')
    }else{
      document.getElementById('tooltip-bottom').innerText = 'Removed From wishList'
      document.getElementById('tooltip-bottom').style.opacity=1
        setTimeout(() => {
        document.getElementById('tooltip-bottom').innerText = 'Add to WishList'
        document.getElementById('tooltip-bottom').style.opacity='0'
        }, 2000);
        favButton.classList.remove('favFill')
        favButton.classList.add('text-[#666666]')
        favButton.style.fontVariationSettings = "'FILL' 0"
    }
    if (isInWishlist) {
      // If the product is in the wishlist, update the button style
      favButton.classList.add('favFill');
      favButton.style.fontVariationSettings = "'FILL' 100";
      favButton.classList.remove('text-[#666666]');
    } else {
      // If the product is not in the wishlist, update the button style
      favButton.classList.remove('favFill');
      favButton.classList.add('text-[#666666]');
      favButton.style.fontVariationSettings = "'FILL' 0";
   }
}

var addToCartButtons = document.querySelectorAll('.main-add-to-cart-button');

  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', async function(event) {
      event.preventDefault();
      var productId = this.dataset.productId;
      try {
        var response = await fetch(`/user/myCart/${productId}`, { method: 'POST' });
        var data = await response.json();
        if (data.success === true) {
          var cartNotification = document.getElementById('toast-success')
          cartNotification.style.visibility='visible'
          cartNotification.style.opacity = 1
          setTimeout(function() {
              cartNotification.style.visibility='hidden'
              cartNotification.style.opacity = 0;
          }, 3000);
        }else{
          window.location.href='/user/login'
        }
        }
         catch (error) {
        console.error('Error adding item to cart:', error);
      }
    });
  });