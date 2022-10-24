// --- IMPORTS ---

// namesFormPage
const namesFormPage = document.getElementById("names-form-page");
const submitNamesButton = document.getElementById("submit-names-button");
const gameTitle = document.getElementById("title");
const p1FormName = document.getElementById("p1name");
const p2FormName = document.getElementById("p2name");

// gamePage
const gamePage = document.getElementById("game-page");
// HTML board
const htmlBoard = document.getElementById("game-table");
let boardRow = document.getElementsByClassName("row");
let boardSlots = document.getElementsByClassName("slot");
// Display messages
const playerTurn = document.getElementById("player-turn");
const winnerMessage = document.getElementById("winner-message");
// inGameButtons
const changePlayersButton = document.getElementById("change-players-button");
const resetButton = document.getElementById("reset-button");
// gameCounter
const gameCounter = document.getElementById("game-counter");
const p1CounterName = document.getElementById("p1-counter-name");
const p2CounterName = document.getElementById("p2-counter-name");
const p1Score = document.getElementById("p1-score");
const p2Score = document.getElementById("p2-score");
const p1Color = document.getElementById("p1-color");
const p2Color = document.getElementById("p2-color");

// --- GAME CODE ---

// CHANGING BG
// function changeFormBG() {
// 	const images = [
// 		"url('https://www.hdwallpapers.in/download/purple_planet_and_purple_space_hd_purple-1920x1080.jpg')",
// 		"url('https://wallpaperaccess.com/full/1866562.png')",
// 		"url('https://best-wallpaper.net/Earth-moon-universe-purple-style_wallpapers.html')",
// 	];
// 	// "url('https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701901865.jpg')",
// 	// "url('https://wallpaperaccess.com/full/1219623.jpg')",
// 	// "url('https://www.hdwallpapers.in/download/purple_planet_and_purple_space_hd_purple-1920x1080.jpg')",
// 	// "url('https://wallpaperaccess.com/full/1866562.png')",
// 	// "url('https://best-wallpaper.net/Earth-moon-universe-purple-style_wallpapers.html')",
// 	// "url('https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701901865.jpg')",
// 	// "url('https://wallpaperaccess.com/full/1219623.jpg')",

// 	const BG = images[Math.floor(Math.random() * 3)];

// 	namesFormPage.style.background = BG;
// }
// setInterval(changeFormBG, 3000);
// changeFormBG();
// CHANGING BG END

// --- HIDING gamePage WHILE ON namesFormPage ---
gamePage.style.display = "none";

// --- DECLARING INITIAL GAME STATE/CONDITIONS ---

// Setting the JS board null state
let jsBoard = [
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null],
];

// Declaring players
let player1 = {};
let player2 = {};

// Setting the first player (randomised)
function whoGoesFirst() {
	const randomNumber = Math.random();
	if (randomNumber > 0.5) {
		return player1;
	} else {
		return player2;
	}
}
let currPlayer = "";

// Game state (game finishes when gameOver = true)
let gameOver = false;

// --- GAME FUNCTIONS ---

// submitNamesButton code execution (namesFormPage -> gamePage by calling startGame)
function initiateGame() {
	console.log("initiateGame called");

	// Ensure form boxes are filled before executing code
	if (p1FormName.value == "") {
		alert("Please enter Player 1's name");
	} else if (p2FormName.value == "") {
		alert("Please enter Player 2's name");
	} else if (p1FormName.value === p2FormName.value) {
		alert("You can't have the same names!");
	} else {
		// Hide namesFormPage
		namesFormPage.style.display = "none";

		// Import player name submissions to the JS player objects
		player1 = {
			name: p1FormName.value,
			color: "Red",
		};
		player2 = {
			name: p2FormName.value,
			color: "Yellow",
		};

		// Call startGame to transfer to gamePage
		startGame();
	}
}
submitNamesButton.addEventListener("click", initiateGame);

