import { BiMessageSquareEdit } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import TabComponent from "./components/tabComponent.jsx";
import TaskList from "./components/taskList.jsx";
import Swal from "sweetalert2";
const initialTasksData = JSON.parse(localStorage.getItem("tasks")) || [];

function App() {
  const [tasks, setTasks] = useState(initialTasksData); // Initialize with initialTasksData
  const [taskName, setTaskName] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Updated filteredTasks to use tasks state
  const filteredTasks =
    activeTab === "All"
      ? tasks
      : tasks.filter((task) => task.status === activeTab.toLowerCase());

  // Handle adding or editing tasks
  const addTask = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (taskName.trim() === "") return;
    if (taskName.length > 50) {
      setErrorMessage("Task name cannot exceed 50 characters.");
      return;
    }

    if (isEditing) {
      // Update task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId ? { ...task, name: taskName } : task
        )
      );
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Task was edited",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: "custom-swal",
        },
      });
      resetForm();
    } else {
      // Add new task
      if (
        tasks.some((task) => task.name.toLowerCase() === taskName.toLowerCase())
      ) {
        setErrorMessage("Task already exists.");
        return;
      }
      const newTask = { id: Date.now(), name: taskName, status: "to do" };
      setTasks((prevTasks) => [...prevTasks, newTask]);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Task added to your list",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: "custom-swal",
        },
      });
      setTaskName(""); // Clear input field
    }
  };

  // Reset the form after adding or editing a task
  const resetForm = () => {
    setTaskName("");
    setIsEditing(false);
    setEditTaskId(null);
  };

  //Set to complete task

  const completeTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: "done" } : task
      )
    );
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Task was completed",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        popup: "custom-swal",
      },
    });
  };

  //Set to incomplete task

  const incompleteTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: "to do" } : task
      )
    );
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "Task was incompleted",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        popup: "custom-swal",
      },
    });
  };

  //Delete Task
  const deleteTask = (taskId) => {
    // Show confirmation dialog with glass effect
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the task permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ce6366",
      cancelButtonColor: "#4f46e5",
      confirmButtonText: "Yes, delete it!",
      background: "rgba(255, 255, 255, 0.2)", // semi-transparent background
      customClass: {
        popup: "custom-swal", // custom class for glass effect
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with task deletion if confirmed
        setTasks(tasks.filter((task) => task.id !== taskId));

        // Show success toast after deletion
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "The task was deleted",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            popup: "custom-swal",
          },
        });
      }
    });
  };

  // Prepare to edit a task
  const editTask = (taskObj) => {
    setEditTaskId(taskObj.id);
    setTaskName(taskObj.name);
    setIsEditing(true);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <main className="max-w-lg mx-auto px-4 py-6">
        <h1 className="mb-4 text-4xl font-light tracking-tight leading-none md:text-5xl lg:text-4xl text-white text-center">
          To do list
        </h1>
        <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />
        <TaskList
          filteredTasks={filteredTasks}
          completeTask={completeTask}
          incompleteTask={incompleteTask}
          editTask={editTask}
          deleteTask={deleteTask}
        />
        {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}

        {/* Task Input Form */}
        <form onSubmit={addTask} className="mt-6 flex items-center gap-2">
          <div className="relative z-0 mb-5 group">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="block py-2.5 px-0 w-72 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Task name
            </label>
          </div>

          <button
            type="submit"
            className="ripple inline-flex items-center justify-center ml-9 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
          >
            {isEditing ? (
              <>
                <BiMessageSquareEdit className="text-2xl" />
                <span className="ml-1">Edit task</span>
              </>
            ) : (
              <>
                <AiOutlinePlusCircle className="text-2xl" />
                <span className="ml-1">Add task</span>
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
