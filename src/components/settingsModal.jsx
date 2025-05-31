import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SettingsModal({
  setSetting,      // Function to toggle the settings modal visibility
  isLightTheme,    // Boolean for current theme (light or dark)
  isAutoTimer,     // Boolean for auto-start timer toggle
  setAutoTimer,    // Function to toggle auto-start timer state
  timer,           // Current timer value (minutes)
  applyCustomTimer // Function to update the timer with a custom value
}) {
  // Local state to hold the input value of the custom timer before applying
  const [customTime, setCustomTime] = useState(timer);

  // Called when user clicks "Apply" button
  // Parses and validates the customTime input
  // If valid (>0 number), calls applyCustomTimer to update timer and closes modal
  const handleApply = () => {
    const parsed = parseInt(customTime);
    if (!isNaN(parsed) && parsed > 0) {
      applyCustomTimer(parsed);  // Immediately updates the timer in parent
      setSetting(false);         // Close the settings modal
    }
  };

  return (
    <div className="flex z-50 fixed inset-0 items-center justify-center ">
      {/* Background overlay: clicking closes the modal */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/40"
        onClick={() => setSetting(false)}
      ></div>

      {/* Animated modal container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0.5, scale: 0.3 }}
        transition={{ duration: 0.4, ease: "circInOut" }}
        className={`md:w-96 relative w-80 z-50 ${
          isLightTheme ? "bg-white text-black" : "bg-gray-800 text-white/50"
        } gap-6 flex flex-col py-6 px-5 items-center shadow-xl rounded-xl justify-center `}
      >
        {/* Header with title and close button */}
        <div className="flex w-full justify-between items-center">
          <h2 className="font-bold text-gray-400 md:text-2xl text-xl">
            Settings
          </h2>
          <button
            className="p-1 text-xl"
            onClick={() => setSetting(false)}
          >
            <X />
          </button>
        </div>

        {/* Settings options */}
        <div className="flex flex-col gap-4 w-full">
          {/* Auto-Start Timer toggle */}
          <div className="flex justify-between items-center">
            <h2 className="italic text-xl">Auto-Start Timer:</h2>
            <button
              className={`rounded-3xl transition-colors duration-300 ${
                isAutoTimer ? "bg-green-500" : "bg-gray-200"
              } p-1 w-16 h-8 shadow-xl flex items-center`}
              onClick={() => setAutoTimer(!isAutoTimer)}
            >
              {/* Toggle knob moves left or right based on isAutoTimer */}
              <div
                className={`rounded-full bg-white transition-transform duration-200 ${
                  isAutoTimer ? "translate-x-8" : "translate-x-0"
                } h-6 w-6 shadow-md`}
              ></div>
            </button>
          </div>

          {/* Custom timer input and apply button */}
          <div className="flex flex-col gap-2">
            <h2 className="italic text-xl">Set Custom Timer (minutes):</h2>
            <input
              type="number"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}  // Update local state on input
              className="px-3 py-2 rounded shadow bg-white text-black"
              placeholder="Enter minutes"
            />
            <button
              onClick={handleApply}  // Apply custom timer value
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
