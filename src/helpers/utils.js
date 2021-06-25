export const getColors = baseColor => {

	const textColor = shadeColor(baseColor, 200);
	const subTextColor = shadeColor(baseColor, 120);
	const backgroundColor = baseColor;

	return {

		textColor,
		subTextColor,
		backgroundColor,
		notVotedbuttonStyle: {

			"--color": baseColor,
			"--background-focused": baseColor,
			"--background-activated": baseColor,
			"--background": "white",
			"--border-color": baseColor
		},
		votedButtonStyle: {

			"--color": shadeColor(baseColor, 200),
			"--background-focused": baseColor,
			"--background-activated": baseColor,
			"--background": baseColor,
			"--border-color": shadeColor(baseColor, 200)
		},
		percentTrack: {

			"--background": shadeColor(baseColor, 70),
			"--progress-background": baseColor,
			height: "1rem"
		}
	};
}

export const getCardStyle = baseColor => {

	const textColor = shadeColor(baseColor, 200);
	const subTextColor = shadeColor(baseColor, 120);
	const backgroundColor = baseColor;
	const buttonColor = shadeColor(baseColor, 100);
	const buttonTextColor = shadeColor(baseColor, 0);

	return {

		textColor,
		subTextColor,
		backgroundColor,
		buttonStyle: {

			"--color": buttonTextColor,
			"--background": buttonColor,
			"--background-focused": shadeColor(baseColor, 20),
			"--background-activated": shadeColor(baseColor, 20),
		},
		statusBadge: {

			backgroundColor: "rgba(0, 0, 0, 0.1)",
			width: "fit-content",
			padding: "0.5rem",
			color: subTextColor,
			margin: 0,
			marginTop: "1rem",
			borderRadius: "5px"
		}
	};
}

export const shadeColor = (color, percent) => {

	var R = parseInt(color.substring(1,3),16);
	var G = parseInt(color.substring(3,5),16);
	var B = parseInt(color.substring(5,7),16);

	R = parseInt(R * (100 + percent) / 100);
	G = parseInt(G * (100 + percent) / 100);
	B = parseInt(B * (100 + percent) / 100);

	R = (R<255)?R:255;  
	G = (G<255)?G:255;  
	B = (B<255)?B:255;  

	var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
	var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
	var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

	return "#"+RR+GG+BB;
}