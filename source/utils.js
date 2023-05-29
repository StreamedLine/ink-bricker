const colors = [
	'redBright',
	'greenBright',
	'yellowBright',
	'blueBright',
	'magentaBright',
	'cyanBright',
	'whiteBright',
];

export const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
}