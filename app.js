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


const dashboard =
    document.querySelector(".dashboard");

const clientProfile =
    document.getElementById("clientProfile");

const backButton =
    document.getElementById("backButton");


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



/* -------------------------
   DATA
------------------------- */

let clients =
    JSON.parse(localStorage.getItem("clients")) || [];


let programs =
    JSON.parse(localStorage.getItem("programs")) || [];


let currentClientId = null;


let programDays = [];



/* -------------------------
   CLIENT MODAL
------------------------- */

addClientButton.addEventListener(
    "click",
    function () {

        clientModal.classList.add("show");

    }
);


cancelClientButton.addEventListener(
    "click",
    function () {

        clientModal.classList.remove("show");

    }
);



/* -------------------------
   SAVE CLIENT
------------------------- */

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

            alert("نام شاگرد را وارد کنید");

            return;

        }



        const newClient = {

            id: Date.now(),

            name: name,

            phone: phone,

            age: age,

            weight: weight,

            goal: goal

        };



        clients.push(newClient);



        saveClients();

        renderClients();

        updateCounts();



        clientModal.classList.remove("show");

        clearClientForm();

    }
);



/* -------------------------
   SAVE CLIENTS
------------------------- */

function saveClients() {

    localStorage.setItem(
        "clients",
        JSON.stringify(clients)
    );

}



/* -------------------------
   RENDER CLIENTS
------------------------- */

function renderClients() {

    if (clients.length === 0) {

        clientList.innerHTML = `
            <div class="empty-box">
                هنوز شاگردی ثبت نشده است.
            </div>
        `;

        return;

    }



    clientList.innerHTML = "";



    clients.forEach(function (client) {

        const card =
            document.createElement("div");



        card.classList.add("client-card");



        card.innerHTML = `

            <h3>
                ${client.name}
            </h3>

            <p>
                ${client.goal || "بدون هدف ثبت‌شده"}
            </p>

            <p>
                وزن:
                ${client.weight || "-"}

                |

                سن:
                ${client.age || "-"}
            </p>

        `;



        card.addEventListener(
            "click",
            function () {

                openClientProfile(client);

            }
        );



        clientList.appendChild(card);

    });

}



/* -------------------------
   OPEN CLIENT PROFILE
------------------------- */

function openClientProfile(client) {

    currentClientId =
        client.id;



    dashboard.style.display =
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



/* -------------------------
   BACK TO DASHBOARD
------------------------- */

backButton.addEventListener(
    "click",
    function () {

        clientProfile.style.display =
            "none";

        dashboard.style.display =
            "block";

        currentClientId =
            null;

    }
);



/* -------------------------
   PROGRAM MODAL
------------------------- */

addProgramButton.addEventListener(
    "click",
    function () {

        programDays = [];

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



/* -------------------------
   ADD TRAINING DAY
------------------------- */

addDayButton.addEventListener(
    "click",
    function () {

        const newDay = {

            id:
                Date.now() +
                Math.random(),

            title: ""

        };



        programDays.push(
            newDay
        );



        renderProgramDays();

    }
);



/* -------------------------
   RENDER TRAINING DAYS
------------------------- */

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



/* -------------------------
   SAVE PROGRAM
------------------------- */

saveProgramButton.addEventListener(
    "click",
    function () {

        const title =
            document
                .getElementById("programTitle")
                .value
                .trim();

        const goal =
            document
                .getElementById("programGoal")
                .value
                .trim();

        const notes =
            document
                .getElementById("programNotes")
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

            id: Date.now(),

            clientId:
                currentClientId,

            title:
                title,

            goal:
                goal,

            notes:
                notes,

            days:
                programDays

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



/* -------------------------
   SAVE PROGRAMS
------------------------- */

function savePrograms() {

    localStorage.setItem(
        "programs",
        JSON.stringify(programs)
    );

}



/* -------------------------
   RENDER PROGRAMS
------------------------- */

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



            const numberOfDays =
                program.days
                    ? program.days.length
                    : 0;



            card.innerHTML = `

                <h3>
                    ${program.title}
                </h3>

                <p>
                    هدف:
                    ${program.goal || "-"}
                </p>

                <p>
                    ${
                        program.notes ||
                        "بدون توضیحات"
                    }
                </p>

                <p>
                    تعداد جلسات:
                    ${numberOfDays}
                </p>

            `;



            programList.appendChild(
                card
            );

        }
    );

}



/* -------------------------
   COUNTERS
------------------------- */

function updateCounts() {

    clientCount.textContent =
        clients.length;

    programCount.textContent =
        programs.length;

}



/* -------------------------
   CLEAR CLIENT FORM
------------------------- */

function clearClientForm() {

    document.getElementById(
        "clientName"
    ).value =
        "";

    document.getElementById(
        "clientPhone"
    ).value =
        "";

    document.getElementById(
        "clientAge"
    ).value =
        "";

    document.getElementById(
        "clientWeight"
    ).value =
        "";

    document.getElementById(
        "clientGoal"
    ).value =
        "";

}



/* -------------------------
   CLEAR PROGRAM FORM
------------------------- */

function clearProgramForm() {

    document.getElementById(
        "programTitle"
    ).value =
        "";

    document.getElementById(
        "programGoal"
    ).value =
        "";

    document.getElementById(
        "programNotes"
    ).value =
        "";



    programDays =
        [];



    renderProgramDays();

}



/* -------------------------
   START APP
------------------------- */

renderClients();

updateCounts();