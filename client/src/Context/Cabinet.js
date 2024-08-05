import React, { createContext, useState } from 'react';
const CabinetContext = createContext();

//cabinet context
const CabinetProvider = ({ children }) => {
    const [cabinet, setCabinet] = useState(null);

    return (
      <CabinetContext.Provider value={{cabinet, setCabinet}}>
        {children}
      </CabinetContext.Provider>
    );
}

export { CabinetContext, CabinetProvider };