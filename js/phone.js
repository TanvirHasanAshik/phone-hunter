/* Catch input value and search data */
const searchPhoneData = () => {
    const searchField = document.getElementById('search-field');
    const allPhone = document.getElementById('all-phone');
    const inputField = searchField.value.toLowerCase();
    const details = document.getElementById('details');
    allPhone.textContent = '';
    details.textContent = '';
    handleError(searchField.value);

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputField}`;
    if (searchField.value != "") {
        fetch(url)
            .then(res => res.json())
            .then(data => loadData(data))
    }

    searchField.value = '';

};
/* Show all data from API*/
const loadData = (allData) => {
    const allPhone = document.getElementById('all-phone');
    console.log(allData.status);
    if (allData.status == false) {
        document.getElementById('err-message').innerText = 'Search data is not available';
    }
    if (!allData) {
        allPhone.innerHTML = `<p>Loading...</p>`
    } else {
        allData.data.forEach((phone) => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Phone: ${phone.phone_name}</h5>
                        <p class="card-text">Brand: ${phone.brand}</p>
                    </div>
                    <button id="btn" class="btn btn-primary" onclick="detailsLoad('${phone.slug}')">Check Details</button>
                </div>
                `;
            allPhone.appendChild(div);
        });
    }
}

/* Show details from API*/
const detailsLoad = (phoneInfo) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneInfo}`;
    fetch(url)
        .then(res => res.json())
        .then(data => phoneDetails(data));
}

const phoneDetails = (data) => {
    const phoneData = data.data;
    const details = document.getElementById('details');

    details.innerHTML = `
    <div class="card mb-3 mx-auto" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${phoneData.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${phoneData.name}</h5>
                    <p class="card-text"><strong>Storage:</strong> ${phoneData.mainFeatures.storage}</p>
                    <p class="card-text"><strong>Display:</strong> ${phoneData.mainFeatures.displaySize}</p>
                    <p class="card-text"><strong>ChipSet:</strong> ${phoneData.mainFeatures.chipSet}</p>
                    <p class="card-text"><strong>Memory: </strong>${phoneData.mainFeatures.memory}</p>
                    <p class="card-text"><strong>ReleaseDate: </strong>${phoneData.releaseDate ? phoneData.releaseDate : 'No release date found'}</p>
                    <p class="card-text"><strong>Sensor: </strong>${phoneData.mainFeatures.sensors}</p>
                </div>
            </div>
        </div>
    </div>
    `;
}

const handleError = (data) => {
    try {
        if (data == '') throw "Field must not be empty***";
        if (data != '') throw document.getElementById('err-message').innerText = '';
    } catch (err) {
        document.getElementById('err-message').innerText = err;
    }
}


