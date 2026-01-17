import { useEffect, useState } from 'react';



const OnBoardingTip = ({text, storageKey }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem(storageKey)
        if (!seen) setShow(true)
    }, [storageKey])

    const handleClose = () => {
        localStorage.setItem(storageKey, 'true')
        setShow(false)
    }
    if(!show) return null;
    
    return ( 
       <div className="absolute top-10 right-4 z-50">
      <div className="bg-gray-300 dark:bg-black dark:text-white text-black text-sm rounded-lg p-3 shadow-lg max-w-xs">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 dark:bg-black bg-gray-300 rotate-45" />
        <p>{text}</p>

        <button 
          onClick={handleClose}
          className="mt-2 text-xs underline opacity-80 hover:text-green-600"
        >
          Got it
        </button>
      </div>
    </div>
     );
}
 
export default OnBoardingTip;