export default function Timer({ setSetting, time, StartTimer, resetTimer }) {
  return (
    <div className="flex flex-col items-center justify-center my-4 gap-2">
      
      {/* Timer display section */}
      <div className="flex items-center gap-3">
        {/* Display minutes */}
        <h2 className="p-4 md:text-4xl text-2xl font-bold bg-white text-black shadow-xl rounded-xl">
          {
            // Converts minutes to string, pads with 0 if needed, and adds space between each digit
            time.min.toString().padStart(2, "0").split("").join(" ")
          }
        </h2>

        {/* Colon separator */}
        <h2 className="md:text-4xl text-3xl font-bold text-white">:</h2>

        {/* Display seconds */}
        <h2 className="p-4 md:text-4xl text-2xl font-bold bg-white text-black shadow-xl rounded-xl">
          {
            // Converts seconds to string, pads with 0 if needed, and adds space between each digit
            time.sec.toString().padStart(2, "0").split("").join(" ")
          }
        </h2>
      </div>

      {/* Buttons section */}
      <div className="flex items-center gap-4 my-6">
        {/* Start Button */}
        <button
          className="p-4 md:text-xl text-sm px-6 hover:opacity-70 shadow-lg text-white rounded-xl bg-green-500"
          onClick={StartTimer}
        >
          Start
        </button>

        {/* Reset Button */}
        <button
          className="p-4 md:text-xl text-sm px-6 hover:opacity-70 shadow-lg text-white rounded-xl bg-red-500"
          onClick={resetTimer}
        >
          Reset
        </button>

        {/* Settings Button */}
        <button
          className="p-4 md:text-xl text-sm px-6 hover:opacity-85 shadow-lg text-white rounded-xl bg-gray-600"
          onClick={() => setSetting(true)}
        >
          Settings
        </button>
      </div>
    </div>
  );
}
