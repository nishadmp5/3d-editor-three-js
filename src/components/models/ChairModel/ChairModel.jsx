import { useGLTF } from '@react-three/drei'
import React, { useEffect, useMemo } from 'react'

const ChairModel = (props) => {

    const { scene } = useGLTF("/models/chair.glb")

    const clonedScene = useMemo(()=> scene.clone(),[scene])

    useEffect(()=>{
        clonedScene.traverse((child)=>{
            if(child.isMesh){
                child.castShadow = true;
            }
        })
    },[clonedScene])

  return (
    <primitive object={clonedScene} {...props}/>
  )
}

useGLTF.preload("/models/chair.glb")

export default ChairModel