const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const stopButton = document.getElementById('stop-button')
const textInput = document.getElementById('text')
const speedInput = document.getElementById('speed')

playButton.addEventListener('click', () => {
    /* play value inside textInput */
    playText(textInput.value)
})
pauseButton.addEventListener('click', pauseText)
stopButton.addEventListener('click', stopText)

function playText(text) {
    if (speechSynthesis.pause && speechSynthesis.speaking) {
        return speechSynthesis.resume()
    }
    /* SpeechSynthesisUtterance is web speech API */
    const utterance = new SpeechSynthesisUtterance(text)
    /* speed of speaking */
    utterance.rate = speedInput.value || 1
    /* enable back text input area after event end */
    utterance.addEventListener('end', () => {
        textInput.disable = false
    })
    /* disable text input area when this function run *comp speak */
    textInput.disable = true
    speechSynthesis.speak(utterance)
}

function pauseText() {
    if (speechSynthesis.speaking) speechSynthesis.pause()
}

function stopButton() {
    speechSynthesis.resume()
    speechSynthesis.cancel()
}