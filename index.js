//Global variables to pull data from JSON
let catErr =[];
let catCon =[];
let catUrl =[];

//Function for mouseover Instruction
function mouseOver(e){
    e.innerHTML = "Click on new cat to create new cat"+"<br>"+"Click on Randomized to pull cat" ;
}
function mouseOvernot(e){
    e.innerHTML = "Hover for instruction";
}

//Function to check for duplicate input and block it from being POST
function checkDuplicate(arr,input){
   for(let i = 0; i < arr.length; i++){
        if (arr[i] === input){
            return true;
        }
   }
   return false;
}

//DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    allButton();
    })

//addEventListener for buttons
function allButton(){
    let btn_1 = document.getElementById("btn");
    let cat_img = document.getElementById("catPic")
    btn_1.addEventListener('click', function (e) {

        //This generate random value from the array, catIndex find the index to be use to detect
        //other value like description and url
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

        //Check for duplicate, invalid input from the form
    if((error.value !=="" && !checkDuplicate(catErr,error.value)) && (description.value !=="" && !checkDuplicate(catCon,description.value)) ){
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
        // Add new POST value into the array
        catErr.push(error.value);
        catCon.push(description.value);
        catUrl.push(url.value);
    }else{
        document.getElementById("status").innerHTML = "Error and description have to be inputted OR entry already in the database";
    }
    //console.log(checkDuplicate(catErr,error.value));
    })


    let btn_3 = document.getElementById("darkBtn");
    btn_3.addEventListener("click",function(e){
        e.preventDefault();
        document.body.classList.toggle("dark-mode");
    })

}
//Pulling data from JSON and push items into global variables.
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

