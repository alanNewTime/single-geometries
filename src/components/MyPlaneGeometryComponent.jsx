import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Edges } from "@react-three/drei";
import * as THREE from "three"; // Make sure THREE is imported for the DoubleSide constant
import { useRef, useState } from "react";

//PLANE ELEMENT
function PlaneElement({ width, height }) {
  const mesh = useRef(null);
  useFrame(() => {
    mesh.current.rotation.y += 0.01;
    mesh.current.rotation.x += 0.01;
  });

  return (
    <>
      <mesh ref={mesh}>
        <planeGeometry attach="geometry" args={[width, height, 4]} />
        <meshBasicMaterial
          attach="material"
          color="brown"
          side={THREE.DoubleSide} //This makes sure that the plane is full from both sides and not just one
        />

        {/* Edges to draw segment line */}
        <Edges scale={1} threshold={0.1}>
          <lineBasicMaterial color="" linewidth={2} />
        </Edges>
      </mesh>
    </>
  );
}

//PLANE ELEMENT CONTAINER
function MyPlaneGeometryComponent() {
  const [inputWidth, setInputWidth] = useState(4);
  const [inputHeight, setInputHeight] = useState(4);

  const handleWidthChange = (e) => {
    setInputWidth(e.target.value);
  };

  const handleHeightChange = (e) => {
    setInputHeight(e.target.value);
  };

  return (
    <>
      <Canvas camera={{ position: [-5, 2, 9], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <PlaneElement width={inputWidth} height={inputHeight} />
        <OrbitControls />
      </Canvas>

      {/* controls plane start */}
      <div className="plane-controls">
        <p>Width</p>
        <input type="number" value={inputWidth} onChange={handleWidthChange} />
        <p>Height</p>
        <input
          type="number"
          value={inputHeight}
          onChange={handleHeightChange}
        />
      </div>
      {/* controls plane end */}
    </>
  );
}

export default MyPlaneGeometryComponent;
