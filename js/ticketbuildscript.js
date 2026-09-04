const form = document.forms[0];
let rdata;
let data={
        scale:"",
        urgency:"",
        prior:"",
        resolv:"",
        approv:0,
        hasimg:0,
        submit:"",
        inprg:0,
        descr:"",
        loc:"",
        name:""
    }
function submitdata(){
    let urgency =1;
    let scale =1;
    let prior ="0"
    if (document.getElementById("uRmed").checked){
        urgency=2
    }
     else if (document.getElementById("uRhi").checked){
        urgency=3
    }
    else if (document.getElementById("uRcrit").checked){
        urgency=4
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

    if (document.getElementById("existRyes").checked){
        scale=2
    }

    const formdata = new FormData(form)
    data.descr =document.getElementById("ibDescr").innerText
    data.loc =document.getElementById("ibLocat").innerText
    data.submit = Date.toString();
    data.scale= 0;
    data.urgency= urgency
    data.prior= 0;
    let xhr = new XMLHttpRequest();
    let url = "../test.txt"
    
    
    xhr.onload = function(){
        if(xhr.readystate == 4 && xhr.status == 200){
            document.getElementById("tester").innerText=this.responseText;
        }
        xhr.open("GET",url, true)
        //xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(data);
        console.log(xhr.response);
    }
};
async function trynew(){
        try{
                let response = await fetch("../test.txt");
                rdata = await response;
                let sdata = await response.responseText;
                
                if (!rdata.ok){
                        console.error("Test failed : ",error);
                }
                else{
                        console.log(rdata);
                        console.log(sdata);
                        document.getElementById("tester").innerHTML=sdata
                }
        }
        catch (error){
                console.error("Test failed : ",error);
        }
}
