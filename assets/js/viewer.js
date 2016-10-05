/* global THREE */
/* global Stats */

var viewer = document.getElementById("viewer");

var WIDTH = viewer.offsetWidth;
var HEIGHT = viewer.offsetHeight;

var renderer;
var camera;
var scene;
var controls;

var model;

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);

    viewer.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.z = 15;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    scene.add(camera);
}

function control() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.keyPanSpeed = 0;
}

function lights() {

    var light = new THREE.PointLight(0xFFFFFF);
    camera.add(light);
}

function axis() {
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
}

function render() {
    requestAnimationFrame(render);

    //stats.begin();

    controls.update();

    //light.lookAt(camera.target);

    renderer.render(scene, camera);

    //stats.end();
}

function startRendering() {

    init();
    control();
    lights();
    //model();
    axis();


    onRendererResize();
    render();

}

function onRendererResize() {
    WIDTH = viewer.offsetWidth;
    HEIGHT = viewer.offsetHeight;

    renderer.setSize(WIDTH, HEIGHT);

    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

var modelTimer;
var path;

function startLoading(newPath){
    path = newPath
    modelTimer = window.setInterval(loadModel, 1000);
    //alert("Loading " + path);
}

function loadModel(){
    var loader = new THREE.STLLoader();

    loader.load(path, function(geometry) {
        
        //alert(geometry);
        
        if (geometry && geometry != null) {
            
            //alert("loaded");

            window.clearInterval(modelTimer);

            var shapeMaterial = new THREE.MeshLambertMaterial({
                color: 0xCC0000
            });

            var shape = new THREE.Mesh(geometry, shapeMaterial);

            shape.rotation.x = -Math.PI / 2;

            if(model){
                scene.remove(model);
            }

            model = shape;

            scene.add(shape);
        }
    });
}