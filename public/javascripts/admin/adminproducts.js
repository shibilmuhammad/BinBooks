function deletePopup(){
    document.getElementById("productDelete").style.display="flex";
}
function hideDeletePopup(){
    document.getElementById("productDelete").style.display="none";
}
function showUploadProductPopup() {
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



