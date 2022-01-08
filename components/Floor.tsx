import React from 'react'

const Floor = (props) => {
    return (
        <mesh position={[0, -1.995, 0]} rotation={[1.2, 0, 0]}>
            <circleGeometry args={[10, 32]} />
            <lineBasicMaterial color={'yellow'} />
        </mesh>
    )
}

export default Floor;