import * as THREE from 'three';
// import { createCube, rotateCube } from './cube';
import { createLight, moveLight } from './lighting';
import { OrbitControls, MapControls } from "./orbitcontrol";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { array } from "./mydata"
import { array2 } from "./seconddata"
import { array3 } from "./thirddata"
import { array4 } from "./fourthdata"
import { array5 } from "./fifthdata"
import { array6 } from "./sixthdata"
import { array7 } from "./seventhdata"
import { array8 } from "./lastdata"
import { leftbarri } from "./leftbarricade"
import { rightbarri } from "./rightbarricade"
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'



let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let pressenter = false;

function outoftrack(carx, cary) {

	var leftdist = 1000;
	for (let i = 0; i < leftbarri.length; i += 2) {
		var px = leftbarri[i];
		var py = leftbarri[i + 1];
		var dist = Math.sqrt(((px - carx) * (px - carx)) + ((py - cary) * (py - cary)));

		var currmin = Math.min(dist, leftdist);
		leftdist = currmin
	}

	var rightdist = 1000;
	for (let i = 0; i < rightbarri.length; i += 2) {
		var px = rightbarri[i];
		var py = rightbarri[i + 1];
		var dist = Math.sqrt(((px - carx) * (px - carx)) + ((py - cary) * (py - cary)));

		var currmin = Math.min(dist, rightdist);
		rightdist = currmin
	}

	if (leftdist >= 0.6 || rightdist >= 0.6) {
		return 1;
	}

	return 0;
}

function timeToString(millis) {

	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	var leftmiilies = millis - ((1000 * seconds) + (60000 * minutes))

	if (millis < 60) {
		minutes = 0;
		seconds = 0;
		leftmiilies = millis;
	}

	if (millis >= 60 && millis < 3600) {
		minutes = 0;
		seconds = Math.floor(millis / 60);
		leftmiilies = millis - (seconds * 60);
	}

	if (millis >= 3600) {
		minutes = Math.floor(millis / 3600);;
		seconds = Math.floor((millis - (minutes * 3600)) / 60);
		leftmiilies = millis - (seconds * 60) - (minutes * 3600);
	}
	let todisplaymm = minutes.toString().padStart(2, "0");
	let todisplaysec = seconds.toString().padStart(2, "0");
	let todisplaymilli = leftmiilies.toString().padStart(2, "0");

	var printtext = `${todisplaymm}:${todisplaysec}:${todisplaymilli}`;
	document.getElementById("timer").innerHTML = printtext;
}


const _changeEvent = { type: 'change' };
const _startEvent = { type: 'start' };
const _endEvent = { type: 'end' };

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = 'absolute';

renderer.domElement.style.top = 0;

// border-width: thin;
// border-color: #FFFFFF;

// now you have to make a screen on top
const labelrender = new CSS2DRenderer();
labelrender.setSize(window.innerWidth, window.innerHeight);
labelrender.domElement.style.position = 'absolute'
labelrender.domElement.style.top = "0px";
document.body.appendChild(labelrender.domElement);

document.body.appendChild(renderer.domElement);

const renderer2 = new THREE.WebGLRenderer();
renderer2.setSize(300, 300);
renderer2.domElement.style.position = 'absolute';
renderer2.domElement.style.bottom = 0;
renderer2.domElement.style.border = '5px solid white';
renderer2.domElement.style.borderRadius = '100%';
document.body.appendChild(renderer2.domElement);

const camera2 = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
camera2.position.x = 0;
camera2.position.y = 4;
camera2.position.z = 0;

const controls = new OrbitControls(camera, renderer.domElement);
const controls2 = new OrbitControls(camera2, renderer.domElement);
controls.update();
controls2.update();

const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(0, 20, 0);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(20, 0, 0);
scene.add(light2);

var ambient = new THREE.AmbientLight(0x101030);
scene.add(ambient);

var totalangle = 0;

const gltfLoader = new GLTFLoader();
var model2 = "";
var ferrari = "";
var mclaren = "";

//*************************  SET THE FUEL FUNCTION ************************* //
var fuelposarr = generatepoints();
console.log("my fuels are : ", fuelposarr);
var fcpt = 0;
//*************************  SET THE FUEL FUNCTION ************************* //


gltfLoader.load('/dist/indy_500_motor_speedway_speedway_in_usa/scene.gltf', function (gltf) {

	const model = gltf.scene;
	scene.add(model);



	// stadium = model;
	gltfLoader.load('/dist/lamborgini_terzo/scene.gltf', function (gltf) {

		model2 = gltf.scene;
		model2.scale.set(0.05, 0.05, 0.05)
		model2.position.x = 1;
		model2.position.y = 0;
		model2.position.z = 4;
		scene.add(model2);
		// scene.add(model2);

		// window.addEventListener("keydown", function (event) {

		// 	if (event.key == "ArrowLeft") {
		// 		model2.rotation.y += 0.1;
		// 		totalangle += 0.1;
		// 	}

		// 	if (event.key == "ArrowRight") {
		// 		model2.rotation.y -= 0.1;
		// 		totalangle -= 0.1;
		// 	}

		// });

		const onKeyDown = function (event) {

			switch (event.code) {

				case 'ArrowUp':
				case 'KeyW':
					moveForward = true;
					break;

				case 'ArrowLeft':
				case 'KeyA':
					moveLeft = true;
					break;

				case 'ArrowDown':
				case 'KeyS':
					moveBackward = true;
					break;

				case 'ArrowRight':
				case 'KeyD':
					moveRight = true;
					break;

			}

		};

		const onKeyUp = function (event) {

			switch (event.code) {

				case 'ArrowUp':
				case 'KeyW':
					moveForward = false;
					break;

				case 'ArrowLeft':
				case 'KeyA':
					moveLeft = false;
					break;

				case 'ArrowDown':
				case 'KeyS':
					moveBackward = false;
					break;

				case 'ArrowRight':
				case 'KeyD':
					moveRight = false;
					break;

			}

		};

		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('keyup', onKeyUp);

		// CAN NUMBER - 1
		gltfLoader.load('/dist/fuel_can_with_pbr_textures/scene.gltf', function (gltf) {
			const fuelcan = gltf.scene;
			fuelcan.scale.set(0.00015, 0.00015, 0.00015);
			fuelcan.position.set(fuelposarr[fcpt], 0.02, 4);
			fcpt++;
			fuelcan.lookAt(model2.position.x + 0.2 * Math.cos(totalangle), model2.position.y, model2.position.z - 0.2 * Math.sin(totalangle));
			scene.add(fuelcan);
		});

		// CAN NUMBER - 2
		gltfLoader.load('/dist/fuel_can_with_pbr_textures/scene.gltf', function (gltf) {
			const fuelcan = gltf.scene;
			fuelcan.scale.set(0.00015, 0.00015, 0.00015);
			fuelcan.position.set(fuelposarr[fcpt], 0, 4);
			fcpt++;
			fuelcan.lookAt(fuelposarr[fcpt - 2], 0, 4);
			scene.add(fuelcan);
		});

		// CAN NUMBER - 3
		gltfLoader.load('/dist/fuel_can_with_pbr_textures/scene.gltf', function (gltf) {
			const fuelcan = gltf.scene;
			fuelcan.scale.set(0.00015, 0.00015, 0.00015);
			fuelcan.position.set(fuelposarr[fcpt], 0, 4);
			fcpt++;
			fuelcan.lookAt(fuelposarr[fcpt - 2], 0, 4);
			scene.add(fuelcan);
		});

		// CAN NUMBER - 4
		gltfLoader.load('/dist/fuel_can_with_pbr_textures/scene.gltf', function (gltf) {
			const fuelcan = gltf.scene;
			fuelcan.scale.set(0.00015, 0.00015, 0.00015);
			fuelcan.position.set(fuelposarr[fcpt], 0, -5);
			fcpt++;
			fuelcan.lookAt(fuelposarr[fcpt - 2], 0, -5);
			scene.add(fuelcan);
		});

		// CAN NUMBER - 5
		gltfLoader.load('/dist/fuel_can_with_pbr_textures/scene.gltf', function (gltf) {
			const fuelcan = gltf.scene;
			fuelcan.scale.set(0.00015, 0.00015, 0.00015);
			fuelcan.position.set(fuelposarr[fcpt], 0, -5);
			fcpt++;
			fuelcan.lookAt(fuelposarr[fcpt - 2], 0, -5);
			scene.add(fuelcan);
		});

		// CAN NUMBER - 6
		gltfLoader.load('/dist/fuel_can_with_pbr_textures/scene.gltf', function (gltf) {
			const fuelcan = gltf.scene;
			fuelcan.scale.set(0.00015, 0.00015, 0.00015);
			fuelcan.position.set(fuelposarr[fcpt], 0, -5);
			fcpt++;
			fuelcan.lookAt(fuelposarr[fcpt - 2], 0, -5);
			scene.add(fuelcan);
		});

		// CAN NUMBER - 7
		gltfLoader.load('/dist/fuel_can_with_pbr_textures/scene.gltf', function (gltf) {
			const fuelcan = gltf.scene;
			fuelcan.scale.set(0.00015, 0.00015, 0.00015);
			fuelcan.position.set(-10.6, 0, fuelposarr[fcpt]);
			fcpt++;
			fuelcan.lookAt(-10.45, 0.08, 1);
			scene.add(fuelcan);
		});

		// CAN NUMBER - 8
		gltfLoader.load('/dist/fuel_can_with_pbr_textures/scene.gltf', function (gltf) {
			const fuelcan = gltf.scene;
			fuelcan.scale.set(0.00015, 0.00015, 0.00015);
			fuelcan.position.set(8.7, 0, fuelposarr[fcpt]);
			fcpt++;
			fuelcan.lookAt(8.55, 0, -1);
			scene.add(fuelcan);
		});
	})
})

