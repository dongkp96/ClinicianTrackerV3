/*Windows and Items*/
const addNoteModal = document.getElementById("add-note-window");

/*Buttons */

//main page buttons
const addNoteBtn = document.getElementById("add-note");
const logOutBtn = document.getElementById("clinician-selection-return");

//add note modal buttons
const submitNoteBtn = document.getElementById("submit-note");
const returnFromAddNoteBtn = document.getElementById("return-add-note");


/*functions */

async function logOut(){
    try{
        const response = await fetch("PHP/logout.php",{method: "POST"})
        const result = await response.json();
        return result;
    }catch(error){
        return {success:false};
    }
}

async function addNote(note){
    try{
        const response = await fetch("PHP/Profile/addNote.php",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        });
        const result = await response.json();
        return result;
    }catch(error){
        return {success:false};
    }
}


/*event listeners */

addNoteBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    addNoteModal.showModal();
});

returnFromAddNoteBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    
    addNoteModal.close();
})

logOutBtn.addEventListener("click", async(e)=>{
    e.preventDefault();

    const result = await logOut();
    if(result.success){
        window.location.href = "index.php";
    }

})

submitNoteBtn.addEventListener("click", async(e)=>{
    e.preventDefault();

    const visitNumber = document.getElementById("visitNumber").value;
    const visitDate = document.getElementById("visitDate").value;
    const pain= document.getElementById("painLevel").value;
    const functionRating = document.getElementById("function").value;
    const goals= document.getElementById("goals").value;
    const summary = document.getElementById("summary").value;

    const newNote = {
        visitNumber: visitNumber,
        visitDate: visitDate,
        painLevel: pain,
        functionRating: functionRating,
        goals: goals,
        summary: summary
    };

    const result = await addNote(newNote);
    

    if(result.success){
        document.getElementById("visitNumber").value ="";
        document.getElementById("visitDate").value="";
        document.getElementById("painLevel").value="";
        document.getElementById("function").value="";
        document.getElementById("goals").value="";
        document.getElementById("summary").value="";
        
        addNoteModal.close();

    }
});
