/*Patient Selection Windows */
const patientHome =document.getElementById("patient-list");
const patientCreate =document.getElementById("patient-creation");
const patientSelect =document.getElementById("patient-select");

/*Buttons to be selected*/

//main page buttons
const addBtn = document.getElementById("add");
const selectBtn = document.getElementById("select");

//register dialog buttons
const registerBtn = document.getElementById("register");
const registerReturnBtn = document.getElementById("register-return");

//selected page buttons
const profileGoBtn = document.getElementById("profile-go");
const selectReturnBtn = document.getElementById("select-return");
const deleteBtn = document.getElementById("delete");

//logout button
const logOutBtn = document.getElementById("clinician-selection-return");

/*Patient list */
const patientList = document.querySelector(".list");

/*Functions */

//Function get patients from PHP page and implement them on DOM
async function getPatients(){
    try{
        const results = await fetch("PHP/Patients/getPatients.php");

        const patients = await results.json();

        patientList.innerHTML ="";

        patients.forEach(patient=>{
            const listItem = document.createElement("li");
            listItem.textContent = `${patient.first_name} ${patient.last_name}`;
            listItem.classList.add(`patient-${patient.patient_id}`);
            patientList.appendChild(listItem);

        });

    }catch(error){
        console.log(error);
    }
}

//Function to add patient by sending a post request with JSON
async function addPatients(newPatient){
    try{
        const response = await fetch("PHP/Patients/addPatients.php",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPatient)
        });
        
        const result = await response.json();
        return result;
    }catch(error){
        console.log(error);
    }
}

//Function to delete patient by ID by sending a post request with JSON
async function deletePatient(patient){
    try{
        const response = await fetch("PHP/Patients/deletePatients.php", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(patient)
        });
        const result = await response.json();
        return result;
    }catch(error){
        return {success:false};
    }
}

//Function that uses patient ID to ensure matching ID values prior to sending user to profile
async function goToProfile(patient){
    try{
        const response = await fetch("PHP/Patients/patientProfile.php",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patient)
        })
        const result = await response.json();
        return result;
    }catch(error){
        return {success:false, issue: error};
    }

}

async function logOut(){
    try{
        const response = await fetch("PHP/logout.php",{method: "POST"})
        const result = await response.json();
        return result;
    }catch(error){
        return {success:false};
    }
}

/*Event Listeners*/

//main page buttons
addBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    patientCreate.classList.toggle("display-none");
    patientCreate.classList.toggle("display");
    patientHome.classList.toggle("display-flex");
    patientHome.classList.toggle("display-none");

});

selectBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    patientHome.classList.toggle("display-flex");
    patientHome.classList.toggle("display-none");
    patientSelect.classList.toggle("display-none");
    patientSelect.classList.toggle("display");

    const patientInfo= document.getElementById("selected").textContent;
    document.querySelector(".patient-display").textContent= patientInfo;
});

//registration dialog buttpns

registerReturnBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    patientCreate.classList.toggle("display-none");
    patientCreate.classList.toggle("display");
    patientHome.classList.toggle("display-flex");
    patientHome.classList.toggle("display-none");

});

registerBtn.addEventListener("click", async(e)=>{
    e.preventDefault();

    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    diagnosis = document.getElementById("diagnosis").value;
    weight = document.getElementById("weight").value;
    height= document.getElementById("height").value;
    age = document.getElementById("age").value;
    dob = document.getElementById("dob").value;
    gender = document.querySelector("input[name='gender']:checked")?.value;

    const newPatient = {
        firstName: firstName,
        lastName: lastName,
        diagnosis: diagnosis,
        weight: weight,
        height: height,
        age: age,
        dob: dob,
        gender: gender
    };

    const result = await addPatients(newPatient);

    if(result.success){
        document.getElementById("firstName").value ="";
        document.getElementById("lastName").value="";
        document.getElementById("diagnosis").value="";
        document.getElementById("weight").value="";
        document.getElementById("height").value="";
        document.getElementById("age").value="";
        document.getElementById("dob").value="";

        await getPatients();

        patientCreate.classList.toggle("display-none");
        patientCreate.classList.toggle("display");
        patientHome.classList.toggle("display-flex");
        patientHome.classList.toggle("display-none");


    }else{
        alert("Error. Patient not added")
    }
});

//Patient selected diaolog page buttons

selectReturnBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    patientSelect.classList.toggle("display-none");
    patientSelect.classList.toggle("display");
    patientHome.classList.toggle("display-flex");
    patientHome.classList.toggle("display-none");   
});

profileGoBtn.addEventListener("click", async (e)=>{
    e.preventDefault();

    const patient = document.getElementById("selected");
    const patientClass = patient.getAttribute("class");
    const id = patientClass.split("-").pop();

    const selectedPatient = {id:id};

    const result = await goToProfile(selectedPatient);
    console.log(result.success);

    if(result.success){
        console.log("Result is success");
        window.location.href = "patient-profile.php";
    }


});

deleteBtn.addEventListener("click", async (e)=>{
    e.preventDefault();

    const patient = document.getElementById("selected");
    const patientClass = patient.getAttribute("class");
    const id = patientClass.split("-").pop();

    const deletedPatient = { id: id};
    

    const result = await deletePatient(deletedPatient);
    if(result.success){
        await getPatients();
        patientSelect.classList.toggle("display-none");
        patientSelect.classList.toggle("display");
        patientHome.classList.toggle("display-flex");
        patientHome.classList.toggle("display-none");
    }

});

logOutBtn.addEventListener("click", async(e)=>{
    e.preventDefault();

    const result = await logOut();
    if(result.success){
        window.location.href = "index.php";
    }

})

//Patient list 
patientList.addEventListener("click", (e)=>{
    
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


//load patient list
document.addEventListener("DOMContentLoaded", async ()=>{
    await getPatients();
});