import "../App.css";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

//BOX ELEMENT
function BoxElement({
  widthProp,
  heightProp,
  depthProp,
  widthSegmentProp,
  heightSegmentProp,
  depthSegmentProp,
}) {
  const mesh = useRef(null);

  // Animation to rotate the box
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      {/* group that contains my box and my wireframe START */}
      <group ref={mesh}>
        {/* Solid box */}
        <mesh position={[-1, 1, 0]}>
          <boxGeometry
            attach="geometry"
            args={[widthProp, heightProp, depthProp]}
          />
          <meshStandardMaterial attach="material" color="pink" />
        </mesh>

        {/* Wireframe over the box, here i add the segments or wireframes */}
        <mesh position={[-1, 1, 0]}>
          <boxGeometry
            attach="geometry"
            args={[
              widthProp,
              heightProp,
              depthProp,
              widthSegmentProp,
              heightSegmentProp,
              depthSegmentProp,
            ]}
          />
          <meshBasicMaterial
            attach="material"
            color="white"
            wireframe={true}
            transparent={true}
            opacity={1} // Adjust opacity for better blending
          />
        </mesh>
      </group>
      {/* group that contains my box and my wireframe END */}
    </>
  );
}

//BOX ELEMENT CONTAINER
function MyBoxGeometryComponent() {
  //box variables
  const [inputWidth, setInputWidth] = useState(1);
  const [inputHeight, setInputHeight] = useState(1);
  const [inputDepth, setInputDepth] = useState(1);

  //wireFram variables
  const [inputWidthSegment, setInputWidthSegment] = useState(1);
  const [inputHeightSegment, setInputHeightSegment] = useState(1);
  const [inputDepthSegment, setInputDepthSegment] = useState(1);

  //box variables handling
  const handleWidthChange = (e) => {
    setInputWidth(e.target.value);
  };

  const handleHeightChange = (e) => {
    setInputHeight(e.target.value);
  };
  const handleDepthChange = (e) => {
    setInputDepth(e.target.value);
  };

  //wireframe variables handling
  const handleWidthSegmentChange = (e) => {
    setInputWidthSegment(e.target.value);
  };
  const handleHeightSegmentChange = (e) => {
    setInputHeightSegment(e.target.value);
  };
  const handleDepthSegmentChange = (e) => {
    setInputDepthSegment(e.target.value);
  };
  return (
    <>
      {/* "position" indicates the camera position in space. therefore the angle at which me see our box*/}
      <Canvas camera={{ position: [-5, 2, 9], fov: 40 }}>
        {/* Light to brighten the scene */}
        <ambientLight intensity={0.3} />
        <BoxElement
          widthProp={inputWidth}
          heightProp={inputHeight}
          depthProp={inputDepth}
          widthSegmentProp={inputWidthSegment}
          heightSegmentProp={inputHeightSegment}
          depthSegmentProp={inputDepthSegment}
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
        <p>Width Segments: </p>
        <input
          type="number"
          value={inputWidthSegment}
          onChange={handleWidthSegmentChange}
        />
        <p>Height Segments : </p>
        <input
          type="number"
          value={inputHeightSegment}
          onChange={handleHeightSegmentChange}
        />
        <p>Depth Segments: </p>
        <input
          type="number"
          value={inputDepthSegment}
          onChange={handleDepthSegmentChange}
        />
      </div>
      {/* controls box end */}
    </>
  );
}

export default MyBoxGeometryComponent;