// Displaying gamePage + Setting initial game conditions
function startGame() {
	console.log("startGame was called");

	// --- DISPLAYING GAME PAGE ---
	gamePage.style.display = "flex";
	winnerMessage.style.display = "none";

	//  --- SETTING INITIAL CONDITIONS ---

	// Setting JS board
	jsBoard = [
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
	];
	console.table(jsBoard);

	// Setting htmlBoard
	for (let i = 0; i < boardSlots.length; i++) {
		boardSlots[i].style.backgroundColor = "wheat";
	}

	// Setting game state
	gameOver = false;

	// Setting the currPlayer
	currPlayer = whoGoesFirst();
	console.log(`${currPlayer.name} goes first!`);

	// Displaying 1st player's name
	playerTurn.innerText = `${currPlayer.name} gets the first move!`;

	// Setting gameCounter values
	p1CounterName.innerText = player1.name;
	p2CounterName.innerText = player2.name;
	p1Color.innerText = player1.color;
	p2Color.innerText = player2.color;
}

// checkWinner (check for winning conditions)
function checkWinner() {
	// horizontal
	for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
		for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
			if (!gameOver && jsBoard[rowIndex][columnIndex]) {
				if (
					jsBoard[rowIndex][columnIndex] ==
						jsBoard[rowIndex][columnIndex + 1] &&
					jsBoard[rowIndex][columnIndex + 1] ==
						jsBoard[rowIndex][columnIndex + 2] &&
					jsBoard[rowIndex][columnIndex + 2] ==
						jsBoard[rowIndex][columnIndex + 3]
				) {
					alert(`The winner is ${currPlayer.name}!`);

					// CODE TO CHANGE STYLE OF WINNING COMBINATION
					for (let c = columnIndex; c <= columnIndex + 3; c++) {
						let winSlot = document.getElementById(
							`row-${rowIndex}-column-${c}`
						);
						// Assigning BG image based on currPlayer
						// if (currPlayer.color == "Yellow") {
						// 	winSlot.style.background =
						// 		"url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/1077px-Star_icon_stylized.svg.png')";
						// } else if (currPlayer.color == "Red") {
						// 	winSlot.style.background =
						// 		"url('https://www.nicepng.com/png/full/50-502241_favicon-red-star-icon.png')";
						// }
						// winSlot.style.backgroundSize = "contain";
						// winSlot.style.backgroundRepeat = "no-repeat";
						winSlot.style.boxShadow = `0 0 50px ${currPlayer.color}`;
						winSlot.style.backgroundColor = "transparent";
					}

					playerTurn.style.display = "none";
					winnerMessage.style.display = "flex";
					winnerMessage.innerText = `The winner is ${currPlayer.name}!`;
					winnerMessage.style.color = currPlayer.color;
					gameOver = true;
					if (currPlayer === player1) {
						p1Score.innerText++;
					} else {
						p2Score.innerText++;
					}
					return;
				}
			}
		}
	}

	// vertical
	for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
		for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
			if (!gameOver && jsBoard[rowIndex][columnIndex]) {
				if (
					jsBoard[rowIndex][columnIndex] ==
						jsBoard[rowIndex + 1][columnIndex] &&
					jsBoard[rowIndex + 1][columnIndex] ==
						jsBoard[rowIndex + 2][columnIndex] &&
					jsBoard[rowIndex + 2][columnIndex] ==
						jsBoard[rowIndex + 3][columnIndex]
				) {
					alert(`The winner is ${currPlayer.name}!`);
					// Code to edit the winning slots
					for (let r = rowIndex; r <= rowIndex + 3; r++) {
						let winSlot = document.getElementById(
							`row-${r}-column-${columnIndex}`
						);
						winSlot.style.boxShadow = `0 0 50px ${currPlayer.color}`;
						winSlot.style.backgroundColor = "transparent";
					}

					playerTurn.style.display = "none";
					winnerMessage.style.display = "flex";
					winnerMessage.innerText = `The winner is ${currPlayer.name}!`;
					winnerMessage.style.color = currPlayer.color;
					if (currPlayer === player1) {
						p1Score.innerText++;
					} else {
						p2Score.innerText++;
					}
					gameOver = true;
					return;
				}
			}
		}
	}

	// anti diagonal
	for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
		for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
			if (!gameOver && jsBoard[rowIndex][columnIndex]) {
				if (
					jsBoard[rowIndex][columnIndex] ==
						jsBoard[rowIndex + 1][columnIndex + 1] &&
					jsBoard[rowIndex + 1][columnIndex + 1] ==
						jsBoard[rowIndex + 2][columnIndex + 2] &&
					jsBoard[rowIndex + 2][columnIndex + 2] ==
						jsBoard[rowIndex + 3][columnIndex + 3]
				) {
					alert(`The winner is ${currPlayer.name}!`);

					// CODE TO CHANGE STYLE OF WINNING COMBINATION
					let winSlot1 = document.getElementById(
						`row-${rowIndex}-column-${columnIndex}`
					);
					let winSlot2 = document.getElementById(
						`row-${rowIndex + 1}-column-${columnIndex + 1}`
					);
					let winSlot3 = document.getElementById(
						`row-${rowIndex + 2}-column-${columnIndex + 2}`
					);
					let winSlot4 = document.getElementById(
						`row-${rowIndex + 3}-column-${columnIndex + 3}`
					);
					const winSlots = [winSlot1, winSlot2, winSlot3, winSlot4];
					winSlots.forEach((winSlot) => {
						winSlot.style.boxShadow = `0 0 50px ${currPlayer.color}`;
						winSlot.style.backgroundColor = "transparent";
					});

					playerTurn.style.display = "none";
					winnerMessage.style.display = "flex";
					winnerMessage.innerText = `The winner is ${currPlayer.name}!`;
					winnerMessage.style.color = currPlayer.color;
					if (currPlayer === player1) {
						p1Score.innerText++;
					} else {
						p2Score.innerText++;
					}

					gameOver = true;
					return;
				}
			}
		}
	}

	// diagonal
	for (let rowIndex = 3; rowIndex < 6; rowIndex++) {
		for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
			if (!gameOver && jsBoard[rowIndex][columnIndex]) {
				if (
					jsBoard[rowIndex][columnIndex] ==
						jsBoard[rowIndex - 1][columnIndex + 1] &&
					jsBoard[rowIndex - 1][columnIndex + 1] ==
						jsBoard[rowIndex - 2][columnIndex + 2] &&
					jsBoard[rowIndex - 2][columnIndex + 2] ==
						jsBoard[rowIndex - 3][columnIndex + 3]
				) {
					alert(`The winner is ${currPlayer.name}!`);

					// CODE TO CHANGE STYLE OF WINNING COMBINATION
					let winSlot1 = document.getElementById(
						`row-${rowIndex}-column-${columnIndex}`
					);
					let winSlot2 = document.getElementById(
						`row-${rowIndex - 1}-column-${columnIndex + 1}`
					);
					let winSlot3 = document.getElementById(
						`row-${rowIndex - 2}-column-${columnIndex + 2}`
					);
					let winSlot4 = document.getElementById(
						`row-${rowIndex - 3}-column-${columnIndex + 3}`
					);
					const winSlots = [winSlot1, winSlot2, winSlot3, winSlot4];
					winSlots.forEach((winSlot) => {
						winSlot.style.boxShadow = `0 0 50px ${currPlayer.color}`;
						winSlot.style.backgroundColor = "transparent";
					});

					playerTurn.style.display = "none";
					winnerMessage.style.display = "flex";
					winnerMessage.innerText = `The winner is ${currPlayer.name}!`;
					winnerMessage.style.color = currPlayer.color;
					if (currPlayer === player1) {
						p1Score.innerText++;
					} else {
						p2Score.innerText++;
					}

					gameOver = true;
					return;
				}
			}
		}
	}
}

