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

var loader = new THREE.PDBLoader()
loader.load('5ht2b/4nc3.pdb', function ( geometry, geometryBonds, json ) {

    var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    var sphereGeometry = new THREE.IcosahedronGeometry( 1, 2 );

    var offset = geometry.center();
    geometryBonds.translate( offset.x, offset.y, offset.z );

//    for ( var i = 0; i < geometry.vertices.length; i ++ ) {
//
//        var position = geometry.vertices[ i ];
//        var color = geometry.colors[ i ];
//        var element = geometry.elements[ i ];
//
//        var material = new THREE.MeshPhongMaterial( { color: color } );
//
//        var object = new THREE.Mesh( sphereGeometry, material );
//        object.position.copy( position );
//        object.position.multiplyScalar( 75 );
//        object.scale.multiplyScalar( 25 );
//        parent.add( object );
//
//        var atom = json.atoms[ i ];
//
////      var text = document.createElement( 'div' );
////      text.className = 'label';
////      text.style.color = 'rgb(' + atom[ 3 ][ 0 ] + ',' + atom[ 3 ][ 1 ] + ',' + atom[ 3 ][ 2 ] + ')';
////      text.textContent = atom[ 4 ];
//
//        //var label = new THREE.CSS2DObject( text );
//        //label.position.copy( object.position );
//        //root.add( label );
//
//    }

    for ( var i = 0; i < geometryBonds.vertices.length; i += 2 ) {

        var start = geometryBonds.vertices[ i ];
        var end = geometryBonds.vertices[ i + 1 ];

        start.multiplyScalar( 75 );
        end.multiplyScalar( 75 );

        var object = new THREE.Mesh( boxGeometry, new THREE.MeshPhongMaterial( 0xffffff ) );
        object.position.copy( start );
        object.position.lerp( end, 0.5 );
        object.scale.set( 5, 5, start.distanceTo( end ) );
        object.lookAt( end );
        parent.add( object );
    }
    render();
}, function ( xhr ) {

                    if ( xhr.lengthComputable ) {

                        var percentComplete = xhr.loaded / xhr.total * 100;
                        console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

                    }

                }, function ( xhr ) {

                } );

scene.add(parent);

function render() {
renderer.render( scene, camera );
requestAnimationFrame(render);
}

// ------------------------------------------------------------------------------------------------
// start animation
render();

