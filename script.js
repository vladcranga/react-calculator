class Calculator {
    constructor (previousText, currentText) {
        this.previousText = previousText
        this.currentText = currentText
    }

    // clear the calculator's screen
    clear() {

    }

    // delete the last digit of the number
    delete() {

    }

    // add a number to the screen
    addNumber(number) {

    }

    chooseOperation(operation) {

    }

    computeValue() {

    }

    updateScreen() {

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