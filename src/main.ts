import Matter from "matter-js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
// @ts-ignore
import { FlakesTexture } from "three/examples/jsm/textures/FlakesTexture";
import wheelURL from "./assets/Wheel of Foodv1.stl?url";
import aftLoungeTexture from "./assets/aft_lounge_cube_map/texture";
import { setupMatterjs } from "./physics";
import "./style.css";

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
 * Figure out uv mapping
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

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  // alpha: true,
});
// Random stuff for ball to look better
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 1.25;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// WHEEL
let wheel:
  | THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>
  | undefined;

let texture = new THREE.CanvasTexture(new FlakesTexture());
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

//repeat the wrapping 10 (x) and 6 (y) times
texture.repeat.x = 10;
texture.repeat.y = 6;

const ballMaterial = {
  clearcoat: 1.0,
  cleacoatRoughness: 0.6,
  metalness: 0.5,
  roughness: 0.5,
  color: 0x8418ca,
  normalMap: texture,
  normalScale: new THREE.Vector2(-1, -1),
  // normalScale: new THREE.Vector2(0.15, 0.15),
  // normalScale: new THREE.Vector2(10, 2),
};

//add material setting
const material = new THREE.MeshPhysicalMaterial(ballMaterial);

const loader = new STLLoader();
loader.load(
  wheelURL,
  function (geometry) {
    // TODO: Compute tangents so that sparckles work.
    // geometry.computeTangents();
    const mesh = new THREE.Mesh(geometry, material);
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

camera.position.z = 40;

// ORBIT
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  rotate(wheel);
  // rotate(ballMesh);

  renderer.render(scene, camera);
}
animate();

function rotate(thing: THREE.Mesh | undefined) {
  if (thing) {
    // thing.rotation.x += 0.01;
    // thing.rotation.y += 0.012;
    thing.rotation.z += 0.01;
  }
}
