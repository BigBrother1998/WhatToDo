import { GoChecklist } from "react-icons/go";
import Task from "./taskElement.jsx";

function TaskList({
  filteredTasks,
  completeTask,
  incompleteTask,
  editTask,
  deleteTask,
}) {
  const numOfTasks = filteredTasks.length;

  return (
    <main>
      <p className="text-gray-500 text-sm">
        Number of tasks:
        <span className="text-white text-md font-semibold ml-1">
          {numOfTasks}
        </span>
      </p>
      {numOfTasks > 0 ? (
        <ul className="scrollbar-custom max-w-md space-y-1 overflow-y-scroll h-80 text-gray-500 list-inside dark:text-gray-400 mt-4 pr-2">
          {filteredTasks.map((task) => (
            <Task
              taskObj={task}
              key={task.id}
              completeTask={completeTask}
              incompleteTask={incompleteTask}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      ) : (
        <p className="flex flex-col items-center">
          <GoChecklist className="text-9xl text-gray-500" />
          <h1 className="font-semibold text-md text-gray-500 mt-4">
            You have no task here
          </h1>
        </p>
      )}
    </main>
  );
}

export default TaskList;
