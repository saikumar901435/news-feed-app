'use client'
import React, { useRef } from 'react'
import styles from '../styles/swipetofetch.module.css'
const SwipeToFetch = ({fullSwiped,}) => {
    const [isSwipstart, setIsSwipStart] = React.useState(false);
    const [position,setPosition]=React.useState(0)
    console.log('position: ', position);
    const containerRef=React.useRef()
    const positionRef=useRef(0)

    // when ever we click event is triggred setting state to true
    const handleMouseDown = () => {
        setIsSwipStart(true);
      };

    //   here we calling the fullswiped function only after position is equal or greater than 80% of that swiper
    //immediatly seting positon to 0 when mouse moveup
      const handleMouseMoveUp=()=>{
        setIsSwipStart(false);
        if(positionRef.current>=80){
            console.log('triggred here')
       fullSwiped()

        }
        setPosition(0)
      }

    //   when the mouse moving we are capturing the positon of mouse 
      const handleMouseMove=(e)=>{
        if (isSwipstart) {
            const containerWidth = containerRef.current?.offsetWidth || 0;
            const newPosition = Math.min((e.clientX / containerWidth) * 43, 100);
            setPosition(newPosition);
            positionRef.current=newPosition;
            console.log('newPosition mouse: ', newPosition);
          }
      }

  

      React.useEffect(()=>{
        if(isSwipstart){
            window.addEventListener('mousemove',handleMouseMove)
            window.addEventListener('mouseup',handleMouseMoveUp)
        }else{
            window.removeEventListener('mousemove',handleMouseMove)
            window.removeEventListener('mouseup',handleMouseMoveUp)
        }

        return()=>{
            window.removeEventListener('mousemove',handleMouseMove)
            window.removeEventListener('mouseup',handleMouseMoveUp)
        }
      },[isSwipstart])
    
  return (
    <div ref={containerRef} className={styles.swipeContainer}>
      <div
        className={styles.swipeButton}
        style={{ left: `${position}%` }}
        onMouseDown={handleMouseDown}
      >
      </div>
      <h2 className={styles.h2}>swipe to Load</h2>
    </div>
  )
}

export default SwipeToFetch