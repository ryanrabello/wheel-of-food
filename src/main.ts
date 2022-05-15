import Matter from "matter-js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

import wheelURL from "./assets/Wheel of Foodv1.stl?url";
import aftLoungeTexture from './assets/aft_lounge_cube_map/texture';
console.log(wheelURL);
import { setupMatterjs } from "./physics";
import "./style.css";
import texture from "./assets/aft_lounge_cube_map/texture";

window.Matter = Matter;

/**
 * TOODs
 * fix physics so it's not dependent on screen size
 * Initial lighting
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
scene.environment = aftLoungeTexture;
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
let wheel;
const material = new THREE.MeshPhysicalMaterial({
  color: "rgba(202,59,253,0.66)",
  metalness: 0.15,
  roughness: 0.15,
  transmission: 0.2,
  clearcoat: 1.0,
  clearcoatRoughness: 0.25,
});
const loader = new STLLoader();
loader.load(
  wheelURL,
  function (geometry) {
    const mesh = new THREE.Mesh(geometry, material);
    var box = new THREE.Box3().setFromObject(mesh);
    console.log(box);
    scene.add(mesh);
    wheel = mesh;
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

// LIGHT
const pointLight = new THREE.PointLight("white", 1);
pointLight.position.set(-15, 15, 15);
scene.add(pointLight);

const sphereSize = 0.2;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

// TEXT
// const text = new THREE.TextGeometry

camera.position.z = 50;

function animate() {
  requestAnimationFrame(animate);

  if (wheel) {
    wheel.rotation.x += 0.01;
    wheel.rotation.y += 0.01;
    wheel.rotation.z += 0.005;
  }

  renderer.render(scene, camera);
}
animate();
