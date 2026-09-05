const form = document.forms[0];
let response;
let rdata;
let sdata
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
function getdata(){
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
        prior="1"
    }

    const formdata = new FormData(form)
    data.descr =document.getElementById("ibDescr").innerText
    data.loc =document.getElementById("ibLocat").innerText
    data.submit = Date.toString();
    data.scale= 0;
    data.urgency= urgency
    data.prior= 0;
    console.log("data got")
}
function submitdata(){
    let url = "../script/sqlcatch.php"
    getdata();
    let xhr = new XMLHttpRequest();
    console.log(xhr.readyState)
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200){
            document.getElementById("tester").innerText=this.responseText;
            console.log(this.response)
            alert(this.response)
            console.log("b")
        }
        else{
            console.log(xhr.readyState)
            console.log("c")
        }
    };
    xhr.open("POST",url, true)
        console.log(xhr.readyState)
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        console.log(xhr.readyState)
        xhr.send(data.toString);
        console.log(xhr.readyState)
        console.log(xhr.response);
        console.log("B")
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
                document.getElementById("tester").textContent=sdata
            }
    }
    catch (error){
        console.error("Test failed : ",error);
    }
}