// click event (Update the game state dynamically)
function setMove(event) {
	console.log(`Slot clicked (event): ${event.srcElement.id}`);

	// Extracting column index of clicked slot (event)
	let columnIndex = event.srcElement.id.substring(
		event.srcElement.id.length - 1
	);
	// Check correct column is being returned
	console.log(`Column identification checker: ${columnIndex}`);

	// Setting pieces, accounting for gravity
	// Loop over rows to account for "gravity" -> apply move to 1st available slot
	for (let rowIndex = 5; rowIndex >= 0; rowIndex -= 1) {
		if (!gameOver && !jsBoard[rowIndex][columnIndex]) {
			// Apply change to JS board
			jsBoard[rowIndex][columnIndex] = currPlayer.color;
			// Printing updated jsBoard
			console.table(jsBoard);

			// Applying change to HTML board
			// Extracting the "to be updated" slot's rowIndex
			let boardSlotRow = document.getElementById(`row-${rowIndex}`);
			// Check correct row is being returned
			console.log(
				`Row (to be updated) identification checker: ${boardSlotRow.id}`
			);
			// Declaring the slot being changed
			let boardSlot = document.getElementById(
				`row-${rowIndex}-column-${columnIndex}`
			);
			console.log(
				`boardSlot being changed: row-${rowIndex}-column-${columnIndex}`
			);
			// Changing BG of HTML cell (boardSlot)
			if (currPlayer.color == "Yellow") {
				boardSlot.style.background =
					"url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/1077px-Star_icon_stylized.svg.png')";
			} else if (currPlayer.color == "Red") {
				boardSlot.style.background =
					"url('https://www.nicepng.com/png/full/50-502241_favicon-red-star-icon.png')";
			}
			boardSlot.style.backgroundSize = "contain";
			boardSlot.style.backgroundRepeat = "no-repeat";
			boardSlot.style.backgroundColor = currPlayer.color;

			// Cancelling mouseover details
			boardSlot.style.boxShadow = "none";
			boardSlot.style.opacity = 1;

			// Check for winning combinations
			checkWinner();

			// Change player if valid move has been made
			if (currPlayer.color == "Red") {
				currPlayer = player2;
			} else {
				currPlayer = player1;
			}
			console.log(`It's now ${currPlayer.name}'s turn!`);
			break;
		} else if (!gameOver && rowIndex === 0) {
			alert("That column is full - pick another one!");
			console.log("Invalid move");
		} else if (gameOver) {
			alert("The game is over!");
			break;
		}
	}

	// Display the next player's name
	playerTurn.innerText = `It's now ${currPlayer.name}'s turn`;

	// Recalling so that the hovering token is redisplayed (Peripheral #10)
	columnMouseOver(event);
	console.log("columnMouseOver recalled");

	// Recalling so that column highlight changes accordingly (Peripheral #12)
	columnHighlight(event);
}

