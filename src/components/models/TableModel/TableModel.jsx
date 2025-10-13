import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

const TableModel = (props) => {

    const { scene } = useGLTF("/models/table.glb")

    useEffect(()=>{
        scene.traverse((child)=>{
            if(child.isMesh){
                child.castShadow = true;
            }
        })
    },[scene])

  return (
    <primitive object={scene} {...props}/>
  )
}

useGLTF.preload("/models/table.glb")

export default TableModel