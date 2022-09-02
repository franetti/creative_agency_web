import React, {useState, useRef, useEffect,useLayoutEffect, useContext} from "react"
// import { useStaticQuery, graphql } from "gatsby"
import Helmet from 'react-helmet' //para head
import {CursorContext} from "../context/cursorContext"
import * as  styles from './indexView.module.css'
import {pageData} from "../data"
import Cursor from "./cursor"

import ProjectItem from "./projectItem"
import { useCallback } from "react"

const IndexView = () => {
  
  let menuItems = useRef(null);
  const [renderItems, setRenderItems] = useState(pageData);  
  const {setAnimation} = useContext(CursorContext);

  setAnimation(true)
  const cloneItems = useCallback(() => 
  {    
      const itemHeight = menuItems.current.childNodes[0].offsetHeight;         
      const fitMax = Math.ceil(window.innerHeight / itemHeight); 
      const clonedItems = [...renderItems]
        .filter( (_, index) => index < fitMax)
        .map(target => target);        

      setRenderItems([...renderItems, ...clonedItems])
      
      return clonedItems.length * itemHeight;
  },[])

  const getScrollPos = () => {  
    return (      
      (menuItems.current.pageYOffset || menuItems.current.scrollTop) - (menuItems.current.clientTop || 0)
    )
  }

  const setScrollPos = (pos) => {    
    menuItems.current.scrollTop = pos;    
  }

  const initScroll = (h) => {
    const scrollPos = getScrollPos();  
    if(scrollPos <= 0){      
      setScrollPos(2);
    }
  }

  useLayoutEffect( () => {     
    const clonesHeight = cloneItems(); 
    menuItems.current.style.scrollBehavior='unset';
    initScroll(clonesHeight);      

    const scrollUpdate = () => 
    {           
        const scrollPos = getScrollPos();                         
        if(clonesHeight + scrollPos >= menuItems.current.scrollHeight){
          setScrollPos(2)
        }else if(scrollPos <= 0) {              
          setScrollPos(menuItems.current.scrollHeight-clonesHeight-1)
        }                             
    }
    //usar requestanimtionframe
    menuItems.current.addEventListener('scroll', scrollUpdate)
    return () => {
      menuItems.current.removeEventListener('scroll', scrollUpdate )
    }
  },[])
  
  return (
    <>             
        <div style={{backgroundColor:"#f5f5f5"}}>
          <ul className={styles.mainList} ref={menuItems} >
            {renderItems.map( (project, index) => (
                <ProjectItem key={index} project={project} itemIndex={index}/>
            ))}
          </ul>
        </div>
        <Cursor/>
    </>
  )
}

export default IndexView
