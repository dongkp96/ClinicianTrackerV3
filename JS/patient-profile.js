/*Windows and Items*/
const addNoteModal = document.getElementById("add-note-window");

/*Buttons */

//main page buttons
const addNoteBtn = document.getElementById("add-note");
const logOutBtn = document.getElementById("clinician-selection-return");
const exitProfileBtn = document.getElementById("patient-select-return");

//add note modal buttons
const submitNoteBtn = document.getElementById("submit-note");
const returnFromAddNoteBtn = document.getElementById("return-add-note");

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

exitProfileBtn.addEventListener("click", async(e)=>{
    e.preventDefault();

    const result = await exitProfile();
    if(result.success){
        window.location.href = "patient-selection.php";
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

notesList.addEventListener("click", (e)=>{
    e.preventDefault();

    const note = e.target.closest(".visit-note");
    if(document.getElementById("selected")){
        const lastSelected = document.getElementById("selected");
        lastSelected.removeAttribute("id");
        note.setAttribute("id", "selected");
    }else{
        note.setAttribute("id", "selected");
    }
    
    const noteInfoContainer = clickedNote.querySelector(".visit-note-info");

    const info = {
        visitNumber: noteInfoContainer.children[0].textContent, // Visit Number
        painLevel: noteInfoContainer.children[1].textContent, // Pain Level
        functionRating: noteInfoContainer.children[2].textContent, //function
        goalsMet: noteInfoContainer.children[3].textContent, // goals
        visitDate: noteInfoContainer.children[4].textContent, // visitDate
        summary: clickedNote.querySelector("p:last-of-type").textContent // Summary outside info container
    };

    


    

});

//loads notes once DOM loads for the patient Profile
document.addEventListener("DOMContentLoaded", async()=>{

    await getNotes();
})
