import React, { memo } from "react";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import GumballMachine from "./GumballMachine";
import Blender from "./Blender";
import Floor from "./Floor";

const Canvas = memo(() => {
    return (
        <ThreeCanvas>
            <pointLight position={[2, 10, 10]} />
            {/* <GumballMachine /> */}
            <Blender />
            <Floor />
        </ThreeCanvas>
    );
});

export default Canvas;