import React, { useContext } from "react";
import MainContextProvider, { MainContext } from "./contexts/MainContext";
import MoodForm from "./components/MoodForm";
import MoodList from "./components/MoodList";
import LoginPage from "./components/LoginPage";

import { Layout, Menu, Button, Typography } from "antd";

import Link from "next/link";
import { auth } from "./firebaseInit";

const { Title } = Typography;
const { Header, Content } = Layout;

const HomePage: React.FC = () => {

	return (
		<MainContextProvider>
			<Layout>
				
			</Layout>
			{currentUser ? (
				<>
					<Content style={{ padding: "0 50px", marginTop: 64 }}>
						<div
							style={{
								background: "#fff",
								padding: 24,
								minHeight: 380,
							}}
						>
							{/* Your content goes here */}
						</div>
					</Content>
				</>
			) : (
				<LoginPage /> // Render LoginPage if user is not authenticated
			)}
		</MainContextProvider>
	);
};

export default HomePage;
