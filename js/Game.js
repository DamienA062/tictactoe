class Game {
    constructor() {
        this.playerInfos      = document.getElementById('player-infos');
        this.grid             = document.getElementById('grid');
        this.gridCases        = this.grid.querySelectorAll('div.grid-case');
        this.signsInTheGrid   = [];
        this.winnerMatrix     = new Array(this.gridCases.length).fill(null);
        this.isThereAWinner   = false;
        this.winner           = null;
        //this.whatGridShouldBe = 9;

        this.signs = {
            cross: 'X',
            circle: 'O'
        };

        this.init();
    }

    init() {
        this.buildTheGame();
    }


    buildTheGame() {
        let pickASign = 0;
        this._buildSignOrder();

        for (let i = 0; i < this.gridCases.length; i++) {

            this.gridCases[i].addEventListener('click', () => {

                if (this.isThereAWinner !== true) {
                    // if the case you want to click on is empty, then you can fill it
                    if (this.gridCases[i].dataset.filled === "") {
                        this.gridCases[i].innerText      = this.signsInTheGrid[pickASign];
                        this.gridCases[i].dataset.filled = "true";
                        this.winnerMatrix[i]             = this.signsInTheGrid[pickASign];

                        this._verifyIfThereIsAWinner();

                        if (this.isThereAWinner === true) {
                            this.winner = this.signsInTheGrid[pickASign];
                            this._showTheWinner(this.winner);
                            this._gameIsOver();
                        }

                        pickASign++;

                    } else {
                        alert('you can\'t perform this move');
                    }
                } else {
                    this._gameIsOver();
                }
            });
        }
    }

    /**
     * Build an array of signs which will be used to fill the grid
     * @private
     */
    _buildSignOrder() {
        const CROSS_KEY   = 0;
        const CIRCLE_KEY  = 1;
        const CROSS_SIGN  = Object.values(this.signs)[CROSS_KEY];
        const CIRCLE_SIGN = Object.values(this.signs)[CIRCLE_KEY];

        this.signsInTheGrid.push(this._randomizeFirstSign());

        for (let i = 0; i < this.gridCases.length - 1; i++) {
            this.signsInTheGrid[i] === CROSS_SIGN ? this.signsInTheGrid.push(CIRCLE_SIGN) : this.signsInTheGrid.push(CROSS_SIGN);
        }
    }

    /**
     * Randomize the sign of the first player
     * @returns {string}
     * @private
     */
    _randomizeFirstSign() {
        const KEYS         = Object.values(this.signs);
        const RANDOM_INDEX = Math.floor(Math.random() * KEYS.length);
        const SIGN         = KEYS[RANDOM_INDEX];

        return SIGN;
    }

    /**
     * Verify if there is a winner
     * @private
     */
    _verifyIfThereIsAWinner() {
        if (this.winnerMatrix[0] === this.winnerMatrix[1] && this.winnerMatrix[1] === this.winnerMatrix[2] && this.winnerMatrix[0] !== null
            || this.winnerMatrix[3] === this.winnerMatrix[4] && this.winnerMatrix[4] === this.winnerMatrix[5] && this.winnerMatrix[3] !== null
            || this.winnerMatrix[6] === this.winnerMatrix[7] && this.winnerMatrix[7] === this.winnerMatrix[8] && this.winnerMatrix[6] !== null
            || this.winnerMatrix[0] === this.winnerMatrix[3] && this.winnerMatrix[3] === this.winnerMatrix[6] && this.winnerMatrix[0] !== null
            || this.winnerMatrix[1] === this.winnerMatrix[4] && this.winnerMatrix[4] === this.winnerMatrix[7] && this.winnerMatrix[1] !== null
            || this.winnerMatrix[2] === this.winnerMatrix[5] && this.winnerMatrix[5] === this.winnerMatrix[8] && this.winnerMatrix[2] !== null
            || this.winnerMatrix[0] === this.winnerMatrix[4] && this.winnerMatrix[4] === this.winnerMatrix[8] && this.winnerMatrix[0] !== null
            || this.winnerMatrix[2] === this.winnerMatrix[4] && this.winnerMatrix[4] === this.winnerMatrix[6] && this.winnerMatrix[2] !== null) {
            this.isThereAWinner = true;
        }
    }

    /**
     * Show the winner in the h1 html element
     * @param winner
     * @private
     */
    _showTheWinner(winner) {
        this.playerInfos.innerText = `Le joueur '${winner}' a gagné la partie !`;
    }

    /**
     * TODO
     * @private
     */
    _gameIsOver() {

    }
}