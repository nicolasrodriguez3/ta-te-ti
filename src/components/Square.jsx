export function Square({ children, className, index, updateSquare}) {
	return (
		<div
			onClick={() => updateSquare(index)}
			className={`square ${className}`}>
			{children}
		</div>
	)
}