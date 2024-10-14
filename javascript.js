const apiUrl = 'https://www.cheapshark.com/api/1.0/deals?pageSize=9';

//API fetch code.
function fetchData(api) {
    fetch(api)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const apiResponseDiv = document.getElementById('apiResponse')
        while (apiResponseDiv.firstChild) {
            apiResponseDiv.removeChild(apiResponseDiv.firstChild);
        }
        data.forEach(element => {
            const newTitle = document.createElement("p");
            newTitle.innerText = element.title;
            apiResponseDiv.appendChild(newTitle);

            const img = document.createElement('img');
            img.src = element.thumb;
            apiResponseDiv.appendChild(img)

            const salePrice = document.createElement("p");
            salePrice.innerText = element.salePrice;
            apiResponseDiv.appendChild(salePrice)

            const normalPrice = document.createElement("p");
            normalPrice.innerText = element.normalPrice;
            apiResponseDiv.appendChild(normalPrice)
        });
    })
}

//Search bar code.
function fetchSearchData(){
    const searchInput = document.getElementById('searchInput');
    const apiUrlSearch = `https://www.cheapshark.com/api/1.0/deals?pageSize=9&title=${searchInput.value}`;
    fetchData(apiUrlSearch);
}