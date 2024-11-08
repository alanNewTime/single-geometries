import "../App.css";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Edges } from "@react-three/drei"; // helps when we want to draw the segment lines

//BOX ELEMENT
function BoxElement({ width, height, depth }) {
  //ref to target the mesh
  const mesh = useRef(null);
  // used to animate our object, we called it here after having imported it above
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });
  return (
    <>
      {/* "position" indicates the box position in space */}
      <mesh ref={mesh} position={[-1, 1, 0]}>
        {/* "args" indicates the box geometry. width,height,depth */}
        <boxGeometry attach="geometry" args={[width, height, depth]} />
        <meshStandardMaterial attach="material" color="red" />

        {/* Edges to draw segment lines  */}
        <Edges scale={1} threshold={0.1}>
          <lineBasicMaterial color="red" linewidth={2} />
        </Edges>
      </mesh>
    </>
  );
}

//BOX ELEMENT CONTAINER
function MyBoxGeometryComponent() {
  const [inputWidth, setInputWidth] = useState(1);
  const [inputHeight, setInputHeight] = useState(1);
  const [inputDepth, setInputDepth] = useState(3);

  const handleWidthChange = (e) => {
    setInputWidth(e.target.value);
  };

  const handleHeightChange = (e) => {
    setInputHeight(e.target.value);
  };
  const handleDepthChange = (e) => {
    setInputDepth(e.target.value);
  };

  return (
    <>
      {/* "position" indicates the camera position in space. therefore the angle at which me see our box*/}
      <Canvas camera={{ position: [-5, 2, 9], fov: 40 }}>
        {/* Light to brighten the scene */}
        <ambientLight intensity={0.3} />
        <BoxElement
          width={inputWidth}
          height={inputHeight}
          depth={inputDepth}
        />
        <OrbitControls />
      </Canvas>

      {/* controls box start */}
      <div className="box-controls">
        <p>Width: </p>
        <input type="number" value={inputWidth} onChange={handleWidthChange} />
        <p>Height: </p>
        <input
          type="number"
          value={inputHeight}
          onChange={handleHeightChange}
        />
        <p>Depth: </p>
        <input type="number" value={inputDepth} onChange={handleDepthChange} />
      </div>
      {/* controls box end */}
    </>
  );
}

export default MyBoxGeometryComponent;
