// enter an API KEY in the variable below
const API_KEY = ""
const submitButton = document.querySelector("#submit")
const outputElement = document.querySelector("#output")
const inputElement = document.querySelector("input")
const historyElement = document.querySelector(".history")
const buttonElement = document.querySelector("button")


function changeInput(value){
    const inputElement = document.querySelector('input')
    inputElement.value(value)
}
async function getMessage(){
    // console.log("input submitted")
    const options = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement}],
            max_tokens: 100
        })  
    }
    try{
        const response = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await response.json()
        console.log(data)
        outputElement.textContent = data.choices[0].message.content
        if (data.choices[0].message.content && inputElement.value){
            const pElement = document.createElement("p")
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    }
    catch (error){
        console.error(error)
    }
}

submitButton.addEventListener('click', getMessage)

function clearInput(){
    inputElement.value = ""
    console.log("input cleared, this button is for new chat")
}
buttonElement.addEventListener('click', clearInput)
