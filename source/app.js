import React, {useState, useEffect} from 'react';
import {Box, Text, Spacer, useInput} from 'ink';
import  {WIDTH, HEIGHT, grid, player, game} from "./state.js"

const cellToText = ({symb, backgroundColor}, i) => <Text backgroundColor={backgroundColor} key={symb + String(i)}>{symb}</Text>;

export default function App() {
	const [counter, setCounter] = useState(0);
	const [visuals, setVisuals] = useState(" ".repeat((WIDTH)*(HEIGHT)));

	useEffect(() => {
		const timer = setInterval(() => {
			if (game.over) {
				return;
			}

			grid.incrementTime();
			setVisuals(grid.cells.map(cellToText));
		}, 700);


		return () => {
			clearInterval(timer);
		};
	}, []);

	useInput((input, key) => {
		if (game.over) {return }

		let x = 0;
		let y = 0;

		if (key.leftArrow) {
			x -= 1;
		}
		if (key.rightArrow) {
			x += 1;
		}
		if (key.upArrow) {
			y -= 1;
		}
		if (key.downArrow) {
			y += 1;
		}

		if (x !== 0 || y !== 0) {
			player.move(x, y, true);
			setVisuals(grid.cells.map(cellToText));
		}
	});

	return (
		<>
			<Box marginLeft={2} marginTop={2}><Text bold>Lives: {player.lives || "Game Over"}</Text></Box>

			<Box margin={2} marginTop={0} width={WIDTH+2} height={HEIGHT+2} borderStyle="single">
				<Text>{visuals}</Text>
			</Box>
		</>
	);
}
