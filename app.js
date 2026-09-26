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


const dashboard =
    document.querySelector(".dashboard");

const clientProfile =
    document.getElementById("clientProfile");

const backButton =
    document.getElementById("backButton");



/*
    Load clients from Chrome.

    If there are no saved clients,
    use an empty array.
*/
let clients =
    JSON.parse(localStorage.getItem("clients")) || [];



/* Open Add Client Modal */

addClientButton.addEventListener("click", function () {

    clientModal.classList.add("show");

});



/* Close Modal */

cancelClientButton.addEventListener("click", function () {

    clientModal.classList.remove("show");

});



/* Save Client */

saveClientButton.addEventListener("click", function () {

    const name =
        document.getElementById("clientName").value.trim();

    const phone =
        document.getElementById("clientPhone").value.trim();

    const age =
        document.getElementById("clientAge").value;

    const weight =
        document.getElementById("clientWeight").value.trim();

    const goal =
        document.getElementById("clientGoal").value.trim();



    if (name === "") {

        alert("نام شاگرد را وارد کنید");

        return;

    }



    const newClient = {

        name: name,

        phone: phone,

        age: age,

        weight: weight,

        goal: goal

    };



    clients.push(newClient);



    saveClients();



    renderClients();



    clientModal.classList.remove("show");



    clearForm();

});



/*
    Save the clients array
    inside Chrome.
*/

function saveClients() {

    localStorage.setItem(
        "clients",
        JSON.stringify(clients)
    );

}



/*
    Display all clients
    on the dashboard.
*/

function renderClients() {

    clientCount.textContent = clients.length;



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



/*
    Open a client's profile.
*/

function openClientProfile(client) {

    dashboard.style.display = "none";

    clientProfile.style.display = "block";



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

}



/* Back to Dashboard */

backButton.addEventListener(
    "click",
    function () {

        clientProfile.style.display = "none";

        dashboard.style.display = "block";

    }
);



/* Clear Add Client Form */

function clearForm() {

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



/*
    Run once when the app opens.
*/

renderClients();