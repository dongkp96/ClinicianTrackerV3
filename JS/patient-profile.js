/*Windows and Items*/
const addNoteModal = document.getElementById("add-note-window");
const editNoteModal = document.getElementById("edit-note-window");

/*Buttons */

//main page buttons
const addNoteBtn = document.getElementById("add-note");
const logOutBtn = document.getElementById("clinician-selection-return");
const exitProfileBtn = document.getElementById("patient-select-return");

//add note modal buttons
const submitNoteBtn = document.getElementById("submit-note");
const returnFromAddNoteBtn = document.getElementById("return-add-note");

//edit note modal buttons
const editNoteBtn = document.getElementById("edit-note");
const deleteNoteBtn = document.getElementById("delete-note");
const returnFromEditBtn = document.getElementById("return-edit-note");

//Notes List
const notesList = document.getElementById("notes-list");
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

async function exitProfile(){
    try{
        const response = await fetch("PHP/Profile/exitPatient.php", {method: "POST"})
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

async function deleteNote(note){
    try{      
        const response = await fetch("PHP/Profile/deleteNote.php",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        });
        const rawText = await response.text();
        const result = JSON.parse(rawText);
        return result;
    }catch(error){
        return{success:false};
    }
}

async function editNote(note){
    try{
        const response = await fetch("PHP/Profile/editNote.php", {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
        const result = await response.json();
        return result;
    }catch(error){
       return{success:false}; 
    }
}

async function getNotes(){
    try{
        const response = await fetch("PHP/Profile/getNotes.php")
        const notes = await response.json();
        
        notesList.innerHTML = "";

        notes.forEach(note =>{
            //Creates List item to add to the notes list
            const listItem = document.createElement("li");
            listItem.classList.add(`note-${note.visit_id}`)

            //creates the note container itself
            const noteContainer = document.createElement("div");
            noteContainer.classList.add("visit-note");
            
            //creates the container for the numeric info for the note
            const noteInfoContainer = document.createElement("div");
            noteInfoContainer.classList.add("visit-note-info");

            //Creates the HTML and binds the outputted note info into the text content
            const visitNumber = document.createElement("p");
            visitNumber.textContent = `Visit Number:${note.visit_number}`;

            const painLevel = document.createElement("p");
            painLevel.textContent = `Pain Level:${note.pain_level}`;

            const functionRating = document.createElement("p");
            functionRating.textContent = `Function Rating:${note.function_rating}`;

            const goalsMet = document.createElement("p");
            goalsMet.textContent = `Goals Met:${note.goals_met}`;
            
            const visitDate = document.createElement("p");
            visitDate.textContent =`Visit Date: ${note.visit_date}`

            const summary = document.createElement("p");
            summary.textContent = `Summary:${note.summary}`;

            //adding the appropriate HTML elements to the note info section
            noteInfoContainer.appendChild(visitNumber);
            noteInfoContainer.appendChild(painLevel);
            noteInfoContainer.appendChild(functionRating);
            noteInfoContainer.appendChild(goalsMet);
            noteInfoContainer.appendChild(visitDate);

            //adding the appropriate HTML elements to the note itself
            noteContainer.appendChild(noteInfoContainer);
            noteContainer.appendChild(summary);

            //adding the note itself to the list item
            listItem.appendChild(noteContainer);

            //adding the list item to the ul for the notes list
            notesList.appendChild(listItem);
 
        });
    }catch(error){
        return {success:false};
    }

};




/*event listeners */

//Event Listeners for adding note modal
addNoteBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    addNoteModal.showModal();
});

returnFromAddNoteBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    
    addNoteModal.close();
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
        await getNotes();
        document.getElementById("visitNumber").value ="";
        document.getElementById("visitDate").value="";
        document.getElementById("painLevel").value="";
        document.getElementById("function").value="";
        document.getElementById("goals").value="";
        document.getElementById("summary").value="";
        
        addNoteModal.close();

    }
});

//Event Listeners for editing notes
notesList.addEventListener("click", (e)=>{
    e.preventDefault();


    const note = e.target.closest(".visit-note");
    const listItem = note.parentNode;
    if(document.getElementById("selected")){
        const lastSelected = document.getElementById("selected");
        lastSelected.removeAttribute("id");
        listItem.setAttribute("id", "selected");
    }else{
        listItem.setAttribute("id", "selected");
    }
    
    const noteInfoContainer = note.querySelector(".visit-note-info");

    const info = {
        visitNumber: noteInfoContainer.children[0].textContent.split(":").pop(), // Visit Number
        painLevel: noteInfoContainer.children[1].textContent.split(":").pop(), // Pain Level
        functionRating: noteInfoContainer.children[2].textContent.split(":").pop(), //function
        goalsMet: noteInfoContainer.children[3].textContent.split(":").pop(), // goals
        visitDate: noteInfoContainer.children[4].textContent.split(": ").pop(), // visitDate
        summary: note.querySelector(".visit-note-info + p").textContent.split(":").pop() // Summary outside info container
    };

    const editVisitNumber = document.getElementById("visitNumber-edit");
    const editVisitDate = document.getElementById("visitDate-edit");
    const editPainLevel = document.getElementById("painLevel-edit");
    const editFunctionRating = document.getElementById("function-edit");
    const editGoalsMet = document.getElementById("goals-edit");
    const editSummary = document.getElementById("summary-edit");

    editVisitNumber.value = info.visitNumber;
    editVisitDate.value = info.visitDate;
    editPainLevel.value = info.painLevel;
    editFunctionRating.value = info.functionRating;
    editGoalsMet.value = info.goalsMet;
    editSummary.value = info.summary;

    editNoteModal.showModal();
    

});

returnFromEditBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    editNoteModal.close();
});


deleteNoteBtn.addEventListener("click", async(e)=>{
    e.preventDefault();

    const note = document.getElementById("selected");
    const noteClass = note.getAttribute("class");
    const noteId = noteClass.split("-").pop();

    const deletedNote = {
        note_id: noteId
    };

    const result = await deleteNote(deletedNote);
    console.log(result);

    if(result.success){
        await getNotes();
        editNoteModal.close();
    }
});

editNoteBtn.addEventListener("click", async(e)=>{
    e.preventDefault();
    const note = document.getElementById("selected");
    const noteClass = note.getAttribute("class");
    const noteId = noteClass.split("-").pop();

    const editedNote = {
        visitNumber: document.getElementById("visitNumber-edit").value,
        visitDate: document.getElementById("visitDate-edit").value,
        painLevel: document.getElementById("painLevel-edit").value,
        function: document.getElementById("function-edit").value,
        goals: document.getElementById("goals-edit").value,
        summary: document.getElementById("summary-edit").value,
        note_id:noteId
    };

    const result = await editNote(editedNote);

    if(result.success){
        await getNotes();
        editNoteModal.close();        
    }

});

//event listeners for leaving the profile page
logOutBtn.addEventListener("click", async(e)=>{
    e.preventDefault();

    const result = await logOut();
    if(result.success){
        window.location.href = "index.php";
    }

})

exitProfileBtn.addEventListener("click", async(e)=>{
    e.preventDefault();

    const result = await exitProfile();
    if(result.success){
        window.location.href = "patient-selection.php";
    }
})



//loads notes once DOM loads for the patient Profile
document.addEventListener("DOMContentLoaded", async()=>{

    await getNotes();
})
