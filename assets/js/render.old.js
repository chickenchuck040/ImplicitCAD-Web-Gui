/* global THREE */
/* global $ */
/* global Stats */

// set the scene size
var WIDTH = window.innerWidth - $("#code").width(),
    HEIGHT = window.innerHeight;

// set some camera attributes
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $container = $('#container');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();

renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";

renderer.domElement.width = renderer.domElement.style.width;
renderer.domElement.height = renderer.domElement.style.height;

var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
//var camera = new THREE.OrthographicCamera(WIDTH/-2, WIDTH/2, HEIGHT/2, HEIGHT/-2, 0.1, 1000 );

var scene = new THREE.Scene();

// the camera starts at 0,0,0 so pull it back
camera.position.z = 15;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);
//renderer.setSize(renderer.domElement.style.width, renderer.domElement.style.height);

// attach the render-supplied DOM element
$container.append(renderer.domElement);



var loader = new THREE.STLLoader();
loader.load('./model.stl', function(geometry) {

    var shapeMaterial = new THREE.MeshLambertMaterial({
        color: 0xCC0000
    });

    var shape = new THREE.Mesh(geometry, shapeMaterial);
    
    shape.rotation.x = -Math.PI/2;

    scene.add(shape);
});

var xaxisGeometry = new THREE.Geometry();
xaxisGeometry.vertices.push(
    new THREE.Vector3(-1000, 0, 0),
    new THREE.Vector3(1000, 0, 0)
);
var xaxisMaterial = new THREE.LineBasicMaterial({
    color: 0x0000ff
});
var xaxis = new THREE.Line(xaxisGeometry, xaxisMaterial);
scene.add(xaxis);

var yaxisGeometry = new THREE.Geometry();
yaxisGeometry.vertices.push(
    new THREE.Vector3(0, -1000, 0),
    new THREE.Vector3(0, 1000, 0)
);
var yaxisMaterial = new THREE.LineBasicMaterial({
    color: 0x00ff00
});
var yaxis = new THREE.Line(yaxisGeometry, yaxisMaterial);
scene.add(yaxis);

var zaxisGeometry = new THREE.Geometry();
zaxisGeometry.vertices.push(
    new THREE.Vector3(0, 0, -1000),
    new THREE.Vector3(0, 0, 1000)
);
var zaxisMaterial = new THREE.LineBasicMaterial({
    color: 0xff0000
});
var zaxis = new THREE.Line(zaxisGeometry, zaxisMaterial);
scene.add(zaxis);

// create a point light
var light = new THREE.PointLight(0xFFFFFF);

camera.add(light);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

scene.add(camera);

//var stats = new Stats();
//stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
//document.body.appendChild( stats.dom );

function render() {
    requestAnimationFrame(render);
    
    //stats.begin();

    controls.update();

    //light.lookAt(camera.target);

    renderer.render(scene, camera);
    
    //stats.end();
}

render();