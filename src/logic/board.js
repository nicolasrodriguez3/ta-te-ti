import { WINNER_MOVES } from "../constants"

export const checkWinner = (boardToCheck) => {
	// verificar si hay ganador
	for (const combo of WINNER_MOVES) {
		const [a, b, c] = combo
		if (
			boardToCheck[a] &&
			boardToCheck[b] === boardToCheck[a] &&
			boardToCheck[c] === boardToCheck[a]
		) {
			return boardToCheck[a]
		}
	}
	if (boardToCheck.every((square) => square !== null)) {
		return false
	}
	// si no hay ganador
	return null
}