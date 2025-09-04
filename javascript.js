const apiUrl = 'https://www.cheapshark.com/api/1.0/deals?pageSize=32';
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
        
        localStorage.setItem('totalGamesInWishlist', wishlist.length);
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
            //removes any item inside div from previous search
            apiResponseDiv.removeChild(apiResponseDiv.firstChild);
        }
        //loops through each game and creates html elements for each
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

            const normalPrice = document.createElement("p");
            normalPrice.innerText = `Normal Price: ${element.normalPrice}`;
            normalPrice.classList.add('normal-price');
            gameDiv.appendChild(normalPrice)

            const salePrice = document.createElement("p");
            salePrice.innerText = `Sale Price: ${element.salePrice}`;
            salePrice.classList.add('sale-price');
            gameDiv.appendChild(salePrice)

            const wishlistButton = document.createElement("button");
            wishlistButton.innerText = "Add to Wishlist";
            wishlistButton.addEventListener('click', function() {
                addToWishList(element);  
            });
            
            gameDiv.appendChild(wishlistButton);

            const dealButton = document.createElement("a");
            dealButton.href = `https://www.cheapshark.com/redirect?dealID=${element.dealID}`;
            dealButton.innerText = "View Deal";
            dealButton.target = "_blank"; // Opens in a new tab
            dealButton.classList.add('deal-button'); // For styling
            gameDiv.appendChild(dealButton);
            
            //adds each game into div element
            apiResponseDiv.appendChild(gameDiv)
        });
    })
}

console.log(response)

//Search bar code.
function fetchSearchData(){
    const searchInput = document.getElementById('searchInput'); //grabs user input from search bar
    const apiUrlSearch = `https://www.cheapshark.com/api/1.0/deals?pageSize=36&title=${encodeURIComponent(searchInput.value)}`; //adds user input to url
    fetchData(apiUrlSearch); //fetches data with new url
}