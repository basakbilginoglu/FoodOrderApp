import React from 'react'
import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'

export default function Modal({children,open,className=''}) {

    const dialogRef = useRef()

    const modal= dialogRef.current

    useEffect(()=>{
        if(open){
            modal.showModal()
        }
        return ()=>{
            if(modal.open){
                modal.close()
            }
        }
    },
    [open])
  return createPortal ( <dialog ref={dialogRef}className={`modal ${className}`}>{children}</dialog>, document.getElementById('modal')
      
   
  )
}
