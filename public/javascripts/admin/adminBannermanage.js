async function showBannerEdit(element){
    elementId = element.id
    document.getElementById("bannerEditPopup").style.display="flex";
    const response = await fetch(`/admin/banner/${elementId}`)
    const data = await response.json()
    document.getElementById('editBannerId').value = element.id

    const startDateFormatted = new Date(data.startDate).toISOString().split('T')[0];
    const endtDateFormatted = new Date(data.endDate).toISOString().split('T')[0];
    document.getElementById('bannerStartDate').value = startDateFormatted;
    document.getElementById('bannerEndDate').value = endtDateFormatted;
    document.getElementById('preview-imageEdit').src=data.imageUrl
    
}
function editBannerEdit(){
    document.getElementById("bannerEditPopup").style.display="none"
}

//show preview of image when Edit
document.getElementById('productImageEdit').addEventListener('change',function(){
    showPreviewimage(this)
  })
  function showPreviewimage(input){
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
  document.getElementById('bannerForm').addEventListener('submit',function(){
    document.getElementById('saveSpanEdit').style.display='none';
    document.getElementById('loadingEdit').style.display='flex'
  })