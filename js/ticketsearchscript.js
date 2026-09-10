let searchdata ={
        scaleU:["0","0","0","0","0"],
        urgencyU:["0","0","0","0"],
        existU:["0","0"],
        inprgU:["0","0"] };
function readsearchT(){
    let s1=document.getElementById("sRvsm");
    let s2=document.getElementById("sRsm");
    let s3=document.getElementById("sRmed");
    let s4=document.getElementById("sRlarge");
    let s5=document.getElementById("sRvlarge");
    let u1=document.getElementById("uRlow");
    let u2=document.getElementById("uRmed");
    let u3=document.getElementById("uRhi");
    let u4=document.getElementById("uRcrit");
    let e1=document.getElementById("existRyes");
    let e2=document.getElementById("existRno");
    let prg1=document.getElementById("inprRyes");
    let prg2=document.getElementById("inprRno");
    
    if (s1.checked){
        searchdata.scaleU[0]="1"
    }
    if (s2.checked){
        searchdata.scaleU[1]="1"
    }
    if (s3.checked){
        searchdata.scaleU[2]="1"
    }
    if (s4.checked){
        searchdata.scaleU[3]="1"
    }
    if (s5.checked){
        searchdata.scaleU[4]="1"
    }
    if (u1.checked){
        searchdata.urgencyU[0]="1"
    }
    if (u2.checked){
        searchdata.urgencyU[1]="1"
    }
    if (u3.checked){
        searchdata.urgencyU[2]="1"
    }
    if (u4.checked){
        searchdata.urgencyU[3]="1"
    }
    if (e1.checked){
        searchdata.existU[0]="1"
    }
    if (e2.checked){
        searchdata.existU[1]="1"
    }
    if(prg1.checked){
        searchdata.inprgU[0]="1"
    }
    if(prg2.checked){
        searchdata.inprgU[1]="1"
    }
}



function gettickets() {
    readsearchT();
    console.log(searchdata.scaleU);
        
};
