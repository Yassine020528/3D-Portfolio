import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function ComputerModel({ onScreenClick, ...props }) {
  const { nodes, materials } = useGLTF('/glb/desk-computer.glb')
  
  const handlePointerOver = () => document.body.style.cursor = 'pointer'
  const handlePointerOut = () => document.body.style.cursor = 'auto'

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.KeyboardCable_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[34.329, 76.164, 56.062]} />
      <mesh geometry={nodes.Paper2_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[76.15, 75.001, 39.723]} rotation={[0, 0.031, 0]} scale={0.1} />
      <mesh geometry={nodes.Monitor_cable_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[-3.9, 74.815, 28.04]} />
      <mesh geometry={nodes.Speakers_cable_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[27.417, 74.815, 27.427]} />
      <mesh geometry={nodes.Mouse_cord_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[34.329, 76.164, 56.062]} />
      <mesh geometry={nodes.CD_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[-76.997, 75.076, 57.333]} rotation={[-Math.PI, 1.261, -Math.PI]} scale={0.1} />
      <mesh geometry={nodes.Drawers_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[65.098, 0, 55.308]} />
      <mesh geometry={nodes.Phone_stand_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[50.705, 74.815, 18.869]} rotation={[0, -0.193, 0]} />
      <mesh geometry={nodes.Phonehandle_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[46.949, 79.24, 18.508]} rotation={[0.167, -0.19, 0.032]} scale={0.263} />
      <mesh geometry={nodes.CD_case_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[-76.997, 75.356, 57.333]} rotation={[-Math.PI, 1.261, -Math.PI]} scale={0.064} />
      <mesh geometry={nodes.Pen_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[76.512, 76.014, 45.557]} rotation={[0, 0.244, 0]} scale={0.005} />
      <mesh geometry={nodes.Paper_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[74.855, 74.63, 39.723]} rotation={[0, 0.12, 0]} scale={0.1} />
      <mesh geometry={nodes.Floppy_disk_FloppyDisk_0.geometry} material={materials.FloppyDisk} position={[-41.906, 74.815, 65.87]} rotation={[Math.PI / 2, 0, 0.247]} />
      <mesh geometry={nodes.Keyboard_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[-3.76, 74.815, 55.898]} scale={0.305} />
      <mesh geometry={nodes.SpeakerR_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[-33.15, 74.815, 31.868]} rotation={[0, 0.446, 0]} scale={0.18} />
      <mesh geometry={nodes.SpeakerL_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[27.417, 74.815, 27.427]} rotation={[0, -0.102, 0]} scale={0.18} />
      <mesh geometry={nodes.Mousepad_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[42.964, 74.815, 54.261]} rotation={[0, -0.115, 0]} scale={0.149} />
      <mesh geometry={nodes.Mouse_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[34.329, 76.164, 56.062]} scale={0.271} />
      <mesh geometry={nodes.Computer_case_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[-55.078, 74.815, 31.19]} rotation={[0, 0.036, 0]} scale={0.229} />
      <mesh geometry={nodes.Office_desk_ComputerDesk_0.geometry} material={materials.ComputerDesk} scale={0.271} />
      <mesh geometry={nodes.Cube000_ComputerDesk_0.geometry} material={materials.ComputerDesk} position={[10.874, 0, 115.729]} rotation={[0, 0.58, 0]} scale={0.394} />
      
      <mesh 
        geometry={nodes.Computer_monitor001_ComputerDesk_0.geometry} 
        material={materials.ComputerDesk} 
        position={[-3.9, 74.815, 28.04]} 
        scale={[0.192, 0.144, 0.096]} 
        
        onClick={(e) => {
           e.stopPropagation();
           onScreenClick && onScreenClick();
        }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </group>
  )
}

useGLTF.preload('/glb/desk-computer.glb')