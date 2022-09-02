import React,{useState, createContext} from 'react'

export const CursorContext= createContext();

const CursorManager = (props) => {

    const [animation, setAnimation] = useState(false);
    const [visibility, setVisibility] = useState(true);
    const [radio, setRadio] = useState(false);

    return(
        <CursorContext.Provider value={{
            animation,
            setAnimation,
            radio,
            setRadio,
            visibility,
            setVisibility
        }}>
            {props.children}
        </CursorContext.Provider>
    );
}

export default CursorManager;

