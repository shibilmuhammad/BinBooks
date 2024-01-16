//add to cart
var addToCartButtons = document.querySelectorAll('.add-to-cart-button');

  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', async function(event) {
      event.preventDefault();
      var productId = this.dataset.productId;
      try {
        var response = await fetch(`/user/myCart/${productId}`, { method: 'POST' });
        var data = await response.json();
        var cartNotification = button.querySelector('.cartNotification');
        cartNotification.textContent = 'Added';
        let cartImage = button.querySelector('.cart-image');
        cartImage.src='/images/roundedTick2 white.png'
        button.classList.remove('bg-[#DAA520]','hover:bg-[#c4951d]')
        button.classList.add('bg-green-800')
        cartNotification.style.display = 'block';
        setTimeout(function() {
            cartNotification.textContent = 'Add';
            cartImage.src='/images/shopping-cart white.png';
            button.classList.add('bg-[#DAA520]','hover:bg-[#c4951d]')
        button.classList.remove('bg-green-800')
        }, 2000);
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    });
  });

  
async function addtoCart(event,element){
  event.preventDefault();
  var productId = element.dataset.productId;
      try {
        var response = await fetch(`/user/myCart/${productId}`, { method: 'POST' });
        var data = await response.json();
        var cartNotification = element.querySelector('.cartNotification');
        cartNotification.textContent = 'Added';
        let cartImage = element.querySelector('.cart-image');
        cartImage.src='/images/roundedTick2 white.png'
        element.classList.remove('bg-[#DAA520]','hover:bg-[#c4951d]')
        element.classList.add('bg-green-800')
        cartNotification.style.display = 'block';
        setTimeout(function() {
            cartNotification.textContent = 'Add';
            cartImage.src='/images/shopping-cart white.png';
            element.classList.add('bg-[#DAA520]','hover:bg-[#c4951d]')
        element.classList.remove('bg-green-800')
        }, 2000);
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }