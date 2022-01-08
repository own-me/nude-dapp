import React, { memo } from "react";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import GumballMachine from "./GumballMachine";
import Floor from "./Floor";

const Canvas = memo(() => {
    return (
        <ThreeCanvas>
            <pointLight position={[2, 10, 10]} />
            <GumballMachine />
            <Floor />
        </ThreeCanvas>
    );
});

export default Canvas;