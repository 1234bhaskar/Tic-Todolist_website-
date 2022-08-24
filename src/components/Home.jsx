import React,{useState} from 'react';
import { useEffect } from 'react';
import Task from './Task'; 

function Home(){


const initialArray =localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];

    const[tasks,setTasks]=useState(initialArray);

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");

    const submitHandler = (e) => {   //prevent default behavior of page relode of the form.
        
            e.preventDefault();
            setTasks([...tasks, {title,description}]);
            setDescription("");
            setTitle("");
}

const deleteTask=(index) =>{
    const filteredArr =tasks.filter((val,i) => { //created another array storing all elements except the clicked one.  
    return i !== index;
    });
    setTasks(filteredArr);
}

useEffect(() =>{
    localStorage.setItem("tasks",JSON.stringify(tasks));

}, [tasks]);
return (
<div className="container">
    <h1>Tic</h1>
<form onSubmit={submitHandler}>
    <input type="text" placeholder="Task" value={title} onChange={(e)=>setTitle(e.target.value)}/>
    <textarea placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    ></textarea>
    <button type="Submit">ADD</button>
</form>
{tasks.map((item, index) => (
    <Task 
    key={index}
    title={item.title}
    description={item.description}
    deleteTask={deleteTask}
    index={index}
    />
))}
    
</div>
);
};

export default Home;