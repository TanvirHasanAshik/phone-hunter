/* Catch input value and search data */
const searchPhoneData = () => {
    const searchField = document.getElementById('search-field');
    const inputField = searchField.value.toLowerCase();

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputField}`;
    fetch(url)
        .then(res => res.json())
        .then(data => loadData(data))

    searchField.value = ''
};

const loadData = (allData) => {
    const allPhone = document.getElementById('all-phone');
    allPhone.textContent = '';
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
                    <button onclick="phoneDetails()">Check Details</button>
                </div>
                `;
            allPhone.appendChild(div);
        });
    }
}