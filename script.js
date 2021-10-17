class Calculator {
    constructor (previousText, currentText) {
        this.previousText = previousText
        this.currentText = currentText
        this.clear()
    }

    // clear the calculator's screen
    clear() {
        this.current = ''
        this.previous = ''
        this.operation = undefined
    }

    // delete the last digit of the number
    delete() {

    }

    // add a number to the screen
    addNumber(number) {
        // stop the function if there's already a . on the screen
        if (number == '.' && this.current.includes('.')) return
        // convert to string to avoid number addition
        this.current = this.current.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.current == '') return
        if (this.previous != '') {
            this.computeValue()
        }
        this.operation = operation
        this.previous = this.current.toString() + ' ' + operation
        this.current = ''
    }

    computeValue() {

    }

    updateScreen() {
        this.currentText.innerText = this.current
        this.previousText.innerText = this.previous
    }

}


// the data attribute must be placed in []
const numButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-operation]')
const eqButton = document.querySelector('[data-equals]')
const delButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousText = document.querySelector('[data-previous]')
const currentText = document.querySelector('[data-current]')

const calculator = new Calculator(previousText, currentText)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText)
        calculator.updateScreen()
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateScreen()
    })
})

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateScreen()
})