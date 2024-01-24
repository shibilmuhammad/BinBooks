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


document.getElementById('rzp-button1').onclick =  async function(e){
    const response =  await fetch('/user/placeOrder/orderConfirmation',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            amount:500
        })
    })
    let data = await response.json()

    if(data == 'Cod'){
        window.location.href = '/user/proceedtoPay/paymentId'
    }
var options = {
    "key": data.key_id, // Enter the Key ID generated from the Dashboard
    "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "BinBooks",
    "description": "Test Transaction",
    "image": "http://localhost:3000/images/LOGO FOR WHITEBG.jpg",
    "order_id": data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        window.location.href= `/user/proceedtoPay/${response.razorpay_payment_id}`
    },
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#5E8E99"
    }
};
var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
    rzp1.open();
    e.preventDefault();
}