// CAR OPPONENT - 1
gltfLoader.load('/dist/ferrari_f50_1995/scene.gltf', function (gltf) {
	ferrari = gltf.scene;
	ferrari.position.set(2, 0.02, 3.8);
	ferrari.rotation.y += 1.5;
	ferrari.scale.set(0.05, 0.05, 0.05);
	scene.add(ferrari);
});

// CAR OPPONENT - 2
gltfLoader.load('/dist/mclaren_f1lm_-_low_poly/scene.gltf', function (gltf) {
	mclaren = gltf.scene;
	mclaren.position.set(2, 0.04, 4.1);
	mclaren.rotation.y += 1.5;
	mclaren.scale.set(0.042, 0.042, 0.042);
	scene.add(mclaren);
});

// CAR OPPONENT - 3
var dodgecar = ""
gltfLoader.load('/dist/dodge_challenger_383_magnum/scene.gltf', function (gltf) {
	dodgecar = gltf.scene;
	dodgecar.position.set(1.669, 0.04, 3.8);
	dodgecar.scale.set(0.045, 0.045, 0.045);
	scene.add(dodgecar);
});

// ***************** clone the meshes like this ******************** // 
var original = new THREE.Mesh(
	new THREE.BoxGeometry(0.04, 0.04, 0.04),
	new THREE.MeshNormalMaterial());

scene.add(original);


// Mesh cloned a bunch of times from original
var mesh;
for (let i = -8; i < 5.8; i += 0.01) {
	mesh = original.clone();
	mesh.position.set(i, 0.035, 3.72);
	scene.add(mesh);
}

for (let i = -8; i < 5.55; i += 0.01) {
	mesh = original.clone();
	mesh.position.set(i, 0.035, 4.26);
	scene.add(mesh);
}

for (let i = -6.42; i < 6; i += 0.01) {
	mesh = original.clone();
	mesh.position.set(i, 0.035, -5.3);
	scene.add(mesh);
}

for (let i = -6.0; i < 6; i += 0.01) {
	mesh = original.clone();
	mesh.position.set(i, 0.035, -4.8);
	scene.add(mesh);
}

for (let i = -2; i < 1; i += 0.01) {
	mesh = original.clone();
	mesh.position.set(-10.8, 0.035, i);
	scene.add(mesh);
}

for (let i = -2; i < 1; i += 0.01) {
	mesh = original.clone();
	mesh.position.set(-10.3, 0.035, i);
	scene.add(mesh);
}

for (let i = -2; i < 2; i += 0.01) {
	mesh = original.clone();
	mesh.position.set(8.85, 0.035, i);
	scene.add(mesh);
}

for (let i = -2; i < 1.5; i += 0.01) {
	mesh = original.clone();
	mesh.position.set(8.35, 0.035, i);
	scene.add(mesh);
}

for (let i = 0; i < array.length; i += 3) {
	mesh = original.clone();
	mesh.position.set(array[i], 0.035, array[i + 2]);
	scene.add(mesh);
}

for (let i = 0; i < array2.length; i += 3) {
	mesh = original.clone();
	mesh.position.set(array2[i], 0.035, array2[i + 2]);
	scene.add(mesh);
}

for (let i = 0; i < array3.length; i += 3) {
	mesh = original.clone();
	mesh.position.set(array3[i], 0.035, array3[i + 2]);
	scene.add(mesh);
}

for (let i = 0; i < array4.length; i += 3) {
	mesh = original.clone();
	mesh.position.set(array4[i], 0.035, array4[i + 2]);
	scene.add(mesh);
}

for (let i = 0; i < array5.length; i += 3) {
	mesh = original.clone();
	mesh.position.set(array5[i], 0.035, array5[i + 2]);
	scene.add(mesh);
}

for (let i = 0; i < array6.length; i += 3) {
	mesh = original.clone();
	mesh.position.set(array6[i], 0.035, array6[i + 2]);
	scene.add(mesh);
}

for (let i = 0; i < array7.length; i += 3) {
	mesh = original.clone();
	mesh.position.set(array7[i], 0.035, array7[i + 2]);
	scene.add(mesh);
}

for (let i = 0; i < array8.length; i += 3) {
	mesh = original.clone();
	mesh.position.set(array8[i], 0.07, array8[i + 2]);
	scene.add(mesh);
}

// CREATING HTML ELEMENTS
const p = document.createElement('p');
p.className = "mypara"
p.textContent = 'Game Over !!'

const p2 = document.createElement('p');
p2.className = "mypara"
p2.textContent = 'Player out of fuel !!'

const div = document.createElement('div')
div.className = "mydiv"
div.appendChild(p)
div.appendChild(p2)
const divcontainer = new CSS2DObject(div);
scene.add(divcontainer);
divcontainer.position.set(-2000, -2000, -2000)

