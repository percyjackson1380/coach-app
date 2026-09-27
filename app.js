/* =========================
   ELEMENTS
========================= */

const dashboard =
    document.getElementById("dashboard");


const clientProfile =
    document.getElementById("clientProfile");


const programDetail =
    document.getElementById("programDetail");



const addClientButton =
    document.getElementById("addClientButton");

const clientModal =
    document.getElementById("clientModal");

const saveClientButton =
    document.getElementById("saveClientButton");

const cancelClientButton =
    document.getElementById("cancelClientButton");



const clientList =
    document.getElementById("clientList");

const clientCount =
    document.getElementById("clientCount");

const programCount =
    document.getElementById("programCount");

const exerciseCount =
    document.getElementById("exerciseCount");



const backButton =
    document.getElementById("backButton");

const homeButton =
    document.getElementById("homeButton");



const addProgramButton =
    document.getElementById("addProgramButton");

const programModal =
    document.getElementById("programModal");

const saveProgramButton =
    document.getElementById("saveProgramButton");

const cancelProgramButton =
    document.getElementById("cancelProgramButton");

const programList =
    document.getElementById("programList");



const addDayButton =
    document.getElementById("addDayButton");

const daysContainer =
    document.getElementById("daysContainer");



const backToProfileButton =
    document.getElementById("backToProfileButton");

const programDaysList =
    document.getElementById("programDaysList");



const exerciseModal =
    document.getElementById("exerciseModal");

const saveExerciseButton =
    document.getElementById("saveExerciseButton");

const cancelExerciseButton =
    document.getElementById("cancelExerciseButton");



/* =========================
   DATA
========================= */

let clients =
    JSON.parse(
        localStorage.getItem("clients")
    ) || [];


let programs =
    JSON.parse(
        localStorage.getItem("programs")
    ) || [];


let currentClientId =
    null;


let currentProgramId =
    null;


let currentDayId =
    null;


let programDays =
    [];



/* =========================
   CLIENT MODAL
========================= */

addClientButton.addEventListener(
    "click",
    function () {

        clientModal.classList.add(
            "show"
        );

    }
);



cancelClientButton.addEventListener(
    "click",
    function () {

        clientModal.classList.remove(
            "show"
        );

    }
);



/* =========================
   SAVE CLIENT
========================= */

saveClientButton.addEventListener(
    "click",
    function () {

        const name =
            document
                .getElementById("clientName")
                .value
                .trim();


        const phone =
            document
                .getElementById("clientPhone")
                .value
                .trim();


        const age =
            document
                .getElementById("clientAge")
                .value;


        const weight =
            document
                .getElementById("clientWeight")
                .value
                .trim();


        const goal =
            document
                .getElementById("clientGoal")
                .value
                .trim();



        if (name === "") {

            alert(
                "نام شاگرد را وارد کنید"
            );

            return;

        }



        const newClient = {

            id: createId(),

            name: name,

            phone: phone,

            age: age,

            weight: weight,

            goal: goal

        };



        clients.push(
            newClient
        );



        saveClients();

        renderClients();

        updateCounts();



        clientModal.classList.remove(
            "show"
        );



        clearClientForm();

    }
);



/* =========================
   SAVE DATA
========================= */

function saveClients() {

    localStorage.setItem(
        "clients",
        JSON.stringify(clients)
    );

}


function savePrograms() {

    localStorage.setItem(
        "programs",
        JSON.stringify(programs)
    );

}



/* =========================
   RENDER CLIENTS
========================= */

function renderClients() {

    if (clients.length === 0) {

        clientList.innerHTML = `
            <div class="empty-box">
                هنوز شاگردی ثبت نشده است.
            </div>
        `;

        return;

    }



    clientList.innerHTML =
        "";



    clients.forEach(
        function (client) {

            const card =
                document.createElement(
                    "div"
                );


            card.classList.add(
                "client-card"
            );


            card.innerHTML = `

                <h3>
                    ${escapeHtml(client.name)}
                </h3>

                <p>
                    ${
                        escapeHtml(client.goal) ||
                        "بدون هدف ثبت‌شده"
                    }
                </p>

                <p>
                    وزن:
                    ${
                        escapeHtml(client.weight) ||
                        "-"
                    }

                    |

                    سن:
                    ${
                        escapeHtml(client.age) ||
                        "-"
                    }
                </p>

            `;



            card.addEventListener(
                "click",
                function () {

                    openClientProfile(
                        client.id
                    );

                }
            );



            clientList.appendChild(
                card
            );

        }
    );

}



/* =========================
   CLIENT PROFILE
========================= */

