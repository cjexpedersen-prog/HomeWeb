    let tags;
    let index;
    let haveData=false;
    let lastResults;
    let lastSearchR=[];
    let usedFilters=[];
    let lastResultsFiltered;
    async function getTagData() {//gets tags
        let tagResponse;
        let tagData;
        try{//tries to reach github for json data
        tagResponse =await fetch(`https://raw.githubusercontent.com/cjexpedersen-prog/ProjectData/refs/heads/main/tags.json`)
        tagData = await tagResponse.json(); // waits for response
        if (!tagResponse.ok){//throws error if no good response
            throw new Error(tagResponse.status,tagResponse.message)
        }
        else{
        //sets array size to tags number of entries-1
        tags=[tagData.data.Entries-1]
        for(i=0;i<tagData.data.Entries;i++){//fills out tags with tag data
            tags[i]=tagData.data.tagNames[i];
        }
        //creates search
        let tagSearch="";
        //for items of search
        for (i=0;i<tags.length;i++){//creates button element to link to page
            tagSearch+=`<button class="drptest" id="${tags[i]}" onclick="filterState('${tags[i]}')">${tags[i]}</button>`
        }
        //adds html content
        document.getElementById("tagDropdown").innerHTML+=tagSearch;
    }}
    catch(error){//error catchall
        console.log(error.message)
    }
    
    }
    //function that filters results
    function filterResults(){
        //gets all results
        let allResults=document.getElementsByClassName('resultItem');
        //if there items to filter
        if(lastSearchR!=="" &&usedFilters.length>0){
            //for items of search results
            for(i=0;i<lastSearchR.length;i++){
                //var to signal if found
                let found=0;
                //for next layer of search
                for(let j of lastSearchR[i][1]){
                    //for item of filters
                    for(let k of usedFilters){
                        //if filter matches
                        console.log(j.toUpperCase().trim()==k.toUpperCase().trim())
                        if(j.toUpperCase().trim()==k.toUpperCase().trim()){
                            found+=1;//signal found
                        }
                        //if found
                        if (found>0){
                            //display item
                            document.getElementById(`L${lastSearchR[i][0][0].toUpperCase()}`).style.display="block"
                        }
                        else{
                            //else hide item
                            document.getElementById(`L${lastSearchR[i][0][0].toUpperCase()}`).style.display="none"}}}
            }
           }
        else{// if no search tags, show all items
            for(i=0;i<lastSearchR.length;i++){
            document.getElementById(`L${lastSearchR[i][0][0].toUpperCase()}`).style.display="block"};
        }
    }
    //gets index of search tags
    async function getIndex() {
        //vars to hold data
        let indexResponse;
        let indexData;
        try{//tries to reach github for json data
        indexResponse =await fetch(`https://raw.githubusercontent.com/cjexpedersen-prog/ProjectData/refs/heads/main/Recipes/Index.json`)
        indexData = await indexResponse.json(); // waits for response
        if (!indexResponse.ok){//throws error if no good response
            throw new Error(indexResponse.status,indexResponse.message)
        }
        else{
        //sets array size to tags number of entries-1
        index=[indexData.data.Entries-1]
        for(i=0;i<indexData.data.Entries;i++){//fills out tags with tag data
            index[i]=indexData.data.recipes[i];
            index[i][0][0]=index[i][0][0].replace("-"," ")
        }
        
    }}
    catch(error){//error catchall
        console.log(error.message)
    }
}
    //function to remove filters
    function removeFilter(ref){
        //fvar for html
        let newbtn=""
        //gets referring ID element
        let filter=document.getElementById(ref);
        //removes extra char
        let newID = ref.slice(1);
        //removes referring element
        filter.remove();
        //recreates button
        newbtn+=`<button class="drptest" id="${newID}" onclick="filterState('${newID}')">${newID}</button>`
        //adds button to list
        document.getElementById("tagDropdown").innerHTML+=newbtn;
        //removes filter from list of
        usedFilters.pop(newID)
        //calls function to update displayed search results
        filterResults();
    //function 
    }
    //filter function to remove button and add filter
    function filterState(ref){
        //gets button element
        let btn=document.getElementById(ref)
        //deletes button
        btn.remove();
        //adds filter
        usedFilters.push(ref);
        //var for displayed filter HTML
        let displayFilters=""
        //for filter, create button
        for(let i of usedFilters){
            displayFilters+=`<tc><td class="activeFilter" id="A${i}" onclick="removeFilter('A${i}')">${i} X</td></tc>`
        }
        //updates html, sets filters to visible
        document.getElementById('usedFilters').innerHTML=displayFilters;
        document.getElementById('bigFilters').style.visibility="visible"
        filterResults();

    }
    //function to create tag table for results
    function showTags(tagList){
        //var for return html
        let returnString=``
        //for element of tags
        for(let i of tagList){
            //add html element
            returnString+=`<td id='T${i}'><p class=tagR>${i}</p></td>`
        }
        //return result
        return returnString;
    }
    function checkText(text){
                    let rv =true;//defaults to working
                    let textL=text.length //gets string length
                    const regex = /[!@#$%^&*()\-+={}[\]:;"<>,.?\/|\\]/;//regex string to detect special chars
                    if (textL>0){ //if not an empty string
                        //if not apostrophe or space to begin with
                        if (text[0]=="'" || text[0]==" "){
                            document.getElementById("lresults").innerHTML=`<div class="resultitem"><ul>Recipe cannot begin with "${text[0]}</ul></div>`
                            throw new Error(`Recipe cannot begin with "${text[0]}"`)
                            
                        }
                        if (regex.test(text)){ // tests for special characters
                            document.getElementById("lresults").innerHTML=`<div class="resultitem"><ul>Special characters cannot be included in the recipe's name</ul></div>`
                            throw new Error("Special characters cannot be included in the recipe's name")// throws error if special character
                            
                        }   
                        else{

                        
                        for (let i=0;i<text.length;i++){// for each Char in string
                        if(isFinite(text[i]) && text[i]!=" "){ //catches number value, throws error, ignores spaces
                            document.getElementById("lresults").innerHTML=`<div class="resultitem"><ul>Recipe name cannot have a number value.</ul></div>`
                            throw new Error("Recipe name cannot have a number value.")
                            
                        }
                        }
                    }
                    }
                    else{
                    throw new Error(error.message)//throws error if empty string
                    }
                    //if working, return true
                    
                    return rv;
    }
    function search(indx){
        try{
            //var gets text
            let quer = document.getElementById('query').value; 
            //text to upperaces
            let query=quer.toUpperCase();
            if (checkText(query)){//if text is valid
                lastResults=""//resets relevant vars
                lastSearchR=[]
                //for items in recipe index
                console.log(query)
                if (query!=="ALL"){//if not searching all
                for (let i = 0; i < indx.length; i++) {
                    //gets recipe name, to uppercase
                    upS=indx[i][0][0].toUpperCase();
                    //if item is in index
                    if (upS.indexOf(query)>-1) {
                        //add result html
                        lastResults+=`<li class="resultItem" id="L${indx[i][0][0].toUpperCase()}">Recipe for: <button class="wResult" onclick='window.open("Recipe_Page.html?rName=${indx[i][0][0].replace(" ","-")}")'>${indx[i][0][0]}</button>costs $${indx[i][0][1]} per serving.<br><table><tr><th>Tags:</th>${showTags(indx[i][1])}</tr></table></li>`
                        //add result to list
                        lastSearchR.push(indx[i])
                    }}
                }
                else{//show all results
                    for (let i = 0; i < indx.length; i++) {
                        lastResults+=`<li class="resultItem" id="L${indx[i][0][0].toUpperCase()}">Recipe for: <button class="wResult" onclick='window.open("Recipe_Page.html?rName=${indx[i][0][0].replace(" ","-")}")'>${indx[i][0][0]}</button>costs $${indx[i][0][1]} per serving.<br><table><tr><th>Tags:</th>${showTags(indx[i][1])}</tr></table></li>`
                        lastSearchR.push(indx[i])
                    }

                }
                    //if there are results
                if(lastResults.length>0){//add results
                    document.getElementById("lresults").innerHTML=`<div class="resultitem"><ul>${lastResults}</ul></div>`
                }
                else{//else, show no reults found
                    document.getElementById("lresults").innerHTML=`<div class="resultitem"><ul>No results found :(</ul></div>`
            
                }
                
                //set items to visible
                document.getElementById('Results').style.display="block"
                document.getElementById('Results').style.visibility="visible"
                //filter results.
                filterResults();
        }
        }
        catch(error){
            window.alert(`Error: ${error.message} in search`) //catches errors and displays alert
            document.getElementById('lresults').innerHTML = 'Error while fetching search results :('
        }

    }
    //function to filter tags shown when searched for
    function filterFunction() {
        //sets vars to inputs from buttons
        let input = document.getElementById("tagInput");
        let filter = input.value.toUpperCase();
        let tD = document.getElementById("tagDropdown");
        let ref = tD.getElementsByTagName("button");
        try{// try filter
            // for filter button
        for (let i = 0; i < ref.length; i++) {
            //gets text
            let txtValue = ref[i].textContent || ref[i].innerText;
            //if matching
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                //sets visible
            ref[i].style.display="inline"
            ref[i].style.visibility="visible";
            } else {//if not, hides
                ref[i].style.display="none"
            ref[i].style.visibility="hidden";
            }
        }
    }
    //shows message if error
    catch(error){
        console.log(error.message)
    }
    }
    //function that toggles visibility of tags
    function hideShow() {
    document.getElementById("tagDropdown").classList.toggle("show");
}
    //function to fetch data
    async function getData(){
        await getTagData();
        await getIndex();
    }
    //function to delay if needed
    function waitFunction(){
        console.log("waiting on data");
    }
    //gets data
    getData();

    //event listeners
    document.getElementById('dropbtn').addEventListener('click', hideShow);
    document.getElementById('tagDropdown').addEventListener('mouseleave',function(){
        document.getElementById('tagDropdown').classList.toggle("show");
    })
    document.getElementById('query').addEventListener('keydown', function (e) {//listens for enter to search
    if (e.key === 'Enter') {
      try{//tries to get data , displays load message
        document.getElementById('lresults').innerHTML = 'Loading...<div class="loader" id="loader" src="stylesheet.css"></div>'; 
        while(tags.length<1){
        setTimeout(waitFunction,3000)
        }
        //calls search of index
        search(index);
        
    }
        catch(error){//alert if failure
        window.alert(error.message)
        document.getElementById('lresults').innerHTML = 'Error while fetching search results :('
    }
    }
});
    
    