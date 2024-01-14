
function hideCustomerEdit(){
    document.getElementById("customersEditPopup").style.display="none";
}

async function  showCustomerEdit(element){   
    try {
        const customerId =  element.id
        const response = await fetch(`/admin/customer/edit/${customerId}`);
        const data = await response.json();
        const itemId = data.item._id;
        const name = data.item.name;
        const email = data.item.email;
        const phone = data.item.phone;
        const gender = data.item.gender;
        const status = data.item.status
        document.getElementById("customersEditPopup").style.display="flex";
        document.getElementById('customerIdForEdit').value = itemId
        document.getElementById('nameEdit').value = name
        document.getElementById('emailEdit').value = email;
        document.getElementById('phoneEdit').value = phone;
        document.getElementById('genderEdit').value = gender;
        document.getElementById('statusEdit').value= status;
      } catch (error) {
        console.error('Error fetching customers data:', error);
      }
}
document.getElementById('searchProductForm').addEventListener('submit',function(event){
  event.preventDefault()
  searchProducts()
})

async function searchProducts(){
  const searchValue = document.getElementById('searchValue').value;
  try {
    const response = await fetch('/admin/customers/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'searchValue=' + searchValue,
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

// Sort 
 //change second sort tag respect to first sortchooses
 function updateSortHowOptions() {
  const sortWhatSelect = document.getElementById("sortSelect");
  const selectedSortWhat = sortWhatSelect.value;
  const sortHowSelect = document.getElementById("sortHow");
  
  sortHowSelect.innerHTML = "";
  addOption(sortHowSelect, "Sort type", "sortType");
  // sortHowSelect.appendChild(initialOption);
  if (selectedSortWhat === "username") {
    addOption(sortHowSelect, "a-z", "a-z");
    addOption(sortHowSelect, "z-a", "z-a");
    addOption(sortHowSelect, "Newest first", "Newest first");
    addOption(sortHowSelect, "Oldest First", "Oldest First");
  } else if (selectedSortWhat === "orders...") {
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
  sortProduct()
})

async function sortProduct() {
  const selectedOption = document.getElementById('sortHow').value;
  try {
    const response = await fetch('/admin/customers/sort', {
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
//Filter 
document.getElementById('filterValues').addEventListener('change',function(){
  filterProduct()
})

async function filterProduct(){
  let selectedValue = document.getElementById('filterValues').value;
  try {
      const response = await fetch('/admin/customers/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'filterValue=' + selectedValue,
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