function openClientProfile(clientId) {

    const client =
        clients.find(
            function (item) {

                return (
                    item.id ===
                    clientId
                );

            }
        );


    if (!client) {
        return;
    }



    currentClientId =
        client.id;



    currentProgramId =
        null;



    dashboard.style.display =
        "none";

    programDetail.style.display =
        "none";

    clientProfile.style.display =
        "block";



    document.getElementById(
        "profileName"
    ).textContent =
        client.name;



    document.getElementById(
        "profilePhone"
    ).textContent =
        client.phone || "-";



    document.getElementById(
        "profileAge"
    ).textContent =
        client.age || "-";



    document.getElementById(
        "profileWeight"
    ).textContent =
        client.weight || "-";



    document.getElementById(
        "profileGoal"
    ).textContent =
        client.goal || "-";



    renderPrograms();

}



/* =========================
   BACK TO DASHBOARD
========================= */

backButton.addEventListener(
    "click",
    showDashboard
);


homeButton.addEventListener(
    "click",
    showDashboard
);



function showDashboard() {

    dashboard.style.display =
        "block";

    clientProfile.style.display =
        "none";

    programDetail.style.display =
        "none";


    currentClientId =
        null;

    currentProgramId =
        null;

    currentDayId =
        null;

}



/* =========================
   PROGRAM MODAL
========================= */

addProgramButton.addEventListener(
    "click",
    function () {

        programDays =
            [];


        renderProgramDays();


        programModal.classList.add(
            "show"
        );

    }
);



cancelProgramButton.addEventListener(
    "click",
    function () {

        programModal.classList.remove(
            "show"
        );


        clearProgramForm();

    }
);



/* =========================
   ADD TRAINING DAY
========================= */

addDayButton.addEventListener(
    "click",
    function () {

        const newDay = {

            id: createId(),

            title: "",

            exercises: []

        };



        programDays.push(
            newDay
        );



        renderProgramDays();

    }
);



/* =========================
   PROGRAM DAY BUILDER
========================= */

function renderProgramDays() {

    daysContainer.innerHTML =
        "";



    programDays.forEach(
        function (day, index) {

            const row =
                document.createElement(
                    "div"
                );


            row.classList.add(
                "day-row"
            );



            const input =
                document.createElement(
                    "input"
                );


            input.type =
                "text";


            input.placeholder =
                "مثلاً جلسه " +
                (index + 1) +
                " - سینه";


            input.value =
                day.title;



            input.addEventListener(
                "input",
                function () {

                    day.title =
                        input.value;

                }
            );



            const removeButton =
                document.createElement(
                    "button"
                );


            removeButton.type =
                "button";


            removeButton.classList.add(
                "remove-day-button"
            );


            removeButton.textContent =
                "حذف";


            removeButton.addEventListener(
                "click",
                function () {

                    programDays =
                        programDays.filter(
                            function (item) {

                                return (
                                    item.id !==
                                    day.id
                                );

                            }
                        );


                    renderProgramDays();

                }
            );



            row.appendChild(
                input
            );


            row.appendChild(
                removeButton
            );


            daysContainer.appendChild(
                row
            );

        }
    );

}



/* =========================
   SAVE PROGRAM
========================= */

saveProgramButton.addEventListener(
    "click",
    function () {

        const title =
            document
                .getElementById(
                    "programTitle"
                )
                .value
                .trim();


        const goal =
            document
                .getElementById(
                    "programGoal"
                )
                .value
                .trim();


        const notes =
            document
                .getElementById(
                    "programNotes"
                )
                .value
                .trim();



        if (title === "") {

            alert(
                "عنوان برنامه را وارد کنید"
            );

            return;

        }



        if (currentClientId === null) {

            alert(
                "شاگرد انتخاب نشده است"
            );

            return;

        }



        const newProgram = {

            id: createId(),

            clientId:
                currentClientId,

            title:
                title,

            goal:
                goal,

            notes:
                notes,

            days:
                programDays.map(
                    function (day) {

                        return {

                            id:
                                day.id,

                            title:
                                day.title,

                            exercises:
                                []

                        };

                    }
                )

        };



        programs.push(
            newProgram
        );



        savePrograms();

        renderPrograms();

        updateCounts();



        programModal.classList.remove(
            "show"
        );


        clearProgramForm();

    }
);



/* =========================
   RENDER PROGRAMS
========================= */

