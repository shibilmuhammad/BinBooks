let address = document.getElementById('address');
let payment = document.getElementById('payment');
let placeOrder = document.getElementById('placeOrder');

// address.addEventListener('click',function(){
//   document.getElementById('addressSelected').style.display='block';
//   document.getElementById('paymentSelected').style.display='none';
//   document.getElementById('placeOrderSelected').style.display='none';
// })
// payment.addEventListener('click',function(){
//     document.getElementById('addressSelected').style.display='none';
//     document.getElementById('paymentSelected').style.display='block';
//     document.getElementById('placeOrderSelected').style.display='none';
// })
// placeOrder.addEventListener('click',function(){
//     document.getElementById('addressSelected').style.display='none';
//     document.getElementById('paymentSelected').style.display='none';
//     document.getElementById('placeOrderSelected').style.display='block';
// })
const indianStates = [
   "Kerla", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
];
function populateDropdown() {
    const dropdown = document.getElementById("state");
    indianStates.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.text = state;
        dropdown.add(option);
    });
}
window.onload = populateDropdown;
