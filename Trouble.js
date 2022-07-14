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

//Creating the 4 finish spots (+0)
var greenFinishSpaces = new Array(5);
var redFinishSpaces = new Array(5);
var blueFinishSpaces = new Array(5);
var yellowFinishSpaces = new Array(5);

for(var i = 0; i < 5; i++)
{
    blueFinishSpaces[i] = new boardSpaces(false, null);
    yellowFinishSpaces[i] = new boardSpaces(false, null);
    redFinishSpaces[i] = new boardSpaces(false, null);
    greenFinishSpaces[i] = new boardSpaces(false, null);
}

greenFinishSpaces[0] =  "Green";
redFinishSpaces[0] =  "Red";
blueFinishSpaces[0] =  "Blue";
yellowFinishSpaces[0] =  "Yellow";

var finishSpaces =  [
    greenFinishSpaces,
    redFinishSpaces,
    blueFinishSpaces,
    yellowFinishSpaces
]

let gameOver = false;

function RollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

gameOver = false;

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
        takeTurn(diceNumber, currentPlayer);
        if(diceNumber == 6)
        {
            while(diceNumber == 6)
            {
                if(gameOver == true)
                {
                    break;
                }
                diceNumber = RollDice();
                takeTurn(diceNumber, currentPlayer);
            }
        }
    }
}

function takeTurn(diceNumber, currentPlayer)
{
    console.log(players[currentPlayer].playerColour + " just rolled a " + diceNumber);
    
    //Get all legal moves with dice roll
    var legalTokens = checkLegality(diceNumber, players[currentPlayer]);
    //console.log(legalTokens);
    if(legalTokens.length != 0)
    {
        //Move a random legal piece
        var randomToken = legalTokens[Math.floor(Math.random()*legalTokens.length)];
        movePiece(randomToken, diceNumber, players[currentPlayer]);
    }
}

//List of all legal possible moves
function checkLegality(diceNumber, currentPlayer)
{
    var legalTokens = [];
    for(var i = 0; i < currentPlayer.allTokens.length; i++)
    {
        //Position if token were to move
        var tempPosition = currentPlayer.allTokens[i].position + diceNumber;
        if(tempPosition > 28)
        {
            tempPosition -= 28;
        }
        //If already on finish spot, cant move
        if(currentPlayer.allTokens[i].spacesMoved < 28)
        {
            //If the token is at home, and there isnt a current player token on the out of home space
            if(diceNumber == 6 && currentPlayer.allTokens[i].position == 0 && currentPlayer.allTokens.includes(spaces[currentPlayer.outOfHomeSpace].inhabitedBy) == false)
            {
                //console.log("home")
                legalTokens.push(currentPlayer.allTokens[i]); 
            }
            //If you're coming up to the finish spaces
            else if(currentPlayer.allTokens[i].spacesMoved + diceNumber > 27 && currentPlayer.allTokens[i].spacesMoved + diceNumber < 32)
            {
                //If the finish space isnt inhabited
                for(colours in finishSpaces)
                {
                    if(finishSpaces[colours][0] ==  currentPlayer.playerColour)
                    {
                        if(finishSpaces[colours][(currentPlayer.allTokens[i].spacesMoved + diceNumber) - 27].isInhabited == false)
                        {
                            //console.log("finish")
                            legalTokens.push(currentPlayer.allTokens[i]);
                        }
                    }
                }
            }
            //If the space x moves ahead is not inhabited by a current players token and you're not moving off the board
            else if(currentPlayer.allTokens[i].position != 0 && currentPlayer.allTokens.includes(spaces[(tempPosition)].inhabitedBy) == false && currentPlayer.allTokens[i].spacesMoved + diceNumber < 32)
            {
                //console.log("unoccupied")
                legalTokens.push(currentPlayer.allTokens[i]);
            }
        }
    }
    return legalTokens;
}

function movePiece(legalToken, diceNumber, currentPlayer)
{
    if(legalToken.position != 0){
        //Moving off space
        spaces[legalToken.position].isInhabited = false;
        spaces[legalToken.position].inhabitedBy = null;
        
        //If you've entered the finish slot
        if((legalToken.spacesMoved += diceNumber) > 27)
        {
            for(colours in finishSpaces)
            {
                if(finishSpaces[colours][0] == currentPlayer.playerColour)
                {
                    finishSpaces[colours][legalToken.spacesMoved-27].isInhabited = true;
                    finishSpaces[colours][legalToken.spacesMoved-27].inhabitedBy = legalToken;
                    console.log(legalToken.name + " just moved into final space: " + (legalToken.spacesMoved-27));
                    //Checking if game is over
                    let result = true;
                    for(var i = 1; i < 5; i++)
                    {
                        if(finishSpaces[colours][i].isInhabited == false)
                        {
                            result = false;
                        }
                    }
                    
                    if(result == true)
                    {
                        console.log("Game Over," + finishSpaces[colours][0] + " WINS!!!!");
                        gameOver = true;
                        break;
                    }
                }
            }
        }
        else
        {
            //Going around the board
            legalToken.position += diceNumber;
            
            //Subtracting 28 so you can go around the entire board and start back at space 1
            if(legalToken.position > 28)
            {
                //console.log('Retracting 28');
                legalToken.position -= 28;
            }
            
            //Current players moved token position
            console.log(legalToken.name + " just moved to position: " + legalToken.position);
            
            checkIfInhabited(legalToken);
            
            spaces[legalToken.position].isInhabited = true;
            spaces[legalToken.position].inhabitedBy = legalToken;
        }
    }
    else
    {
        legalToken.position = currentPlayer.outOfHomeSpace
        console.log(legalToken.name + " just moved out of home to space " + currentPlayer.outOfHomeSpace);
        checkIfInhabited(legalToken);
        spaces[legalToken.position].isInhabited = true;
        spaces[legalToken.position].inhabitedBy = legalToken;
    }
}

function checkIfInhabited(legalToken)
{
    if(spaces[legalToken.position].isInhabited == true)
    {
        //Getting the current token inhabiting that space
        var token = spaces[legalToken.position].inhabitedBy;
        console.log(legalToken.name + " just landed on " + token.name + ", moving it back to home!");
        //Moving token back to home
        token.position = 0;
        token.spacesMoved = 0;
    }
}