function renderPrograms() {

    const clientPrograms =
        programs.filter(
            function (program) {

                return (
                    program.clientId ===
                    currentClientId
                );

            }
        );



    if (
        clientPrograms.length === 0
    ) {

        programList.innerHTML = `

            <div class="empty-box">
                هنوز برنامه‌ای برای این شاگرد ثبت نشده است.
            </div>

        `;

        return;

    }



    programList.innerHTML =
        "";



    clientPrograms.forEach(
        function (program) {

            const card =
                document.createElement(
                    "div"
                );


            card.classList.add(
                "program-card"
            );



            const days =
                program.days || [];



            card.innerHTML = `

                <h3>
                    ${escapeHtml(program.title)}
                </h3>

                <p>
                    هدف:
                    ${
                        escapeHtml(program.goal) ||
                        "-"
                    }
                </p>

                <p>
                    ${
                        escapeHtml(program.notes) ||
                        "بدون توضیحات"
                    }
                </p>

                <p>
                    تعداد جلسات:
                    ${days.length}
                </p>

            `;



            card.addEventListener(
                "click",
                function () {

                    openProgram(
                        program.id
                    );

                }
            );



            programList.appendChild(
                card
            );

        }
    );

}



/* =========================
   OPEN PROGRAM
========================= */

function openProgram(programId) {

    const program =
        programs.find(
            function (item) {

                return (
                    item.id ===
                    programId
                );

            }
        );


    if (!program) {
        return;
    }



    currentProgramId =
        program.id;



    clientProfile.style.display =
        "none";

    dashboard.style.display =
        "none";

    programDetail.style.display =
        "block";



    document.getElementById(
        "programDetailTitle"
    ).textContent =
        program.title;



    document.getElementById(
        "programDetailGoal"
    ).textContent =
        "هدف: " +
        (
            program.goal ||
            "-"
        );



    document.getElementById(
        "programDetailNotes"
    ).textContent =
        program.notes ||
        "بدون توضیحات";



    renderProgramDetail();

}



/* =========================
   BACK TO CLIENT PROFILE
========================= */

backToProfileButton.addEventListener(
    "click",
    function () {

        if (
            currentClientId ===
            null
        ) {

            showDashboard();

            return;

        }


        openClientProfile(
            currentClientId
        );

    }
);



/* =========================
   PROGRAM DETAIL
========================= */

function renderProgramDetail() {

    const program =
        programs.find(
            function (item) {

                return (
                    item.id ===
                    currentProgramId
                );

            }
        );


    if (!program) {
        return;
    }



    if (!program.days) {

        program.days =
            [];

    }



    programDaysList.innerHTML =
        "";



    if (
        program.days.length === 0
    ) {

        programDaysList.innerHTML = `
            <div class="empty-box">
                این برنامه جلسه‌ای ندارد.
            </div>
        `;

        return;

    }



    program.days.forEach(
        function (day, index) {

            if (!day.exercises) {

                day.exercises =
                    [];

            }



            const card =
                document.createElement(
                    "div"
                );


            card.classList.add(
                "training-day-card"
            );



            const header =
                document.createElement(
                    "div"
                );


            header.classList.add(
                "training-day-header"
            );



            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                day.title ||
                "جلسه " +
                (index + 1);



            const addExerciseButton =
                document.createElement(
                    "button"
                );


            addExerciseButton.classList.add(
                "small-button"
            );


            addExerciseButton.textContent =
                "+ افزودن حرکت";



            addExerciseButton.addEventListener(
                "click",
                function () {

                    openExerciseModal(
                        day.id
                    );

                }
            );



            header.appendChild(
                title
            );


            header.appendChild(
                addExerciseButton
            );


            card.appendChild(
                header
            );



            if (
                day.exercises.length ===
                0
            ) {

                const empty =
                    document.createElement(
                        "div"
                    );


                empty.classList.add(
                    "empty-box"
                );


                empty.textContent =
                    "هنوز حرکتی اضافه نشده است.";


                card.appendChild(
                    empty
                );

            } else {

                day.exercises.forEach(
                    function (exercise) {

                        const exerciseCard =
                            createExerciseCard(
                                exercise
                            );


                        card.appendChild(
                            exerciseCard
                        );

                    }
                );

            }



            programDaysList.appendChild(
                card
            );

        }
    );

}



/* =========================
   EXERCISE MODAL
========================= */

function openExerciseModal(dayId) {

    currentDayId =
        dayId;


    clearExerciseForm();


    exerciseModal.classList.add(
        "show"
    );

}



cancelExerciseButton.addEventListener(
    "click",
    function () {

        exerciseModal.classList.remove(
            "show"
        );


        currentDayId =
            null;


        clearExerciseForm();

    }
);



/* =========================
   SAVE EXERCISE
========================= */

