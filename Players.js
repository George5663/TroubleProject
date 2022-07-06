//Posistion 0 on board is home
exports.player1 = {
    playerColour: "Green",
    tokenOne: { name: "Green's Token One", tokenOnePosistion: 0, tokenOneSpacesMoved: 0},
    tokenTwo: { name: "Green's Token Two", tokenTwoPosistion: 0, tokenTwoSpacesMoved: 0},
    tokenThree: { name: "Green's Token Three", tokenThreePosistion: 0, tokenThreeSpacesMoved: 0},
    tokenFour: { name: "Green's Token Four", tokenFourPosistion: 0, tokenFourSpacesMoved: 0},
    //The space you'd be once leaving home
    outOfHomeSpace: 1
};

exports.player2 = {
    playerColour: "Red",
    tokenOne: { name: "Red's Token One", tokenOnePosistion: 0, tokenOneSpacesMoved: 0},
    tokenTwo: { name: "Red's Token Two", tokenTwoPosistion: 0, tokenTwoSpacesMoved: 0},
    tokenThree: { name: "Red's Token Three", tokenThreePosistion: 0, tokenThreeSpacesMoved: 0},
    tokenFour: { name: "Red's Token Four", tokenFourPosistion: 0, tokenFourSpacesMoved: 0},
    outOfHomeSpace: 8
};

exports.player3 = {
    playerColour: "Blue",
    tokenOne: { name: "Blue's Token One", tokenOnePosistion: 0, tokenOneSpacesMoved: 0},
    tokenTwo: { name: "Blue's Token Two", tokenTwoPosistion: 0, tokenTwoSpacesMoved: 0},
    tokenThree: { name: "Blue's Token Three", tokenThreePosistion: 0, tokenThreeSpacesMoved: 0},
    tokenFour: { name: "Blue's Token Four", tokenFourPosistion: 0, tokenFourSpacesMoved: 0},
    outOfHomeSpace: 15
};

exports.player4 = {
    playerColour: "Yellow",
    tokenOne: { name: "Yellow's Token One", tokenOnePosistion: 0, tokenOneSpacesMoved: 0},
    tokenTwo: { name: "Yellow's Token Two", tokenTwoPosistion: 0, tokenTwoSpacesMoved: 0},
    tokenThree: { name: "Yellow's Token Three", tokenThreePosistion: 0, tokenThreeSpacesMoved: 0},
    tokenFour: { name: "Yellow's Token Four", tokenFourPosistion: 0, tokenFourSpacesMoved: 0},
    outOfHomeSpace: 22
};

//Order of Play = Green -> Red -> Blue -> Yellow