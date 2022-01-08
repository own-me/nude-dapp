import React from 'react'
import { Canvas as ThreeCanvas } from '@react-three/fiber'
import GumballMachine from './components/GumballMachine';
import Floor from './components/Floor';

const Canvas = (props) => {
    return (
        <ThreeCanvas>
            <pointLight position={[2, 10, 10]} />
            <GumballMachine />
            <Floor />
        </ThreeCanvas>
  )
}

export default Canvas;