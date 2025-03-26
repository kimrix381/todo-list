import { useState, useEffect } from "react";

// Main App component
const App = () => {
  // Array of tasks with their statuses
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Filter tasks to get only the pending ones
  const pendingTodos = todos.filter((todo) => todo.status === "pending");

  // Filter tasks to get only the completed ones
  const completeTodos = todos.filter((todo) => todo.status === "complete");

  // Function to handle form submission
  const handleFormSubmission = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    const inputValue = e.target[0].value; // Gets the value of the input field

    // Validate the input
    if (!inputValue.trim()) {
      // Show an error
      console.log("Input is empty");

      return;
    }

    // Create a todo object using the inputValue
    const todo = {
      id: todos.length + 1,
      task: inputValue,
      status: "pending",
    };

    // Make the new tasks appear on the page under the pending tasks - Done
    // Add the todo object to the todos array
    setTodos([...todos, todo]);

    // Clear the input field - Done
    e.target[0].value = "";

    console.log(todos);

    // Assignment:
  };

  // If you feel super ambitious, you can add the functionality to change the status of a todo from pending to complete

  // Click the button
  // Change the status of the todo to complete
  const handleButtonClick = (todoId) => {
    console.log(todoId);

    // Use the todoId to update the status of the todo that has that ID
    setTodos((prevTodos) => {
      // Find the index of the todo object that has an Id of todoId
      const todoIndex = prevTodos.findIndex((todo) => todo.id === todoId); // Gets the index of that todo object

      // Update that todo to have a status of complete
      prevTodos[todoIndex].status = "complete";

      // Return a new todos array with the contents of the previous array, but one of the objects has an updated status
      return [...prevTodos];
    });
  };

  // Assignment (25/03/25):
  // Improve the app to use localStorage for data persistence

  return (
    <main className="flex h-screen justify-center items-center">
      {/* Main container for the app */}
      <div className="p-12 rounded shadow-2xl w-2/5 max-w-7xl space-y-8">
        {/* App title */}
        <h1 className="text-3xl text-center font-bold">Task Master</h1>

        {/* Form to add a new task */}
        <form className="space-y-2" onSubmit={handleFormSubmission}>
          {/* Input field for entering a task */}
          <input
            name="task"
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Enter task"
          />

          {/* Submit button for the form */}
          <button
            className={`bg-green-700 p-2 rounded text-white w-full cursor-pointer duration-300 hover:bg-green-600`}
            type="submit"
          >
            Add Task
          </button>
        </form>

        {/* Section to display tasks */}
        <div className="tasks">
          {/* Pending tasks section */}
          <h2 className="text-xl text-center mb-2">Pending Tasks</h2>
          <ol className="list-decimal space-y-1">
            {/* Map over the pending tasks and render them in a list */}
            {pendingTodos.length === 0 ? (
              <p className="font-bold">You do not have pending tasks</p>
            ) : (
              pendingTodos.map((todo, i) => {
                return (
                  <li key={i} className="flex justify-between ">
                    {/* Display task number and name */}
                    {i + 1}. {todo.task} {/* Button to mark task as complete */}
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

          {/* Divider between pending and completed tasks */}
          <hr className="my-4" />

          {/* Completed tasks section */}
          <h2 className="text-xl text-center mb-2">Complete Tasks</h2>
          <ol className="list-decimal pl-4">
            {/* Map over the complete tasks and render them in a list */}
            {completeTodos.length === 0 ? (
              <p className="font-bold">You do not have any completed tasks</p>
            ) : (
              completeTodos.map((todo, i) => {
                return (
                  // Display completed task
                  <li key={i}>{todo.task}</li>
                );
              })
            )}
          </ol>
        </div>
      </div>
    </main>
  );
};

// Export the App component
export { App };
