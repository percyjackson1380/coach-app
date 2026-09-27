/* =========================
   ELEMENTS
========================= */

const dashboard =
    document.getElementById("dashboard");

const clientProfile =
    document.getElementById("clientProfile");

const programDetail =
    document.getElementById("programDetail");

const exerciseLibraryView =
    document.getElementById("exerciseLibraryView");


const homeButton =
    document.getElementById("homeButton");

const clientsButton =
    document.getElementById("clientsButton");

const exercisesButton =
    document.getElementById("exercisesButton");


const clientCount =
    document.getElementById("clientCount");

const programCount =
    document.getElementById("programCount");

const exerciseCount =
    document.getElementById("exerciseCount");


const clientList =
    document.getElementById("clientList");

const clientSearch =
    document.getElementById("clientSearch");



/* CLIENT */

const addClientButton =
    document.getElementById("addClientButton");

const clientModal =
    document.getElementById("clientModal");

const clientModalTitle =
    document.getElementById("clientModalTitle");

const saveClientButton =
    document.getElementById("saveClientButton");

const cancelClientButton =
    document.getElementById("cancelClientButton");

const editClientButton =
    document.getElementById("editClientButton");

const deleteClientButton =
    document.getElementById("deleteClientButton");

const backButton =
    document.getElementById("backButton");



/* PROGRAM */

const addProgramButton =
    document.getElementById("addProgramButton");

const programList =
    document.getElementById("programList");

const programModal =
    document.getElementById("programModal");

const saveProgramButton =
    document.getElementById("saveProgramButton");

const cancelProgramButton =
    document.getElementById("cancelProgramButton");

const addDayButton =
    document.getElementById("addDayButton");

const daysContainer =
    document.getElementById("daysContainer");

const backToProfileButton =
    document.getElementById("backToProfileButton");

const programDaysList =
    document.getElementById("programDaysList");

const printProgramButton =
    document.getElementById("printProgramButton");



/* PROGRAM EXERCISE */

const exerciseModal =
    document.getElementById("exerciseModal");

const saveExerciseButton =
    document.getElementById("saveExerciseButton");

const cancelExerciseButton =
    document.getElementById("cancelExerciseButton");

const libraryExerciseSelect =
    document.getElementById("libraryExerciseSelect");



/* LIBRARY */

const dashboardAddExerciseButton =
    document.getElementById("dashboardAddExerciseButton");

const addLibraryExerciseButton =
    document.getElementById("addLibraryExerciseButton");

const libraryExerciseModal =
    document.getElementById("libraryExerciseModal");

const libraryExerciseModalTitle =
    document.getElementById("libraryExerciseModalTitle");

const saveLibraryExerciseButton =
    document.getElementById("saveLibraryExerciseButton");

const cancelLibraryExerciseButton =
    document.getElementById("cancelLibraryExerciseButton");

const exerciseLibraryList =
    document.getElementById("exerciseLibraryList");

const libraryExerciseCategory =
    document.getElementById("libraryExerciseCategory");

const categoryFilter =
    document.getElementById("categoryFilter");

const exerciseSearch =
    document.getElementById("exerciseSearch");



/* CATEGORY */

const addCategoryButton =
    document.getElementById("addCategoryButton");

const categoryModal =
    document.getElementById("categoryModal");

const saveCategoryButton =
    document.getElementById("saveCategoryButton");

const cancelCategoryButton =
    document.getElementById("cancelCategoryButton");



/* =========================
   DEFAULT CATEGORIES
========================= */

const defaultCategories = [
    "سینه",
    "پشت",
    "پا",
    "سرشانه",
    "بازو",
    "شکم",
    "هوازی",
    "کراس‌فیت",
    "سایر"
];



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


let exerciseLibrary =
    JSON.parse(
        localStorage.getItem("exerciseLibrary")
    ) || [];


let categories =
    JSON.parse(
        localStorage.getItem("exerciseCategories")
    );


if (!categories || categories.length === 0) {

    categories = [...defaultCategories];

    saveCategories();

}



let currentClientId = null;

let currentProgramId = null;

let currentDayId = null;

let programDays = [];


/* Editing state */

let editingClientId = null;

let editingLibraryExerciseId = null;



/* =========================
   NAVIGATION
========================= */

function showView(viewId) {

    document
        .querySelectorAll(".view")
        .forEach(
            function (view) {

                view.classList.remove(
                    "active"
                );

            }
        );


    document
        .getElementById(viewId)
        .classList.add(
            "active"
        );


    updateNavigation(
        viewId
    );

}



