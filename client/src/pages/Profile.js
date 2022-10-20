import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";
import AddCard from "./AddCard";
import Edit from "./Edit";
// import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";

const Profile = () => {
  const email = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const [notes, setNotes] = useState([{}]);
  const [addCardFlag, setAddCardFlag] = useState(false);
  const [visibility, setVisibility] = useState(true);
  // const navigate = useNavigate();
  function add() {
    setAddCardFlag(true);
  }
  async function populate() {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await response.json();
    console.log(data.user);
    setNotes(data.user.notes);
  }

  useEffect(() => {
    populate();
  }, []);
  console.log(addCardFlag);
  return (
    <div>
      <h1>{"Welcome Back " + name}</h1>
      <div>
        <button variant="text" onClick={() => add()}>
          Plus
        </button>
        {addCardFlag && (
          <AddCard
            notes={notes}
            setNotes={setNotes}
            addCardFlag={addCardFlag}
            setAddCardFlag={setAddCardFlag}
          />
        )}
      </div>
      <div>
        <h1>
          {visibility &&
            notes.map((ele, ind) => (
              <Card
                notes={notes}
                setNotes={setNotes}
                note={notes[ind].note}
                index={ind}
                discription={notes[ind].Discription}
                setVisibility={setVisibility}
              />
            ))}
        </h1>
        <h1>
          {!visibility && (
            <Edit
              notes={notes}
              setNotes={setNotes}
              setVisibility={setVisibility}
            />
          )}
        </h1>
      </div>
    </div>
  );
};

export default Profile;
