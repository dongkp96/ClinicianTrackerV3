/*Windows and Items*/
const addNoteModal = document.getElementById("add-note-window");

/*Buttons */

//main page buttons
const addNoteBtn = document.getElementById("add-note");

//add note modal buttons
const submitNoteBtn = document.getElementById("submit-note");
const returnFromAddNoteBtn = document.getElementById("return-add-note");


/*event listeners */

addNoteBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    addNoteModal.showModal();
});

returnFromAddNoteBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    
    addNoteModal.close();
})