//Importing Players from Player File
const {player1, player2, player3, player4} = require('./Players.js')

const players = [player1, player2, player3, player4]

var boardSpaces = require('./Board.js');

//Creating spaces 1-28 (+0)
var spaces = new Array(29)
for(var i = 0; i < spaces.length; i++)
{
    spaces[i] = new boardSpaces(false, null);
}

let gameOver = false;

function RollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

//Loop until game finishes
while(gameOver == false)
{
    //Each players turn
    for(const currentPlayer in players){
        //Breaking out of turn cycle if game is over
        if(gameOver == true)
        {
            break;
        }
        var diceNumber = RollDice();
        console.log(players[currentPlayer].playerColour + " just rolled a " + diceNumber);
        if(diceNumber == 6)
        {
            if(players[currentPlayer].tokenOne.tokenOnePosistion == 0)
            {
                //Move First token out if you roll a 6
                players[currentPlayer].tokenOne.tokenOnePosistion = players[currentPlayer].outOfHomeSpace;
                console.log(players[currentPlayer].tokenOne.name + " just moved out of home!!!");
                checkIfInhabited(currentPlayer);
            }
            else
            {
                movePiece(currentPlayer, diceNumber);
            }
            //Roll Again
            while(diceNumber == 6)
            {
                if(gameOver == false)
                {
                    console.log(players[currentPlayer].playerColour + " gets to roll again since he rolled a 6!");
                    diceNumber = RollDice();
                    console.log(players[currentPlayer].playerColour + " just rolled a " + diceNumber);
                    movePiece(currentPlayer, diceNumber);
                }
            }
            
        }
        else
        {
            movePiece(currentPlayer, diceNumber);
        }
    }
}

function movePiece(currentPlayer, diceNumber)
{
    if(players[currentPlayer].tokenOne.tokenOnePosistion != 0){
        if((players[currentPlayer].tokenOne.tokenOneSpacesMoved += diceNumber) == 28)
        {
            console.log("GAMES OVER!!!! " + players[currentPlayer].playerColour + " WON!!!!!");
            gameOver = true;
        }
        else if(players[currentPlayer].tokenOne.tokenOneSpacesMoved > 28)
        {
            console.log(players[currentPlayer].tokenOne.name + " just rolled " + (players[currentPlayer].tokenOne.tokenOneSpacesMoved-28) + " over the finish, and thus stays put");
            players[currentPlayer].tokenOne.tokenOneSpacesMoved -= diceNumber;
        }
        else
        {
            //Moving off space
            spaces[players[currentPlayer].tokenOne.tokenOnePosistion].isInhabited = false;
            spaces[players[currentPlayer].tokenOne.tokenOnePosistion].inhabitedBy = null;

            //Going around the board
            players[currentPlayer].tokenOne.tokenOnePosistion += diceNumber;

            //Subtracting 28 so you can go around the entire board and start back at space 1
            if(players[currentPlayer].tokenOne.tokenOnePosistion > 28)
            {
                console.log('Retracting 28');
                players[currentPlayer].tokenOne.tokenOnePosistion -= 28;
            }

            //Current players moved token posistion
            console.log(players[currentPlayer].tokenOne.name + " just moved to position: " + players[currentPlayer].tokenOne.tokenOnePosistion);

            checkIfInhabited(currentPlayer);

            spaces[players[currentPlayer].tokenOne.tokenOnePosistion].isInhabited = true;
            spaces[players[currentPlayer].tokenOne.tokenOnePosistion].inhabitedBy = players[currentPlayer].tokenOne;
        }
    }
}

function checkIfInhabited(currentPlayer)
{
    if(spaces[players[currentPlayer].tokenOne.tokenOnePosistion].isInhabited == true)
    {
        //Getting the current token inhabiting that space
        var token = spaces[players[currentPlayer].tokenOne.tokenOnePosistion].inhabitedBy;
        console.log(players[currentPlayer].playerColour + " just landed on " + token.name + ", moving it back to home!");
        //Moving token back to home
        token.tokenOnePosistion = 0;
        token.tokenOneSpacesMoved = 0;
    }
}