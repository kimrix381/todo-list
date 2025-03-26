import { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const pendingTodos = todos.filter((todo) => todo.status === "pending");

  const completeTodos = todos.filter((todo) => todo.status === "complete");

  const handleFormSubmission = (e) => {
    e.preventDefault();

    const inputValue = e.target[0].value;

    if (!inputValue.trim()) {
      console.log("Input is empty");

      return;
    }

    const todo = {
      id: todos.length + 1,
      task: inputValue,
      status: "pending",
    };

    setTodos([...todos, todo]);

    e.target[0].value = "";

    console.log(todos);
  };

  const handleButtonClick = (todoId) => {
    console.log(todoId);

    setTodos((prevTodos) => {
      const todoIndex = prevTodos.findIndex((todo) => todo.id === todoId);

      prevTodos[todoIndex].status = "complete";

      return [...prevTodos];
    });
  };

  return (
    <main className="flex h-screen justify-center items-center">
      <div className="p-12 rounded shadow-2xl w-2/5 max-w-7xl space-y-8">
        <h1 className="text-3xl text-center font-bold">Task Master</h1>

        <form className="space-y-2" onSubmit={handleFormSubmission}>
          <input
            name="task"
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Enter task"
          />

          <button
            className={` w-[100%] px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg active:scale-95`}
            type="submit"
          >
            Add Task
          </button>
        </form>

        <div className="tasks">
          <h2 className="text-xl text-center mb-2">Pending Tasks</h2>
          <ol className="list-decimal space-y-1">
            {pendingTodos.length === 0 ? (
              <p className="font-bold">You do not have pending tasks</p>
            ) : (
              pendingTodos.map((todo, i) => {
                return (
                  <li key={i} className="flex justify-between ">
                    {i + 1}. {todo.task}
                    <button
                      onClick={(e) => {
                        handleButtonClick(todo.id);
                      }}
                      className="cursor-pointer text-xs border border-green-500 px-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-3 text-green-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </button>
                  </li>
                );
              })
            )}
          </ol>

          <hr className="my-4" />

          <h2 className="text-xl text-center mb-2">Complete Tasks</h2>
          <ol className="list-decimal pl-4">
            {completeTodos.length === 0 ? (
              <p className="font-bold">You do not have any completed tasks</p>
            ) : (
              completeTodos.map((todo, i) => {
                return <li key={i}>{todo.task}</li>;
              })
            )}
          </ol>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("todos"); // Clear stored tasks
            setTodos([]); // Reset state to empty
          }}
          className="px-6 py-3 w-[100%] bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-red-700 hover:shadow-lg active:scale-95"
        >
          Clear Tasks
        </button>
      </div>
    </main>
  );
};

export { App };
