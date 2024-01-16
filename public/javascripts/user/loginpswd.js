
let pasword = document.getElementById('password');
let error = document.getElementById('pswdError');
document.getElementById('loginpswdForm').addEventListener('submit',function(event){
    event.preventDefault();
    if(pasword.value.trim()===''){
        error.style.display='block'
        document.getElementById('incorrectError').style.display='none'
        error.innerText = 'password cannot be empty'
    }else{
        window.history.replaceState(null, null, window.location.href);
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
          history.go(1);
        };
        document.getElementById('loginpswdForm').submit()
      
    }
})