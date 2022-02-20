// Ships as objects that include length, where they've been hit, whether or not they've sunk
// Ships should have a hit() function that takes a number and marks that position as hit
// should have isSunk() function that calculates whether all positions are hit (according to weight of ship)

// gameboard factory
// gameboard should be able to place ships at specific coords by calling ship factory
// gameboard should have a recieveAttack() function that takes a pair of coords, determines whether the attack hit a ship, sends the hit function if hit || records coords of missed shot
// gameboard should keep track of missed attacks so they can display them properly
// gameboard should be able to report whether or not all of their ships have been sunk

// create player
// the game is played against computer - make cpu capable of random plays
// ai doesn't have to be intelligent, but must know whether a move is legal ('maybe log previously used coords and make sure they are only used once')

// create main game loop
// create module for DOM interaction

// game loop sets up new game by creating Players and Gameboards
// first, just populate each gameboard with predetermined coords - later we can allow player to place ship
// should displat both players boards and render them using info from gameboards

// allow user to click on coord in enemy gameboard to attack

// game loop should step through function turn by turn using only methods from other objects

// create conditions so a game ends once a ship sinks - notify the user of the result (place as function in Game module)

// for ai, after ai hits user, ai should send weapon to spot near previously hit spot

// don't console log or use DOM to test code, strictly Jest
