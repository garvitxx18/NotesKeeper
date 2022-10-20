import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState([
    { note: "Test Note", Discription: "Trial Note Discription" },
  ]);

  async function run(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        notes,
      }),
    });
    const data = await response.json();
    // console.log(data);

    if (data.status === "OK") {
      // console.log(data);
      navigate("/login");
    }
  }

  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={run}>
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        ></input>
        <br />
        <input
          value={email}
          type="mail"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        ></input>
        <br />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        ></input>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
