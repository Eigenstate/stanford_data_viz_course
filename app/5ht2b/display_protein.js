var SCENE_WIDTH = SCENE_HEIGHT = 500;

// create a canvas and a renderer, then append to document
var canvas = document.getElementById("5ht2b");
var renderer = new THREE.WebGLRenderer(); // use webgl renderer (GPU!)
var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true}); // use webgl renderer (GPU!)
renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT); // Resizes the output canvas to (width, height), and also sets the viewport to fit that size, starting in (0, 0).
renderer.setClearColor( 0xffffff );
document.body.appendChild(renderer.domElement); // attach renderer to canvas

// scene - where we put our models
var scene = new THREE.Scene();

// camera - how we look at our scene
var camera = new THREE.PerspectiveCamera( 45, SCENE_WIDTH / SCENE_HEIGHT, 1, 10000 );
camera.position.z = 450;
// orbit controls - how we use our mouse to move the camera
var controls = new THREE.OrbitControls( camera );
controls.addEventListener( 'change', render );

var parent = new THREE.Object3D();

// load ascii model
var jsonLoader = new THREE.JSONLoader();
jsonLoader.load( "5HT2B.js", createScene );
function createScene( geometry, materials ) {
    var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
    parent.add(mesh);
}

scene.add(parent);

function render() {
  renderer.render( scene, camera );
  requestAnimationFrame(render);
}

// ------------------------------------------------------------------------------------------------
// start animation
render();

