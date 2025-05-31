import { useState } from "react"


export default function Top({setLightTheme}){ 
    const [enabled,setEnabled] = useState(false)
    const toggleButton = ()=>{
        setEnabled((!enabled))
        setLightTheme(!enabled)
    }
    return (
        <div className={` border-b ${enabled ? "border-b-gray-800" : "border-b-white/70"} p-4 flex justify-between items-center`}>
            <h2 className="text-cyan-700 md:text-4xl text-2xl font-bold">Focus<span className="text-teal-400">Flow</span> </h2>
          <div className="flex">
          {/* <h2 className={`text-2xl italic ${enabled ? "text-black/50":"text-white/50"} `}>Change Theme : </h2>  */}
          <button 
            onClick={()=> toggleButton()}
            className={`mx-4 w-16 h-9 flex items-center rounded-full p-1 transition-colors duration-300 ${enabled ? "bg-gray-800":"bg-gray-300"}`}>
                <div className={`bg-white w-7 h-7 rounded-full shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-7 " : "translate-x-0 bg-gray-700"}`}>
         {!enabled ? "🌙" : "☀️"} 
                </div>
            </button>
          </div>
        </div>
    )
}