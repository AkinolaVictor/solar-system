import { getMesh } from "@/utils/exports";
import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initializer({canvas}){
    const { earthMaterial, marsMaterial, mecuryMaterial, sunTexture, venusMaterial, moonMaterial, backgroundCubeMap, } = require("./textures");
    const {innerWidth, innerHeight, requestAnimationFrame, addEventListener, devicePixelRatio} = window
    const aspectRatio = innerWidth/innerHeight
    const scene = new THREE.Scene()

    // texture loader

    // console.log(sunTexture)

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
    const earthGeometry = new THREE.SphereGeometry(1, 20, 20)
    const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture})
    const earthMaterialz = new THREE.MeshBasicMaterial({color: "blue"})
    const moonMaterialz = new THREE.MeshBasicMaterial({color: "grey"})
    
    const sun = new THREE.Mesh(sphereGeometry, sunMaterial)
    const earth = new THREE.Mesh(earthGeometry, earthMaterialz)
    const moon = new THREE.Mesh(sphereGeometry, moonMaterialz)
    
    sun.scale.setScalar(5)
    earth.scale.setScalar(0.6)
    moon.scale.setScalar(0.3)
    scene.add(sun)
    // scene.add(earth)
    // earth.position.x = 10
    // moon.position.x=2
    // earth.add(moon)
    scene.background = backgroundCubeMap

    const planets = [
        {
            name: "Mecury",
            radius: 0.5,
            distance: 10,
            speed: 0.01,
            material: mecuryMaterial,
            moons: []
        },
        {
            name: "Venus",
            radius: 0.8,
            distance: 15,
            speed: 0.007,
            material: venusMaterial,
            moons: []
        },
        {
            name: "Earth",
            radius: 1,
            distance: 20,
            speed: 0.005,
            material: earthMaterial,
            moons: [
                {
                    name: "Moon",
                    radius: 0.3,
                    distance: 3, 
                    speed: 0.015
                }
            ]
        },
        {
            name: "Mars",
            radius: 0.7,
            distance: 25,
            speed: 0.003,
            material: marsMaterial,
            moons: [
                {
                    name: "Phobos",
                    radius: 0.1,
                    distance: 2,
                    speed: 0.015
                },
                {
                    name: "Deimos",
                    radius: 0.2,
                    distance: 3,
                    speed: 0.015,
                    color: 0xffffff
                },
            ]
        },
    ]

    const createPlanet = (planet) =>{
        const eachPlanetMesh = new THREE.Mesh(sphereGeometry, planet.material)
        eachPlanetMesh.scale.setScalar(planet.radius)
        eachPlanetMesh.position.x = planet.distance
        return eachPlanetMesh
    }

    const createMoon = (moon) => {
        const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
        moonMesh.scale.setScalar(moon.radius)
        moonMesh.position.x = moon.distance
        return moonMesh
    }
    const planetMeshes = planets.map((planet)=>{
        const eachPlanetMesh = createPlanet(planet)
        scene.add(eachPlanetMesh)

        planet.moons.forEach((moon)=>{
            const moonMesh = createMoon(moon)
            eachPlanetMesh.add(moonMesh)
        })

        return eachPlanetMesh
    })

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 400)
    scene.add(pointLight)

    const camera = new THREE.PerspectiveCamera(
        60,
        innerWidth/innerHeight,
        0.1,
        50
    )

    camera.position.z = 25 // sphere

    const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
    renderer.setSize(innerWidth, innerHeight)
    renderer.render(scene, camera)
    const max_pixel_ratio = Math.min(devicePixelRatio, 2)
    renderer.setPixelRatio(max_pixel_ratio)

    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true


    addEventListener("resize", ()=>{
        camera.aspect = aspectRatio
        camera.updateProjectionMatrix()
        renderer.setSize(innerWidth, innerHeight)
    })

    // const clock = new THREE.Clock()
    function animate(){
        // const elapsedTime = clock.getElapsedTime()
        planetMeshes.forEach((planet, index)=>{
            planet.rotation.y += planets[index].speed
            planet.position.x = Math.sin(planet.rotation.y) * planets[index].distance
            planet.position.z = Math.cos(planet.rotation.y) * planets[index].distance
            planet.children.forEach((moon, index2)=>{
                moon.rotation.y += planets[index].moons[index2].speed
                moon.position.x = Math.sin(moon.rotation.y) * planets[index].moons[index2].distance
                moon.position.z = Math.cos(moon.rotation.y) * planets[index].moons[index2].distance
            })
        })

        controls.update()
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }

    animate()

    // const tl = gsap.timeline({defaults: {duration: 2}})
    // tl.fromTo(mesh.scale, {z:0, y:0, x:0}, {z:1, y:1, x:1})
    // tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
    // tl.fromTo(".title", {opacity: 0}, {opacity: 1})


    return ()=>{
        controls.dispose()
        renderer.dispose()
    }
}

// what is the equivalent of the three mouse events below for touch devices
// "mousedown", "mouseup", "mousemove"