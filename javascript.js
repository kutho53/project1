const apiUrl = 'https://www.cheapshark.com/api/1.0/deals?pageSize=9';

function fetchData() {
    fetch(apiUrl)
    .then(response => {
        return response.json();
    })
    .then(data => {
        data.forEach(element => {
            const newTitle = document.createElement("p");
            newTitle.innerText = element.title;
            document.getElementById('apiResponse').appendChild(newTitle)
            const img = document.createElement('img');
            img.src = element.thumb;
            document.getElementById('apiResponse').appendChild(img)
            const salePrice = document.createElement("p");
            salePrice.innerText = element.salePrice;
            document.getElementById('apiResponse').appendChild(salePrice)
            const normalPrice = document.createElement("p");
            normalPrice.innerText = element.normalPrice;
            document.getElementById('apiResponse').appendChild(normalPrice)
        });
    })
}