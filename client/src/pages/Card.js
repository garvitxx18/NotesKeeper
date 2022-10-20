import React from "react";

const Card = ({ notes, setNotes, note, index, discription, setVisibility }) => {
  function edit() {
    localStorage.setItem("index", index);
    setVisibility(false);
  }
  function remove() {
    let temp = [];
    for (let i = 0; i < notes.length; i++) {
      if (i !== index) {
        temp = [...temp, notes[i]];
      }
    }
    setNotes(temp);
  }
  return (
    <div>
      <div>{note}</div>
      <div>{discription}</div>
      <div>
        <button onClick={() => edit()}>edit</button>
        <button onClick={() => remove()}>remove</button>
      </div>
    </div>
  );
};

export default Card;
