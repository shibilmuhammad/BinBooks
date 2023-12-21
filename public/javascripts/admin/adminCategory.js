function showCategoryEdit(){
    document.getElementById("categoryEditPopup").style.display="flex"
    document.getElementById("imageDone").style.display="none";
    document.getElementById("tickImage").style.display="none";
    document.getElementById("BrowseImage").style.display="block";
    document.getElementById("UploadImage").style.display="block";
}
function hideCategoryEdit(){
    document.getElementById("categoryEditPopup").style.display="none";
    categoryDescriptionError.style.display='none'
    categoryNameError.style.display='none';
    imageUploadError.style.display='none'
}
function Imagedone(){
    document.getElementById("imageDone").style.display="block";
    document.getElementById("tickImage").style.display="block";
    document.getElementById("BrowseImage").style.display="none";
    document.getElementById("UploadImage").style.display="none";
}
function loading(){
    document.getElementById('loading').style.display="flex";
    document.getElementById('saveSpan').style.display='none'
}
document.getElementById('Categorysubmit').addEventListener('submit', function(event){
    event.preventDefault();
    validateForm()
})

function validateForm(){
    let categoryName = document.getElementById('categoryName');
    let categoryDescription = document.getElementById('categoryDescription');
    let categoryNameError = document.getElementById("categoryNameError");
    let categoryDescriptionError = document.getElementById('categoryDescriptionError');
    let imageUploadError = document.getElementById('imageUploadError');
    if(categoryName.value.trim()===""){
        categoryDescriptionError.style.display='none';
        imageUploadError.style.display='none'
        categoryNameError.style.display='block'
    }else if (categoryDescription.value.trim()===""){
        categoryNameError.style.display='none';
        imageUploadError.style.display='none'
        categoryDescriptionError.innerText='Category Description cannot be empty !!'
        categoryDescriptionError.style.display='block'
    }else if(categoryDescription.value.length>250){
        categoryNameError.style.display='none';
        imageUploadError.style.display='none'
        categoryDescriptionError.innerText='Description is too long !!'
        categoryDescriptionError.style.display='block'
    }else if (categoryDescription.value.length<100){
        categoryNameError.style.display='none';
        imageUploadError.style.display='none'
        categoryDescriptionError.innerText='Description is too short !!'
        categoryDescriptionError.style.display='block';
    }else if(document.getElementById("tickImage").style.display=='none'){
        categoryNameError.style.display='none';
        categoryDescriptionError.style.display='none';
        imageUploadError.style.display='block'
    }else{
        categoryDescriptionError.style.display='none'
        categoryNameError.style.display='none';
        loading()
        document.getElementById('Categorysubmit').submit();
    }

}
