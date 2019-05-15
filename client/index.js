const React = require("react");
const ReactDOM = require("react-dom");

const elem = React.createElement;

const td = require("array2d");
const c = require("cordillera");

const width = 20;
const height = 256;

class ErrorBoundary extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			errored: false,
		};
	}

	static getDerivedStateFromError() {
		return {
			errored: true,
		};
	}

	render() {
		if (this.state.errored) {
			return elem("p", null, "Oh no! The game ran into an error.");
		}
		
		return this.props.children;
	}
}

class GameView extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			map: td.fill(td.build(width, height), "black"),
		};

		const terrain = new c(0, 1, width);
		terrain.getLevels(height / 4).forEach((val, index) => {
			this.state.map = td.set(td.set(td.fillArea(td.fillArea(this.state.map, height - 1 - val, index, 1, val + 1, "gray"), height - 1 - val, index, 1, 3, "brown"), height - 1 - val, index, "green"), height - 1, index, "#444");
		})
	}

	render() {
		return elem("table", {
			cellpadding: 0,
			cellspacing: 0,
			style: {
				padding: 0,
				margin: 0,
				borderCollapse: "collapse",
			}
		}, [
			this.state.map.map(row => {
				return elem("tr", null, [
					row.map(val => {
						return elem("td", {
							style: {
								backgroundColor: val,
								color: "white",
								border: "1px solid #333",
								display: "inlineBlock",
								padding: 0,
								margin: 0,
								textAlign: "center",
							},
							width: 30,
							height: 30,
						}, val[0].toUpperCase());
					}),
				]);
			}),
		]);
	}

	handleClick(x, y) {
		alert("Clicked at: " + x + ", " + y)
	}
}

ReactDOM.render(elem(ErrorBoundary, null, elem(GameView)), document.getElementById("app"));