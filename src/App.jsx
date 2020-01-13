import React from 'react';
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home/HomePage";
import TopicsPage from "./pages/Topics/TopicsPage";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

export const App = () => {
	return (
		<Router>
			<Navbar/>

			<div className='container'>
				<Switch>
					<Route path="/topics">
						<TopicsPage/>
					</Route>
					<Route exact path="/">
						<HomePage/>
					</Route>
				</Switch>
			</div>
		</Router>
	)
}