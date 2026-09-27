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


/* Client modal */

const addClientButton =
    document.getElementById("addClientButton");

const clientModal =
    document.getElementById("clientModal");

const saveClientButton =
    document.getElementById("saveClientButton");

const cancelClientButton =
    document.getElementById("cancelClientButton");


/* Client profile */

const backButton =
    document.getElementById("backButton");

const addProgramButton =
    document.getElementById("addProgramButton");

const programList =
    document.getElementById("programList");


/* Program */

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


/* Program detail */

const backToProfileButton =
    document.getElementById("backToProfileButton");

const programDaysList =
    document.getElementById("programDaysList");


/* Add exercise to session */

const exerciseModal =
    document.getElementById("exerciseModal");

const saveExerciseButton =
    document.getElementById("saveExerciseButton");

const cancelExerciseButton =
    document.getElementById("cancelExerciseButton");

const libraryExerciseSelect =
    document.getElementById("libraryExerciseSelect");


/* Exercise library */

const dashboardAddExerciseButton =
    document.getElementById("dashboardAddExerciseButton");

const addLibraryExerciseButton =
    document.getElementById("addLibraryExerciseButton");

const libraryExerciseModal =
    document.getElementById("libraryExerciseModal");

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


/* Categories */

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


let currentClientId =
    null;


let currentProgramId =
    null;


let currentDayId =
    null;


let programDays =
    [];



/* =========================
   NAVIGATION
========================= */

function showView(viewId) {

    const views =
        document.querySelectorAll(".view");


    views.forEach(
        function (view) {

            view.classList.remove("active");

        }
    );


    document
        .getElementById(viewId)
        .classList.add("active");


    updateNavigation(viewId);

}



function updateNavigation(viewId) {

    const navButtons = [
        homeButton,
        clientsButton,
        exercisesButton
    ];


    navButtons.forEach(
        function (button) {

            button.classList.remove("active");

        }
    );


    if (viewId === "dashboard") {

        homeButton.classList.add("active");

    }


    if (viewId === "exerciseLibraryView") {

        exercisesButton.classList.add("active");

    }

}



function showDashboard() {

    currentClientId =
        null;

    currentProgramId =
        null;

    currentDayId =
        null;


    renderClients();

    updateCounts();

    showView("dashboard");

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
   CLIENT LIST
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
                document.createElement("div");


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
   PROGRAM DAYS
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



function renderProgramDays() {

    daysContainer.innerHTML =
        "";


    programDays.forEach(
        function (day, index) {

            const row =
                document.createElement("div");


            row.classList.add(
                "day-row"
            );


            const input =
                document.createElement("input");


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
                document.createElement("div");


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
   EXERCISE LIBRARY VIEW
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
                        .includes(searchText);


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
                document.createElement("div");


            card.classList.add(
                "library-exercise-card"
            );


            card.innerHTML = `

                <h3>
                    ${escapeHtml(exercise.name)}
                </h3>

                <span class="category-badge">
                    ${escapeHtml(exercise.category)}
                </span>

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


            exerciseLibraryList.appendChild(
                card
            );

        }
    );

}



/* =========================
   LIBRARY MODAL
========================= */

function openLibraryExerciseModal() {

    renderCategoryOptions();


    document.getElementById(
        "libraryExerciseName"
    ).value = "";


    document.getElementById(
        "libraryExerciseNote"
    ).value = "";


    libraryExerciseModal.classList.add(
        "show"
    );

}



addLibraryExerciseButton.addEventListener(
    "click",
    openLibraryExerciseModal
);


dashboardAddExerciseButton.addEventListener(
    "click",
    openLibraryExerciseModal
);



cancelLibraryExerciseButton.addEventListener(
    "click",
    function () {

        libraryExerciseModal.classList.remove(
            "show"
        );

    }
);



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


        const newExercise = {

            id: createId(),

            name: name,

            category:
                category || "سایر",

            note: note

        };


        exerciseLibrary.push(
            newExercise
        );


        saveExerciseLibrary();


        renderExerciseLibrary();

        updateCounts();

        refreshProgramExerciseSelect();


        libraryExerciseModal.classList.remove(
            "show"
        );

    }
);



/* =========================
   CATEGORIES
========================= */

function renderCategoryOptions() {

    libraryExerciseCategory.innerHTML =
        "";


    categoryFilter.innerHTML = `
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

}



addCategoryButton.addEventListener(
    "click",
    function () {

        document.getElementById(
            "newCategoryName"
        ).value = "";


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


        if (categoryName === "") {

            alert(
                "نام دسته‌بندی را وارد کنید"
            );

            return;

        }


        const alreadyExists =
            categories.some(
                function (category) {

                    return (
                        category.toLowerCase() ===
                        categoryName.toLowerCase()
                    );

                }
            );


        if (alreadyExists) {

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

    libraryExerciseSelect.innerHTML = `

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
   ADD EXERCISE TO SESSION
========================= */

function openExerciseModal(dayId) {

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


        if (!day.exercises) {

            day.exercises =
                [];

        }


        const selectedLibraryExercise =
            exerciseLibrary.find(
                function (item) {

                    return (
                        item.id ===
                        libraryExerciseSelect.value
                    );

                }
            );


        const newExercise = {

            id:
                createId(),

            libraryExerciseId:
                selectedLibraryExercise
                    ? selectedLibraryExercise.id
                    : null,

            name:
                name,

            category:
                selectedLibraryExercise
                    ? selectedLibraryExercise.category
                    : "",

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



function clearExerciseForm() {

    libraryExerciseSelect.value =
        "";


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
   ID
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
   SAFE HTML
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

renderCategoryOptions();

refreshProgramExerciseSelect();

renderClients();

updateCounts();

showDashboard();