"use client"; // This is a client component
import Image from "next/image";
import SetUpBaseURL from "../lib/SetUpBaseURL";
import { useEffect, useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]); 
  const [title, setTitle] = useState([]); 

  useEffect(() => {
    fetchTodos()
  }, []);

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
            <form className="mt-3">
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
                  <th>Sno.</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {todos &&
                  todos.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.title}</td>
                      <td>
                        <button className="btn btn-primary btn-sm">
                          Edit
                        </button>&nbsp;
                        <button className="btn btn-danger btn-sm">
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
