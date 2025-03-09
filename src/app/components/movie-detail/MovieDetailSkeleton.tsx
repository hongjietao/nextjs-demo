export default function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-pulse">
      <div className="h-[500px] bg-gray-200 dark:bg-gray-700 relative"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="h-[350px] bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-1/2"></div>
              <div className="flex space-x-4 mb-8">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-1/2"></div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 演员阵容骨架屏 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-10">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-48"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-40 bg-gray-200 dark:bg-gray-700 rounded"
                ></div>
              ))}
          </div>
        </div>

        {/* 剧照骨架屏 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-10">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-48"></div>
          <div className="flex space-x-4 overflow-hidden">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-32 w-56 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded"
                ></div>
              ))}
          </div>
        </div>

        {/* 相关推荐骨架屏 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-10">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-48"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-gray-200 dark:bg-gray-700 rounded"
                ></div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
