import { useState } from "react";
import { Layout, Card, Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLaugh,
	faFrown,
	faAngry,
	faSmile,
	faMeh,
} from "@fortawesome/free-solid-svg-icons";

const { Content } = Layout;

const HomePage = () => {
	const [moodData, setMoodData] = useState([]);

	const addMood = (mood) => {
		// Add mood data to state
		setMoodData([...moodData, { mood, date: new Date().toISOString() }]);
	};

	return (
		<>
			<h1>Dashboard</h1>

			<div>
				{moodData.map((mood, index) => (
					<div key={index}>
						<p>
							{mood.date}: {mood.mood}
						</p>
					</div>
				))}
			</div>

			<Card title="Add Mood" bordered={false} style={{ width: 300 }}>
				<Form name="add-mood-form">
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<FontAwesomeIcon
							icon={faAngry}
							style={{ fontSize: "24px", cursor: "pointer" }}
							onClick={() => addMood(1)}
						/>
						<FontAwesomeIcon
							icon={faFrown}
							style={{ fontSize: "24px", cursor: "pointer" }}
							onClick={() => addMood(2)}
						/>
						<FontAwesomeIcon
							icon={faMeh}
							style={{ fontSize: "24px", cursor: "pointer" }}
							onClick={() => addMood(3)}
						/>
						<FontAwesomeIcon
							icon={faSmile}
							style={{ fontSize: "24px", cursor: "pointer" }}
							onClick={() => addMood(4)}
						/>
						<FontAwesomeIcon
							icon={faLaugh}
							style={{ fontSize: "24px", cursor: "pointer" }}
							onClick={() => addMood(5)}
						/>
					</div>
				</Form>
			</Card>
		</>
	);
};

export default HomePage;
