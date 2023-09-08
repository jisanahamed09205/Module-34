const loadPhone = async (searchText=13,isShowAll) =>{///
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll)///
}

const displayPhones = (phones,isShowAll) =>{///
    // console.log(phones);
    // 1.add item id
    const phoneContainer = document.getElementById('phone-container')
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 9 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 9 && !isShowAll){///
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }


    // console.log('is show all click',isShowAll);     ///

    // console.log(phones.length);
    // display only first 9 phones if not show All 
    if(!isShowAll){
        phones = phones.slice(0,9);         ///
    }

    phones.forEach(phone =>{
        // console.log(phone);
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList =`card bg-blue-200 p-4 shadow-xl`;
        // 3. set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>Deleniti iusto tempore, incidunt optio enim saepe autem expedita aspernatur?</p>
        <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `;
        // 4.append child
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);        ////???
}



/*

*/
const handleShowDetail = async (id)=>{
    // console.log('clicked details btn',id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    showPhoneDetails(phone)

    
}
// display show details
const showPhoneDetails = (phone) =>{

    const phoneName = document.getElementById('show-detail-phone-name')
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML= `
    <img src="${phone.image}" alt"" />
    <p><span>Storage:${phone?.mainFeatures?.storage}</span></p>
    <p><span>GPS:${phone?.others?.GPS || '  No GPS'}</span></p>
    `



    console.log(phone);
    // show the modal
    show_details_modal.showModal()
}

// handle search button
const handleSearch = (isShowAll) =>{///
    // console.log('Search Handler');
    // visible loading spinner
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll)///
}


const toggleLoadingSpinner = (isLoading) =>{
    const spinnerLoading = document.getElementById('loading-spinner');
    if(isLoading){
        spinnerLoading.classList.remove('hidden');
    }
    else{
        spinnerLoading.classList.add('hidden');
    }
}

// handle show all      ///
const handleShowAll = () =>{
    handleSearch(true);  
}


loadPhone()