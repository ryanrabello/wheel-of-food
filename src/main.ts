import "./style.css";
import Matter from "matter-js";
import { setupMatterjs } from "./physics";
import * as THREE from "three";

window.Matter = Matter;

/**
 * TOODs
 * fix physics so it's not dependent on screen size
 * render stuff with Three.js
 * hook up physics
 * motion blur?
 * Add pegs
 * add paddler
 * Add text
 * logic for figuring out what you picked
 *
 */

// setupMatterjs();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// GEOMETRY
const geometry = new THREE.CylinderGeometry(1, 1, .5, 30);
const material = new THREE.MeshPhysicalMaterial({ color: 'blue' });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);



// LIGHT
const pointLight = new THREE.PointLight( 'white', 1);
pointLight.position.set( -3, 3, 3 );
scene.add( pointLight );

const sphereSize = .2;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );


// TEXT
// const text = new THREE.TextGeometry

camera.position.z = 10;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.005;

  renderer.render(scene, camera);
}
animate();
