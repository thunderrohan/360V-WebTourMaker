// Copyright (c) 2025, Rohan Kumar Sahu
// SPDX-License-Identifier: MIT

// Import Three.js and OrbitControls
//Using CDN Links for Modules (No Local Files)
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

// Load 360° image and display it  
const scene = new THREE.Scene();  

// Camera setup
const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio (matches screen)
    0.1, // Near clipping plane
    1000 // Far clipping plane
  );

// Initialize renderer with device pixel ratio (fixes blurriness)
const renderer = new THREE.WebGLRenderer({ 
    canvas: document.querySelector("#canvas-3d"),
    antialias: true // Smooths edges
  });
  renderer.setPixelRatio(window.devicePixelRatio); // Sharpens image on high-res screens
  renderer.setSize(window.innerWidth, window.innerHeight); // Fullscreen

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

// Load your 360° image  
const texture = new THREE.TextureLoader().load("assets/room1.jpg");  
const sphere = new THREE.Mesh(  
    new THREE.SphereGeometry(500, 60, 40),  
    new THREE.MeshBasicMaterial({ map: texture })  
);  
sphere.geometry.scale(-1, 1, 1);  // Fix flipped image  
scene.add(sphere);  

// Camera controls  
const controls = new OrbitControls(camera, renderer.domElement);  
camera.position.set(0, 0, 0.1);  

// Animation loop  
function animate() {  
    requestAnimationFrame(animate);  
    controls.update();  
    renderer.render(scene, camera);  
}  
animate();  

// Switch room (example function)  
function switchRoom() {  
    // You’ll add code here later to change images!  
    alert("Next room button clicked!");  
}  

// uploading image app.js
document.getElementById('upload-btn').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    // Load the uploaded image as a texture
    const texture = new THREE.TextureLoader().load(event.target.result);
    sphere.material.map = texture;
    sphere.material.needsUpdate = true; // Refresh the 3D view
  };
  reader.readAsDataURL(file); // Convert image to data URL
});