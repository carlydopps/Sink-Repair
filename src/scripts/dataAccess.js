const mainContainer = document.querySelector("#container")

// STORING TRANSIENT DATA ----------------------------------------

// Declare a variable to store the application state in an object(formerly database object)
const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}

const API = "http://localhost:3000"

// Define and export a function that stores the service request data in the application state
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

// Define and export a function that stores the plumber data in the application state
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (plumberData) => {
                // Store the external state in application state                
                applicationState.plumbers = plumberData
            }
        )
}

// Define and export a function that stores the completion report data in the application state
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completionReport) => {
                // Store the external state in application state
                applicationState.completions = completionReport
            }
        )
}

// GETTING THE DATA --------------------------------

// Use the .sort() method to sort the array of request objects in the database by their status
// Designate a variable to reference the first object in the comparison (a) and a variable to reference the second object in the comparison (b)
// We need to compare the status of each object
    // true is greater than false, so if the greater than equality check returns true, we know the status of a is greater than the status of b, which means a is true and b is false
    // We want the incomplete requests higher (we want requests with a status of false higher), so we want to send the a object to the end with 1 (think of like an index) if the greater than comparison evaluates to true
    // Can also do return a.status - b.status
export const getRequests = () => {
    const sortedArray = applicationState.requests.sort((a, b) => (a.status === b.status) ? 0: (a.status > b.status) ? 1 : -1)
    return sortedArray
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}))
}



// STORING PERMANENT DATA + DISPATCH  ----------------------------

// Define and export a function that takes a request object as a parameter and sends a post request to the API (send a requet to store the data permanently)
    // Create an object with properties method, headers, body
        // Set the value of the method property to "POST" to say "Hey Api, create something new."
        // Set the value of the headers property an object
        // Set the value of the body to JSON.stringify(requestObj) - the requestObj comes from ServiceForm.js when the user's input are saved into an object and passed as the argument for the sendRequest function
    // Return a fetch call that converts the data to json then dispatches a custom event named "stateChanged" to the mainContainer element
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
    // Return the result of calling fetch on the api link and running the .then() methods on the fetchOptions object defined above
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const sendPlumber = (completionReport) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completionReport)
    }
    // Return the result of calling fetch on the api link and running the .then() methods on the fetchOptions object defined above
    return fetch(`${API}/plumbers`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const saveCompletion = (completionReport) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completionReport)
    }
    // Return the result of calling fetch on the api link and running the .then() methods on the fetchOptions object defined above
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// DELETING DATA ----------------------------------------------

// Define and export a function that sends a delete request to the API
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}


