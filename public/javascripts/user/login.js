let number = document.getElementById('loginPhoneInput');
let loginError = document.getElementById('loginError')
document.getElementById('loginFirstForm').addEventListener('submit',function(event){
    event.preventDefault();
    if(number.value.trim()===''){
        loginError.innerText= 'phone number cannot be empty'
        loginError.style.display='block'
    }else if(number.value.length >10 || number.value.length<10 ){
        loginError.innerText = 'Enter a valid number ';
        loginError.style.display='block'
    }else{
        document.getElementById('loginFirstForm').submit()
    }
})