// ******************** HEALTH OVER MESSAGE ******************************
const phe = document.createElement('p');
phe.className = "mypara"
phe.textContent = 'Game Over !!'

const phe2 = document.createElement('p');
phe2.className = "mypara"
phe2.textContent = 'You lost your health !!'

const divhe = document.createElement('div')
divhe.className = "mydiv"
divhe.appendChild(phe)
divhe.appendChild(phe2)
const divcontainerhe = new CSS2DObject(divhe);
scene.add(divcontainerhe);
divcontainerhe.position.set(-2000, -2000, -2000)
// ************************************************************************




// ***************************************************************************
// CREATING THE STARTING HTML PAGE

const img1 = document.createElement('img');
img1.src = '/dist/buttons.png'
img1.className = "imageclass"

const img2 = document.createElement('img');
img2.src = '/dist/fuelimage.png'
img2.className = "imageclass2"

const img3 = document.createElement('img');
img3.src = '/dist/fueltext.png'
img3.className = "imageclass3"

const img4 = document.createElement('img');
img4.src = '/dist/enterpress.png'
img4.className = "imageclass3"

const divfuel = document.createElement('div')
divfuel.appendChild(img3)
divfuel.className = "divfuelclass"

const diventer = document.createElement('div')
diventer.appendChild(img4)
diventer.className = "divfuelclass"

const divctrl = document.createElement('div')
divctrl.className = "mydiv"
divctrl.appendChild(img1)
divctrl.appendChild(img2)
divctrl.appendChild(divfuel)
divctrl.appendChild(diventer)

const divctrlcontainer = new CSS2DObject(divctrl);
scene.add(divctrlcontainer);
divctrlcontainer.position.set(0, 0, 0);
// ***************************************************************************

// 3 page
//******************************************************************** 
const imgcount3 = document.createElement('img');
imgcount3.src = '/dist/3.png'
const divcounter = document.createElement('div')
divcounter.className = "mydivcounter"
divcounter.appendChild(imgcount3)
const divcountrender = new CSS2DObject(divcounter);
scene.add(divcountrender);
divcountrender.position.set(0, 0, 0);
imgcount3.className = "imageclasscounter"
//******************************************************************** 

// 2 page
//******************************************************************** 
const imgcount2 = document.createElement('img');
imgcount2.src = '/dist/2.png'
const divcounter2 = document.createElement('div')
divcounter2.className = "mydivcounter"
divcounter2.appendChild(imgcount2)
const divcountrender2 = new CSS2DObject(divcounter2);
scene.add(divcountrender2);
divcountrender2.position.set(0, 0, 0);
imgcount2.className = "imageclasscounter"
//******************************************************************** 

// 1 page
//******************************************************************** 
const imgcount1 = document.createElement('img');
imgcount1.src = '/dist/1.png'
const divcounter1 = document.createElement('div')
divcounter1.className = "mydivcounter"
divcounter1.appendChild(imgcount1)
const divcountrender1 = new CSS2DObject(divcounter1);
scene.add(divcountrender1);
divcountrender1.position.set(0, 0, 0);
imgcount1.className = "imageclasscounter"
//******************************************************************** 

// race page
//******************************************************************** 
const imgrace = document.createElement('img');
imgrace.src = '/dist/race.png'
const divcounterrace = document.createElement('div')
divcounterrace.className = "mydivcounter"
divcounterrace.appendChild(imgrace)
const divcounterracerender = new CSS2DObject(divcounterrace);
scene.add(divcounterracerender);
divcounterracerender.position.set(0, 0, 0);
imgrace.className = "imageclasscounter2"
//******************************************************************** 


// ***************** clone the meshes like this ******************** // 

renderer.setClearColor(0xffffff, 0);
// renderer2.setClearColor(0xffffff, 0);

// document.addEventListener('mousedown', onDocumentMouseDown, false);
// document.addEventListener('mousemove', onDocumentMouseMove, false);
// document.addEventListener('mouseup', onDocumentMouseUp, false);

// const vehiclegeometry = new THREE.coneBufferGeometry

// CALCULATING RANK
var distmycartotal = 0
var distferraritotal = 0
var distmclarentotal = 0
var distdodgecartotal = 0
var reachedfinishline = 0
var isfuelover = 0
var score = 0

// movement - please calibrate these values
var coordinates = [];
let fuel = document.getElementById("fuel")
var temp = 0;

var cameratoggle = "1";
var fast = 0;
var ferraripointer = 0
var ferrariangle = 0

var mclarenpointer = 0
var mclarenangle = 0

var dodgepointer = 0
var dodgeangle = 0

var entervariable = 0
var curmil = 35;
var ferrarifast = 0
var mclarenfast = 0
var dodgecarfast = 0
// RENDER TEXTURES

const geometry = new THREE.CircleGeometry(0.01, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffcc99 });
const circle = new THREE.Mesh(geometry, material);
scene.add(circle);
// circle.position.set(2.5, 0.19, 3.45)
// circle.rotation.z += 0.1

const geometry2 = new THREE.PlaneGeometry(0.03, 0.03);
const material2 = new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry2, material2);
// plane.position.set(2.5, 0.17, 3.45)
scene.add(plane);

// ALL FOR STAND JUST LEFT OF START LINE
// *****************************************************
// LOAD THE FINISH LINE 
// *******************************************************
var mesh2, meshcircle;
var counter = 0;
for (let i = 0; i < 0.85; i += 0.03) {

	var str = "#000000"
	if (counter % 2 == 0) {
		str = "#000000"; counter += 1;
	}
	else {
		str = "#ffffff"; counter += 1;
	}
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);
	mesh2.position.set(-2.1, 0.02, 3.5 + i)
	mesh2.rotateX(Math.PI / 2)
	scene.add(mesh2);
}
for (let i = 0; i < 0.85; i += 0.03) {

	var str = "#ffffff"
	if (counter % 2 == 0) {
		str = "#000000"; counter += 1;
	}
	else {
		str = "#ffffff"; counter += 1;
	}
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);
	mesh2.position.set(-2.13, 0.02, 3.5 + i)
	mesh2.rotateX(Math.PI / 2)
	scene.add(mesh2);
}
for (let i = 0; i < 0.85; i += 0.03) {

	var str = "#000000"
	if (counter % 2 == 0) {
		str = "#000000"; counter += 1;
	}
	else {
		str = "#ffffff"; counter += 1;
	}
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);
	mesh2.position.set(-2.16, 0.02, 3.5 + i)
	mesh2.rotateX(Math.PI / 2)
	scene.add(mesh2);
}
for (let i = 0; i < 0.85; i += 0.03) {

	var str = "#ffffff"
	if (counter % 2 == 0) {
		str = "#000000"; counter += 1;
	}
	else {
		str = "#ffffff"; counter += 1;
	}
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);
	mesh2.position.set(-2.19, 0.02, 3.5 + i)
	mesh2.rotateX(Math.PI / 2)
	scene.add(mesh2);
}

for (let i = 0; i < 0.85; i += 0.03) {

	var str = "#000000"
	if (counter % 2 == 0) {
		str = "#000000"; counter += 1;
	}
	else {
		str = "#ffffff"; counter += 1;
	}
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);
	mesh2.position.set(-2.22, 0.02, 3.5 + i)
	mesh2.rotateX(Math.PI / 2)
	scene.add(mesh2);
}
for (let i = 0; i < 0.85; i += 0.03) {

	var str = "#ffffff"
	if (counter % 2 == 0) {
		str = "#000000"; counter += 1;
	}
	else {
		str = "#ffffff"; counter += 1;
	}
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);
	mesh2.position.set(-2.25, 0.02, 3.5 + i)
	mesh2.rotateX(Math.PI / 2)
	scene.add(mesh2);
}


