alert("Welcome to The Gadget Ghor");
const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("keyup", function () {
    console.log("Searching:", searchBox.value);
});
const buttons = document.querySelectorAll(".buy-btn");

buttons.forEach(btn=>{
    btn.addEventListener("click",()=>{
        alert("✅ Product Added To Cart");
    });
});
let cart = 0;

document.querySelectorAll(".buy-btn").forEach(button=>{
    button.addEventListener("click",()=>{
        cart++;
        document.getElementById("cart-count").innerText = cart;
    });
});
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

filterButtons.forEach(button=>{
button.addEventListener("click",()=>{

const category = button.dataset.category;

cards.forEach(card=>{

if(category==="all" || card.dataset.category===category){
card.style.display="block";
}else{
card.style.display="none";
}

});

});
});

document.querySelectorAll(".wishlist-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

alert("❤️ Added to Wishlist");

});

});
