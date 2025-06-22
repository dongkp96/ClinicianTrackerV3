<?php
session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="CSS/patient-profile.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
    <title>Patient Profile</title>
</head>
<body>
    <main>
        <section id="profile">
            <div id="profile-pic">
                <img src=<?php if($_SESSION["patient_gender"] === "m"){
                        echo "assets/male-profile-pic.jpeg";
                    }else if($_SESSION["patient_gender"] === "f"){
                        echo "assets/female-profile-pic.jpg";
                    }else{
                        echo "assets/male-profile-pic.jpeg";
                    }?> alt="profile picture fill in with blue background" width="300px" height="300px">
            </div>
            <div id="profile-basic-info">
                <div id="profile-identifiers">
                    <h3>Name: <?php echo htmlspecialchars($_SESSION["patient_first_name"]) . " " . htmlspecialchars($_SESSION["patient_last_name"]) ?></h3>
                    <p>Gender: <?php if($_SESSION["patient_gender"] === "m"){
                        echo "Male";
                    }else if($_SESSION["patient_gender"] === "f"){
                        echo "Female";
                    }else{
                        echo "Deferred Gender identification";
                    }?></p>                                       
                </div>
                <hr>
                <div>
                    <p>Diagnosis: <?php echo htmlspecialchars($_SESSION["patient_diagnosis"]) ?></p>                   
                </div>
                <hr>
                <div>
                    <p>Age: <?php echo htmlspecialchars($_SESSION["patient_age"])?></p>
                    <p>DOB: <?php echo htmlspecialchars($_SESSION["patient_dob"])?></p>
                </div>
                <hr>
                <div>
                    <p>Height (in): <?php echo htmlspecialchars($_SESSION["patient_height"]) ?></p>
                    <p>Weight (lb): <?php echo htmlspecialchars($_SESSION["patient_weight"])?></p>
                </div>
            </div>
            <hr>
            <div id = "button-container">
                <button>Return to Patient Selection</button>
                <button>Return to Clinician Selection</button>
            </div>
        </section>

        <section id="notes">
            <div id="notes-nav">
                <H2>Visit Notes</H2>
                <div>
                    <Button>Add Note</Button>
                </div>
            </div>
            <div id="notes-holder">
                <ul id="notes-list">
                    <li>
                        <div class="visit-note">
                            <div class="visit-note-info">
                                <p>Visit Number: 1</p>
                                <p>Pain Level:5</p>
                                <p>Function Rating: 7</p>
                                <p>Goals Met: 0</p>                               
                            </div>
                            <p>Summary: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum soluta libero doloremque cum quisquam voluptatum, quia architecto blanditiis, nesciunt praesentium necessitatibus minima perspiciatis iste quae fuga delectus laboriosam officiis ipsam.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section id="charts">
            <h2>Patient Data Charts</h2>
            <div id="pain-chart">

            </div>
        </section>
    </main>

    <dialog>
        
    </dialog>
</body>
</html>