// *******************************************************


for (let i = 0; i < 0.65; i += 0.04) {

	var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	var str = "#" + randomColor
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);

	// mesh2 = plane.clone();
	meshcircle = circle.clone();
	meshcircle.position.set(i + 2.1, 0.194, 3.45)
	mesh2.position.set(i + 2.1, 0.17, 3.45)
	scene.add(mesh2);
	scene.add(meshcircle);
}

for (let i = 0; i < 0.65; i += 0.04) {

	var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	var str = "#" + randomColor
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);


	meshcircle = circle.clone();
	meshcircle.position.set(i + 2.1, 0.169, 3.50)
	mesh2.position.set(i + 2.1, 0.145, 3.50)
	scene.add(mesh2);
	scene.add(meshcircle);
}

for (let i = 0; i < 0.65; i += 0.04) {
	var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	var str = "#" + randomColor
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);

	meshcircle = circle.clone();
	meshcircle.position.set(i + 2.1, 0.144, 3.55)
	mesh2.position.set(i + 2.1, 0.12, 3.55)
	scene.add(mesh2);
	scene.add(meshcircle);
}
// *****************************************************
// ALL FOR STAND LEFT OF CAR BIG ONE
// *****************************************************
var mesh2;
for (let i = 0; i < 12; i += 0.04) {

	var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	var str = "#" + randomColor
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);

	meshcircle = circle.clone();
	mesh2.position.set(i - 3.2, 0.17, 3.45)
	meshcircle.position.set(i - 3.2, 0.194, 3.450)
	scene.add(mesh2);
	scene.add(meshcircle);
	if (i - 3.5 > 1.5)
		break;
}

for (let i = 0; i < 12; i += 0.04) {

	var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	var str = "#" + randomColor
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);

	meshcircle = circle.clone();
	mesh2.position.set(i - 3.2, 0.145, 3.50)
	meshcircle.position.set(i - 3.2, 0.169, 3.50)
	scene.add(mesh2);
	scene.add(meshcircle);
	if (i - 3.5 > 1.5)
		break;
}

for (let i = 0; i < 12; i += 0.04) {

	var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	var str = "#" + randomColor
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);

	meshcircle = circle.clone();
	mesh2.position.set(i - 3.2, 0.12, 3.55)
	meshcircle.position.set(i - 3.2, 0.144, 3.55)
	scene.add(mesh2);
	scene.add(meshcircle);
	if (i - 3.5 > 1.5)
		break;
}

for (let i = 0; i < 12; i += 0.04) {

	var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	var str = "#" + randomColor
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);

	meshcircle = circle.clone();
	mesh2.position.set(i - 3.2, 0.105, 3.60)
	meshcircle.position.set(i - 3.2, 0.129, 3.60)
	scene.add(mesh2);
	scene.add(meshcircle);
	if (i - 3.5 > 1.5)
		break;
}

for (let i = 0; i < 12; i += 0.04) {
	var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	var str = "#" + randomColor
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);

	meshcircle = circle.clone();
	mesh2.position.set(i - 3.2, 0.09, 3.68)
	meshcircle.position.set(i - 3.2, 0.114, 3.68)
	// meshcircle.color.set = 	
	scene.add(mesh2);
	scene.add(meshcircle);
	if (i - 3.5 > 1.5)
		break;
}
// *****************************************************

// ALL FOR STAND RTGHT OF CAR BIG ONE
// *****************************************************
var mesh2;
for (let i = 0; i < 12; i += 0.04) {
	mesh2 = plane.clone();
	meshcircle = circle.clone();
	mesh2.position.set(i - 3.5, 0.10, 4.5)
	meshcircle.position.set(i - 3.5, 0.174, 4.50)
	// scene.add(mesh2);
	scene.add(meshcircle);
	if (i - 3.2 > 5)
		break;
}

for (let i = 0; i < 12; i += 0.04) {
	mesh2 = plane.clone();
	meshcircle = circle.clone();
	mesh2.position.set(i - 3.5, 0.08, 4.4)
	meshcircle.position.set(i - 3.5, 0.074, 4.4)
	// scene.add(mesh2);
	scene.add(meshcircle);
	if (i - 3.2 > 5)
		break;
}

for (let i = 0; i < 12; i += 0.04) {
	mesh2 = plane.clone();
	meshcircle = circle.clone();
	mesh2.position.set(i - 3.5, 0.06, 4.3)
	meshcircle.position.set(i - 3.5, 0.074, 4.3)
	// scene.add(mesh2);
	scene.add(meshcircle);
	if (i - 3.2 > 5)
		break;
}
// *****************************************************

for (let i = 0; i < 12; i += 0.04) {

	if (i - 3.65 < 3.4)
		continue;

	var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	var str = "#" + randomColor
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);

	// mesh2 = plane.clone();
	meshcircle = circle.clone();
	mesh2.position.set(i - 3.65, 0.162, 3.45)
	meshcircle.position.set(i - 3.65, 0.182, 3.45)
	scene.add(mesh2);
	scene.add(meshcircle);
	if (i - 3.65 > 4.2)
		break;
}

for (let i = 0; i < 12; i += 0.04) {

	if (i - 3.65 < 3.4)
		continue;

	var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	var str = "#" + randomColor
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);

	// mesh2 = plane.clone();
	meshcircle = circle.clone();
	mesh2.position.set(i - 3.65, 0.142, 3.49)
	meshcircle.position.set(i - 3.65, 0.162, 3.49)
	scene.add(mesh2);
	scene.add(meshcircle);
	if (i - 3.65 > 4.2)
		break;
}


for (let i = 0; i < 12; i += 0.04) {

	if (i - 3.65 < 3.4)
		continue;

	var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	var str = "#" + randomColor
	var colorValue = parseInt(str.replace("#", "0x"), 16);
	var colored = new THREE.Color(colorValue);
	const material22 = new THREE.MeshBasicMaterial({ color: colored, side: THREE.DoubleSide });
	mesh2 = new THREE.Mesh(geometry2, material22);

	// mesh2 = plane.clone();
	meshcircle = circle.clone();
	mesh2.position.set(i - 3.65, 0.182, 3.41)
	meshcircle.position.set(i - 3.65, 0.202, 3.41)
	scene.add(mesh2);
	scene.add(meshcircle);
	if (i - 3.65 > 4.2)
		break;
}





var distancecoverd = 0;
var fuelconsumed = 0;

// ADD THE RANDOM ALGORITH FOR THE MOVEMENT OF THE CAR
// ****************************************************************************************
var ferrariset = []
var mclarenset = []
var dodgecarset = []


while (ferrariset.length <= 7) {
	var numtemp = (Math.round(generateRandom(1, 22)));
	if (ferrariset.includes(numtemp)) continue;
	ferrariset.push(numtemp)
}

while (mclarenset.length <= 7) {
	var numtemp = (Math.round(generateRandom(1, 22)));
	if (mclarenset.includes(numtemp)) continue;
	mclarenset.push(numtemp)
}

