const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const stopButton = document.getElementById('stop-button')
const textInput = document.getElementById('text')
const speedInput = document.getElementById('speed')
let currentCharacter

playButton.addEventListener('click', () => {
    /* play value inside textInput */
    playText(textInput.value)
})
/* pauseText & stopText is from function(), click is event */
pauseButton.addEventListener('click', pauseText)
stopButton.addEventListener('click', stopText)
/* when change speed, stop then resume text speaking */
speedInput.addEventListener('input', () => {
    stopText()
    playText(utterance.text.substring(currentCharacter))
})

/* SpeechSynthesisUtterance is web speech API */
const utterance = new SpeechSynthesisUtterance()

/* enable back text input area after event end */
utterance.addEventListener('end', () => {
    textInput.disable = false
})

/* charIndex is speechSynthesis property, track index each character, when chance speed text speak can restart at current character */
utterance.addEventListener('boundary', e => {
    currentCharacter = e.charIndex
})



/* id=text from html */
function playText(text) {
    /* pause & speaking is speechSynthesis property */
    if (speechSynthesis.pause && speechSynthesis.speaking) {
        return speechSynthesis.resume()
    }
    /* if double+ press the pauseButton, pretend nothing happen */
    if (speechSynthesis.speaking) return
    utterance.text = text
    /* speed of speaking */
    utterance.rate = speedInput.value || 1
    /* disable text input area when this function run *comp speak */
    textInput.disable = true
    speechSynthesis.speak(utterance)
}

function pauseText() {
    if (speechSynthesis.speaking) speechSynthesis.pause()
}

function stopText() {
    speechSynthesis.resume()
    speechSynthesis.cancel()
}