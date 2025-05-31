import { QuoteIcon } from "lucide-react";
import { quotes } from "./quote";
import { useEffect, useState } from "react";

export default function Quote_Comp({isLightTheme}){
    const [quote,setQuote] = useState(null)
    useEffect (()=>{
        const getQuote = ()=>{
            setQuote(quotes[Math.floor(Math.random()*quotes.length)])
        }
        getQuote()
    },[])

    return(
        <div className={` rounded-xl  shadow-xl ${isLightTheme ? "bg-white/60 text-black/30":"bg-gray-800 text-white"} relative md:w-[60%] w-[90%] p-6 md:my-6 my-3`}>
            <span className="text-2xl top-2 left-3"> <QuoteIcon className="rotate-180" /> </span>
            <h2 className="my-2 p-2 md:text-2xl italic font-semibold text-xl text-blue-600"> "{quote?.quote}"</h2>
            <span className="text-amber-600 font-bold italic absolute bottom-2 right-6 text-md"> -{quote?.author}</span>
        </div>
    )
}