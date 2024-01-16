document.querySelectorAll('.quantity-minus').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault()
        const productId = button.closest('.product').dataset.productId;
        const currentQuantity = parseInt(button.nextElementSibling.innerText);
        if (currentQuantity > 1) {
            updateQuantity(productId, currentQuantity - 1);
        }
    });
});
document.querySelectorAll('.quantity-plus').forEach(button => {
   
    button.addEventListener('click', (event) => {
        event.preventDefault()
        const productId = button.closest('.product').dataset.productId;
        const currentQuantity = parseInt(button.previousElementSibling.innerText);
        updateQuantity(productId, currentQuantity + 1);
    });
});
const updateQuantity = async (productId, newQuantity) => {
    try {
        const response = await fetch(`/user/placeOrder/updateQuantity/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: newQuantity }),
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById(`quantity-display-${productId}`).innerText = newQuantity;
            updateTotalAmount(data.productsWithCount);
        } else {
            console.error('Quantity update failed:', data.message);
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
};
const updateTotalAmount = (productsWithCount) => {
    let totalAmount = 0;
    let totalMRP = 0;
    let totalDiscount = 0;
    let totalProductsCount = 0;
    const deliveryCharge = 40;

    productsWithCount.forEach(function(data) {
        const totalPriceForProduct = data.product.salePrice * data.count;
        totalAmount += totalPriceForProduct;
        totalMRP += data.product.MRP * data.count;
        totalDiscount += (data.product.MRP - data.product.salePrice) * data.count;
        totalProductsCount += data.count;
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