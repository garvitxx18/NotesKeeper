import React from "react";
import { useState } from "react";
const AddCard = (props) => {
  const [note, setNotes] = useState("");
  const [discription, setDiscription] = useState("");
  function addColomHidden(set1, set2) {
    props.setNotes([...props.notes, { note: set1, Discription: set2 }]);
    props.setAddCardFlag(false);
  }
  return (
    <div>
      <input
        onChange={(e) => {
          setNotes(e.target.value);
        }}
        type="text"
        placeholder={note}
      />
      <input
        onChange={(e) => {
          setDiscription(e.target.value);
        }}
        type="text"
        placeholder={discription}
      />
      <button onClick={() => addColomHidden(note, discription)}>
        ADD NOTE
      </button>
    </div>
  );
};

export default AddCard;
