import React , {useState , useEffect} from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import AddItem from "./AddItem";
import ToDoList from "./ToDoList"
function App() {
const [item , setItem] = useState([]);

useEffect(() => {
  fetch(import.meta.env.VITE_API_URL + "/notes")
    .then(res => res.json())
    .then(data => setItem(data))
    .catch(err => console.log(err));
}, []);
function addItems(newItem){
  setItem(prevItem =>{
   return[...prevItem , newItem]
  });
}
function del(id){
 fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
    method: "DELETE"
  })
.then(res => res.json())
    .then(() => {
      setItem(prevItem =>
        prevItem.filter(noteItem => noteItem.id !== id)
      );
    })
    .catch(err => console.log(err));
}
function update(id , updateNote){
 fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
    method: "PUT",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(updateNote)
 })
  .then(res => res.json())
    .then(() => {
      setItem(prev =>
        prev.map(note =>
          note.id === id
            ? { ...note, ...updateNote }
            : note
        )
      );
    })
}

return(
  <>
  <Header/>
  <main>
  <AddItem onAdd={addItems} />

  <div className="notesWrapper">
    {item.map((noteItem, index) => (
      <ToDoList
        key={noteItem.id}
        id={noteItem.id}
        title={noteItem.title}
        content={noteItem.content}
        onDelete={del}
        onUpdate ={update}
      />
    ))}
  </div>
</main>
  
  

 
 
  <Footer/>
  </>
)
};
export default App;