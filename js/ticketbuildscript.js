const form = document.querySelector("form")
form.addEventListener("submit",(event)=>{
        event.preventDefault();
        submitdata();})
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
    const formData = new formData(form)
    data.descr =document.getElementById("ibDescr").innerText
    data.loc =document.getElementById("ibLocat").innerText
    data.submit =Date().toTimeString()
    data.scale= formData.get("uR")
    data.urgency= formData.get("sR")
    data.prior= formData.get("existR")
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
