import React, { memo } from "react";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
// import GumballMachine from "./GumballMachine";
import Blender from "./Blender";
import Floor from "./Floor";
import CameraController from "./OrbitalControls/CameraControls";


const Canvas = memo(() => {
    return (
        <ThreeCanvas>
            <pointLight position={[0, 10, 20]} />
            <ambientLight intensity={0.4} />
            <CameraController />
            {/* <GumballMachine /> */}
            <Blender />
            <Floor />
        </ThreeCanvas>
    );
});

export default Canvas;