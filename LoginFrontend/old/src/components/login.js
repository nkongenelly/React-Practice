
import React from 'react'


const Login = ({login }) => {

    return (
        <div>
          <MuiThemeProvider>
            <div>
            <AppBar
               title="Login"
             />
             <TextField
               hintText="Enter your Username"
               floatingLabelText="Username"
               onChange = {(event,newValue) => this.setState({username:newValue})}
               />
             <br/>
               <TextField
                 type="password"
                 hintText="Enter your Password"
                 floatingLabelText="Password"
                 onChange = {(event,newValue) => this.setState({password:newValue})}
                 />
               <br/>
               <RaisedButton label="Submit" primary={true} style={style} onClick= {(e) => login(e)}/>
           </div>
           </MuiThemeProvider>
        </div>
      );
    }
  
  const style = {
   margin: 15,
  };


export default Login