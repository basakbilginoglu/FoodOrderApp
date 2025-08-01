    import React, { useEffect, useRef } from 'react'
    import { createPortal } from 'react-dom'    

    export default function Modal({children, open, onClose}) {
        const dialog = useRef();

        useEffect(() => {
            if (open) {
                if (dialog.current && !dialog.current.open) {
                    dialog.current.showModal();
                }
            } else {
                if (dialog.current) {
                    dialog.current.close();
                }
            }
        }, [open])

        function handleClose() {
            if (onClose) onClose();
        }

        return ( 
            createPortal(
                <dialog ref={dialog} onClose={handleClose}>
                    {children}
                </dialog>, 
                document.getElementById('modal')
            )
        )
    }