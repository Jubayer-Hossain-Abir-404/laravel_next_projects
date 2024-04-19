import Image from "next/image";

export default function Todo() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Todo App</h1>

      <div className="container">
        <div className="row">
          <div className="col-sm-7">
            <form>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Your Email" />
                <div className="input-group-append">
                  <span className="input-group-text">@example.com</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
