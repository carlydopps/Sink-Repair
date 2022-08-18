import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests, fetchPlumbers, fetchCompletions } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

// The render function will call fetchRequests function, which will pass the converted service request data into the local database (will store the external state in the application state for service requests)
    // Then it will invoke the fetchPlumbers function, which will pass the converted plumber data into the local database
    // Then it will add the return value of SinkRepair function to the inner html of the element with id of "container"
export const render = () => {
    fetchRequests()
        .then(
            () => fetchPlumbers())
        .then(
            () => fetchCompletions())
        .then(
            ()=> {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()

// CHANGING THE STATE ----------------------------------------------

// Create an event listener for the mainContainer to listen for when the custom stateChanged event is dispatched (occurs within sendRequestfunction in dataAccess.js after data is permanently posted to json database)
// Once it's dispatched, call the render function to render all html again and include the new orders in the Service Requests list
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

// DELETING A REQUEST ----------------------------------------------

// Create an event listener for the mainContainer to listen for when the delete button is clicked for any of the requests
    // Pass the id of the click event element into the deleteRequest function to remove that request from the API
        // This will also trigger the "stateChanged" custom event, which will render all html again
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request==")) {
        const [,requestId] = click.target.id.split("==")
        deleteRequest(parseInt(requestId))
    }
})