export const saveGameInStorage = (board, turn) => {
	window.localStorage.setItem("board", JSON.stringify(board))
	window.localStorage.setItem("turn", turn)
}

export const deleteGameFromStorage = () => {
	window.localStorage.removeItem("board")
	window.localStorage.removeItem("turn")
}
