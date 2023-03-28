import React, { useState } from 'react';

function ToggleGarkmode () {

    const [darkmode, setDarkmode] = useState(false);

    const toggleDarkmode = () => {
        setDarkmode(!darkmode);

        if (darkmode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        
    };

    return (
        <div className="dark-mode">
            <button onClick={toggleDarkmode}>Darkmode</button>
        </div>
    )

}

export default ToggleGarkmode;

