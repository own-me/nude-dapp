import React from "react";
import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gumballmachine from "./gumballmachine.glb";

export default function Blender() {
    const gltf = useLoader(GLTFLoader, gumballmachine);

    return (
        <primitive
            object={gltf.scene}
            position={[0, -10, -22]}
            rotation={[0, 4.70, -0.3]}
        />
    );
}

useGLTF.preload(gumballmachine);
