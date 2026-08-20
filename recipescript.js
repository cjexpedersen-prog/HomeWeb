   //declares recipe var
    let recipe;
    //function to update of cost per X servings
    function updateCost(){
        //gets cost per serving
        let serv=parseFloat(recipe.data.recipe["typ-cost"]);
        console.log(recipe.data.serv)
        //if not empty
        if(document.getElementById("serV").value!==NaN && document.getElementById("serV").value!==""){//gets amount of servings, multiplies by cost
        serv*=parseInt(document.getElementById("serV").value);
        serv/=recipe.data.recipe.servings;
        }
        else{//else set 0
            serv*=0;
        }
        
        //sets text to display rounded value and blurb
        document.getElementById("costPS").innerText=` servings will cost $${serv.toFixed(2)}`
    }
    //async function to get recipe data
    async function getRecipe() {
        //vars to get passed url params
        const qs = window.location.search;
        const urlParams = new URLSearchParams(qs);
        //gets passed recipe name
        const rName = urlParams.get('rName');
        //vars to hold the data
        let recipeResponse;
        let recipeData;
        try{//tries to reach github for json data
        recipeResponse =await fetch(`https://raw.githubusercontent.com/cjexpedersen-prog/ProjectData/refs/heads/main/Recipes/${rName}.json`)
        recipeData = await recipeResponse.json(); // waits for response
        
        if (!recipeResponse.ok){//throws error if no good response
            throw new Error(recipeResponse.status,recipeResponse.message)
        }
        else{
            //vars to hold html
            let steps="";
            let iL="<ul>";
            let sL="<ol>";
            
            //gets data 
            recipe=recipeData;
            //sets recipen name to provided name
            document.getElementById("rName").innerHTML=`<h1>${recipe.data.recipe.name.replace("-"," ")}</h1>`;
            //if there's a provided image, load it
            if (recipe.data["image-link"]!="none"){
                document.getElementById("image").innerHTML=`<image src=${recipe.data["image-link"]}id="img2" alt="image of ${recipe.data.recipe.name.replace("-"," ")}"></image>`;
            }
            else{//otherwise clear the loader
                 document.getElementById("image").innerHTML="";
            }
            //for each ingrediant, add a list item
            for (let i of recipe.data.recipe.ingredients){
                iL+=`<li>${i}</li><br>`;
            }
            iL+="</ul>"
            //set html
            document.getElementById("iL").innerHTML=iL;
            //for each step, add a list item
            for(let i of recipe.data.recipe.steps){
                sL+=`<li>${i}</li><br>`
            }
            sL+="</ol>"
            //set html of steps to var
            document.getElementById("sL").innerHTML=sL;
            //adds time values and text to html var
            
            let prepI=`<td class="prep">Cook Time: ${recipe.data.recipe.time[0]}</td><td class="prep"> Prep Time: ${recipe.data.recipe.time[0]}</td>`;
            //sets element
            document.getElementById("prep").innerHTML=prepI
            }
        
   }
     catch(error){//catch errors
        console.log(error.message,error.data)
     }
}
//on load, set innerHTML to loading element
function setLoad(){
    document.getElementById('rName').innerHTML = 'Loading...<div class="loader" id="loader"</div>'; 
    document.getElementById('image').innerHTML = 'Loading...<div class="loader" id="loader"></div>'; 
    document.getElementById('iL').innerHTML = 'Loading...<div class="loader" id="loader"> </div>'; 
    document.getElementById('sL').innerHTML = 'Loading...<div class="loader" id="loader"> </div>';
    document.getElementById('prep').innerHTML = 'Loading...<div class="loader" id="loader"> </div>';  
    }
    //async function to set loading and get data
async function getData(){
        setLoad();
        await getRecipe();
    }



//calls function to get data on load 
getData()