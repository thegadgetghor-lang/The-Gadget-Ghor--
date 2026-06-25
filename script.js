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
