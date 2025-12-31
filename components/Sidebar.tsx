const Sidebar = () => {
  return (
    <div className="min-h-screen flex flex-col fixed left-0 top-0 p-8 bg-slate-50 w-64 gap-8">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🧠</span>
          </div>
          <span className="text-xl font-bold text-indigo-500">
            BrainBoost
          </span>
        </div>
      </div>

      <div>
        <p>Hi</p>
      </div>
    </div>
  )
}

export default Sidebar
