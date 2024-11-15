import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three"; // Make sure THREE is imported for the DoubleSide constant
import { useRef, useState } from "react";

//PLANE ELEMENT
function PlaneElement({
  widthProp,
  heightProp,
  widthSegmentProp,
  heightSegmentProp,
}) {
  const mesh = useRef(null);
  useFrame(() => {
    mesh.current.rotation.y += 0.001;
    mesh.current.rotation.x += 0;
  });

  return (
    <>
      <group ref={mesh}>
        {/* solid plane */}
        <mesh>
          <planeGeometry
            attach="geometry"
            args={[widthProp, heightProp, widthSegmentProp, heightSegmentProp]}
          />
          <meshStandardMaterial
            attach="material"
            color="brown"
            side={THREE.DoubleSide} //This makes sure that the plane is full from both sides and not just one
          />
        </mesh>

        {/* wireFrame linked to the plane */}
        <mesh>
          <planeGeometry
            attach="geometry"
            args={[widthProp, heightProp, widthSegmentProp, heightSegmentProp]}
          />
          <meshBasicMaterial attach="material" color="white" wireframe={true} />
        </mesh>
      </group>
    </>
  );
}

//PLANE ELEMENT CONTAINER
function MyPlaneGeometryComponent() {
  // solid plane variables
  const [inputWidth, setInputWidth] = useState(4);
  const [inputHeight, setInputHeight] = useState(4);

  //wireframe variables
  const [inputWidthSegments, setInputWidthSegments] = useState(1);
  const [inputHeightSegments, setInputHeightSegments] = useState(1);

  const handleWidthChange = (e) => {
    setInputWidth(e.target.value);
  };

  const handleHeightChange = (e) => {
    setInputHeight(e.target.value);
  };

  const handleWidthSegmentsChange = (e) => {
    setInputWidthSegments(e.target.value);
  };
  const handleHeightSegmentsChange = (e) => {
    setInputHeightSegments(e.target.value);
  };
  return (
    <>
      <Canvas camera={{ position: [-5, 2, 9], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <PlaneElement
          widthProp={inputWidth}
          heightProp={inputHeight}
          widthSegmentProp={inputWidthSegments}
          heightSegmentProp={inputHeightSegments}
        />
        <OrbitControls />
      </Canvas>

      {/* controls plane start */}
      <div className="plane-controls">
        <p>Width: </p>
        <input type="number" value={inputWidth} onChange={handleWidthChange} />
        <p>Height: </p>
        <input
          type="number"
          value={inputHeight}
          onChange={handleHeightChange}
        />
        <p>Width Segment: </p>
        <input
          type="number"
          value={inputWidthSegments}
          onChange={handleWidthSegmentsChange}
        />
        <p>Height Segment: </p>
        <input
          type="number"
          value={inputHeightSegments}
          onChange={handleHeightSegmentsChange}
        />
      </div>
      {/* controls plane end */}
    </>
  );
}

export default MyPlaneGeometryComponent;
