const apiUrl = 'https://www.cheapshark.com/api/1.0/deals?pageSize=9';
//Added functionality to wishlist append & for local storage
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function addToWishList(game) {
    console.log("Attempting to add to wishlist: ", game);
    
    const existingGame = wishlist.find(item => item.title === game.title);
    if (!existingGame) {
        wishlist.push({
            image: game.thumb,
            title: game.title,
            salePrice: game.salePrice,
            normalPrice: game.normalPrice
        });
        console.log("Game added to wishlist:", game);
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        localStorage.setItem('Totalgamesinwishlist', wishlist.length);
    } else {
        console.log("Game already in wishlist:", game.title);
    }
}
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
            const gameDiv = document.createElement('div');
            gameDiv.classList.add('game-item');

            const newTitle = document.createElement("p");
            newTitle.innerText = element.title;
            newTitle.classList.add('game-title');
            gameDiv.appendChild(newTitle);

            const img = document.createElement('img');
            img.src = element.thumb;
            img.classList.add('game-image');
            gameDiv.appendChild(img)

            const salePrice = document.createElement("p");
            salePrice.innerText = `Sale Price: ${element.salePrice}`;
            salePrice.classList.add('sale-price');
            gameDiv.appendChild(salePrice)

            const normalPrice = document.createElement("p");
            normalPrice.innerText = `Normal Price: ${element.normalPrice}`;
            normalPrice.classList.add('sale-price');
            gameDiv.appendChild(normalPrice)

            const wishlistButton = document.createElement("button");
            wishlistButton.innerText = "Add to Wishlist";
            wishlistButton.addEventListener('click', function() {
                addToWishList(element);  
            });
            
            gameDiv.appendChild(wishlistButton);
            
            apiResponseDiv.appendChild(gameDiv)
        });
    })
}

//Search bar code.
function fetchSearchData(){
    const searchInput = document.getElementById('searchInput');
    const apiUrlSearch = `https://www.cheapshark.com/api/1.0/deals?pageSize=9&title=${searchInput.value}`;
    fetchData(apiUrlSearch);
}