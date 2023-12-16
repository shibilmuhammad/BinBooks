document.getElementById('EditProfile').addEventListener('click',function(){
    let number = document.getElementById('number');
    let email = document.getElementById('email');
    let changeNumber = document.getElementById('numberChange');
    let changeEmail = document.getElementById('emailChange');
    let editButton = document.getElementById('labelEditButton')
    number.style.display='none'
    email.style.display='none';
    changeNumber.style.display='block';
    changeEmail.style.display='block';
    editButton.style.display='flex'
    changeEmail.value=email.innerText;
    changeNumber.value=number.innerText;
})