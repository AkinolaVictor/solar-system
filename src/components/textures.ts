import * as THREE from "three";

const textureLoader = new THREE.TextureLoader()

export const sunTexture = textureLoader.load(
    "/textures/sun.jpg"
)

const mecuryTexture = textureLoader.load(
    "/textures/mecury.jpg"
)

const venusTexture = textureLoader.load(
    "/textures/venus.jpg"
)

const earthTexture = textureLoader.load(
    "/textures/earth.jpg"
)

const marsTexture = textureLoader.load(
    "/textures/mars.jpg"
)

const moonTexture = textureLoader.load(
    "/textures/moon.jpg"
)

// https://matheowis.github.io/HDRI-to-CubeMap/
export const backgroundCubeMap = new THREE.CubeTextureLoader()
                            .setPath("/textures/cubeMap/")
                            .load([
                                "px.png",
                                "nx.png",
                                "py.png",
                                "ny.png",
                                "pz.png",
                                "nz.png",
                            ])


export const mecuryMaterial = new THREE.MeshStandardMaterial({map: mecuryTexture})
export const venusMaterial = new THREE.MeshStandardMaterial({map: venusTexture})
export const earthMaterial = new THREE.MeshStandardMaterial({map: earthTexture})
export const marsMaterial = new THREE.MeshStandardMaterial({map: marsTexture})
export const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture})