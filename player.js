const createPlayerForm = document.getElementById("createPlayerForm") ;
const updateForm = document.getElementById("updateForm");
const readDiv = document.getElementById("readDiv");
// var updateID = 0;
let updateTrue=false;

createPlayerForm.addEventListener('submit', function(){
    console.log("This is a message from JavaScript")
    event.preventDefault();
    console.log(this.name);
    const data = {
        name: this.name.value,
        age: this.age.value,
        position: this.position.value,
        goals: this.goals.value
    }
    fetch("http://localhost:8085/create",{ //make request
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type':"application/json"
        } //open and send
    }).then(response => {       //receive response
        return response.json(); //Converts response body to json
    }).then(data => { //json data from previous .then()
        getAll();
        this.reset();
    }).catch(error => console.log(error));
});

    function getAll(){
        fetch("http://localhost:8085/getlist")
            .then(response => response.json())
            .then(Players =>{
                readDiv.innerHTML = " ";
                Players.forEach(player => {
                    console.log(player);

                    const card = document.createElement("div")
                    card.className="card";
                    readDiv.appendChild(card);

                    const cardBody = document.createElement("div")
                    cardBody.className="card-body";
                    readDiv.appendChild(cardBody);

                    const title = document.createElement("h5");
                    title.className = "card-title";
                    title.innerText = "Name: " + player.name;
                    cardBody.appendChild(title);       

                    const age = document.createElement("h5");
                    age.className = "card-body";
                    age.innerText = "Age: " + player.age;
                    cardBody.appendChild(age);   

                    const position = document.createElement("h5");
                    position.className="card-body"
                    position.innerText="Position: " + player.position;
                    cardBody.appendChild(position);

                    const goals= document.createElement("h5");
                    goals.className="card-body"
                    goals.innerText="Previous Goals Scored: " + player.goals;
                    cardBody.appendChild(goals);

                    const deleteButton = document.createElement("a");
                    deleteButton.className = "card-link";
                    deleteButton.innerText = "Delete";
                    deleteButton.addEventListener("click", function(){
                        deletePlayer(player.id)
                    })
                    cardBody.appendChild(deleteButton);

                    const updateButton = document.createElement("a");
                    updateButton.className= "card-link";
                    updateButton.innerText="Update";
                    updateButton.addEventListener("click", function() {
                        updatePlayer(player.id)
                    })
                    cardBody.appendChild(updateButton);
                });
            }).catch(error => console.error(error));
    }
getAll();

function deletePlayer(id){
    fetch("http://localhost:8085/remove/" +id, {
        method: "DELETE"
    }).then(response => {
            console.log(response);
            getAll();
        }).catch(error => console.error(error));
}

// // Update
// function updatePlayer(id){
// updateForm.addEventListener('submit', function (event){
//     event.preventDefault();
//     // console.log(this.name.value);
//     console.log(this.id.value);
//     const data = {
//         id: this.id.value,
//         name: this.name.value,
//         age: this.age.value,
//         position: this.position.value,
//         goals: this.goals.value
//     }
//     console.log(data)

//     fetch("http://localhost:8085/update" + id,{ //make request
//         method: "PUT",
//         body: JSON.stringify(data),
//         headers: {
//          'Content-Type':"application/json"
//         } //open and send
//     }).then(response => {       //receive response
//         return response.json(); //Converts response body to json
//     }).then(data => { //json data from previous .then()
//         getAll();
//         this.reset();
//         console.log(data);
//     }).catch(error => console.log(error));
// });
// }

    async function PlayerInformation(){
        updateForm.addEventListener('submit', function (event){
            event.preventDefault();
            // console.log(this.name.value);
            console.log(this.id.value);
            // let id= updateID;
            const data = {
            id: this.id.value,
            name: this.name.value,
            age: this.age.value,
            position: this.position.value,
            goals: this.goals.value
            }
        });
    }

    async function updatePlayer(id){
        data = PlayerInformation();
        await fetch("http://localhost:8085/update?id=" + id,{ //make request
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
             'Content-Type':"application/json"
            } //open and send
        }).then(response => {       //receive response
            return response.json(); //Converts response body to json
        }).then(data => { //json data from previous .then()
            getAll();
            this.reset;
            console.log(data);
        }).catch(error => console.log(error));

    }