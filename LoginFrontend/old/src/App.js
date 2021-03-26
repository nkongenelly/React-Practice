import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import loginPage from "./pages/loginPage"

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/">
          <loginPage/>
        </Route>
        <Route path="/login">
          <loginPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
