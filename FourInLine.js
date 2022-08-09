
class FourInLine {
    constructor(board_selector, reset_selector, message_el_selector) {
        this.template = document.querySelector('.template');
        this.symbol = 'x';

        this.board = document.querySelector(board_selector);
        this.reset_btn = document.querySelector(reset_selector);
        this.message_element = document.querySelector(message_el_selector);

        this.#addAllCells();

        const obj = this;

        this.reset_btn.onclick = function (event) {
            event.preventDefault();
            obj.#resetHandler();
        };
    }

    #addAllCells() {
        const obj = this;
        let i = 99;
        for (let r = 9; r >= 0; r--) {
            for (let c = 9; c >= 0; c--) {
                const new_cell = this.template.cloneNode(true);
                new_cell.classList.remove('template');

                new_cell.onclick = function (event) {
                    event.preventDefault();
                    if (this.textContent != '') return;
                    console.log(obj.#getCellValue(r + 1, c));
                    if (r != 9 && !obj.#getCellValue(r + 1, c)) return;

                    this.textContent = obj.symbol;
                    if (obj.#checkWinner(r, c)) {
                        obj.displayMessage('Winner is ' + obj.symbol + '!');
                    }
                    obj.symbol = (obj.symbol == 'x') ? 'o' : 'x';
                }

                this.board.prepend(new_cell);
            }
        }
    }

    #getCellValue(r, c) {
        if (r > 9 || r < 0 || c > 9 || c < 0) return '';
        let id = '' + r + c;
        id = Number(id);

        return this.board.children[id].textContent;
    }

    #resetHandler() {
        for (let cell of this.board.children) {
            cell.textContent = '';
            this.symbol = 'x';
            this.displayMessage('');
        }
    }

    #checkWinner(r, c) {
        let counter = 0;
        counter += this.#countMatches(r, c, 0, -1);
        counter += this.#countMatches(r, c, 0, 1);
        if (counter >= 3) {
            return true;
        }


        return false;
    }


    #countMatches(r, c, y_diff, x_diff) {
        let count_matches = 0;
        for (let i = 0; i <= 2; i++) {
            c += x_diff;
            if (this.#getCellValue(r, c) != this.symbol) {
                return count_matches;
            }
            count_matches++;
        }
        return count_matches;
    }

    displayMessage(message) {
        this.message_element.textContent = message;
    }
}