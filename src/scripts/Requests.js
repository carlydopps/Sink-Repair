import { getRequests, getPlumbers, sendRequest, sendPlumber, saveCompletion, deleteRequest, getCompletions, updateStatus } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

// Define a function that will take a request object as a parameter and will create the list item html of the request description
    // Invoke the function to add a select element to choose which plumber completed the job
        // Invoke the plumbers getter function within the function to ensure it copies the version of the application database after the fetch has run
        // Use the .map() method to create a drop-down option element for each plumber in the application database
    // Add a delete button within each list item element
const requestHTML = (request) => {
    
    return `
    <li id="li--request">
        ${request.description}
        ${plumberOptions(request)}
        <button class="request__delete" id="request==${request.id}">
            Delete
        </button>
    </li>
    `
}

// Define a function that will take a request object as a parameter and will create the list item html of the completion description
    // Add an id to be able to format it differently than the request list items
const completionHTML = (request) => {
    return `
    <li id="li--completion">
        ${request.description}
    </li>
    `
}

const plumberOptions = (request) => {
    const plumbers = getPlumbers()
    return `
        <select class="plumbers" id="plumbers">
            <option value="">Choose</option>
            ${
                plumbers.map(
                    (plumber) => {
                        return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                    }
                ).join("")
            }
        </select>
    `
}

// Define and export a function that creates unordered list html for each object in the array of requests
// Use the .map() method to pass each request object to either the requestHTML function or the completionHTML depending on whether or not that request is found in the completions array in order to generate the list item element for that object
export const Requests = () => {
    const requests = getRequests()
    const completions = getCompletions()

    let html = `
        <ul>
            ${
                requests.map(request => {
                    const foundCompletion = completions.find(completion => completion.requestId === request.id)
                    if (foundCompletion) {
                        return completionHTML(request)
                    } else {
                        return requestHTML(request)
                    }
                }).join("")
            }
        </ul>
    `
    return html
}


// Create an event listener that listens for a change event for the plumbers drop-down list
    // If a plumber is selected
        // Create an object to store the completion report information
        // Invoke the function to store the completion report in the API
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const requests = getRequests()
            const foundRequest = requests.find(request => request.id === parseInt(requestId))

            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: new Date(),
             }

            // Invoke the sendPlumber function that sends a POST request to the API
            saveCompletion(completion)

            // Update request object

            const updatedRequest = {...foundRequest}
            updatedRequest.status = true
            deleteRequest(foundRequest.id)
            sendRequest(updatedRequest)
        }
    }
)