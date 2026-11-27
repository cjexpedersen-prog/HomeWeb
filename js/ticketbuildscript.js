const form = document.forms[0];
let date = new Date();
let vardt=date.toISOString().slice(0, 19).replace('T', ' ');

console.log(vardt);
let response;
let rdata;
let sdata;
let data={
        Scale:"",
        Urgency:"",
        ImagelinkS:"",
        Descr:"",
        Location:"",
        Submittor:""
    };
data.submit= vardt;
function getdata(){
        
    let urgency ="Low";
    let scale =1;
    if (document.getElementById("uRmed").checked){
        urgency="Medium"
    }
     else if (document.getElementById("uRhi").checked){
        urgency="High"
    }
    else if (document.getElementById("uRcrit").checked){
        urgency="Critical"
    }

    if (document.getElementById("sRmed").checked){
        scale=2
    }
     else if (document.getElementById("sRlarge").checked){
        scale=3
    }
    else if (document.getElementById("sRvlarge").checked){
        scale=4
    }
    const formdata = new FormData(form)
    data.Descr =document.getElementById("ibDescr").innerText;
    data.Location =document.getElementById("ibLocat").innerText;
    data.Scale= scale;
    data.Urgency= urgency
    console.log("data got")
}
function submitdata(){
    let url = "../script/sqlcatch.php"
    getdata();
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200){
            document.getElementById("tester").innerText=this.responseText;
        }
    };
    xhr.open("POST",url, true)
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
        console.log(xhr.responseText);
};
async function trynew(){
    try{
            response = await fetch("../test.txt");
            rdata = await response;
            sdata = await response.responseText;
            if (!rdata.ok){
                console.error("Test failed : ",error);
            }
            else{
                console.log(rdata);
                console.log(sdata);
                document.getElementById("tester").textContent=sdata;
            }
    }
    catch (error){
        console.error("Test failed : ",error);
    }
}
