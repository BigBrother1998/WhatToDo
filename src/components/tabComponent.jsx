function TabComponent({ activeTab, setActiveTab }) {
  const tabs = ["All", "To do", "Done"];

  return (
    <div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === tab
                  ? "text-indigo-600 border-indigo-600"
                  : "text-gray-500 hover:text-gray-600 border-transparent"
              }`}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
            >
              {tab}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TabComponent;
