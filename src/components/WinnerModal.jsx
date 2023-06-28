import { Square } from "./Square"

export default function WinnerModal({ winner, handleReset }) {
	if(winner === null) return false
	const winnerText = winner === false ? "¡Empate!" : "El ganador es "
	return (
		<section className="winner-modal">
			<h2>{winnerText}</h2>
			{winner && <Square>{winner.toUpperCase()}</Square>}
			<button onClick={handleReset}>Jugar de nuevo</button>
		</section>
	)
}