saveExerciseButton.addEventListener(
    "click",
    function () {

        const name =
            document
                .getElementById(
                    "exerciseName"
                )
                .value
                .trim();


        const sets =
            document
                .getElementById(
                    "exerciseSets"
                )
                .value
                .trim();


        const reps =
            document
                .getElementById(
                    "exerciseReps"
                )
                .value
                .trim();


        const weight =
            document
                .getElementById(
                    "exerciseWeight"
                )
                .value
                .trim();


        const rest =
            document
                .getElementById(
                    "exerciseRest"
                )
                .value
                .trim();


        const notes =
            document
                .getElementById(
                    "exerciseNotes"
                )
                .value
                .trim();



        if (name === "") {

            alert(
                "نام حرکت را وارد کنید"
            );

            return;

        }



        const program =
            programs.find(
                function (item) {

                    return (
                        item.id ===
                        currentProgramId
                    );

                }
            );


        if (!program) {
            return;
        }



        const day =
            program.days.find(
                function (item) {

                    return (
                        item.id ===
                        currentDayId
                    );

                }
            );


        if (!day) {
            return;
        }



        if (!day.exercises) {

            day.exercises =
                [];

        }



        const newExercise = {

            id:
                createId(),

            name:
                name,

            sets:
                sets,

            reps:
                reps,

            weight:
                weight,

            rest:
                rest,

            notes:
                notes

        };



        day.exercises.push(
            newExercise
        );



        savePrograms();

        renderProgramDetail();

        updateCounts();



        exerciseModal.classList.remove(
            "show"
        );


        currentDayId =
            null;


        clearExerciseForm();

    }
);



/* =========================
   CREATE EXERCISE CARD
========================= */

function createExerciseCard(
    exercise
) {

    const card =
        document.createElement(
            "div"
        );


    card.classList.add(
        "exercise-card"
    );



    const details = [];



    if (exercise.sets) {

        details.push(
            `
            <span class="exercise-detail">
                ست:
                ${escapeHtml(exercise.sets)}
            </span>
            `
        );

    }



    if (exercise.reps) {

        details.push(
            `
            <span class="exercise-detail">
                تکرار:
                ${escapeHtml(exercise.reps)}
            </span>
            `
        );

    }



    if (exercise.weight) {

        details.push(
            `
            <span class="exercise-detail">
                وزن:
                ${escapeHtml(exercise.weight)}
            </span>
            `
        );

    }



    if (exercise.rest) {

        details.push(
            `
            <span class="exercise-detail">
                استراحت:
                ${escapeHtml(exercise.rest)}
            </span>
            `
        );

    }



    card.innerHTML = `

        <h4>
            ${escapeHtml(exercise.name)}
        </h4>

        <div class="exercise-details">
            ${details.join("")}
        </div>

        ${
            exercise.notes
                ?
                `
                <p class="exercise-note">
                    ${escapeHtml(exercise.notes)}
                </p>
                `
                :
                ""
        }

    `;



    return card;

}



/* =========================
   COUNTERS
========================= */

function updateCounts() {

    clientCount.textContent =
        clients.length;


    programCount.textContent =
        programs.length;



    let totalExercises =
        0;



    programs.forEach(
        function (program) {

            const days =
                program.days || [];


            days.forEach(
                function (day) {

                    totalExercises +=
                        (
                            day.exercises ||
                            []
                        ).length;

                }
            );

        }
    );



    exerciseCount.textContent =
        totalExercises;

}



/* =========================
   CLEAR CLIENT FORM
========================= */

function clearClientForm() {

    document.getElementById(
        "clientName"
    ).value = "";


    document.getElementById(
        "clientPhone"
    ).value = "";


    document.getElementById(
        "clientAge"
    ).value = "";


    document.getElementById(
        "clientWeight"
    ).value = "";


    document.getElementById(
        "clientGoal"
    ).value = "";

}



/* =========================
   CLEAR PROGRAM FORM
========================= */

function clearProgramForm() {

    document.getElementById(
        "programTitle"
    ).value = "";


    document.getElementById(
        "programGoal"
    ).value = "";


    document.getElementById(
        "programNotes"
    ).value = "";


    programDays =
        [];


    renderProgramDays();

}



/* =========================
   CLEAR EXERCISE FORM
========================= */

function clearExerciseForm() {

    document.getElementById(
        "exerciseName"
    ).value = "";


    document.getElementById(
        "exerciseSets"
    ).value = "";


    document.getElementById(
        "exerciseReps"
    ).value = "";


    document.getElementById(
        "exerciseWeight"
    ).value = "";


    document.getElementById(
        "exerciseRest"
    ).value = "";


    document.getElementById(
        "exerciseNotes"
    ).value = "";

}



/* =========================
   CREATE ID
========================= */

function createId() {

    return (
        Date.now().toString() +
        Math.random()
            .toString(16)
            .slice(2)
    );

}



/* =========================
   SAFE TEXT
========================= */

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}



/* =========================
   START APP
========================= */

renderClients();

updateCounts();

showDashboard();