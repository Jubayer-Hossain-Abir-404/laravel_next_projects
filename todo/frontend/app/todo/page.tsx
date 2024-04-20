"use client"; // This is a client component
import Image from "next/image";
import SetUpBaseURL from "../lib/SetUpBaseURL";
import { useEffect } from "react";

export default function Todo() {
  useEffect(() => {
    fetchTodos()
  }, []);

  function fetchTodos() {
    SetUpBaseURL.get('/api/todos/').then((response: any) => {
      console.log(response);
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
                <input type="text" className="form-control" placeholder="Type..." />
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
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
