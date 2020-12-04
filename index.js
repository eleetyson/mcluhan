const button = document.querySelector(".btn-outline-success")
const copyBtn = document.querySelector(".btn-outline-dark")
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


  copyBtn.addEventListener("click", () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(results.innerText)
    }
  })
}) // end event listener

function toggleListenOnStyling() {
  button.textContent = "Stop Listening"
  button.classList.remove("btn-outline-success")
  button.classList.add("btn-danger")
}

function toggleListenOffStyling() {
  button.textContent = "Start Listening"
  button.classList.remove("btn-danger")
  button.classList.add("btn-outline-success")
}
