let catArr = [];
function mouseOver(e){
    e.innerHTML = "Click on the button for random cat picture";
}

function mouseOvernot(e){
    e.innerHTML = "Hover for instruction";
}

document.addEventListener("DOMContentLoaded", function () {
    allButton();
})

function allButton(){
    let btn_1 = document.getElementById("btn");
    let cat_img = document.getElementById("catPic")
    btn_1.addEventListener('click', function (e) {
        cat_img.setAttribute("src","https://http.cat/101");
        cat_img.setAttribute('alt','101');
        console.log("button pressed");
    })
}
//this is GET method
fetch("http://localhost:3000/catPage")
    .then(function (response) {
        response.json();
        console.log(response);
    })
    .then(function (data){
        //catArr = obj;
        console.log(data);
    })
    .catch(function (error){
        console.log("Something went wrong");
        console.log(error);
    })

//need to add event listener to POST.
fetch("http://localhost:3000/catPage",{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
})
    .then(function (response){
        response.json();
    })
    .then(function (data){

    })