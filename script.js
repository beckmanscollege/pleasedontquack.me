// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();
// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Keep the 3D object on a global variable so we can access it later
let object;

// OrbitControls allow the camera to move around the scene
let controls;

// Set which object to render
let objToRender =
  "https://cdn.glitch.global/8b3f5487-a392-4a06-ac03-d2334be70d1c/Anka_1.3(stor).glb?v=1707477561872";

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Load the file
loader.load(
  objToRender,
  function (gltf) {
    // If the file is loaded, add it to the scene
    object = gltf.scene;

    // Calculate the bounding box of the object
    const box = new THREE.Box3().setFromObject(object);

    // Calculate the center of the bounding box
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Move the object so that its center of mass coincides with the scene's origin
    object.position.sub(center);

    // Add the object to the scene
    scene.add(object);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.gammaOutput = true; // Enable gamma correction for brighter rendering

// Add the renderer to the DOM
document.getElementById("model").appendChild(renderer.domElement);

// Set how far the camera will be from the 3D model
camera.position.z =
  objToRender ===
  "https://cdn.glitch.global/8b3f5487-a392-4a06-ac03-d2334be70d1c/Anka_1.3(stor).glb?v=1707477561872"
    ? 11
    : 500;

const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500); // top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1000);
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 10); // Adjust intensity here
scene.add(hemisphereLight);


// Render the scene
function animate() {
  requestAnimationFrame(animate);
  // Here we could add some code to update the scene, adding some automatic movement

  // Make the eye move
  if (
    object &&
    objToRender ===
      "https://cdn.glitch.global/8b3f5487-a392-4a06-ac03-d2334be70d1c/Anka_1.3(stor).glb?v=1707477561872"
  ) {
    // I've played with the constants here until it looked good
    object.rotation.y = -3 + (mouseX / window.innerWidth) * 3;
    object.rotation.x = -1.2 + (mouseY * 2.5) / window.innerHeight;
  }
  renderer.render(scene, camera);
}

// Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

// Start the 3D rendering
animate();


// Click function 
var countdown = 10; // Initial countdown value

// Function to update countdown display
function updateCountdown() {
  // Play click sound
  var audio = document.getElementById("clickSound");
  audio.currentTime = 0;
  audio.play();
}

// Function to handle mouse clicks
function handleClick() {
  // Check if countdown is greater than 0
  if (countdown > 0) {
    // Decrement countdown
    countdown--;

    // Update countdown display
    updateCountdown();
    
    // Log current countdown value
    console.log("Current countdown value: " + countdown);
  }
  
  // Check if countdown reaches 0
  if (countdown === 0) {
    console.log("Crash");
window.location.href = "http://www.YouClickedTooManyTimesAndTurnedOffTheWebbsite.com";
/*window.open('','_self').close()*/
  }
}

// Add event listener to track mouse clicks
document.addEventListener("click", handleClick);

// Update countdown display initially
updateCountdown();
