import React, { useContext, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated import
import MainContextProvider, { MainContext } from "./contexts/MainContext";
import LoginPage from "./components/LoginPage";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";

const { Content } = Layout;

const HomePage: React.FC = () => {
	const { currentUser } = useContext(MainContext);
	console.log(currentUser);

	return (
		<MainContextProvider>
			<Suspense fallback={<div>Loading...</div>}>
				<Router>
					<Layout>
						<AppHeader />
						<Content style={{ marginTop: 64 }}>
							<Routes>
								<Route path="/login" element={<LoginPage />} />
								<Route
									path="/"
									element={
										!currentUser ? <LoginPage /> : null
									}
								/>
							</Routes>
						</Content>
					</Layout>
				</Router>
			</Suspense>
		</MainContextProvider>
	);
};

export default HomePage;