while (dodgecarset.length <= 7) {
	var numtemp = (Math.round(generateRandom(1, 22)));
	if (dodgecarset.includes(numtemp)) continue;
	dodgecarset.push(numtemp)
}

dodgecarset.push(20)
dodgecarset.push(21)
dodgecarset.push(22)
dodgecarset.push(23)
dodgecarset.push(24)
// console.log(ferrariset)
// console.log(mclarenset)
// console.log(dodgecarset)
// ****************************************************************************************





function animate() {

	requestAnimationFrame(animate);


	// if(stadium)
	temp++;
	timeToString(temp);

	if (entervariable == 0) {
		window.addEventListener("keyup", function (event) {

			if (event.key == "Enter") {
				temp = 300
				entervariable = 1
			}
		});
	}

	if (temp >= 370) {

		// CHECK IF REACHED FINISH LINE
		if (model2.position.x <= -2.1 && model2.position.x >= -2.3) {
			if (model2.position.z >= 3.5 && model2.position.z <= 4.3) {

				// CREATING HTML ELEMENTS
				var rank1 = "You";
				var rank2 = "Ferrari";
				var rank3 = "Mclaren";
				var rank4 = "Dodgecar";
				// Logic for ranking 
				//*************************************************************************** */
				var arraydist = []
				arraydist.push(distmycartotal)
				arraydist.push(distferraritotal + 0.0001)
				arraydist.push(distmclarentotal + 0.0002)
				arraydist.push(distdodgecartotal + 0.0003)
				// console.log(arraydist)
				arraydist.sort();
				console.log(arraydist)
				for (let i = 0; i < arraydist.length; i++) {
					if (arraydist[i] == distmycartotal) {
						if (i == 0) {
							rank4 = "You"
						} else if (i == 1) {
							rank3 = "You"
						} else if (i == 2) {
							rank2 = "You"
						} else {
							rank1 = "You"
						}
						continue;

					}
					if (arraydist[i] == distferraritotal + 0.0001) {
						if (i == 0) {
							rank4 = "Ferrari"
						} else if (i == 1) {
							rank3 = "Ferrari"
						} else if (i == 2) {
							rank2 = "Ferrari"
						} else {
							rank1 = "Ferrari"
						}
						continue;
					}
					if (arraydist[i] == distmclarentotal + 0.0002) {
						if (i == 0) {
							rank4 = "Mclaren"
						} else if (i == 1) {
							rank3 = "Mclaren"
						} else if (i == 2) {
							rank2 = "Mclaren"
						} else {
							rank1 = "Mclaren"
						}
						continue;
					}
					if (arraydist[i] == distdodgecartotal + 0.0003) {
						if (i == 0) {
							rank4 = "Dodgecar"
						} else if (i == 1) {
							rank3 = "Dodgecar"
						} else if (i == 2) {
							rank2 = "Dodgecar"
						} else {
							rank1 = "Dodgecar"
						}
						continue;
					}

				}

				//*************************************************************************** */

				const prst = document.createElement('p');
				prst.className = "mypara"
				var str1 = "Game Over !!"
				prst.textContent = str1

				const pr1 = document.createElement('p');
				pr1.className = "myparafinish"
				str1 = "Rank-1  " + rank1
				pr1.textContent = str1

				const pr2 = document.createElement('p');
				pr2.className = "myparafinish"
				str1 = "Rank-2  " + rank2
				pr2.textContent = str1

				const pr3 = document.createElement('p');
				pr3.className = "myparafinish"
				str1 = "Rank-3  " + rank3
				pr3.textContent = str1

				const pr4 = document.createElement('p');
				pr4.className = "myparafinish"
				str1 = "Rank-4  " + rank4
				pr4.textContent = str1

				const divrank = document.createElement('div')
				divrank.className = "mydiv"
				divrank.appendChild(prst)
				divrank.appendChild(pr1)
				divrank.appendChild(pr2)
				divrank.appendChild(pr3)
				divrank.appendChild(pr4)
				const divcontainerrank = new CSS2DObject(divrank);
				scene.add(divcontainerrank);
				divcontainerrank.position.set(model2.position.x, model2.position.y + 0.5, model2.position.z)
				reachedfinishline = 1;
			}
		}

		if (reachedfinishline == 0) {

			var iscollided = carcollide(model2.position.x, model2.position.z,
				ferrari.position.x, ferrari.position.z,
				mclaren.position.x, mclaren.position.z,
				dodgecar.position.x, dodgecar.position.z,
				totalangle, ferrariangle, mclarenangle, dodgeangle
			)

			if (iscollided == 1) {
				health.value -= 2;

				model2.position.x -= (0.06) * (Math.cos(totalangle));
				model2.position.z -= (0.06) * (Math.sin(totalangle));
				// document.getElementById("position").innerHTML = health.value;
				// model2.position.x -= 0.05;
			}

			// OUT OF TRACK DETECT
			// ************************************************************
			var outtemp = outoftrack(model2.position.x, model2.position.z);
			if (outtemp == 1) {
				health.value -= 3;
			}
			// var detectout = outoftrack(model2.position.x , model2.position.z)
			// if(detectout == 1){
			// 	health.value -= 2;
			// }

			// ************************************************************


			var collfuel = fuelcollision(model2.position.x + 0.132 * Math.cos(totalangle), model2.position.z - 0.132 * Math.sin(totalangle));
			// controls.target = new THREE.Vector3(model2.position.x + 0.5, model2.position.y, model2.position.z);
			if (isfuelover == 0) {
				if (collfuel === "1") {
					// first display mileage here'
					curmil = distancecoverd * 100 / fuelconsumed;
					distancecoverd = 0;
					fuel.value = 100;
				}
			}


			var tempmil = ((Math.round(curmil * 100) / 100) + 0.01).toString().padStart(4, "0");
			var printmil = `${tempmil}`;
			document.getElementById("mileage").innerHTML = printmil;

			//DISPLAY SCORE
			if(temp % 30 == 0)score += 1
			var printsc = `${score}`;
			document.getElementById("score").innerHTML = printsc;

			// fuel.value -= 0.1; //Or whatever you want to do with it.
			if (moveForward) {
				fuel.value -= 0.2
			}

			controls.update();
			model2.position.x += (0.00 + fast) * (Math.cos(totalangle));
			model2.position.z -= (0.00 + fast) * (Math.sin(totalangle));

			distmycartotal += (0.04 + fast);

			distancecoverd += (0.04 + fast);
			fuelconsumed = (100 - fuel.value);

			if (temp % 300 == 299) {
				curmil = distancecoverd * 100 / fuelconsumed;
				distancecoverd = 0;
			}



			// ************************** code for ferrari **************************** //
			// ************************************************************************ //
			distferraritotal += (0.04 + ferrarifast);

			ferrari.position.x += (0.04 + ferrarifast) * (Math.cos(ferrariangle));
			ferrari.position.z -= (0.04 + ferrarifast) * (Math.sin(ferrariangle));
			ferrarifast = 0
			for (let i = 0; i < ferrariset.length; i++) {
				if (ferrariset[i] == (ferraripointer)) {
					ferrarifast = 0.04;
					break;
				}
			}


			if (ferraripointer == 0) {
				if (ferrari.position.x >= 6) {
					ferrari.rotation.y += 0.45;
					ferrariangle += 0.45;
					ferraripointer = 1;
				}
			}
			if (ferraripointer == 1) {
				if (ferrari.position.x >= 7) {
					ferrari.rotation.y += 0.25;
					ferrariangle += 0.25;
					ferraripointer = 2;
				}
			}
			if (ferraripointer == 2) {
				if (ferrari.position.x >= 8) {
					ferrari.rotation.y += 0.4;
					ferrariangle += 0.4;
					ferraripointer = 3;
				}
			}
			if (ferraripointer == 3) {
				if (ferrari.position.x >= 8.5) {
					ferrari.rotation.y += 0.50;
					ferrariangle += 0.50;
					ferraripointer = 4;
				}
			}
			if (ferraripointer == 4) {
				if (ferrari.position.z < -2.7) {
					ferrari.rotation.y += 0.35;
					ferrariangle += 0.35;
					ferraripointer = 5;
				}
			}
			if (ferraripointer == 5) {
				if (ferrari.position.z < -3.5) {
					ferrari.rotation.y += 0.35;
					ferrariangle += 0.35;
					ferraripointer = 6;
				}
			}
			if (ferraripointer == 6) {
				if (ferrari.position.z < -4.2) {
					ferrari.rotation.y += 0.35;
					ferrariangle += 0.35;
					ferraripointer = 7;
				}
			}
			if (ferraripointer == 7) {
				if (ferrari.position.x < 6.2) {
					ferrari.rotation.y += 0.40;
					ferrariangle += 0.40;
					ferraripointer = 8;
				}
			}
			// here you are pointed to the long stright road
			if (ferraripointer == 8) {
				if (ferrari.position.x < 5.88) {
					ferrari.rotation.y += 0.10;
					ferrariangle += 0.10;
					ferraripointer = 9;
				}
			}

			if (ferraripointer == 9) {
				if (ferrari.position.x < -7) {
					ferrari.rotation.y += 0.20;
					ferrariangle += 0.20;
					ferraripointer = 10;
				}
			}
			// rotating around the corner 
			if (ferraripointer == 10) {
				if (ferrari.position.x < -8.3) {
					ferrari.rotation.y += 0.20;
					ferrariangle += 0.20;
					ferraripointer = 11;
				}
			}
			if (ferraripointer == 11) {
				if (ferrari.position.x < -9) {
					ferrari.rotation.y += 0.350;
					ferrariangle += 0.350;
					ferraripointer = 12;
				}
			}
			if (ferraripointer == 12) {
				if (ferrari.position.x < -9.85) {
					ferrari.rotation.y += 0.350;
					ferrariangle += 0.350;
					ferraripointer = 13;
				}
			}

			if (ferraripointer == 13) {
				if (ferrari.position.x < -10.2) {
					ferrari.rotation.y += 0.350;
					ferrariangle += 0.350;
					ferraripointer = 14;
				}
			}

			if (ferraripointer == 14) {
				if (ferrari.position.x < -10.35) {
					ferrari.rotation.y += 0.080;
					ferrariangle += 0.080;
					ferraripointer = 15;
				}
			}

			if (ferraripointer == 15) {
				if (ferrari.position.z > 1) {
					ferrari.rotation.y += 0.180;
					ferrariangle += 0.180;
					ferraripointer = 16;
				}
			}
			if (ferraripointer == 16) {
				if (ferrari.position.z > 1.5) {
					ferrari.rotation.y += 0.22;
					ferrariangle += 0.22;
					ferraripointer = 17;
				}
			}
			if (ferraripointer == 17) {
				if (ferrari.position.z > 2.2) {
					ferrari.rotation.y += 0.250;
					ferrariangle += 0.250;
					ferraripointer = 18;
				}
			}

			if (ferraripointer == 18) {
				if (ferrari.position.z > 2.8) {
					ferrari.rotation.y += 0.250;
					ferrariangle += 0.250;
					ferraripointer = 19;
				}
			}

			if (ferraripointer == 19) {
				if (ferrari.position.z > 3.2) {
					ferrari.rotation.y += 0.200;
					ferrariangle += 0.200;
					ferraripointer = 20;
				}
			}

			if (ferraripointer == 20) {
				if (ferrari.position.z > 3.7) {
					ferrari.rotation.y += 0.250;
					ferrariangle += 0.250;
					ferraripointer = 21;
				}
			}

			if (ferraripointer == 21) {
				if (ferrari.position.z > 3.8) {
					ferrari.rotation.y += 0.2;
					ferrariangle += 0.2;
					ferraripointer = 22;
				}
			}


			if (ferraripointer == 22) {
				if (ferrari.position.z > -7) {
					ferrari.rotation.y += 0.04;
					ferrariangle += 0.04;
					ferraripointer = 23;
				}
			}

			if (ferraripointer == 23) {
				if (ferrari.position.x >= 2) {
					// ferrari.position.set(2, 0, ferrari.position.z);
					// ferrari.rotation.y += 0.04;
					// ferrariangle += 0.04;
					ferraripointer = 23;
				}
			}
			// ************************************************************************ //
			// ************************** code for ferrari **************************** //


			// ************************** code for MCLAREN **************************** //
			// ************************************************************************ //
			mclaren.position.x += (0.04 + mclarenfast) * (Math.cos(mclarenangle));
			mclaren.position.z -= (0.04 + mclarenfast) * (Math.sin(mclarenangle));

			distmclarentotal += (0.04 + mclarenfast);

			mclarenfast = 0
			for (let i = 0; i < mclarenset.length; i++) {
				if (mclarenset[i] == (mclarenpointer)) {
					mclarenfast = 0.04;
					break;
				}
			}

			if (mclarenpointer == 0) {
				if (mclaren.position.x >= 6) {
					mclaren.rotation.y += 0.45;
					mclarenangle += 0.45;
					mclarenpointer = 1;
				}
			}
			if (mclarenpointer == 1) {
				if (mclaren.position.x >= 7) {
					mclaren.rotation.y += 0.15;
					mclarenangle += 0.15;
					mclarenpointer = 2;
				}
			}
			if (mclarenpointer == 2) {
				if (mclaren.position.x >= 8) {
					mclaren.rotation.y += 0.39;
					mclarenangle += 0.39;
					mclarenpointer = 3;
				}
			}
			if (mclarenpointer == 3) {
				if (mclaren.position.x >= 8.5) {
					mclaren.rotation.y += 0.35;
					mclarenangle += 0.35;
					mclarenpointer = 4;
				}
			}
			if (mclarenpointer == 4) {
				if (mclaren.position.z < 1) {
					mclaren.rotation.y += 0.30;
					mclarenangle += 0.30;
					mclarenpointer = 5;
				}
			}
			if (mclarenpointer == 5) {
				if (mclaren.position.z < -3.1) {
					mclaren.rotation.y += 0.40;
					mclarenangle += 0.40;
					mclarenpointer = 6;
				}
			}
			if (mclarenpointer == 6) {
				if (mclaren.position.z < -3.8) {
					mclaren.rotation.y += 0.4;
					mclarenangle += 0.4;
					mclarenpointer = 7;
				}
			}
			if (mclarenpointer == 7) {
				if (mclaren.position.x < 10) {
					mclaren.rotation.y += 0.13;
					mclarenangle += 0.13;
					mclarenpointer = 8;
				}
			}

			// here you are pointed to the long stright road
			if (mclarenpointer == 8) {
				if (mclaren.position.x < 6.17) {
					mclaren.rotation.y += 0.50;
					mclarenangle += 0.50;
					mclarenpointer = 9;
				}
			}

			if (mclarenpointer == 9) {
				if (mclaren.position.x < 4.5) {
					mclaren.rotation.y += 0.10;
					mclarenangle += 0.10;
					mclarenpointer = 10;
				}
			}

			// rotating around the corner 
			if (mclarenpointer == 10) {
				if (mclaren.position.x < -8.25) {
					mclaren.rotation.y += 0.40;
					mclarenangle += 0.40;
					mclarenpointer = 11;
				}
			}
			if (mclarenpointer == 11) {
				if (mclaren.position.x < -9) {
					mclaren.rotation.y += 0.350;
					mclarenangle += 0.350;
					mclarenpointer = 12;
				}
			}
			if (mclarenpointer == 12) {
				if (mclaren.position.x < -9.85) {
					mclaren.rotation.y += 0.350;
					mclarenangle += 0.350;
					mclarenpointer = 13;
				}
			}

			if (mclarenpointer == 13) {
				if (mclaren.position.x < -10.2) {
					mclaren.rotation.y += 0.350;
					mclarenangle += 0.350;
					mclarenpointer = 14;
				}
			}

			if (mclarenpointer == 14) {
				if (mclaren.position.x < -10.35) {
					mclaren.rotation.y += 0.080;
					mclarenangle += 0.080;
					mclarenpointer = 15;
				}
			}

			if (mclarenpointer == 15) {
				if (mclaren.position.z > 1) {
					mclaren.rotation.y += 0.180;
					mclarenangle += 0.180;
					mclarenpointer = 16;
				}
			}
			if (mclarenpointer == 16) {
				if (mclaren.position.z > 1.5) {
					mclaren.rotation.y += 0.22;
					mclarenangle += 0.22;
					mclarenpointer = 17;
				}
			}
			if (mclarenpointer == 17) {
				if (mclaren.position.z > 2.2) {
					mclaren.rotation.y += 0.250;
					mclarenangle += 0.250;
					mclarenpointer = 18;
				}
			}

			if (mclarenpointer == 18) {
				if (mclaren.position.z > 2.8) {
					mclaren.rotation.y += 0.250;
					mclarenangle += 0.250;
					mclarenpointer = 19;
				}
			}

			if (mclarenpointer == 19) {
				if (mclaren.position.z > 3.2) {
					mclaren.rotation.y += 0.200;
					mclarenangle += 0.200;
					mclarenpointer = 20;
				}
			}

			if (mclarenpointer == 20) {
				if (mclaren.position.z > 3.7) {
					mclaren.rotation.y += 0.250;
					mclarenangle += 0.250;
					mclarenpointer = 21;
				}
			}

			if (mclarenpointer == 21) {
				if (mclaren.position.z > 3.8) {
					mclaren.rotation.y += 0.2;
					mclarenangle += 0.2;
					mclarenpointer = 22;
				}
			}

			if (mclarenpointer == 22) {
				if (mclaren.position.z > -7) {
					mclaren.rotation.y += 0.04;
					mclarenangle += 0.04;
					mclarenpointer = 23;
				}
			}

			if (mclarenpointer == 23) {
				if (mclaren.position.x > -2.5) {
					mclaren.rotation.y -= 0.1;
					mclarenangle -= 0.1;
					mclarenpointer = 24;
				}
			}

			if (mclarenpointer == 24) {
				if (mclaren.position.x >= 3) {
					// mclaren.position.set(2, 0, mclaren.position.z);
					mclarenpointer = 24;
				}
			}
			// ************************************************************************ //
			// ************************** code for MCLAREN **************************** //

			// ************************** code for DOGDE **************************** //
			// ************************************************************************ //
			dodgecar.position.x += (0.04 + dodgecarfast) * (Math.cos(dodgeangle));
			dodgecar.position.z -= (0.04 + dodgecarfast) * (Math.sin(dodgeangle));

			distdodgecartotal += (0.04 + dodgecarfast);

			dodgecarfast = 0
			for (let i = 0; i < dodgecarset.length; i++) {
				if (dodgecarset[i] == (dodgepointer)) {
					dodgecarfast = 0.04;
					break;
				}
			}


			if (dodgepointer == 0) {
				if (dodgecar.position.x >= 6) {
					dodgecar.rotation.y += 0.45;
					dodgeangle += 0.45;
					dodgepointer = 1;
				}
			}
			if (dodgepointer == 1) {
				if (dodgecar.position.x >= 7) {
					dodgecar.rotation.y += 0.25;
					dodgeangle += 0.25;
					dodgepointer = 2;
				}
			}
			if (dodgepointer == 2) {
				if (dodgecar.position.x >= 8) {
					dodgecar.rotation.y += 0.4;
					dodgeangle += 0.4;
					dodgepointer = 3;
				}
			}
			if (dodgepointer == 3) {
				if (dodgecar.position.x >= 8.5) {
					dodgecar.rotation.y += 0.50;
					dodgeangle += 0.50;
					dodgepointer = 4;
				}
			}
			if (dodgepointer == 4) {
				if (dodgecar.position.z < -2.7) {
					dodgecar.rotation.y += 0.35;
					dodgeangle += 0.35;
					dodgepointer = 5;
				}
			}
			if (dodgepointer == 5) {
				if (dodgecar.position.z < -3.5) {
					dodgecar.rotation.y += 0.35;
					dodgeangle += 0.35;
					dodgepointer = 6;
				}
			}
			if (dodgepointer == 6) {
				if (dodgecar.position.z < -4.2) {
					dodgecar.rotation.y += 0.35;
					dodgeangle += 0.35;
					dodgepointer = 7;
				}
			}
			if (dodgepointer == 7) {
				if (dodgecar.position.x < 6.2) {
					dodgecar.rotation.y += 0.40;
					dodgeangle += 0.40;
					dodgepointer = 8;
				}
			}
			// here you are pointed to the long stright road
			if (dodgepointer == 8) {
				if (dodgecar.position.x < 5.88) {
					dodgecar.rotation.y += 0.10;
					dodgeangle += 0.10;
					dodgepointer = 9;
				}
			}

			if (dodgepointer == 9) {
				if (dodgecar.position.x < -7) {
					dodgecar.rotation.y += 0.20;
					dodgeangle += 0.20;
					dodgepointer = 10;
				}
			}
			// rotating around the corner 
			if (dodgepointer == 10) {
				if (dodgecar.position.x < -8.3) {
					dodgecar.rotation.y += 0.20;
					dodgeangle += 0.20;
					dodgepointer = 11;
				}
			}
			if (dodgepointer == 11) {
				if (dodgecar.position.x < -9) {
					dodgecar.rotation.y += 0.350;
					dodgeangle += 0.350;
					dodgepointer = 12;
				}
			}
			if (dodgepointer == 12) {
				if (dodgecar.position.x < -9.85) {
					dodgecar.rotation.y += 0.350;
					dodgeangle += 0.350;
					dodgepointer = 13;
				}
			}

			if (dodgepointer == 13) {
				if (dodgecar.position.x < -10.2) {
					dodgecar.rotation.y += 0.350;
					dodgeangle += 0.350;
					dodgepointer = 14;
				}
			}

			if (dodgepointer == 14) {
				if (dodgecar.position.x < -10.35) {
					dodgecar.rotation.y += 0.080;
					dodgeangle += 0.080;
					dodgepointer = 15;
				}
			}

			if (dodgepointer == 15) {
				if (dodgecar.position.z > 1) {
					dodgecar.rotation.y += 0.180;
					dodgeangle += 0.180;
					dodgepointer = 16;
				}
			}
			if (dodgepointer == 16) {
				if (dodgecar.position.z > 1.5) {
					dodgecar.rotation.y += 0.22;
					dodgeangle += 0.22;
					dodgepointer = 17;
				}
			}
			
			if (dodgepointer == 17) {
				if (dodgecar.position.z > 2.2) {
					dodgecar.rotation.y += 0.250;
					dodgeangle += 0.250;
					dodgepointer = 18;
				}
			}

			if (dodgepointer == 18) {
				if (dodgecar.position.z > 2.8) {
					dodgecar.rotation.y += 0.250;
					dodgeangle += 0.250;
					dodgepointer = 19;
				}
			}

			if (dodgepointer == 19) {
				if (dodgecar.position.z > 3.2) {
					dodgecar.rotation.y += 0.200;
					dodgeangle += 0.200;
					dodgepointer = 20;
				}
			}

			if (dodgepointer == 20) {
				if (dodgecar.position.z > 3.7) {
					dodgecar.rotation.y += 0.250;
					dodgeangle += 0.250;
					dodgepointer = 21;
				}
			}

			if (dodgepointer == 21) {
				if (dodgecar.position.z > 3.8) {
					dodgecar.rotation.y += 0.2;
					dodgeangle += 0.2;
					dodgepointer = 22;
				}
			}


			if (dodgepointer == 22) {
				if (dodgecar.position.z > -7) {
					dodgecar.rotation.y += 0.04;
					dodgeangle += 0.04;
					dodgepointer = 23;
				}
			}

			if (dodgepointer == 23) {
				if (dodgecar.position.x >= 2) {
					// dodgecar.position.set(2, 0, dodgecar.position.z);
					// ferrari.rotation.y += 0.04;
					// ferrariangle += 0.04;
					dodgepointer = 23;
				}
			}
			// ************************************************************************ //
			// ************************** code for DOGDE **************************** //


			fast -= 0.002;
			if (!moveBackward) {
				if (fast <= 0) {
					fast = 0;
				}
			}


			window.addEventListener("keydown", function (event) {

				if (event.key == "c") {
					if (cameratoggle === "0")
						cameratoggle = "1";
					else
						cameratoggle = "0";
				}
			});

			if (moveForward) {
				fast += 0.003
				if (fast >= 0.09)
					fast = 0.09;
			}
			if (moveLeft) {
				model2.rotation.y += 0.1;
				totalangle += 0.1;
			}
			if (moveRight) {
				model2.rotation.y -= 0.1;
				totalangle -= 0.1;
			}
			if (moveBackward) {
				fast -= 0.004
				if (fast < 0.0)
					fast = 0.0
			}

			if (cameratoggle === "1") {
				// THIRD PERSON VIEW
				camera.lookAt(model2.position.x + 0.3 * Math.cos(totalangle), model2.position.y, model2.position.z - 0.3 * Math.sin(totalangle));
				// const vec = new THREE.Vector3(model2.position.x - 0.2 * Math.cos(totalangle) ,0.13 ,  model2.position.z + 0.2 * Math.sin(totalangle));
				// camera.position.lerp(vec, 0.8);
				camera.position.x = model2.position.x - 0.2 * Math.cos(totalangle);
				camera.position.z = model2.position.z + 0.2 * Math.sin(totalangle);
			}

			if (cameratoggle === "0") {
				// FIRST PERSON VIEW
				camera.lookAt(model2.position.x + 0.4 * Math.cos(totalangle), model2.position.y, model2.position.z - 0.4 * Math.sin(totalangle));
				camera.position.x = model2.position.x + 0.1 * Math.cos(totalangle);
				camera.position.z = model2.position.z + 0.01 * Math.sin(totalangle);
			}

			camera.position.y = 0.13;

			var xpos = (Math.round(model2.position.x * 100) / 100).toString().padStart(4, "0");
			var zpos = (Math.round(model2.position.z * 100) / 100).toString().padStart(4, "0");

			var printpos = `${xpos}:    	:${zpos}  `;


			// document.getElementById("position").innerHTML = printpos;
			// if ((model2.position.x >= -12 && model2.position.x <= -7) && temp % 4 == 0) {
			// 	myarr.push(model2.position.x);
			// 	myarr.push(model2.position.y);
			// 	myarr.push(model2.position.z);
			// }


			nextfuelcan(model2.position.x, model2.position.z)

			if (temp % 9 == 0) {
				coordinates.push(model2.position.x)
				coordinates.push(model2.position.z)
			}
			// if (temp > 1250)
			console.log(coordinates)
			// console.log( "cars position-> " , model2.position.x , model2.position.y , model2.position.z);

			// console.log( "cars position-> " , camera.position.x , camera.position.y , camera.position.z);
			camera2.position.x = model2.position.x;
			camera2.position.z = model2.position.z;
			camera2.position.y = 1;
			camera2.lookAt(model2.position.x, model2.position.y, model2.position.z);

			if (health.value <= 0)
				divcontainerhe.position.set(model2.position.x, model2.position.y + 0.5, model2.position.z)
			else
				divcontainerhe.position.set(-2000, -2000, -2000)

			if (fuel.value <= 0) {
				isfuelover = 1
				divcontainer.position.set(model2.position.x, model2.position.y + 0.5, model2.position.z)
			}
			else
				divcontainer.position.set(-2000, -2000, -2000)
		}
	}

	if (temp < 300)
		divctrlcontainer.position.set(camera.position.x, camera.position.y + 0.5, camera.position.z)
	else
		divctrlcontainer.position.set(-2000, -2000, -2000)

	if (temp >= 300 && temp < 320)
		divcountrender.position.set(camera.position.x, camera.position.y + 0.5, camera.position.z)
	else
		divcountrender.position.set(-2000, -2000, -2000)

	if (temp >= 320 && temp < 340)
		divcountrender2.position.set(camera.position.x, camera.position.y + 0.5, camera.position.z)
	else
		divcountrender2.position.set(-2000, -2000, -2000)


	if (temp >= 340 && temp < 360)
		divcountrender1.position.set(camera.position.x, camera.position.y + 0.5, camera.position.z)
	else
		divcountrender1.position.set(-2000, -2000, -2000)

	if (temp >= 360 && temp < 370)
		divcounterracerender.position.set(camera.position.x, camera.position.y + 0.5, camera.position.z)
	else
		divcounterracerender.position.set(-2000, -2000, -2000)


	// testing  car 1
	// camera2.position.x = ferrari.position.x;
	// camera2.position.z = ferrari.position.z;
	// camera2.position.y = 1;
	// camera2.lookAt(ferrari.position.x, ferrari.position.y, ferrari.position.z);

	// testing  car 2
	// camera2.position.x = mclaren.position.x;
	// camera2.position.z = mclaren.position.z;
	// camera2.position.y = 1;
	// camera2.lookAt(mclaren.position.x, mclaren.position.y, mclaren.position.z);
	renderer.render(scene, camera);
	renderer2.render(scene, camera2);
	labelrender.render(scene, camera2);

};

animate();