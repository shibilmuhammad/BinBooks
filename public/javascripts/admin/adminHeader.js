const searchHeaderDesk= document.getElementById('searchDesktopHeader')
searchHeaderDesk.addEventListener('submit',async function(event){
    
    event.preventDefault()
    let searchValue = document.getElementById('searchHeaderInput').value
    if(searchValue===''){
        window.location.href='/user/home'
    }
    const response = await fetch(`/user/search?q=${encodeURIComponent(searchValue)}`);
    const result = await response.text();
        // document.body.innerHTML = result;
        document.getElementsByTagName('main')[0].style.display = 'none';
        document.getElementById('searchResult-Container').innerHTML=result
        
    document.getElementById('searchHeaderInput').value = searchValue
})
// document.addEventListener('DOMContentLoaded', function () {
//     const searchQuery = new URLSearchParams(window.location.search).get('query');
//     document.getElementById('searchHeaderInput').value = searchQuery || '';
// });