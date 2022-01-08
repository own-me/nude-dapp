import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const GumballMachine = (props) => {
    const ref = useRef()
    useFrame((state, delta) => (ref.current.rotation.y += 0.005));

    return (
        <group ref={ref} position={[0, -1, 0]}>
            <mesh position={[0, 2, 0]}>
                <sphereGeometry args={[1.5, 40, 20]} />
                <meshToonMaterial color={'red'} opacity={0.2} />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[1, 1.5, 2, 10]} />
                <meshToonMaterial color={"#D842FE"} />
            </mesh>
          
        </group>
    )
}

export default GumballMachine;