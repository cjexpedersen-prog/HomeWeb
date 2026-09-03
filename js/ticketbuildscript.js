const form = document.forms[0];
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
    const formdata = new FormData(form)
    data.descr =document.getElementById("ibDescr").innerText
    data.loc =document.getElementById("ibLocat").innerText
    data.submit =toTimeString(Date())
    data.scale= form.elements["uR"].value;
    data.urgency= form.elements["sR"].value;
    data.prior= form.elements["existR"].value;
    let xhr = new XMLHttpRequest();
    let url = "../script/sqlcatch.php"
    
    xhr.open("POST",url, true)
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.onreadystatechange = function(){
        if(xhr.readystate === 4 && xhr.status === 200){
            document.getElementById("tester").innerText=this.responseText;
        }
        xhr.send(data);
    }
};
