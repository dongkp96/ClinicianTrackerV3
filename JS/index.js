
/*Clinician selection windows */
const clinicianHome = document.getElementById("clinician-list");
const clinicianCreate = document.getElementById("clinician-creation");
const clinicianSelect =document.getElementById("clinician-select");
const login = document.getElementById("clinician-login");
const errorDialog = document.getElementById("error");


/*buttons to be selected */

//main page buttons
const addBtn = document.getElementById("add");
const selectBtn = document.getElementById("select");

//register dialog buttons
const registerBtn = document.getElementById("register");
const registerReturnBtn = document.getElementById("register-return");

//selected page buttons
const loginGoBtn = document.getElementById("login-go");
const selectReturnBtn = document.getElementById("select-return");
const deleteBtn = document.getElementById("delete");

//login page buttons
const loginBtn = document.getElementById("login");
const loginReturnBtn = document.getElementById("login-return");

//Error messaging dialog items
const errorMsg = document.getElementById("error-message");
const errorMsgBtn = document.getElementById("error-exit");

/*list containing clinician names to be selected*/
const clinicianList = document.querySelector(".list");

async function getClinicians(){
    console.log("⚙️ Running getClinicians...");
    try{
        const results = await fetch("PHP/Clinicians/getClinicians.php");
        console.log("📡 Fetched data from getClinicians.php");


        const clinicians = await results.json(); 
        console.log("👀 Clinicians received:", clinicians);


        const clinicianList = document.querySelector(".list");
        clinicianList.innerHTML ="";
        console.log("🧹 Cleared clinician list");
        clinicians.forEach(clinician => {
            const listItem = document.createElement("li");
            listItem.textContent = `${clinician.first_name} ${clinician.last_name}`;
            listItem.classList.add(`clinician-${clinician.clinician_id}`);
            clinicianList.appendChild(listItem);
        });
    }catch(error){
        alert(error);
    }
};

async function addClinicians(newClinician){
    try{
        const response = await fetch("PHP/Clinicians/addClinicians.php",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newClinician)
        });

        const result = await response.json();
        return result;

    }catch(error){
        return {success: false};
    }

};

async function deleteClinician(clinician){
    try{
        const response = await fetch("PHP/Clinicians/deleteClinicians.php",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clinician)
        });

        const result = await response.json();
        return result;
    }catch(error){
        return {success: false};
    }
}

async function loginClinician(loginInfo){
    try{
        const response = await fetch("PHP/Clinicians/login.php",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginInfo)
        });

        const result = await response.json();
        return result;

    }catch(error){
        alert(error);
    }
}


/*event listeners*/

//main page buttons
addBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    clinicianCreate.classList.toggle("display-none");
    clinicianCreate.classList.toggle("display");
    clinicianHome.classList.toggle("display-flex");
    clinicianHome.classList.toggle("display-none");

});

selectBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    if(document.getElementById("selected")){
        clinicianHome.classList.toggle("display-flex");
        clinicianHome.classList.toggle("display-none");
        clinicianSelect.classList.toggle("display-none");
        clinicianSelect.classList.toggle("display");

        const clinicianInfo= document.getElementById("selected").textContent;
        document.querySelector(".clinician-display").textContent= clinicianInfo;
        document.querySelector(".clinician-display-login").textContent = clinicianInfo;        
    }else{
        errorMsg.textContent = "No Clinician Selected";
        errorDialog.showModal();
    }
});

//registration dialog buttpns

registerReturnBtn.addEventListener("click", async (e)=>{
    e.preventDefault();

    await getClinicians();
    clinicianCreate.classList.toggle("display-none");
    clinicianCreate.classList.toggle("display");
    clinicianHome.classList.toggle("display-flex");
    clinicianHome.classList.toggle("display-none");

});

registerBtn.addEventListener("click", async (e)=>{
    e.preventDefault();

    const first = document.getElementById("firstName").value;
    const last = document.getElementById("lastName").value;
    const username = document.getElementById("username").value;
    const passkey = document.getElementById("passkey").value;

    const newClinician = {
        first_name:first,
        last_name:last,
        username:username,
        passkey: passkey
    };

    const result = await addClinicians(newClinician);
    
    if(result.success){
        
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value ="";
        document.getElementById("username").value = "";
        document.getElementById("passkey").value ="";

        await getClinicians();
        clinicianCreate.classList.toggle("display-none");
        clinicianCreate.classList.toggle("display");
        clinicianHome.classList.toggle("display-flex");
        clinicianHome.classList.toggle("display-none");
    }else{
        alert("Error. Clinician Not Added");
    }


});

//Clinician selected diaolog page buttons
selectReturnBtn.addEventListener("click", async (e)=>{
    e.preventDefault();

    await getClinicians();
    clinicianSelect.classList.toggle("display-none");
    clinicianSelect.classList.toggle("display");
    clinicianHome.classList.toggle("display-flex");
    clinicianHome.classList.toggle("display-none");   
});

loginGoBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    login.classList.toggle("display-none");
    login.classList.toggle("display");
    clinicianSelect.classList.toggle("display-none");
    clinicianSelect.classList.toggle("display");    
    
});

deleteBtn.addEventListener("click", async (e)=>{
    e.preventDefault();

    const clinician = document.getElementById("selected");
    const clinicianClass = clinician.getAttribute("class");
    const id = clinicianClass.split("-").pop();

    const deletedClinician = {
        id: id
    }
    
    const result = await deleteClinician(deletedClinician);
    if(result.success){
        await getClinicians();
        clinicianSelect.classList.toggle("display-none");
        clinicianSelect.classList.toggle("display");
        clinicianHome.classList.toggle("display-flex");
        clinicianHome.classList.toggle("display-none");  
    }
    


});

//login dialog buttons
loginReturnBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    login.classList.toggle("display-none");
    login.classList.toggle("display");
    clinicianSelect.classList.toggle("display-none");
    clinicianSelect.classList.toggle("display");       
});

loginBtn.addEventListener("click", async(e)=>{
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("password").value;

    const loginInfo = {
        username: username,
        password: password
    }

    const result = await loginClinician(loginInfo);

    if(result.success){
        document.getElementById("login-username").value = "";
        document.getElementById("password").value = "";
        window.location.href = "patient-selection.php";
    }else{
        document.getElementById("login-username").value = "";
        document.getElementById("password").value = "";
        alert(result.error);
    }
});

errorMsgBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    errorDialog.close();
})




//clinician list

clinicianList.addEventListener("click", (e)=>{
    
    if(document.getElementById("selected")){
        const lastSelected = document.getElementById("selected");
        lastSelected.removeAttribute("id");
        const newSelected = e.target;
        newSelected.setAttribute("id", "selected");
    }else{
        const newSelected = e.target;
        newSelected.setAttribute("id", "selected");
    }
});

//Document loading
console.log("📋 getClinicians function:", typeof getClinicians);
console.log("📋 getClinicians function:", getClinicians);

document.addEventListener("DOMContentLoaded", async ()=>{
    console.log("🟢 DOMContentLoaded event fired!");
    console.log("DOMContentLoaded event fired!");
    await getClinicians();

});


