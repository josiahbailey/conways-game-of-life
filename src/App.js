import React, { useState } from 'react';
import Grid from './components/Grid'
import GridForm from './components/GridForm'

function App() {
    const [gameArr, setArr] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const point = 10
    const toggleGame = () => {

    }
    // const toggleGridItem = (item, index) => {
    //     let list = [...gameArr]
    //     list[index] = item
    //     setArr(list)
    // }
    return (
        <div className="App">
            <Grid arr={gameArr} point={point} />
        </div>
    );
}

export default App;
