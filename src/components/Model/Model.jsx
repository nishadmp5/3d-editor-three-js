import { useGLTF } from '@react-three/drei'
import React, { useEffect, useMemo } from 'react'

const Model = ({path,...props}) => {

    const { scene } = useGLTF(path)

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


export default Model