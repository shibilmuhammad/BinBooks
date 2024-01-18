let userId
let orderId
async function showEditOrder(element){
    try {
        const productId =  element.id

        const response = await fetch(`/admin/orders/edit/${productId}`);
        const data = await response.json();
        userId = data.userId;
        orderId = data.orderId
        let totalAmount = 0;
        let totalMRP = 0;
        let totalDiscount = 0;
        let totalProductsCount = 0;
        const deliveryCharge = 40;
        data.order.products.forEach(function(product) {
        const totalPriceForProduct = product.product.salePrice * product.count;
        totalAmount += totalPriceForProduct;
        totalMRP +=  product.product.MRP *  product.count;
        totalDiscount += ( product.product.MRP -  product.product.salePrice) *  product.count;
        totalProductsCount +=  product.count;
    });
    const finalDiscountedPrice = totalMRP - totalDiscount;
    const totalPriceIncludingDelivery = finalDiscountedPrice + deliveryCharge;
        document.getElementById('a-name').textContent=data.order.address.name
        document.getElementById('a-phone').textContent=data.order.address.phone;
        document.getElementById('a-house').textContent=data.order.address.house
        document.getElementById('a-area').textContent=data.order.address.area;
        document.getElementById('a-city').textContent=data.order.address.town
        document.getElementById('a-state').textContent=data.order.address.state;
        document.getElementById('a-pinCode').textContent=data.order.address.pinCode;
        document.getElementById('a-landMark').textContent=data.order.address.landMark
        document.getElementById('paymentMethod').textContent= data.order.paymentMethod
        document.getElementById('totalMRP').textContent= '₹'+totalMRP
        document.getElementById('totalAmount').textContent = '₹'+totalPriceIncludingDelivery +"(including delivery)"
        document.getElementById('totalDiscount').textContent = '₹'+totalDiscount
        document.getElementById('phoneNum').textContent = data.order.address.phone
        document.getElementById('orderAndUserId').value =  data.order.userId +'-'+data.order.orderId

        document.getElementById('dateofOrder').textContent = new Date(data.order.date).toLocaleString();
        const status = data.order.status;

switch (status) {
    case 'ordered':
        document.getElementById('ordered').checked = true;
        break;
    case 'Packed':
        document.getElementById('Packed').checked = true;
        break;
    case 'Shipped':
        document.getElementById('Shipped').checked = true;
        break;
    case 'Delivered':
        document.getElementById('Delivered').checked = true;
        break;
    case 'Cancelled':
        document.getElementById('Cancelled').checked = true;
        break;
    // Add more cases if needed
    default:
        // Handle default case if the status doesn't match any of the above
        break;
}
    // Assuming data.order.products is an array of products
    data.order.products.forEach(product => {
        // Create the main container div
        const productContainer = document.createElement('div');
        productContainer.className = 'flex space-x-3 border-[.1px] border-gray-400';
    
        // Create the left section with image and quantity
        const leftSection = document.createElement('div');
        leftSection.className = 'w-4/12 flex justify-center items- border-r-[.1px] border-gray-400';
        const imageContainer = document.createElement('div');
        imageContainer.className = 'py-3';
        const productImage = document.createElement('img');
        productImage.className = 'h-20';
        productImage.src = product.product.imageUrl; // Replace with actual image source
        productImage.alt = '';
        const quantityContainer = document.createElement('div');
        quantityContainer.className = 'bg-[#E8E8E8] text-[10px] flex justify-around mt-2 rounded-sm whitespace-now';
        quantityContainer.innerHTML = '<p class="text-gray-500">Qty</p> <span>' + product.count + '</span>';
    
        imageContainer.appendChild(productImage);
        imageContainer.appendChild(quantityContainer);
        leftSection.appendChild(imageContainer);
    
        // Create the right section with product details
        const rightSection = document.createElement('div');
        rightSection.className = 'flex flex-col justify-center';
        const title = document.createElement('h1');
        title.className = 'text-lg text-[#4B727A] font-semibold';
        title.textContent = product.product.bookName; 
        const author = document.createElement('h2');
        author.className = 'text-[#5E8E99] text-base';
        author.textContent = product.product.author; 
        const priceContainer = document.createElement('div');
        priceContainer.className = 'flex space-x-1 items-center';
        const price = document.createElement('p');
        price.className = 'font-semibold';
        price.textContent = '₹' + product.product.salePrice; 
        const mrp = document.createElement('span');
        mrp.className = 'text-xs line-through text-[#666666]';
        mrp.textContent = 'MRP ' + product.product.MRP; 
    
        priceContainer.appendChild(price);
        priceContainer.appendChild(mrp);
        rightSection.appendChild(title);
        rightSection.appendChild(author);
        rightSection.appendChild(priceContainer);
    
        // Append left and right sections to the main container
        productContainer.appendChild(leftSection);
        productContainer.appendChild(rightSection);
    
        // Append the product container to the productsContainer div
        document.getElementById('productsContainer').appendChild(productContainer);
        document.getElementById("ordermanagmentPopup").style.display="flex"
    });

    }catch{
        console.log('error',error);
    }
    
   
}
function hideEditOrder(){
    userId = "";
    orderId= "";
    document.getElementById("ordermanagmentPopup").style.display="none"
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';
}
let form = document.getElementById('orderStatusUpdateForm')
document.getElementById('orderStatusUpdateForm').addEventListener('submit',function(event){
    event.preventDefault()
    form.action = `/admin/orders/update/${userId+'-'+orderId}`
    form.submit()

})