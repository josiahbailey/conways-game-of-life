import React, { useState, useEffect } from 'react'

const GridItem = ({ toggle, canToggle, status, index }) => {
    const setStatus = (e) => {
        if (status === 2) {
            return 'grid-item'
        } else if (status === 1) {
            return 'grid-item alive'
        } else {
            return 'grid-item dead'
        }
    }
    useEffect(() => {
        setStatus()
    }, [status])
    return (
        <div onClick={e => { if (canToggle === true) { toggle(status, index) } }} className={setStatus()}>

        </div>
    )
}

export default GridItem