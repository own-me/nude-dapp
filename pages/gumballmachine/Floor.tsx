import React, { memo } from "react";

const Floor = memo(() => {
    return (
        <mesh position={[0, -1.995, 0]} rotation={[1.2, 0, 0]}>
            <circleGeometry args={[10, 32]} />
            <lineBasicMaterial color={"yellow"} />
        </mesh>
    );
});

export default Floor;