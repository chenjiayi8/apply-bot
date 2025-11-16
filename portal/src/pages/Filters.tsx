export default function Filters() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Job Filters
      </h2>

      <div className="space-y-6">
        {/* Blacklist Section */}
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Blacklist
          </h3>
          {/* Blacklist form will go here */}
        </div>

        {/* Whitelist Section */}
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Whitelist
          </h3>
          {/* Whitelist form will go here */}
        </div>

        {/* Salary Section */}
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Salary Preferences
          </h3>
          {/* Salary form will go here */}
        </div>
      </div>
    </div>
  )
}
