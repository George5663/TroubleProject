//Importing Players from Player File
const {player1, player2, player3, player4} = require('./Players.js')

const players = [player1, player2, player3, player4]

const {BoardSpace} = require('./Board.js')

//Creating 28 Spaces on board
var space = new Array(28)
for(var i = 0; i < 28; i++)
{
    space[i] = new BoardSpace();
}

let gameOver = false;

function RollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

function fiftyFiftyChance()
{
    return random() % 1;
}

//Loop until game finishes
while(gameOver == false)
{
    //Each players turn
    for(const currentPlayer in players){
        var diceNumber = RollDice();
        console.log(players[currentPlayer].playerColour + " just rolled a " + diceNumber);
        if(diceNumber == 6)
        {
            if(players[currentPlayer].tokenOnePosistion == 0)
            {
                //Move First token out if you roll a 6
                players[currentPlayer].tokenOnePosistion = players[currentPlayer].outOfHomeSpace;
                console.log(players[currentPlayer].playerColour + " just moved out of home!!!");

                //Roll Again
                diceNumber = RollDice();
                console.log(players[currentPlayer].playerColour + " just rolled a " + diceNumber);
            }
        }

        if(players[currentPlayer].tokenOnePosistion != 0){
            if((players[currentPlayer].tokenOneSpacesMoved += diceNumber) >= 28)
            {
                console.log("GAMES OVER!!!! " + players[currentPlayer].playerColour + " WON!!!!!");
                gameOver = true;
                break;
            }

            if((players[currentPlayer].tokenOnePosistion += diceNumber) > 28)
            {
                console.log('Retracting 28');
                players[currentPlayer].tokenOnePosistion -= 28;
            }

            console.log(players[currentPlayer].playerColour + "'s token just moved to position: " + players[currentPlayer].tokenOnePosistion);
        }
    }
}