// mouseover event (indicate available slot when hovering over column)
function columnMouseOver(event) {
	console.log("columnMouseOver called");

	// Extracting column index of mouseover (event)
	let columnIndex = event.srcElement.id.substring(
		event.srcElement.id.length - 1
	);

	// Color change, accounting for gravity
	// For loop over rows applies gravity logic -> apply move to 1st available slot
	for (let rowIndex = 5; rowIndex >= 0; rowIndex -= 1) {
		if (!gameOver && !jsBoard[rowIndex][columnIndex]) {
			// Applying change to HTML board

			// Declaring the slot being affected
			let boardSlot = document.getElementById(
				`row-${rowIndex}-column-${columnIndex}`
			);

			// Changing BG of HTML cell upon mouseOver
			if (currPlayer.color == "Yellow") {
				boardSlot.style.background =
					"url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/1077px-Star_icon_stylized.svg.png')";
			} else if (currPlayer.color == "Red") {
				boardSlot.style.background =
					"url('https://www.nicepng.com/png/full/50-502241_favicon-red-star-icon.png')";
			}
			boardSlot.style.backgroundSize = "contain";
			boardSlot.style.backgroundRepeat = "no-repeat";
			boardSlot.style.backgroundColor = "wheat";
			boardSlot.style.boxShadow = `0 0 50px ${currPlayer.color}`;
			boardSlot.style.opacity = 0.5;

			// Breaking loop when 1st available slot is found
			break;
		}
	}
}

