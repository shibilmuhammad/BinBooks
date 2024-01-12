
let userName = document.getElementById('CAname');
let email = document.getElementById('CAemail');
let maleGender = document.getElementById('male');
let femaleGender = document.getElementById('female');
let createAcecountError = document.querySelector('.createAccountError')
let password = document.getElementById('CApassword');
let confirmPassword = document.getElementById('CAconfirmPassword');
let createAccountError = document.querySelectorAll('.createAccountError');

document.getElementById('createAccountForm').addEventListener('submit',function(event){
    event.preventDefault();
    console.log(userName.value.trim())
    if(userName.value.trim()===''){
        createAccountError.forEach(function(element){
            element.innerText = 'Name cannot be empty!!';
            element.style.display = 'flex'
        })
    }else if (!isValidEmail(email.value.trim())) {
        createAccountError.forEach(function(element){
            element.innerText = 'Enter a valid email '
            element.style.display = 'flex'
        })
    }else if (!maleGender.checked && !femaleGender.checked) {
        createAccountError.forEach(function(element){
            element.innerText = 'Select a gender '
            element.style.display = 'flex'
        })
    } else if (password.value.trim() === '') {
        createAccountError.forEach(function(element){
            element.innerText = 'Password cannot be empty!! '
            element.style.display = 'flex'
        })
    } else if (password.value.length<8) {
        createAccountError.forEach(function(element){
            element.innerText = 'Password must be more than 8 letters!! '
            element.style.display = 'flex'
        })
    }else if (password.value !== confirmPassword.value) {
        createAccountError.forEach(function(element){
            element.innerText = 'Pasword do not match '
            element.style.display = 'flex'
        })
    }else{
        createAccountError.forEach(function(element){
            element.style.display = 'none'
        })
        document.getElementById('createAccountForm').submit()
    }
})
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function togglePasswordVisibility() {
    var passwordInput = document.getElementById('CApassword');
    var visibilityIcon = document.getElementById('VisibilityPassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        visibilityIcon.innerText = 'visibility';
    } else {
        passwordInput.type = 'password';
        visibilityIcon.innerText = 'visibility_off';
    }
}
function togglePasswordVisibilityConfirm(){
    var passwordInput = document.getElementById('CAconfirmPassword');
    var visibilityIcon = document.getElementById('VisibilityConfirmPassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        visibilityIcon.innerText = 'visibility';
    } else {
        passwordInput.type = 'password';
        visibilityIcon.innerText = 'visibility_off';
    }
}