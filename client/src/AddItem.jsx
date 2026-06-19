import React , {useState} from "react";
import ToDoList from "./toDoList";
function AddItem(props){
    const [items , setItems] = useState({
        title: "",
        content: "",
    })
    function handleChange(event){
        const {name , value} = event.target;
        setItems(prevItems=>{
            return{
                ...prevItems,
                [name] : value
            }
        });
    }
   async function submitItems(event){
       props.onAdd(items);
       event.preventDefault();
       await fetch((import.meta.env.VITE_API_URL + "/notes") , {
        
        method:"Post",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(items),
        
       });
       
       setItems(
        {
            title: "",
            content: "",
        }
       )
       
    }
    return(
        <form className="addItems" onSubmit={submitItems} >
        <input className="textArea" onChange={handleChange}  name="title" value={items.title} placeholder="title" />
        <input className="textArea" onChange={handleChange}  name="content" value={items.content} placeholder="add content here!" />
        <button id="btn" onClick={submitItems}>add</button>
        </form>
    )
};
export default AddItem;