alert("Welcome to The Gadget Ghor");
const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("keyup", function () {
    console.log("Searching:", searchBox.value);
});
