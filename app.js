const addClientButton = document.getElementById("addClientButton");

const clientModal = document.getElementById("clientModal");

const saveClientButton = document.getElementById("saveClientButton");

const dashboard = document.querySelector(".dashboard");

const clientProfile = document.getElementById("clientProfile");

const backButton = document.getElementById("backButton");

const cancelClientButton = document.getElementById("cancelClientButton");

const clientList = document.getElementById("clientList");


let clients = JSON.parse(localStorage.getItem("clients")) || [];

addClientButton.addEventListener("click", function () {
    clientModal.classList.add("show");
});


cancelClientButton.addEventListener("click", function () {
    clientModal.classList.remove("show");
});


saveClientButton.addEventListener("click", function () {

    const name = document.getElementById("clientName").value;

    const phone = document.getElementById("clientPhone").value;

    const age = document.getElementById("clientAge").value;

    const weight = document.getElementById("clientWeight").value;

    const goal = document.getElementById("clientGoal").value;


    if (name.trim() === "") {
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
   
    localStorage.setItem("clients", JSON.stringify(clients));

    renderClients();


    clientModal.classList.remove("show");


    clearForm();
});


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

        const card = document.createElement("div");

        card.classList.add("client-card");


        card.innerHTML = `
            <h3>${client.name}</h3>

            <p>
                ${client.goal || "بدون هدف ثبت‌شده"}
            </p>

            <p>
                وزن: ${client.weight || "-"}
                |
                سن: ${client.age || "-"}
            </p>
        `;


        clientList.appendChild(card);

    });

}


function clearForm() {

    document.getElementById("clientName").value = "";

    document.getElementById("clientPhone").value = "";

    document.getElementById("clientAge").value = "";

    document.getElementById("clientWeight").value = "";

    document.getElementById("clientGoal").value = "";

}
    
renderClients();