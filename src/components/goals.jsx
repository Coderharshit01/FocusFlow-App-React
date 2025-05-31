
// first do npm install lucide-react 


// GOALS COMPONENT 


import { PenBox, Trash } from "lucide-react"
import { useEffect, useState } from "react"

export default function Goal({ isLightTheme }) {

    // States 
    const [goals, setGoals] = useState([])
    const [isInputOpen, setInputOpen] = useState(false)
    const [input, setInput] = useState('')

    // Function for adding goals 
    const addGoal = (goal) => {
        if (!goal.trim()) return;  //Checking if the input was empty if yes then exiting without saving
        const Goal = { Name: goal, Status: false }   //Making a goal object
        setGoals([...goals, Goal])  // adding the new goal to the prev ones
        setInput('')  //EMptying the input after adding
        setInputOpen(false)  //Closing the input after adding 
    }

    // Loading the goals saved from local storage  (once per render)
    useEffect(() => {
        try{
            const savedGoals = localStorage.getItem("Goals")
            if (savedGoals) setGoals(JSON.parse(savedGoals));   // if saved goals != null then updating the goals with the saved in local storage
        } catch(error){
            console.error(error)
        }
    }, [])

    // Saving in local storage after adding a new goal
    useEffect(() => {
        localStorage.setItem("Goals", JSON.stringify(goals))
    }, [goals])


    return (

        <div className={`md:w-96 w-[90%] ${isLightTheme ? "bg-white text-black/60" : "bg-gray-600 text-white/80"} p-4 shadow-xl rounded-xl flex flex-col  justify-center `}>

            {/* Top */}
            <div className="flex justify-between">
                <h2 className="text-sky-300 md:text-2xl text-md font-bold">SET-GOALS</h2>
                <button className="mx-2 sm:text-sm" onClick={() => setInputOpen(!isInputOpen)}>
                    <PenBox />
                </button>
            </div>


{/* Opening the add goal section when  clicked in the add button */}
            {isInputOpen && (

                <div className="my-3 flex justify-center items-center flex-col transition-all duration-150 ease-in-out">
                    <input type="text" className="w-[90%] rounded-xl shadow-xl py-1 px-2 focus:outline-none text-center text-black" placeholder="Goal Name......"
                        value={input} onChange={(e) => setInput(e.target.value)} />
                    <div className="flex gap-3 my-3">
                        <button className="bg-green-400 hover:opacity-80 p-2 text-white text-md rounded-xl" onClick={() => addGoal(input)}>Save</button>
                        <button className="bg-gray-400 hover:opacity-80 p-2 transition-all duration-200 text-white text-md rounded-xl" onClick={() => setInputOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* SHow the added Goal Section */}
            <div className="flex flex-col gap-1 justify-center items-center my-3">
                {/* Adding the goals stoed in goals state by mapping */}
                {goals.length > 0 ?
                    goals.map((goal, index) => (
                        <div className="flex md:w-[96%] w-[90%] justify-center items-center" key={index}>
                            <div className={`${isLightTheme ? "bg-gray-100 text-black/60" : "bg-gray-700 text-white/80"} rounded-l-xl  my-1
                      px-3 py-2 flex  justify-between w-[90%]`} >

                                <h2 className={` md:text-xl italic ${goal.Status ? "line-through decoration-red-400 decoration-2 " : ""} `}>{goal.Name} </h2>
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={goal.Status}
                                    onChange={() => {
                                        const updatedGoals = goals.map((g, i) =>
                                            i === index ? { ...g, Status: !g.Status } : g
                                        );
                                        setGoals(updatedGoals);
                                    }}
                                    className="accent-green-400 md:w-5 md:h-5 w-4 h-4 border-2 border-gray-400 rounded"
                                />



                            </div>
                            <button className="bg-red-400 p-1.5 md:p-2" onClick={() => setGoals(goals.filter((_, i) => i !== index))}>
                                <Trash />
                            </button>
                        </div>
                    ))
                    : <h2 className="text-gray-400 italic my-1.5">No goals , tap the pen icon to add .</h2>}
            </div>

        </div>
    )
}