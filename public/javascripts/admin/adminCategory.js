
let categoryName = document.getElementById('categoryName');
let categoryDescription = document.getElementById('categoryDescription');
let categoryNameError = document.getElementById("categoryNameError");
let categoryDescriptionError = document.getElementById('categoryDescriptionError');
let imageUploadError = document.getElementById('imageUploadError');


let categoryEditName = document.getElementById('categoryEditName');
let categoryEditDescription = document.getElementById('categoryEditDescription');
let categoryNameEditError = document.getElementById('categoryNameEditError');
let categoryDescriptionEditError = document.getElementById('categoryDescriptionEditError');
// 
function showCategoryEdit(){
    document.getElementById("categoryUploadPopup").style.display="flex"
    document.getElementById("imageDone").style.display="none";
    document.getElementById("tickImage").style.display="none";
    document.getElementById("BrowseImage").style.display="block";
    document.getElementById("UploadImage").style.display="block";
    categoryDescriptionError.style.display='none'
    categoryNameError.style.display='none';
    imageUploadError.style.display='none'
}
function hideCategoryUpload(){
    document.getElementById("categoryUploadPopup").style.display="none";
    var previewImage = document.getElementById('preview-image');
  previewImage.style.display='none'
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
function loadingEdit(){
    document.getElementById('loadingEdit').style.display="flex";
    document.getElementById('saveSpanEdit').style.display='none'
}
function loadingUpload(){
    document.getElementById('loading').style.display="flex";
    document.getElementById('saveSpan').style.display='none'
}
document.getElementById('Categorysubmit').addEventListener('submit', function(event){
    event.preventDefault();
    
    validateUploadForm()
})
//validate form of uploading 
function validateUploadForm(){
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
        loadingUpload()
        document.getElementById('Categorysubmit').submit();
    }
}

// validate form of editing 
function validateEditForm(){
    if(categoryEditName.value.trim()===""){
        categoryDescriptionEditError.style.display='none';
        imageUploadError.style.display='none'
        categoryNameEditError.style.display='block'
    }else if (categoryEditDescription.value.trim()===""){
        categoryNameEditError.style.display='none';
        imageUploadError.style.display='none'
        categoryDescriptionEditError.innerText='Category Description cannot be empty !!'
        categoryDescriptionEditError.style.display='block'
    }else if(categoryEditDescription.value.length>250){
        categoryNameEditError.style.display='none';
        imageUploadError.style.display='none'
        categoryDescriptionEditError.innerText='Description is too long !!'
        categoryDescriptionEditError.style.display='block'
    }else if (categoryEditDescription.value.length<100){
        categoryNameEditError.style.display='none';
        imageUploadError.style.display='none'
        categoryDescriptionEditError.innerText='Description is too short !!'
        categoryDescriptionEditError.style.display='block';
    }else if(document.getElementById("tickImage").style.display=='none'){
        categoryNameEditError.style.display='none';
        categoryDescriptionEditError.style.display='none';
        imageUploadError.style.display='block'
    }else{

        categoryDescriptionEditError.style.display='none'
        categoryNameEditError.style.display='none';
        loadingEdit()
        document.getElementById('CategoryEditsubmit').submit();
    }
}
// Edit category fetch the route 
async function  editCategory(element){   
    try {
        const categoryId =  element.id
        const response = await fetch(`/admin/category/edit/${categoryId}`);
        const data = await response.json();
        const itemId = data.item._id;
        const categoryName = data.item.categoryName;
        const status = data.item.Status;
        const categoryDescription = data.item.categoryDescription;
        const imageUrl = data.item.imageUrl;

        let categoryEditName = document.getElementById('categoryEditName')
        let categoryEditStatus = document.getElementById('categoryEditStatus')
        let categoryEditDescription = document.getElementById('categoryEditDescription')
        categoryEditName.value = categoryName
        categoryEditStatus.value = status
        categoryEditDescription.value = categoryDescription;
        document.getElementById('Id').value=categoryId
        document.getElementById("categoryEditPopup").style.display="flex"
        document.getElementById("imageEditDone").style.display="block";
        document.getElementById("tickImageEdit").style.display="block";
        document.getElementById("BrowseImageEdit").style.display="none";
        document.getElementById("UploadImageEdit").style.display="none"
        document.getElementById('preview-imageEdit').src=imageUrl
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
}
document.getElementById('CategoryEditsubmit').addEventListener('submit',function(event){
    event.preventDefault()
    validateEditForm()
})
// hide delete popup
function hideDeletePopup(){
    document.getElementById('categoryDelete').style.display='none'
}
function deleteCategory(element){
    document.getElementById('categoryDelete').style.display='flex'
    document.getElementById('deleteId').value=element.id;
}
// filter cateogry
let filterForm =  document.getElementById('filterForm');
let filtervalues = document.getElementById('categoryFilter');
filtervalues.addEventListener('change',function(){
    filterCategory()
})
async function filterCategory(){
    const selectedOption = document.getElementById('categoryFilter').value;
    try {
      const response = await fetch('/admin/category/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'filterValue=' + selectedOption,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      document.getElementById('table-container').innerHTML = data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
}
  //change second sort tag respect to first sortchooses
function updateSortHowOptions() {
    const sortWhatSelect = document.getElementById("sortSelect");
    const selectedSortWhat = sortWhatSelect.value;
    const sortHowSelect = document.getElementById("sortHow");
    // const initialOption = sortHowSelect.firstElementChild.cloneNode(true);

    sortHowSelect.innerHTML = "";
    addOption(sortHowSelect, "Sort type", "sortType");
    // sortHowSelect.appendChild(initialOption);
    if (selectedSortWhat === "CategoryName") {
      addOption(sortHowSelect, "a-z", "a-z");
      addOption(sortHowSelect, "z-a", "z-a");
      addOption(sortHowSelect, "Newest first", "Newest first");
      addOption(sortHowSelect, "Oldest First", "Oldest First");
    } else if (selectedSortWhat === "ProductCount") {
      addOption(sortHowSelect, "Ascending", "Ascending");
      addOption(sortHowSelect, "Descending", "Descending");
    }
  }
  function addOption(selectElement, text, value) {
    const option = document.createElement("option");
    option.text = text;
    option.value = value;
    selectElement.add(option);
  }

  updateSortHowOptions()
  const sortWhatSelect = document.getElementById("sortSelect");
  sortWhatSelect.addEventListener('change',updateSortHowOptions)
  const sortHowSelect = document.getElementById("sortHow");
  //fetch data and sort on change sortvalues 
  sortHowSelect.addEventListener('change',function(){
    sortCategory()
  })
  async function sortCategory() {
    const selectedOption = document.getElementById('sortHow').value;
    try {
      const response = await fetch('/admin/category/sort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'sort=' + selectedOption,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      document.getElementById('table-container').innerHTML = data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
//show preview of image when upload

document.getElementById('productImage').addEventListener('change',function(){
 
  showPreviewimageUpload(this)
})
function showPreviewimageUpload(input){
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
