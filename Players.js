//Posistion 0 on board is home
exports.player1 = {
    playerColour: "Green",
    allTokens: [
    { name: "Greens Token One", position: 0, spacesMoved: 0},
    { name: "Greens Token Two", position: 0, spacesMoved: 0},
    { name: "Greens Token Three", position: 0, spacesMoved: 0},
    { name: "Greens Token Four", position: 0, spacesMoved: 0}],
    //The space you'd be once leaving home
    outOfHomeSpace: 1
};

exports.player2 = {
    playerColour: "Red",
    allTokens: [
        { name: "Reds Token One", position: 0, spacesMoved: 0},
        { name: "Reds Token Two", position: 0, spacesMoved: 0},
        { name: "Reds Token Three", position: 0, spacesMoved: 0},
        { name: "Reds Token Four", position: 0, spacesMoved: 0}],
    outOfHomeSpace: 8
};

exports.player3 = {
    playerColour: "Blue",
    allTokens: [
        { name: "Blues Token One", position: 0, spacesMoved: 0},
        { name: "Blues Token Two", position: 0, spacesMoved: 0},
        { name: "Blues Token Three", position: 0, spacesMoved: 0},
        { name: "Blues Token Four", position: 0, spacesMoved: 0}],
    outOfHomeSpace: 15
};

exports.player4 = {
    playerColour: "Yellow",
    allTokens: [
        { name: "Yellows Token One", position: 0, spacesMoved: 0},
        { name: "Yellows Token Two", position: 0, spacesMoved: 0},
        { name: "Yellows Token Three", position: 0, spacesMoved: 0},
        { name: "Yellows Token Four", position: 0, spacesMoved: 0}],
    outOfHomeSpace: 22
};

//Order of Play = Green -> Red -> Blue -> Yellow