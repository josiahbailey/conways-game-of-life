import React, { useState, useEffect } from 'react'
import GridItem from './GridItem'
// array of user input length, array starts in state user sets
// break point which specifies how to access the array
// 

const Grid = ({ arr, point }) => {
    const [gridArr, setGrid] = useState(arr)
    const [canToggle, setToggle] = useState(true)
    const [auto, setAuto] = useState(false)

    const checkItem = (list, index, point) => {
        let arr = [...list]
        let count = arr[index] === 0 ? 0 : -1
        let idx = index + point
        for (let i = 0; i <= 2; i++) {
            if (arr[idx] === 1) {
                count += 1
            }
            if (arr[idx - 1] === 1) {
                count += 1
            }
            if (arr[idx + 1] === 1) {
                count += 1
            }
            idx -= point
        }
        if (count < 2) {
            return 0
        } else if (count < 4) {
            return 1
        } else {
            return 0
        }
    }

    const resolveFrame = () => {
        let arr = [...gridArr]
        setGrid(arr.map((item, idx) => {
            return checkItem(arr, idx, point)
        }))
        setToggle(false)
    }

    const toggleGridItem = (status, index) => {
        let list = [...gridArr]
        if (status === 1) {
            list[index] = 0
        } else if (status === 0) {
            list[index] = 1
        }
        setGrid(list)
    }

    const resetGrid = (e) => {
        setGrid(arr)
    }

    const toggleGame = (e) => {
        setAuto(!auto)
    }

    useEffect(() => {
        while (auto === true) {
            setTimeout(() => {
                resolveFrame()
            }, 100)
        }
    }, [auto])


    return (
        <div className='grid'>
            {gridArr.map((item, idx) => {
                if (idx !== 0 && (idx + 1) % point === 0) {
                    return <><GridItem toggle={toggleGridItem} canToggle={canToggle} status={item} index={idx} /><br /></>
                } else {
                    return <GridItem toggle={toggleGridItem} canToggle={canToggle} status={item} index={idx} />
                }
            })}
            <button onClick={toggleGame}>{auto ? 'Stop' : 'Start'}</button>
            <button onClick={e => resolveFrame()}>Step</button>
            <button onClick={resetGrid}>Reset</button>
        </div>
    )
}

export default Grid