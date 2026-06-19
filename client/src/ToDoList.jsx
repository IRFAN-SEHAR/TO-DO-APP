import React, { useState } from "react";
function ToDoList(props){
const [isEditing , setIsEditing] = useState(false);
const [title , setTitle]= useState(props.title);
const [content , setContent]= useState(props.content);


const emojis = [
"🦋","🐞","🕊","🦜","🐰","🦚","🌷","🌼","🌻","🌺","🌸",
"🏵","💐","🍀","🌿","🌾","🌳","🌲","🍂",
"❤","🧡","💛","💚","💙","💜","🤎","🖤",
"💖","💗","💓","💞","💕","❣","💔","🤍",
"💘","💝","💟","💥","✨","🎉","🎊","🧨",
"🎇","✨","🎄","🎈"
];

const randomEmojis = [...emojis]
  .sort(() => Math.random() - 0.5)
  .slice(0, 5);


    return(
        <div className="notesContainer">
        <div className="notes">
            {isEditing ? (
                <>
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
                <textarea 
                 type="text" value={content} onChange={(e)=>setContent(e.target.value)} 
                />
                <div className="btns">
                 <button onClick={()=>{props.onUpdate(props.id,{title , content});setIsEditing(false)}}>
                      {randomEmojis.map((emoji, index) => (
    <span
      key={index}
      className={`emoji e${index + 1}`}
    >
      {emoji}
    </span>
  ))}
                    save</button>

                </div>

                </>
            ):(
                  <>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <div className="btns">
<button onClick={()=>props.onDelete(props.id)}>
      {randomEmojis.map((emoji, index) => (
    <span
      key={index}
      className={`emoji e${index + 1}`}
    >
      {emoji}
    </span>
  ))}
    delete</button>
<button onClick={()=> setIsEditing(true)}>
      {randomEmojis.map((emoji, index) => (
    <span
      key={index}
      className={`emoji e${index + 1}`}
    >
      {emoji}
    </span>
  ))}
    update
    </button>
</div>
</>
            )}
        </div>
        </div>
    )
};
export default ToDoList;