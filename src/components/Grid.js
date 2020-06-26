import React, { useState, useEffect } from 'react'
import GridItem from './GridItem'
import useInterval from '../hooks/useInterval'

const Grid = ({ arr, point }) => {
    const [gridArr, setGrid] = useState(arr)
    const [canToggle, setToggle] = useState(true)
    const [auto, setAuto] = useState(false)
    const [delay, setDelay] = useState(1000)
    const [gen, setGen] = useState(0)
    const [skip, setSkip] = useState(0)
    const i = useInterval((e) => { if (auto === true) { resolveFrame() } }, delay)

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

    const resolveFrame = (e) => {
        let arr = [...gridArr]
        setGrid(arr.map((item, idx) => {
            return checkItem(arr, idx, point)
        }))
        setGen(gen + 1)
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
        setAuto(false)
        setGrid(arr)
        setToggle(true)
        setGen(0)
    }

    const toggleGame = (e) => {
        setAuto(!auto)
    }

    const skipGen = async (skips) => {
        console.log(skips)
        let arr = [...gridArr]
        for (let i = 0; i < skips; i++) {
            console.log('skipping')
            arr = arr.map((item, idx) => {
                return checkItem(arr, idx, point)
            })
        }
        setGrid(arr)
        setGen(gen + skips)
        setToggle(false)
    }

    return (
        <div className='container'>
            <h2>{`Generation ${gen}`}</h2>
            <div className='grid'>
                {gridArr.map((item, idx) => {
                    if (idx !== 0 && (idx + 1) % (point) === 0) {
                        return <><GridItem key={idx} toggle={toggleGridItem} canToggle={canToggle} status={item} index={idx} /><br /></>
                    } else {
                        return <GridItem key={idx} toggle={toggleGridItem} canToggle={canToggle} status={item} index={idx} />
                    }
                })}
                {/*gridArr.map((item, idx) => {

                }) */}
            </div>
            <div className='inputs'>
                <button onClick={toggleGame}>{auto ? 'Stop' : 'Start'}</button>
                <button onClick={resolveFrame}>Step</button>
                <button onClick={resetGrid}>Reset</button>
                <input onChange={e => setDelay(e.target.value)} name='delay' type='number' value={delay} />
            </div>
            <div>
                <input onChange={e => setSkip(e.target.value)} type='number' name='skip' value={skip} />
                <button onClick={e => skipGen(parseInt(skip))}>Skip</button>
            </div>
        </div>
    )
}

export default Grid