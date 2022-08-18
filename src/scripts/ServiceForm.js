import { sendRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

export const ServiceForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="serviceDescription">Description</label>
            <input type="text" name="serviceDescription" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Address</label>
            <input type="text" name="serviceAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Budget</label>
            <input type="number" name="serviceBudget" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date needed</label>
            <input type="date" name="serviceDate" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
    `   
    return html
}

// Apply an event listener to the element that has an id of "container"
    // If a click event happens on the button with an id of "submitRequest"
        // Declare a variable to store the value of the input element (the user's input for that field) that has a name attribute equal to "serviceDescription"
        // Declare a variable to store the value of the input element (the user's input for that field) that has a name attribute equal to "serviceAddress"
        // Declare a variable to store the value of the input element (the user's input for that field) that has a name attribute equal to "serviceBudget"
        // Declare a variable to store the value of the input element (the user's input for that field) that has a name attribute equal to "serviceDate"
    // Declare a variable to store the user's input in an object
    // Pass that object as an argument into the sendRequest function, which will permanently post it to the API

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userDescription = document.querySelector("input[name='serviceDescription']").value
        const userAddress = document.querySelector("input[name='serviceAddress']").value
        const userBudget = document.querySelector("input[name='serviceBudget']").value
        const userDate = document.querySelector("input[name='serviceDate']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            description: userDescription,
            address: userAddress,
            budget: userBudget,
            neededBy: userDate,
            status: false,
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})



