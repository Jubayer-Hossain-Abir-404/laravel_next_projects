"use client"; // This is a client component
import Image from "next/image";
import SetUpBaseURL from "../lib/SetUpBaseURL";
import { useEffect, useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]); 
  const [title, setTitle] = useState('');
  const [todoId, setTodoId] = useState('');

  useEffect(() => {
    fetchTodos()
  }, []);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const submitForm = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    var formData = new FormData();
    formData.append('title', title);
    formData.append('is_done', 0);

    let url = 'api/todos';
    if (todoId !== '') {
      url = 'api/todos/'+todoId;
      formData.append('_method', 'PUT')
    }

    SetUpBaseURL.post(url,formData).then((response)=>{
      setTitle('');
      fetchTodos();
      setTodoId('');
    })

  }

  function editTodo(id: any) {
    setTodoId(id);
    todos.map((item) => {
      if (item.id === id) {
        setTitle(item.title);
      }
    })
  }

  function deleteTodo(id: any) {
    let params = {'_method':'delete'};
    SetUpBaseURL.post('/api/todos/' + id, params).then((response) => {
      setTitle('');
      fetchTodos();
      setTodoId('');
    })
  }

  function isDoneTodo(id: any, is_done: any) {
    let params = {'is_done': !is_done}
    SetUpBaseURL.post('/api/todos/done/' + id, params).then((response) => {
      setTitle('');
      fetchTodos();
      setTodoId('');
    })
  }

  function fetchTodos() {
    SetUpBaseURL.get('/api/todos/').then((response: any) => {
      setTodos(response.data);
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-7">
            <h1 className="text-center">Todo App</h1>
            <form className="mt-3" method="POST" onSubmit={submitForm}>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Type..." name="title" onChange={titleChange} value={title}/>
                <div className="input-group-append">
                  <button type="submit" className="input-group-text">Save</button>
                </div>
              </div>
            </form>

            <table className="table table-border">
              <thead>
                <tr>
                  <th></th>
                  <th>Sno.</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {todos &&
                  todos.map((item, i) => (
                    <tr key={i} 
                    className={item.is_done ? 'text-decoration-line-through' : ''}>
                      <td>
                        <input type="checkbox" className="form-check-input"
                        checked={item.is_done} 
                        onChange = {() => isDoneTodo(item.id, item.is_done)}
                        />
                      </td>
                      <td>{i + 1}</td>
                      <td>{item.title}</td>
                      <td>
                        <button 
                        className="btn btn-primary btn-sm"
                        onClick = {() => editTodo(item.id)}
                        >
                          Edit
                        </button>&nbsp;
                        <button 
                        className="btn btn-danger btn-sm"
                          onClick={() => deleteTodo(item.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}


export async function getServerSideProps(context: any) {
  const res = await fetch(process.env.BACKEND_URL+'/api/todos')
  const todos = await res.json()
  return {props: {todos}}
}

export async function getServer

// export default Todo
