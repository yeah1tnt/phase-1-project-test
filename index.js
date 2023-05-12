let catErr =[];
let catCon =[];
let catUrl =[];
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
        let catRandom = catErr[Math.floor(Math.random()*catErr.length)];
        cat_img.setAttribute("src",`https://http.cat/${catRandom}`);
        cat_img.setAttribute('alt',`${catRandom}`);
        console.log("button pressed");
    })

    let btn_2 = document.getElementById("submit");
    btn_2.addEventListener("click",function (e){
        e.preventDefault();
        const error = document.getElementById("input-error");
        const description = document.getElementById("input-description");
        const url = document.getElementById("input-url");
        fetch("http:localhost:3000/catPage",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "error": error.value,
                "content": description.value,
                "url": url.value
            })

        })
    })
}

fetch("http://localhost:3000/catPage",{
        method: "GET"
    })
        .then(function (response){
            return response.json();
        })
        .then(function(data){

            data.forEach(function(cat){
                catErr.push(cat.error);
                catCon.push(cat.content);
                catUrl.push(cat.url);
            });
        })
        .catch(function (error){
            console.log("Something went wrong");
            console.log(error);
        })