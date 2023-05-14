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
        const catRandom = catErr[Math.floor(Math.random()*catErr.length)];
        const catIndex = catErr.findIndex(function (e){
            return e == catRandom;
        })
        console.log(catIndex);  //return index
        console.log(catRandom); //return cat error of that index

        //Check if URL are present, if it is, then it will use that url picture
        if(catUrl[catIndex] === ""){
            cat_img.setAttribute("src",`https://http.cat/${catRandom}`);
            document.getElementById("status").innerHTML = "This cat came from http.cat";
        }else if(catRandom==="" || catCon[catIndex]==""){
            console.log(`This cat is not defined correctly in JSON`);
            catErr = catErr.splice(catRandom,1);
            catCon = catCon.splice(catRandom,1);       //Remove the index from the array if it's not find and returned 404 cat
            catUrl = catUrl.splice(catRandom,1);
            cat_img.setAttribute("src",`https://http.cat/404`)
            pageStatus.innerHTML = "Cat not defined correctly in JSON, removing index from array";
        }else{
            cat_img.setAttribute("src",catUrl[catIndex]);
            document.getElementById("status").innerHTML = "This cat came from custom url";
        }
        cat_img.setAttribute('alt',`${catRandom}`);
        document.getElementById("catAlt").innerHTML = catCon[catIndex];
    })

    let btn_2 = document.getElementById("submit");
    btn_2.addEventListener("click",function (e){
        e.preventDefault();
        const error = document.getElementById("input-error");
        const description = document.getElementById("input-description");
        const url = document.getElementById("input-url");
        //console.log(error);
    if(error.value !=="" || description.value !==""){
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
    }else{
        document.getElementById("status").innerHTML = "Error and description have to be inputted";
    }
    })


    let btn_3 = document.getElementById("darkBtn");
    btn_3.addEventListener("click",function(e){
        e.preventDefault();
        document.body.classList.toggle("dark-mode");
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