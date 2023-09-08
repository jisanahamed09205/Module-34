const loadPhone2 = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const info =await res.json()
    const mobiles = info.data;
    // console.log(mobiles);
    displayMobiles(mobiles);
}
const displayMobiles = mobilePhone =>{
    console.log(mobilePhone);
    // 1. add id to the appendChild
    const mobileContainer = document.getElementById('phone-container')
        // clear phone container cards before adding new cards
        mobileContainer.textContent ='';

        // display show all button if there are more than 12 phone
        const seeAllContainer = document.getElementById('show-all-container');
        if(mobilePhone.length > 12){
            seeAllContainer.classList.remove('hidden');
        }
        else{
            seeAllContainer.classList.add('hidden');
        }


        // display first only 12 cards
        // console.log(mobilePhone.length);
        mobilePhone = mobilePhone.slice(0,12);



    mobilePhone.forEach(mobile =>{
        // console.log(mobile);
        // 2. create a div
        const mobileCard = document.createElement('div')
        mobileCard.classList = `card w-96 bg-gray-300 p-4 shadow-xl`;
        // 3. set inner HTMl
        mobileCard.innerHTML = `
        <figure><img src="${mobile.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${mobile.phone_name}</h2>
            <p>${mobile.slug}</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        // 4.append child
        mobileContainer.appendChild(mobileCard);

    });
    // hide loading spinner
    toggleSpinnerLoader(false);
}

// handle search button
const handleSearch2 =()=>{
    // console.log('search handlar');
    // visible loading spinner
    toggleSpinnerLoader(true);
    const searchField2 = document.getElementById('search-field2');
    const searchText2 = searchField2.value;
    // console.log(searchText2);
    loadPhone2(searchText2)
}

// spinner loading 
const toggleSpinnerLoader = (isSpinning) =>{
    const spinnerLoader = document.getElementById('spinner-loading')
    if(isSpinning){
        spinnerLoader.classList.remove('hidden');
    }
    else{
        spinnerLoader.classList.add('hidden')
    }
}

// loadPhone2()