// mouseout event (return available slot to "wheat" when cursor exits column)
function columnMouseOut(event) {
	console.log("columnMouseOut called");

	// Extracting column index of mouseOut (event)
	let columnIndex = event.srcElement.id.substring(
		event.srcElement.id.length - 1
	);

	// Color reset
	// For loop over rows applies gravity logic -> apply move to 1st available slot
	for (let rowIndex = 5; rowIndex >= 0; rowIndex -= 1) {
		if (!jsBoard[rowIndex][columnIndex]) {
			// Applying reset to HTML board

			// Declaring the slot being reset
			let boardSlot = document.getElementById(
				`row-${rowIndex}-column-${columnIndex}`
			);

			// Changing BG of HTML cell upon mouseout
			boardSlot.style.boxShadow = "none";
			boardSlot.style.opacity = 1;
			boardSlot.style.background = null;

			// Breaking loop when 1st available slot is found
			// break;
		}
	}
}

// Assigning the events to the various types of boardSlots interaction
for (let i = 0; i < boardSlots.length; i++) {
	boardSlots[i].addEventListener("click", setMove);
	boardSlots[i].addEventListener("mouseover", columnMouseOver);
	boardSlots[i].addEventListener("mouseout", columnMouseOut);
}

// resetGame button code execution
function resetGame() {
	console.log("resetGame was called");

	// Confirm whether user wanted to select button
	let result = confirm("Are you sure you want to reset the game?");
	if (result) {
		// Execute following code if confirmed

		// Reset JS board
		jsBoard = [
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
		];
		console.table(jsBoard);

		// Reset HTML board
		for (let i = 0; i < boardSlots.length; i++) {
			boardSlots[i].style.boxShadow = "none";
			boardSlots[i].style.background = null;
			boardSlots[i].style.opacity = 1;
		}

		// Reset game state
		gameOver = false;

		// Reset 1st player
		currPlayer = whoGoesFirst();
		console.log(`${currPlayer.name} goes first!`);

		// Set playerTurn to 1st player's name
		playerTurn.innerText = `${currPlayer.name} gets the first move!`;

		// Redisplay playerTurn
		playerTurn.style.display = "flex";

		// Hide winnerMessage
		winnerMessage.style.display = "none";
	}
}
resetButton.addEventListener("click", resetGame);

// changePlayers button code execution
function changePlayers() {
	console.log("changePlayers was called");

	// Confirm whether user wanted to select button
	let result = confirm("Are you sure you want to change players?");
	if (result) {
		// Reload page if confirmed
		location.reload();
	}
}
changePlayersButton.addEventListener("click", changePlayers);

// ColumnHighlight (Peripheral 12)
function columnHighlight(event) {
	let columnHover = [];
	for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
		console.log("columnHighlight called");

		// Extracting column index of mouseover (event)
		let columnIndex = event.srcElement.id.substring(
			event.srcElement.id.length - 1
		);

		if (!gameOver && !jsBoard[rowIndex][columnIndex]) {
			// Applying change to HTML board

			// Declaring the slots being changed
			let boardSlot = document.getElementById(
				`row-${rowIndex}-column-${columnIndex}`
			);
			columnHover.push(boardSlot);
		}
	}
	columnHover.forEach((column) => {
		column.style.boxShadow = `0 0 50px ${currPlayer.color}`;
		column.style.opacity = 0.8;
	});
}
for (let i = 0; i < boardSlots.length; i++) {
	boardSlots[i].addEventListener("mouseover", columnHighlight);
}
