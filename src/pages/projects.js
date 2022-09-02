import * as React from "react"
import gsap from "gsap"
import CursorManager from "../context/cursorContext"
import Layout from "../components/layout"
import IndexView from "../components/indexView"
import { Transition } from "../components/transition"
import { useEffect,useRef,useLayoutEffect } from "react"

const IndexPage = () => {
  const projectsPage = useRef(null)
  const tl = gsap.timeline()
  
  useLayoutEffect(() => {
    tl.restart();
    tl.from(projectsPage.current,{ y:50, opacity:0, delay:0.7});
    return () => {
      tl.pause();
    }
  },[])

  return (
    <CursorManager>
      <Layout >          
        <div ref={projectsPage} >
          <IndexView />
        </div>
        <Transition timeline={tl} color={"#171717"}/>      
      </Layout>
    </CursorManager> 
  )  
}

export default IndexPage
