import React, { useContext, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated import
import MainContextProvider, { MainContext } from "./contexts/MainContext";
import Login from "./pages/Login";
import { Layout, Spin } from "antd";
import AppHeader from "./components/AppHeader";
import Home from "./pages/Home";

const { Content } = Layout;

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
			<AppHeader />
			<Content style={{ marginTop: 64 }}>
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
