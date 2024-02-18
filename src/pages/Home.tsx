import { useState } from "react";
import { Layout, Card, Form } from "antd";

import Moods from "../components/Moods";

const { Content } = Layout;

const HomePage = () => {
	const [moodData, setMoodData] = useState([]);

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

			<Card title="Add Mood" bordered={false} style={{ width: "fit-content" }}>
				<Form name="add-mood-form">
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Moods />
					</div>
				</Form>
			</Card>
		</>
	);
};

export default HomePage;
