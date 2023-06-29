import { useState } from "react"
import confetti from "canvas-confetti"

import "./App.css"
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinner } from "./logic/board"
import WinnerModal from "./components/WinnerModal"
import { deleteGameFromStorage, saveGameInStorage } from "./logic/storage"

function App() {
	const [board, setBoard] = useState(() => {
		// recuperar partida guardada si existe
		const boardFromLocalStorage = window.localStorage.getItem("board")
		if (boardFromLocalStorage) return JSON.parse(boardFromLocalStorage)
		return Array(9).fill(null)
	})
	const [turn, setTurn] = useState(() => {
		const turnFromLocalStorage = window.localStorage.getItem("turn")
		return turnFromLocalStorage ?? TURNS.X
	})
	const [winner, setWinner] = useState(null)

	const updateSquare = (index) => {
		if (board[index] || winner) return

		const newBoard = [...board]
		newBoard[index] = turn
		setBoard(newBoard)

		//actualizar turno
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X

		// revisar si hay ganador
		const newWinner = checkWinner(newBoard)
		if (newWinner) {
			confetti()
			setWinner(newWinner)
			deleteGameFromStorage()
			return
		}
		if (newWinner === false) {
			setWinner(false)
			return
		}

		//guardar la partida en localStorage
		saveGameInStorage(newBoard, newTurn)

		setTurn(newTurn)
	}

	const handleReset = () => {
		setBoard(Array(9).fill(null))
		setTurn(TURNS.X)
		setWinner(null)

		deleteGameFromStorage()
	}

	return (
		<>
			<h1>Ta Te Ti</h1>
			<button onClick={handleReset}>Reiniciar juego</button>
			<main className={winner === null ? "board" : "board has-winner"}>
				{board.map((square, index) => {
					return (
						<Square
							key={index}
							index={index}
							updateSquare={updateSquare}>
							{square}
						</Square>
					)
				})}
			</main>

			<WinnerModal
				winner={winner}
				handleReset={handleReset}
			/>

			<section className={winner === null ? "turn" : "turn has-winner"}>
				<Square className={turn === TURNS.X ? "is-turn" : ""}>{TURNS.X}</Square>
				<Square className={turn === TURNS.O ? "is-turn" : ""}>{TURNS.O}</Square>
			</section>
		</>
	)
}

export default App

