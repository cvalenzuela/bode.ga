/*
Alt Docs Volumetric Captures
*/

const THREE = require('three');
const utils = require('./utils');

// add all objects here
let objects = ['napkins','coke', 'brownBag', 'croissant02', 'oatmeal', 'hamTomato','empanada', 'croissantChesse', 'creamCheese', 'coffee02','coffee01','bagelButter', 'banana', 'bag', 'chips', 'croissant','hamTurkey'];
let loadedModels = {};
let container, camera, scene, renderer, currentObject, manager;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let loading = document.getElementById('loading');
let isDragging = false;

let render = () => {
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

let animate = () => {
  requestAnimationFrame(animate);
  !isDragging && (currentObject.rotation.y += 0.01);
  render();
}

let init = () => {

  // Create the inputs
  let inputs = document.getElementById('models');
  objects.forEach((object, i) => {
    let input = document.createElement('input');
    let txt = document.createElement('p');
    txt.innerText = object;
    input.type = 'radio';
    input.name = 'model';
    i == 0 && (input.checked = true);
    input.onclick = function(){
      changeModel(this)
    };
    input.value = object;
    inputs.appendChild(input);
    inputs.appendChild(txt);
    // <input type="radio" name="model" checked onclick="changeModel(this);" value="banana">banana
  });


  // Append to DOM
  container = document.createElement('div');
  document.body.appendChild(container);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 0.3;

  // Scene
  scene = new THREE.Scene();
  let ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
  let directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0, 0, 1).normalize();
  scene.add(directionalLight);

  // Loading manager
  manager = new THREE.LoadingManager();

  manager.onProgress = xhr => {
    if (xhr.lengthComputable) {
      let percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  }

  manager.onLoad = () => {
    loading.style.display = 'none';
    animate();
  }

  // Object Loader
  objects.forEach((model, i) => {
    let path = './../dist/models/' + model + '/' + model;
    //let path = '../../dist/models/' + model + '/' + model;
    let objectToLoad = new THREE.JSONLoader(manager).load(path + '.js', (geometry) => {
      let material = new THREE.MeshBasicMaterial();
      let dollyObject = new THREE.Mesh(geometry, material);
      material.map = new THREE.TextureLoader(manager).load(path + '.jpg');
      loadedModels[model] = dollyObject;
      if (i == 0) {
        document.addEventListener('mousemove', (e) => { utils.onDocumentMouseMove(e, currentObject, isDragging) }, false);
        scene.add(dollyObject) && (currentObject = dollyObject);
      }
    })
  })

  // Render
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Event Listeners
  document.addEventListener('mousedown', () => { isDragging = true; });
  document.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('DOMMouseScroll', (e) => { utils.onScroll(e, camera) }, false);
  window.addEventListener('mousewheel', (e) => { utils.onScroll(e, camera) }, false);
  window.addEventListener('resize', (e) => { utils.onWindowResize(e, renderer, camera) }, false);
}

// Change model with radio btns
let changeModel = (e) => {
  for (let model in loadedModels) {
    if (e.value == model) {
      currentObject = loadedModels[model];
      document.addEventListener('mousemove', (e) => { utils.onDocumentMouseMove(e, currentObject, isDragging) }, false);
      scene.add(currentObject);
    } else {
      scene.remove(loadedModels[model]);
    }
  }
}

// Start
init();