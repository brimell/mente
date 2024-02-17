import React, { useContext, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated import
import MainContextProvider, { MainContext } from "./contexts/MainContext";
import Login from "./pages/Login";
import { Layout, Spin } from "antd";
import AppSidebar from "./components/AppSidebar";
import Home from "./pages/Home";

const { Content, Sider } = Layout;

const App: React.FC = () => {
	return (
		<MainContextProvider>
			<Suspense fallback={<div>Loading...</div>}>
				<Router>
					<Main />
				</Router>
			</Suspense>
		</MainContextProvider>
	);
};

function Main() {
	const [loading, setLoading] = useState(true);

	const { currentUser } = useContext(MainContext);

	useEffect(() => {
		// Check if the currentUser has been loaded
		if (currentUser === undefined) {
			return;
		}
		setLoading(false);
	}, [currentUser]);

	if (loading) {
		return <Spin size="large" style={{ marginTop: 200 }} />;
	}

	return (
		<Layout>
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				style={{
					backgroundColor: "#001529",
					height: "100vh",
					left: 0,
					display: "grid",
				}}
			>
				<AppSidebar />
			</Sider>
			<Content style={{ marginTop: 32, marginLeft: 32 }}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route
						path="/"
						element={currentUser ? <Home /> : <Login />}
					/>
				</Routes>
			</Content>
		</Layout>
	);
}

export default App;
