import "./moods.scss";
import React, { useState } from "react";

function Moods({handleMoodSubmit}) {
	const [selected, setSelected] = useState(""); // Set default checked value

	const handleInputChange = (e) => {
		const { value } = e.target;
		setSelected(value);

		console.log("Selected value:", e.target.value);
		handleMoodSubmit(e.target.value);
	};

	return (
		<div className="feedback">
			<div className="feedback">
				<label className="angry">
					<input
						type="radio"
						value="1"
						name="feedback"
						checked={selected === "1"}
						onChange={handleInputChange}
					/>
					<div>
						<svg className="eye left">
							<use xlinkHref="#eye"></use>
						</svg>
						<svg className="eye right">
							<use xlinkHref="#eye"></use>
						</svg>
						<svg className="mouth">
							<use xlinkHref="#mouth"></use>
						</svg>
					</div>
				</label>
				<label className="sad">
					<input
						type="radio"
						value="2"
						name="feedback"
						checked={selected === "2"}
						onChange={handleInputChange}
					/>
					<div>
						<svg className="eye left">
							<use xlinkHref="#eye"></use>
						</svg>
						<svg className="eye right">
							<use xlinkHref="#eye"></use>
						</svg>
						<svg className="mouth">
							<use xlinkHref="#mouth"></use>
						</svg>
					</div>
				</label>
				<label className="ok">
					<input
						type="radio"
						value="3"
						name="feedback"
						checked={selected === "3"}
						onChange={handleInputChange}
					/>
					<div></div>
				</label>
				<label className="good">
					<input
						type="radio"
						value="4"
						name="feedback"
						checked={selected === "4"}
						onChange={handleInputChange}
					/>
					<div>
						<svg className="eye left">
							<use xlinkHref="#eye"></use>
						</svg>
						<svg className="eye right">
							<use xlinkHref="#eye"></use>
						</svg>
						<svg className="mouth">
							<use xlinkHref="#mouth"></use>
						</svg>
					</div>
				</label>
				<label className="happy">
					<input
						type="radio"
						value="5"
						name="feedback"
						checked={selected === "5"}
						onChange={handleInputChange}
					/>
					<div>
						<svg className="eye left">
							<use xlinkHref="#eye"></use>
						</svg>
						<svg className="eye right">
							<use xlinkHref="#eye"></use>
						</svg>
					</div>
				</label>
			</div>

			<svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
				<symbol
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 7 4"
					id="eye"
				>
					<path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
				</symbol>
				<symbol
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 18 7"
					id="mouth"
				>
					<path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
				</symbol>
			</svg>
		</div>
	);
};

export default Moods;
