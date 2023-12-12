
document.getElementById('readMoreButton').addEventListener('click',function(){
   let readMoreButton =  document.getElementById('readMoreButton');
   let showText =  document.getElementById('showText');
   let dots = document.getElementById('readmoreDots')

    if(showText.style.display==='none'){
       
        readMoreButton.innerHTML="Read less";
        showText.style.display='inline';
        dots.style.display='none'
    }else{
        readMoreButton.innerHTML="Read More";
        showText.style.display='none';
        dots.style.display='inline'
    }
})
function favorite(){
    let favButton = document.getElementById('favButton');
    if(favButton.classList.contains('text-[#666666]')){
        favButton.classList.add('favFill')
        favButton.style.fontVariationSettings = "'FILL' 100"
        favButton.classList.remove('text-[#666666]')
    }else{
        favButton.classList.remove('favFill')
        favButton.classList.add('text-[#666666]')
        favButton.style.fontVariationSettings = "'FILL' 0"
    }
}