
let pasword = document.getElementById('password');
let error = document.getElementById('pswdError');
document.getElementById('loginpswdForm').addEventListener('submit',function(event){
    event.preventDefault();
    if(pasword.value.trim()===''){
        error.style.display='block'
        document.getElementById('incorrectError').style.display='none'
        error.innerText = 'password cannot be empty'
    }else{
        document.getElementById('loginpswdForm').submit()
    }
})