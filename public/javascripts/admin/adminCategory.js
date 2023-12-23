
let categoryName = document.getElementById('categoryName');
let categoryDescription = document.getElementById('categoryDescription');
let categoryNameError = document.getElementById("categoryNameError");
let categoryDescriptionError = document.getElementById('categoryDescriptionError');
let imageUploadError = document.getElementById('imageUploadError');


let categoryEditName = document.getElementById('categoryEditName');
let categoryEditDescription = document.getElementById('categoryEditDescription');
let categoryNameEditError = document.getElementById('categoryNameEditError');
let categoryDescriptionEditError = document.getElementById('categoryDescriptionEditError');
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
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
}
document.getElementById('CategoryEditsubmit').addEventListener('submit',function(event){
    event.preventDefault()
    validateEditForm()
})
function hideDeletePopup(){
    document.getElementById('categoryDelete').style.display='none'
}
function deleteCategory(element){
    document.getElementById('categoryDelete').style.display='flex'
    document.getElementById('deleteId').value=element.id;
}

let filterForm =  document.getElementById('filterForm');
let filtervalues = document.getElementById('categoryFilter');
filtervalues.addEventListener('change',function(){
    filterForm.submit();
})

function updateSortHowOptions() {
    const sortWhatSelect = document.getElementById("sortSelect");
    const selectedSortWhat = sortWhatSelect.value;
    const sortHowSelect = document.getElementById("sortHow");
    const initialOption = sortHowSelect.firstElementChild.cloneNode(true);

    sortHowSelect.innerHTML = "";
  
    sortHowSelect.appendChild(initialOption);
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
  sortHowSelect.addEventListener('change',function(){
    document.getElementById('CategorySortForm').submit()
  })