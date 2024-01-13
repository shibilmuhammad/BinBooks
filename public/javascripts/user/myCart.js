

const updateQuantity = async (productId, newQuantity) => {
    try {
        const response = await fetch(`/user/myCart/updateQuantity/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: newQuantity }),
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById(`quantity-display-${productId}`).innerText = newQuantity;
            updateTotalAmount(data.myCart);
        } else {
            console.error('Quantity update failed:', data.message);
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
};
document.querySelectorAll('.quantity-minus').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.closest('.product').dataset.productId;
        const currentQuantity = parseInt(button.nextElementSibling.innerText);
        if (currentQuantity > 1) {
            updateQuantity(productId, currentQuantity - 1);
        }
    });
});
document.querySelectorAll('.quantity-plus').forEach(button => {
   
    button.addEventListener('click', () => {
        const productId = button.closest('.product').dataset.productId;
        const currentQuantity = parseInt(button.previousElementSibling.innerText);
        updateQuantity(productId, currentQuantity + 1);
    });
});
const updateTotalAmount = (myCart) => {
    let totalAmount = 0;
    let totalMRP = 0;
    let totalDiscount = 0;
    let totalProductsCount = 0;
    const deliveryCharge = 40;
    myCart.forEach(function(product) {
        const totalPriceForProduct = product.salePrice * product.quantity;
        totalAmount += totalPriceForProduct;
        totalMRP += product.MRP * product.quantity;
        totalDiscount += (product.MRP - product.salePrice) * product.quantity;
        totalProductsCount += product.quantity;
    });
    const finalDiscountedPrice = totalMRP - totalDiscount;
    const totalPriceIncludingDelivery = finalDiscountedPrice + deliveryCharge;
    document.getElementById('totalProductsCount').innerText = totalProductsCount;
    document.getElementById('totalMRP').innerText = totalMRP;
    document.getElementById('finalDiscountedPrice').innerText = finalDiscountedPrice;
    document.getElementById('deliveryCharge').innerText ='₹'+deliveryCharge;
    document.getElementById('totalPriceIncludingDelivery').innerText = '₹'+totalPriceIncludingDelivery;
    document.getElementById("finalMRP").innerText ='₹'+ totalMRP;;
    document.getElementById('finalsaleprice').innerText='₹'+totalPriceIncludingDelivery
};


document.addEventListener('DOMContentLoaded', function () {
   updateQuantity()
});
