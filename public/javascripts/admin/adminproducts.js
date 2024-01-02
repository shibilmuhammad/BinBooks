function deletePopup(){
    document.getElementById("productDelete").style.display="flex";
}
function hideDeletePopup(){
    document.getElementById("productDelete").style.display="none";
}
function showUploadProductPopup() {
    document.getElementById('preview-image').style.display='none'
    document.getElementById("loading").style.display='none'
        document.getElementById("saveSpan").style.display='block'
    document.getElementById('uploadImageError').style.display='none'
    document.getElementById("productUpload").style.display="flex";
    document.getElementById("imageDone").style.display="none";
    document.getElementById("tickImage").style.display="none";
    document.getElementById("BrowseImage").style.display="block";
    document.getElementById("UploadImage").style.display="block";
}
function showEditProductPopup(){
    document.getElementById("productUpload").style.display="flex";
    document.getElementById("imageDone").style.display="block";
    document.getElementById("tickImage").style.display="block";
    document.getElementById("BrowseImage").style.display="none";
    document.getElementById("UploadImage").style.display="none";
}
function hideproductuploadPopup(){
    document.getElementById("productUpload").style.display="none";
}
function Imagedone(){
    document.getElementById("imageDone").style.display="block";
    document.getElementById("tickImage").style.display="block";
    document.getElementById("BrowseImage").style.display="none";
    document.getElementById("UploadImage").style.display="none";
}
document.getElementById('productUploadForm').addEventListener('submit',function(event){
    event.preventDefault();
    productUploadValidate()
})
function productUploadValidate(){
    if(document.getElementById("tickImage").style.display==="none"){ 
        document.getElementById('uploadImageError').style.display='block'
    }else{
        document.getElementById('uploadImageError').style.display='none'
        document.getElementById("loading").style.display='flex'
        document.getElementById("saveSpan").style.display='none'
        document.getElementById('productUploadForm').submit()
    }
}
//show preview of image when upload

document.getElementById('productImage').addEventListener('change',function(){
    showPreviewimage(this)
  })
  function showPreviewimage(input){
    var previewImage = document.getElementById('preview-image');
  
    if (input.files && input.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };
  
        reader.readAsDataURL(input.files[0]);
    }
  }


