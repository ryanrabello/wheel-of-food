import * as THREE from "three";
import pxURL from "./px.png";
import nxURL from "./nx.png";
import pyURL from "./py.png";
import nyURL from "./ny.png";
import pzURL from "./pz.png";
import nzURL from "./nz.png";

const texture = new THREE.CubeTextureLoader().load([
  pxURL,
  nxURL,
  pyURL,
  nyURL,
  pzURL,
  nzURL,
]);
export default texture;
