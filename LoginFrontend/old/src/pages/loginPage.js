import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import { Header } from './components/Header'
// import { Users } from './components/Users'
// import { DisplayBoard } from './components/DisplayBoard'
import login from '../components/login'
import { login } from '../services/authService'

class App extends Component {

  state = {
    user: {},
    users: [],
    numberOfUsers: 0
  }

  login = (e) => {
      login(this.state.user)
        .then(response => {
          console.log(response);
          this.setState({numberOfUsers: this.state.numberOfUsers + 1})
      });
  }

  render() {
    
    return (
        <div className="col-md-8">
            <login 
                login={this.login}
                >
            </login>
        </div>
    );
  }
}

export default loginPage;