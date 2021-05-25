const Calc = (function () {
  const ready = () => {
    const $ = (el, bool) => bool ? document.querySelectorAll(el) : document.querySelector(el);
    const numberBtns = $('[data-number]', true);
    const operatorBtns = $('[data-operator]', true);
    const signBtn = $('[data-sign]');
    const percentBtn = $('[data-percent]');
    const equalsBtn = $('[data-equal]');
    const clearBtn = $('[data-clear]');
    const deleteBtn = $('[data-delete]');
    const history = $('[data-history]');
    const output = $('[data-output]');

    class Calculator {
      constructor(historyElement, outputElement) {
        this.history = historyElement;
        this.output = outputElement;
        this.clear();
      }

      // reset
      clear() {
        this.currentNumber = '';
        this.previousNumber = '';
        this.symbol = '';
        this.history.innerHTML = '';
        this.output.innerHTML = '0';

        this.negative = false;
      }

      delete() {
        if (this.currentNumber !== '')
          this.currentNumber = this.currentNumber.substr(0, this.currentNumber.length - 1);
        else if (this.symbol !== '')
          this.symbol = '';
        else if (this.previousNumber !== '')
          this.previousNumber = this.previousNumber.substr(0, this.previousNumber.length - 1);
        else return;

        this.display();
      }

      add(number) {
        if(number == '0' && this.currentNumber == '0') return;
        if(number == '.' && this.currentNumber.includes('.')) return;
        this.currentNumber += number;
      }

      sign() {
        if(!this.negative) {
          this.currentNumber = '-' + this.currentNumber;
          this.negative = true;
        } else {
          if(this.currentNumber == '-') this.currentNumber = '';
          else this.currentNumber = Math.abs(this.currentNumber);
          this.negative = false;
        }

        this.display();
      }

      percent() {
        if(this.currentNumber.includes('%') || this.currentNumber == '-' || this.currentNumber == '') return;
        this.currentNumber = this.currentNumber + '%';

        this.display();
      }

      operator(symbol) {
        if(this.currentNumber == '-' || this.previousNumber == '' && this.currentNumber == '') return;
        if(this.previousNumber == '') this.previousNumber = this.currentNumber;
        if(this.previousNumber !== '' && this.currentNumber !== '') this.operation();
        this.symbol = symbol;
        this.currentNumber = '';

        this.display();
      }

      operation() {
        if(this.currentNumber == '' || this.currentNumber == '-') return;
        let computation;
        let prev = parseFloat(this.previousNumber);
        let curr = parseFloat(this.currentNumber);

        if(this.previousNumber !== '' && this.previousNumber.toString().includes('%')) 
          prev = parseFloat(this.previousNumber) / 100;
        if(this.currentNumber !== '' && this.currentNumber.toString().includes('%')) 
          curr = parseFloat(this.currentNumber) / 100;

        switch (this.symbol) {
          case '÷':
            computation = prev / curr;
            break;
          case '×':
            computation = prev * curr;
            break;
          case '-':
            computation = prev - curr;
            break;
          case '+':
            computation = prev + curr;
            break;
          default:
            return;
        }

        if (this.currentNumber !== '' && this.previousNumber !== '')
          this.history.innerHTML = this.previousNumber + ' ' + this.symbol + ' ' + this.currentNumber + ' =';

        this.output.innerHTML = computation.toLocaleString('en-US');
        this.previousNumber = computation;
      }

      display() {
        this.output.innerHTML = this.previousNumber + this.symbol + this.currentNumber;
        if(this.output.innerHTML == '') this.output.innerHTML = '0';
      }

    }

    const calculator = new Calculator(history, output);

    numberBtns.forEach(btn => {
      btn.onclick = () => {
        calculator.add(btn.dataset.number);
        calculator.display();
      };
    })

    operatorBtns.forEach(btn => {
      btn.onclick = () => {
        calculator.operator(btn.dataset.operator);
      };
    })

    equalsBtn.onclick = () => calculator.operation();
    signBtn.onclick = () => calculator.sign();
    percentBtn.onclick = () => calculator.percent();
    deleteBtn.onclick = () => calculator.delete();
    clearBtn.onclick = () => calculator.clear();
  }

  return { ready }
})();

window.addEventListener('load', Calc.ready);