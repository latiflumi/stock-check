import { useEffect, useState } from 'react';



const ThemeTip = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem('onboarding_theme_tip_seen')
        if (!seen) setShow(true)
    }, [])

    const handleClose = () => {
        localStorage.setItem('onboarding_theme_tip_seen', 'true')
        setShow(false)
    }
    if(!show) return null;

    return ( 
       <div className="absolute top-10 right-4 z-50">
      <div className="bg-black text-white text-sm rounded-lg p-3 shadow-lg max-w-xs">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rotate-45" />
        <p>You can change the theme by pressing this button</p>

        <button
          onClick={handleClose}
          className="mt-2 text-xs underline opacity-80 hover:opacity-100"
        >
          Got it
        </button>
      </div>
    </div>
     );
}
 
export default ThemeTip;