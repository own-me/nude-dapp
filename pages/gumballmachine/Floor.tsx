import React, { memo } from "react";

const Floor = memo(() => {
    return (
        <mesh position={[-1, -15, -40]} rotation={[30, 0, 0]}>
            <circleGeometry args={[30, 132]} />
            <meshPhysicalMaterial color="#7215c4" roughness={0} metalness={3} transmission={0.2} ior={1.5} thickness={5} clearcoat={1} clearcoatRoughness={0.3}  clearcoatNormalScale={5} envMapIntensity={0.7} normalRepeat={3} />
        </mesh>
    );
});

export default Floor;