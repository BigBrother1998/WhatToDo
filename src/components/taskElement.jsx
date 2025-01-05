function Task({ taskObj, completeTask, incompleteTask, editTask, deleteTask }) {
  return (
    <li className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center">
        {taskObj.status === "done" ? (
          <svg
            className="w-5 h-5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 me-2 text-red-500 dark:text-red-400 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path d="M8 8l8 8M8 16l8-8" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
        <span>{taskObj.name}</span>
      </div>

      <div className="flex items-center gap-2 ml-4">
        {taskObj.status === "to do" ? (
          <button
            className="text-indigo-500 hover:text-indigo-600"
            onClick={() => completeTask(taskObj.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path
                d="M5 12l5 5L20 7"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </button>
        ) : (
          <button
            className="text-indigo-500 hover:text-indigo-600"
            onClick={() => incompleteTask(taskObj.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
        <button
          className="text-indigo-500 hover:text-indigo-600"
          onClick={() => {
            editTask(taskObj);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M15.728 2.742a1.5 1.5 0 0 1 2.121 0l3.41 3.409a1.5 1.5 0 0 1 0 2.121L8.806 20.726a1.5 1.5 0 0 1-.707.394l-4.033 1.007a.5.5 0 0 1-.607-.607l1.007-4.033a1.5 1.5 0 0 1 .394-.707L15.728 2.742ZM5.675 19.207l2.25-.563L4.93 16.65l-.563 2.25 1.308.308Z" />
          </svg>
        </button>
        <button
          className="text-indigo-500 hover:text-indigo-600"
          onClick={() => deleteTask(taskObj.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M5 6h14v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Zm3 2v10h2V8H8Zm6 0v10h2V8h-2ZM9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h5v2H4V4h5Z" />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default Task;
