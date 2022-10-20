import React, { useState } from "react";

const Edit = (props) => {
  const index = localStorage.getItem("index");
  const email = localStorage.getItem("token");
  const [note, setNote] = useState(props.notes[index].note);
  const [disc, setDisc] = useState(props.notes[index].Discription);

  async function getBack() {
    let temp = [];
    for (let i = 0; i < props.notes.length; i++) {
      if (i == index) {
        temp.push({ note: note, Discription: disc });
      } else {
        temp.push(props.notes[i]);
      }
    }
    const response = await fetch("http://localhost:5000/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        temp,
      }),
    });
    props.setNotes(temp);
    console.log(temp);
    props.setVisibility(true);
  }
  return (
    <div>
      <input
        onChange={(e) => {
          setNote(e.target.value);
        }}
        value={note}
        type="text"
      ></input>
      <input
        onChange={(e) => {
          setDisc(e.target.value);
        }}
        value={disc}
        type="text"
      ></input>
      <button
        onClick={() => {
          getBack();
        }}
      >
        SAVE
      </button>
    </div>
  );
};

export default Edit;
