const button = document.querySelector("button")
const error = document.getElementById("error")
const results = document.querySelector(".results")

window.addEventListener("DOMContentLoaded", () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  if (typeof SpeechRecognition === "undefined") {
    button.remove()
    error.classList.remove("hidden")

  } else {
    let listening = false
    const recognition = new SpeechRecognition()

    const start = () => {
      recognition.start()
      toggleListenOnStyling()
    }

    const stop = () => {
      recognition.stop()
      toggleListenOffStyling()
    }

    const onResult = event => {
      results.innerText = ''

      for (const res of event.results) {
        // const text = document.createTextNode(res[0].transcript)
        // const p = document.createElement("p")
        // p.appendChild(text)
        // results.appendChild(p)

        results.innerText += res[0].transcript
      }
    }

    recognition.continuous = true
    recognition.interimResults = true
    recognition.addEventListener("result", onResult)

    button.addEventListener("click", () => {
      listening ? stop() : start()
      listening = !listening
    })
  } // end if-else

}) // end event listener

function toggleListenOnStyling() {
  button.textContent = "Stop listening"
  button.classList.remove("btn-dark")
  button.classList.add("btn-danger")
}

function toggleListenOffStyling() {
  button.textContent = "Start listening"
  button.classList.remove("btn-danger")
  button.classList.add("btn-dark")
}
