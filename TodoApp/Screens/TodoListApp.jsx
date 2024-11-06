import { Alert, Text, View } from 'react-native'
import TodoForm from '@/components/TodoForm'
import TodoLists from "@/components/TodoLists";
import { useEffect, useState } from 'react';
import { getData, storeData } from "../Utils/storage.js";

export default function TodoListApp() {

  const [todoName , setTodoName] = useState("")
  const [todos , setTodos] = useState([])

  const handleAdd = ()=>{

    if(todoName == ""){
      Alert.alert("Todo cannot be empty");
      return;
    }

    if(todos.some(todo=>todo.name.toLowerCase() ===todoName.toLowerCase() )){
      Alert.alert("Todo already exists");
      return;
    }

    setTodos([
      {
        id: todoName,
        name: todoName,
        isComplete:false,
      },
      ...todos,
    ]);
    setTodoName("")
  }

  useEffect(()=>{
    async function loadTodos(){
      const LoadedTodos = await getData("todos");
      if(LoadedTodos){
        setTodos(LoadedTodos)
      }
    }
    loadTodos()
  },[])


  useEffect(()=>{
    storeData("todos",todos)
  },[todos])

  const markAsComplete = (id) =>{
    const newTodos = todos.map((todo) => todo.id === id ?
    {...todo,isComplete :true}: todo)
    setTodos(newTodos)
  }

  const handleDelete = (id) =>{
   const fliterTodos = todos.filter((todo) => todo.id !== id)
    setTodos(fliterTodos)
  }
  return (
   <View>
    <TodoForm todoName={todoName} setTodoName ={setTodoName} onAdd={handleAdd}/>
    <TodoLists todos={todos} 
    handleDelete={handleDelete}
    markAsComplete={markAsComplete}
    />
   </View>
   
  )
}

