function deletePopup(element){
    document.getElementById("productDelete").style.display="flex";
    document.getElementById('deleteId').value=element.id
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
function hideproductuploadPopup(){
    document.getElementById("productUpload").style.display="none";
}
function Imagedone(){
    document.getElementById("imageDone").style.display="block";
    document.getElementById("tickImage").style.display="block";
    document.getElementById("BrowseImage").style.display="none";
    document.getElementById("UploadImage").style.display="none";
}
//validate image
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
  //show preview of image when Edit
document.getElementById('productImageEdit').addEventListener('change',function(){
    showPreviewimageEdit(this)
  })
  function showPreviewimageEdit(input){
    var previewImage = document.getElementById('preview-imageEdit');
  
    if (input.files && input.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };
  
        reader.readAsDataURL(input.files[0]);
    }
  }
//Edit product 
async function  editProduct(element){ 
    document.getElementById('editId').value=element.id;
    try {
        const productId =  element.id
        const response = await fetch(`/admin/products/edit/${productId}`);
        const data = await response.json();
        const itemId = data.item._id;
        const bookName = data.item.bookName;
        const author = data.item.author;
        const MRP = data.item.MRP;
        const discount = data.item.discount;
        const delCharge = data.item.delCharge;
        const pages = data.item.pages;
        const width = data.item.width;
        const height= data.item.height;
        const category = data.item.category;
        const condition = data.item.condition;
        const status = data.item.status;
        const publisher = data.item.publisher;
        const description = data.item.description;
        const imageUrl = data.item.imageUrl
        const cloudinaryId = data.item.cloudinaryId;

        document.getElementById('bookNameEdit').value= bookName
        document.getElementById('authorEdit').value= author;
        document.getElementById('mrpEdit').value=MRP;
        document.getElementById('discountEdit').value= discount;
        document.getElementById('delChargeEdit').value= delCharge;
        document.getElementById('pagesEdit').value= pages;
        document.getElementById('widthEdit').value= width;
        document.getElementById('heightEdit').value=height; 
        document.getElementById('categoryEdit3').value=category
        document.getElementById('conditionEdit').value=condition
        document.getElementById('statusEdit').value=status
        document.getElementById('publisherEdit').value=publisher;
        document.getElementById('descriptionEdit').value=description
        document.getElementById('preview-imageEdit').src = imageUrl

        document.getElementById("productEditPopup").style.display="flex"
        document.getElementById("imageEditDone").style.display="block";
        document.getElementById("tickImageEdit").style.display="block";
        document.getElementById("BrowseImageEdit").style.display="none";
        document.getElementById("UploadImageEdit").style.display="none"
        document.getElementById('preview-imageEdit').src=imageUrl
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
}
// hide edit popup
function hideEditProductPopup(){
    document.getElementById("productEditPopup").style.display="none"
}
function capitalizeFirstLetter(str) {
    if (str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

document.getElementById('productEditPopup').addEventListener('submit',function(){
    document.getElementById('loadingEdit').style.display='flex'
    document.getElementById('saveSpanEdit').style.display='none'
})