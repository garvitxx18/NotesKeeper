import { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { padding } from "@mui/system";
import LockOutlinedIcon from "@mui/material";
import FormControlLabel from "@mui/material";
import Checkbox from "@mui/material";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.user) {
      localStorage.setItem("token", data.user.email);
      console.log(data.user);
      localStorage.setItem("name", data.user.name);
      alert("Login Succesfull");
      window.location.href = "/profile";
    } else {
      alert("Please check your username and password");
    }
    console.log(data);
  }
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 280,
    margin: "40px auto",
  };
  const btnstyle = { margin: "8px 0" };
  return (
    <div className="App">
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <h2>Sign In</h2>
          </Grid>
          {/* <TextField
            value={email}
            type="mail"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          /> */}

          {/* <TextField
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          /> */}
          <TextField
            label="Username"
            placeholder={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder={password}
            onChange={(e) => setPassword(e.target.value)}
            typr="password"
            fullWidth
            required
          />
          {/* <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            onClick={loginUser}
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
        </Paper>
      </Grid>
    </div>
  );
}

export default App;
