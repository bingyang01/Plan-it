// import React, { useState } from "react";

// export default function MockTest() {
//     const [name, setName] = useState("TESTING123");

//     const nameFunction = () => {
//         setName("Calvin");
//     };

//     return (
//         <div>
//             <button onClick={nameFunction} data-testid="set-name-button">
//                 Set Name
//             </button>
//             <div data-testid="name-display">{name}</div>
//         </div>
//     );
// }

// -------------------------------------------------------------------------------------

// import React, { useState } from "react";

// export default function MockTest() {
//     const [name, setName] = useState("Blank");

//     const nameFunction = (event) => {
//         setName(event.target.value);
//     };

//     return (
//         <div>
//             <select
//                 id="select"
//                 value={name}
//                 onChange={nameFunction}
//                 data-testid="set-drop-down"
//             >
//                 <option value={1}>Andrew</option>
//                 <option value={2}>Harry</option>
//                 <option value={3}>William</option>
//             </select>
//             <div data-testid="name-display">{name}</div>
//         </div>
//     );
// }

// -------------------------------------------------------------------------------------

import React, { useState } from "react";

export default function MockTest() {
    const [name, setName] = useState(1);

    const nameFunction = (event) => {
        setName(event.target.value);
    };

    return (
        <div>
            <select
                id="select"
                value={name}
                onChange={nameFunction}
                data-testid="set-drop-down"
            >
                <option value={1}>Name 1</option>
                <option value={2}>Name 2</option>
                <option value={3}>Name 3</option>
            </select>
            {name === "2" ? <div>Hello</div> : null}
        </div>
    );
}