function updateNavigation(viewId) {

    [
        homeButton,
        clientsButton,
        exercisesButton
    ]
        .forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


    if (
        viewId === "dashboard"
    ) {

        homeButton.classList.add(
            "active"
        );

    }


    if (
        viewId === "exerciseLibraryView"
    ) {

        exercisesButton.classList.add(
            "active"
        );

    }

}



function showDashboard() {

    currentClientId = null;

    currentProgramId = null;

    currentDayId = null;


    renderClients();

    updateCounts();

    showView(
        "dashboard"
    );

}



homeButton.addEventListener(
    "click",
    showDashboard
);


clientsButton.addEventListener(
    "click",
    showDashboard
);


exercisesButton.addEventListener(
    "click",
    function () {

        renderExerciseLibrary();

        showView(
            "exerciseLibraryView"
        );

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


function saveExerciseLibrary() {

    localStorage.setItem(
        "exerciseLibrary",
        JSON.stringify(exerciseLibrary)
    );

}


function saveCategories() {

    localStorage.setItem(
        "exerciseCategories",
        JSON.stringify(categories)
    );

}



/* =========================
   CLIENT SEARCH
========================= */

clientSearch.addEventListener(
    "input",
    renderClients
);



/* =========================
   CLIENT MODAL
========================= */

addClientButton.addEventListener(
    "click",
    function () {

        editingClientId =
            null;


        clientModalTitle.textContent =
            "افزودن شاگرد";


        clearClientForm();


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


        editingClientId =
            null;


        clearClientForm();

    }
);



/* =========================
   SAVE / EDIT CLIENT
========================= */

saveClientButton.addEventListener(
    "click",
    function () {

        const name =
            document
                .getElementById(
                    "clientName"
                )
                .value
                .trim();


        const phone =
            document
                .getElementById(
                    "clientPhone"
                )
                .value
                .trim();


        const age =
            document
                .getElementById(
                    "clientAge"
                )
                .value;


        const weight =
            document
                .getElementById(
                    "clientWeight"
                )
                .value
                .trim();


        const goal =
            document
                .getElementById(
                    "clientGoal"
                )
                .value
                .trim();


        if (name === "") {

            alert(
                "نام شاگرد را وارد کنید"
            );

            return;

        }



        if (editingClientId) {

            const client =
                clients.find(
                    function (item) {

                        return (
                            item.id ===
                            editingClientId
                        );

                    }
                );


            if (!client) {
                return;
            }


            client.name =
                name;

            client.phone =
                phone;

            client.age =
                age;

            client.weight =
                weight;

            client.goal =
                goal;


            currentClientId =
                client.id;

        } else {

            const newClient = {

                id:
                    createId(),

                name:
                    name,

                phone:
                    phone,

                age:
                    age,

                weight:
                    weight,

                goal:
                    goal

            };


            clients.push(
                newClient
            );

        }



        saveClients();

        updateCounts();

        renderClients();


        clientModal.classList.remove(
            "show"
        );


        clearClientForm();


        if (editingClientId) {

            const id =
                editingClientId;


            editingClientId =
                null;


            openClientProfile(
                id
            );

        }

    }
);



/* =========================
   RENDER CLIENTS
========================= */

function renderClients() {

    const query =
        clientSearch.value
            .trim()
            .toLowerCase();


    const filteredClients =
        clients.filter(
            function (client) {

                const combined =
                    (
                        client.name +
                        " " +
                        client.phone +
                        " " +
                        client.goal
                    )
                        .toLowerCase();


                return combined.includes(
                    query
                );

            }
        );


    clientList.innerHTML =
        "";


    if (
        filteredClients.length === 0
    ) {

        clientList.innerHTML = `
            <div class="empty-box">
                شاگردی پیدا نشد.
            </div>
        `;

        return;

    }



    filteredClients.forEach(
        function (client) {

            const card =
                document.createElement(
                    "div"
                );


            card.classList.add(
                "client-card"
            );


            const clientPrograms =
                programs.filter(
                    function (program) {

                        return (
                            program.clientId ===
                            client.id
                        );

                    }
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
                    ${clientPrograms.length}
                    برنامه

                    |

                    وزن:
                    ${
                        escapeHtml(client.weight) ||
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

function openClientProfile(
    clientId
) {

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


    showView(
        "clientProfile"
    );

}



backButton.addEventListener(
    "click",
    showDashboard
);



/* =========================
   EDIT CLIENT
========================= */

editClientButton.addEventListener(
    "click",
    function () {

        const client =
            clients.find(
                function (item) {

                    return (
                        item.id ===
                        currentClientId
                    );

                }
            );


        if (!client) {
            return;
        }


        editingClientId =
            client.id;


        clientModalTitle.textContent =
            "ویرایش شاگرد";


        document.getElementById(
            "clientName"
        ).value =
            client.name;


        document.getElementById(
            "clientPhone"
        ).value =
            client.phone || "";


        document.getElementById(
            "clientAge"
        ).value =
            client.age || "";


        document.getElementById(
            "clientWeight"
        ).value =
            client.weight || "";


        document.getElementById(
            "clientGoal"
        ).value =
            client.goal || "";


        clientModal.classList.add(
            "show"
        );

    }
);



/* =========================
   DELETE CLIENT
========================= */

deleteClientButton.addEventListener(
    "click",
    function () {

        const client =
            clients.find(
                function (item) {

                    return (
                        item.id ===
                        currentClientId
                    );

                }
            );


        if (!client) {
            return;
        }


        const confirmed =
            confirm(
                "شاگرد «" +
                client.name +
                "» و تمام برنامه‌های او حذف شوند؟"
            );


        if (!confirmed) {
            return;
        }


        clients =
            clients.filter(
                function (item) {

                    return (
                        item.id !==
                        client.id
                    );

                }
            );


        programs =
            programs.filter(
                function (program) {

                    return (
                        program.clientId !==
                        client.id
                    );

                }
            );


        saveClients();

        savePrograms();

        updateCounts();


        showDashboard();

    }
);



/* =========================
   PROGRAM CREATION
========================= */

addProgramButton.addEventListener(
    "click",
    function () {

        programDays =
            [];


        clearProgramForm();

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



addDayButton.addEventListener(
    "click",
    function () {

        programDays.push(
            {

                id:
                    createId(),

                title:
                    "",

                exercises:
                    []

            }
        );


        renderProgramDays();

    }
);



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


        const newProgram = {

            id:
                createId(),

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

        updateCounts();

        renderPrograms();


        programModal.classList.remove(
            "show"
        );


        clearProgramForm();

    }
);



/* =========================
   PROGRAM LIST
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


    programList.innerHTML =
        "";


    if (
        clientPrograms.length === 0
    ) {

        programList.innerHTML = `
            <div class="empty-box">
                هنوز برنامه‌ای ثبت نشده است.
            </div>
        `;

        return;

    }


    clientPrograms.forEach(
        function (program) {

            const card =
                document.createElement(
                    "div"
                );


            card.classList.add(
                "program-card"
            );


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
                    تعداد جلسات:
                    ${
                        (
                            program.days ||
                            []
                        ).length
                    }
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

function openProgram(
    programId
) {

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


    showView(
        "programDetail"
    );

}



backToProfileButton.addEventListener(
    "click",
    function () {

        if (!currentClientId) {

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


    program.days =
        program.days || [];


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

            day.exercises =
                day.exercises || [];


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
                (
                    "جلسه " +
                    (index + 1)
                );


            const addButton =
                document.createElement(
                    "button"
                );


            addButton.classList.add(
                "primary-button",
                "small"
            );


            addButton.textContent =
                "+ حرکت";


            addButton.addEventListener(
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
                addButton
            );


            card.appendChild(
                header
            );


            if (
                day.exercises.length === 0
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

                        card.appendChild(
                            createExerciseCard(
                                exercise
                            )
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
   PRINT PROGRAM
========================= */

printProgramButton.addEventListener(
    "click",
    function () {

        buildPrintProgram();

        window.print();

    }
);



function buildPrintProgram() {

    const program =
        programs.find(
            function (item) {

                return (
                    item.id ===
                    currentProgramId
                );

            }
        );


    const client =
        clients.find(
            function (item) {

                return (
                    item.id ===
                    currentClientId
                );

            }
        );


    if (
        !program ||
        !client
    ) {

        return;

    }


    document.getElementById(
        "printClientName"
    ).textContent =
        client.name;


    document.getElementById(
        "printProgramTitle"
    ).textContent =
        program.title;


    document.getElementById(
        "printProgramGoal"
    ).textContent =
        program.goal || "-";


    document.getElementById(
        "printDate"
    ).textContent =
        new Date()
            .toLocaleDateString(
                "fa-IR"
            );


    const notesBox =
        document.getElementById(
            "printProgramNotes"
        );


    if (program.notes) {

        notesBox.textContent =
            "توضیحات کلی: " +
            program.notes;

    } else {

        notesBox.textContent =
            "";

    }


    const printDays =
        document.getElementById(
            "printDays"
        );


    printDays.innerHTML =
        "";


    (
        program.days ||
        []
    ).forEach(
        function (day, index) {

            const dayBlock =
                document.createElement(
                    "div"
                );


            dayBlock.classList.add(
                "print-day"
            );


            const dayTitle =
                day.title ||
                (
                    "جلسه " +
                    (index + 1)
                );


            let rows =
                "";


            (
                day.exercises ||
                []
            ).forEach(
                function (exercise) {

                    rows += `

                        <tr>

                            <td class="print-exercise-name">
                                ${escapeHtml(exercise.name)}
                            </td>

                            <td>
                                ${escapeHtml(exercise.sets) || "-"}
                            </td>

                            <td>
                                ${escapeHtml(exercise.reps) || "-"}
                            </td>

                            <td>
                                ${escapeHtml(exercise.weight) || "-"}
                            </td>

                            <td>
                                ${escapeHtml(exercise.rest) || "-"}
                            </td>

                            <td class="print-notes-column">
                                ${escapeHtml(exercise.notes) || ""}
                            </td>

                        </tr>

                    `;

                }
            );


            if (rows === "") {

                rows = `

                    <tr>

                        <td colspan="6">
                            حرکتی ثبت نشده است.
                        </td>

                    </tr>

                `;

            }


            dayBlock.innerHTML = `

                <div class="print-day-title">
                    ${escapeHtml(dayTitle)}
                </div>


                <table class="print-table">

                    <thead>

                        <tr>

                            <th>
                                حرکت
                            </th>

                            <th>
                                ست
                            </th>

                            <th>
                                تکرار
                            </th>

                            <th>
                                وزن
                            </th>

                            <th>
                                استراحت
                            </th>

                            <th>
                                توضیحات
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${rows}

                    </tbody>

                </table>

            `;


            printDays.appendChild(
                dayBlock
            );

        }
    );

}



/* =========================
   EXERCISE LIBRARY
========================= */

function renderExerciseLibrary() {

    renderCategoryOptions();


    const searchText =
        exerciseSearch.value
            .trim()
            .toLowerCase();


    const selectedCategory =
        categoryFilter.value;


    const filteredExercises =
        exerciseLibrary.filter(
            function (exercise) {

                const matchesSearch =
                    exercise.name
                        .toLowerCase()
                        .includes(
                            searchText
                        );


                const matchesCategory =
                    selectedCategory === "" ||
                    exercise.category ===
                        selectedCategory;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    exerciseLibraryList.innerHTML =
        "";


    if (
        filteredExercises.length === 0
    ) {

        exerciseLibraryList.innerHTML = `
            <div class="empty-box">
                حرکتی پیدا نشد.
            </div>
        `;

        return;

    }


    filteredExercises.forEach(
        function (exercise) {

            const card =
                document.createElement(
                    "div"
                );


            card.classList.add(
                "library-exercise-card"
            );


            card.innerHTML = `

                <div class="library-card-header">

                    <div>

                        <h3>
                            ${escapeHtml(exercise.name)}
                        </h3>

                        <span class="category-badge">
                            ${escapeHtml(exercise.category)}
                        </span>

                    </div>


                    <div class="library-card-actions">

                        <button
                            class="secondary-button small edit-library-button"
                        >
                            ویرایش
                        </button>

                        <button
                            class="danger-button small delete-library-button"
                        >
                            حذف
                        </button>

                    </div>

                </div>


                ${
                    exercise.note
                        ?
                        `
                        <p>
                            ${escapeHtml(exercise.note)}
                        </p>
                        `
                        :
                        ""
                }

            `;


            card
                .querySelector(
                    ".edit-library-button"
                )
                .addEventListener(
                    "click",
                    function () {

                        editLibraryExercise(
                            exercise.id
                        );

                    }
                );


            card
                .querySelector(
                    ".delete-library-button"
                )
                .addEventListener(
                    "click",
                    function () {

                        deleteLibraryExercise(
                            exercise.id
                        );

                    }
                );


            exerciseLibraryList.appendChild(
                card
            );

        }
    );

}



/* =========================
   LIBRARY MODAL
========================= */

function openNewLibraryExerciseModal() {

    editingLibraryExerciseId =
        null;


    libraryExerciseModalTitle.textContent =
        "حرکت جدید";


    document.getElementById(
        "libraryExerciseName"
    ).value =
        "";


    document.getElementById(
        "libraryExerciseNote"
    ).value =
        "";


    renderCategoryOptions();


    libraryExerciseModal.classList.add(
        "show"
    );

}



addLibraryExerciseButton.addEventListener(
    "click",
    openNewLibraryExerciseModal
);


dashboardAddExerciseButton.addEventListener(
    "click",
    openNewLibraryExerciseModal
);



cancelLibraryExerciseButton.addEventListener(
    "click",
    function () {

        libraryExerciseModal.classList.remove(
            "show"
        );


        editingLibraryExerciseId =
            null;

    }
);



/* =========================
   EDIT LIBRARY EXERCISE
========================= */

function editLibraryExercise(
    exerciseId
) {

    const exercise =
        exerciseLibrary.find(
            function (item) {

                return (
                    item.id ===
                    exerciseId
                );

            }
        );


    if (!exercise) {
        return;
    }


    editingLibraryExerciseId =
        exercise.id;


    libraryExerciseModalTitle.textContent =
        "ویرایش حرکت";


    renderCategoryOptions();


    document.getElementById(
        "libraryExerciseName"
    ).value =
        exercise.name;


    libraryExerciseCategory.value =
        exercise.category;


    document.getElementById(
        "libraryExerciseNote"
    ).value =
        exercise.note || "";


    libraryExerciseModal.classList.add(
        "show"
    );

}



/* =========================
   SAVE LIBRARY EXERCISE
========================= */

saveLibraryExerciseButton.addEventListener(
    "click",
    function () {

        const name =
            document
                .getElementById(
                    "libraryExerciseName"
                )
                .value
                .trim();


        const category =
            libraryExerciseCategory.value;


        const note =
            document
                .getElementById(
                    "libraryExerciseNote"
                )
                .value
                .trim();


        if (name === "") {

            alert(
                "نام حرکت را وارد کنید"
            );

            return;

        }


        if (
            editingLibraryExerciseId
        ) {

            const exercise =
                exerciseLibrary.find(
                    function (item) {

                        return (
                            item.id ===
                            editingLibraryExerciseId
                        );

                    }
                );


            if (!exercise) {
                return;
            }


            exercise.name =
                name;

            exercise.category =
                category || "سایر";

            exercise.note =
                note;

        } else {

            exerciseLibrary.push(
                {

                    id:
                        createId(),

                    name:
                        name,

                    category:
                        category ||
                        "سایر",

                    note:
                        note

                }
            );

        }


        saveExerciseLibrary();

        refreshProgramExerciseSelect();

        renderExerciseLibrary();

        updateCounts();


        libraryExerciseModal.classList.remove(
            "show"
        );


        editingLibraryExerciseId =
            null;

    }
);



/* =========================
   DELETE LIBRARY EXERCISE
========================= */

function deleteLibraryExercise(
    exerciseId
) {

    const exercise =
        exerciseLibrary.find(
            function (item) {

                return (
                    item.id ===
                    exerciseId
                );

            }
        );


    if (!exercise) {
        return;
    }


    const confirmed =
        confirm(
            "حرکت «" +
            exercise.name +
            "» از کتابخانه حذف شود؟"
        );


    if (!confirmed) {
        return;
    }


    exerciseLibrary =
        exerciseLibrary.filter(
            function (item) {

                return (
                    item.id !==
                    exerciseId
                );

            }
        );


    saveExerciseLibrary();

    refreshProgramExerciseSelect();

    renderExerciseLibrary();

    updateCounts();

}



/* =========================
   CATEGORIES
========================= */

function renderCategoryOptions() {

    const currentFilter =
        categoryFilter.value;


    libraryExerciseCategory.innerHTML =
        "";


    categoryFilter.innerHTML =
        `
        <option value="">
            همه دسته‌بندی‌ها
        </option>
        `;


    categories.forEach(
        function (category) {

            const option1 =
                document.createElement(
                    "option"
                );


            option1.value =
                category;


            option1.textContent =
                category;


            libraryExerciseCategory.appendChild(
                option1
            );


            const option2 =
                document.createElement(
                    "option"
                );


            option2.value =
                category;


            option2.textContent =
                category;


            categoryFilter.appendChild(
                option2
            );

        }
    );


    if (
        categories.includes(
            currentFilter
        )
    ) {

        categoryFilter.value =
            currentFilter;

    }

}



addCategoryButton.addEventListener(
    "click",
    function () {

        document.getElementById(
            "newCategoryName"
        ).value =
            "";


        categoryModal.classList.add(
            "show"
        );

    }
);



cancelCategoryButton.addEventListener(
    "click",
    function () {

        categoryModal.classList.remove(
            "show"
        );

    }
);



saveCategoryButton.addEventListener(
    "click",
    function () {

        const categoryName =
            document
                .getElementById(
                    "newCategoryName"
                )
                .value
                .trim();


        if (
            categoryName === ""
        ) {

            alert(
                "نام دسته‌بندی را وارد کنید"
            );

            return;

        }


        const exists =
            categories.some(
                function (category) {

                    return (
                        category.toLowerCase() ===
                        categoryName.toLowerCase()
                    );

                }
            );


        if (exists) {

            alert(
                "این دسته‌بندی قبلاً وجود دارد"
            );

            return;

        }


        categories.push(
            categoryName
        );


        saveCategories();

        renderCategoryOptions();


        categoryModal.classList.remove(
            "show"
        );

    }
);



exerciseSearch.addEventListener(
    "input",
    renderExerciseLibrary
);


categoryFilter.addEventListener(
    "change",
    renderExerciseLibrary
);



/* =========================
   PROGRAM EXERCISE SELECT
========================= */

function refreshProgramExerciseSelect() {

    libraryExerciseSelect.innerHTML =
        `

        <option value="">
            -- انتخاب از کتابخانه --
        </option>

        `;


    exerciseLibrary.forEach(
        function (exercise) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                exercise.id;


            option.textContent =
                exercise.name +
                " - " +
                exercise.category;


            libraryExerciseSelect.appendChild(
                option
            );

        }
    );

}



libraryExerciseSelect.addEventListener(
    "change",
    function () {

        const selectedExercise =
            exerciseLibrary.find(
                function (exercise) {

                    return (
                        exercise.id ===
                        libraryExerciseSelect.value
                    );

                }
            );


        if (!selectedExercise) {
            return;
        }


        document.getElementById(
            "exerciseName"
        ).value =
            selectedExercise.name;


        document.getElementById(
            "exerciseNotes"
        ).value =
            selectedExercise.note || "";

    }
);



/* =========================
   ADD EXERCISE TO PROGRAM
========================= */

function openExerciseModal(
    dayId
) {

    currentDayId =
        dayId;


    clearExerciseForm();

    refreshProgramExerciseSelect();


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


        day.exercises =
            day.exercises || [];


        const selectedLibraryExercise =
            exerciseLibrary.find(
                function (item) {

                    return (
                        item.id ===
                        libraryExerciseSelect.value
                    );

                }
            );


        day.exercises.push(
            {

                id:
                    createId(),

                libraryExerciseId:
                    selectedLibraryExercise
                        ?
                        selectedLibraryExercise.id
                        :
                        null,

                name:
                    name,

                category:
                    selectedLibraryExercise
                        ?
                        selectedLibraryExercise.category
                        :
                        "",

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

            }
        );


        savePrograms();

        renderProgramDetail();


        exerciseModal.classList.remove(
            "show"
        );


        currentDayId =
            null;


        clearExerciseForm();

    }
);



/* =========================
   EXERCISE CARD
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


    const details =
        [];


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
   COUNTS
========================= */

function updateCounts() {

    clientCount.textContent =
        clients.length;


    programCount.textContent =
        programs.length;


    exerciseCount.textContent =
        exerciseLibrary.length;

}



/* =========================
   CLEAR FORMS
========================= */

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



function clearExerciseForm() {

    libraryExerciseSelect.value =
        "";


    document.getElementById(
        "exerciseName"
    ).value =
        "";


    document.getElementById(
        "exerciseSets"
    ).value =
        "";


    document.getElementById(
        "exerciseReps"
    ).value =
        "";


    document.getElementById(
        "exerciseWeight"
    ).value =
        "";


    document.getElementById(
        "exerciseRest"
    ).value =
        "";


    document.getElementById(
        "exerciseNotes"
    ).value =
        "";

}



/* =========================
   ID
========================= */

function createId() {

    return (
        Date.now()
            .toString() +

        Math.random()
            .toString(16)
            .slice(2)
    );

}



/* =========================
   SAFE HTML
========================= */

function escapeHtml(
    value
) {

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
   START
========================= */

renderCategoryOptions();

refreshProgramExerciseSelect();

renderClients();

updateCounts();

showDashboard();