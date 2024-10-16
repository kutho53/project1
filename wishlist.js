

    function updateWishlist() {
        const wishlistDiv = document.getElementById('wishlist-Items');
        const totalGamesDiv = document.getElementById('total-games');

        if (!wishlistDiv) {
            console.error("wishlist-Items element not found in the DOM"); // Debug log
            return;
        }
        
         console.log("Updating wishlist UI"); // Debug log
        wishlistDiv.innerHTML = '';

        wishlist.forEach(game => {
        const gameContainer = document.createElement("div");
        gameContainer.classList.add('wishlist-game'); 

            const img = document.createElement('img');
            img.src = game.image;
            img.alt = game.title;
            img.style.width = '100px';
            gameContainer.appendChild(img);

            const gameTitle = document.createElement("p");
            gameTitle.innerText = `Title: ${game.title}`;
            gameContainer.appendChild(gameTitle);

            const gameSalePrice = document.createElement("p");
            gameSalePrice.innerText = `Sale Price: $${game.salePrice}`;
            gameContainer.appendChild(gameSalePrice);

            const gameNormalPrice = document.createElement("p");
            gameNormalPrice.innerText = `Normal Price: $${game.normalPrice}`;
            gameContainer.appendChild(gameNormalPrice);

            wishlistDiv.appendChild(gameContainer);

            const separator = document.createElement("hr");
            wishlistDiv.appendChild(separator);
        });
        if (totalGamesDiv) {
            totalGamesDiv.innerText = `Total Games in Wishlist: ${wishlist.length}`;
        }
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        console.log("DOM fully loaded. Ready to update wishlist.");
    
       
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (storedWishlist) {
            wishlist = storedWishlist; 
        } else {
            console.log("No wishlist found in local storage."); 
        }
    
        const wishlistDiv = document.getElementById('wishlist-Items');
        if (wishlistDiv) {
            console.log("wishlist-Items element found!");
            updateWishlist(); 
        } else {
            console.error("wishlist-Items element not found right after DOMContentLoaded event.");
        }
    });
    
