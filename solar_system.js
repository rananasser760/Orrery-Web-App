// Import
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

import { OBJLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/OBJLoader.js";
import getAsteroidBelt from "./getAsteroidBelt.js";


// Fetch JSON data
async function loadJSONData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}
let planetData = {};
// Call the function to load your JSON file
loadJSONData('https://data.nasa.gov/resource/b67r-rgxc.json')
    .then(data => {
        console.log(data); // Do something with the loaded data
        planetData = data; // Store the data in a variable
        // You can process your JSON data here
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });






// Assuming you have already set up a Three.js scene

// Function to fetch comet data
async function fetchCometData() {
    const response = await fetch('https://data.nasa.gov/resource/b67r-rgxc.json');
    const comets = await response.json();
    return comets;
}

// Function to create and display comets
function displayComets(comets) {
    comets.forEach(comet => {
        // Create a small sphere for each comet
        const geometry = new THREE.SphereGeometry(0.1, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        const cometMesh = new THREE.Mesh(geometry, material);

        // Set comet position (you might want to use actual coordinates)
        cometMesh.position.set(Math.random() * 10, Math.random() * 10, Math.random() * 10); // Example positions

        // Add comet mesh to the scene
        scene.add(cometMesh);

        // Optionally, display comet names or other info
        const cometName = comet.comet_name; // Adjust based on actual data keys
        const textGeometry = new THREE.TextGeometry(cometName, { font: yourFont, size: 0.5, height: 0.1 });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Position the text above the comet
        textMesh.position.set(cometMesh.position.x, cometMesh.position.y + 0.5, cometMesh.position.z);
        scene.add(textMesh);
    });
}

// Main function to initialize the scene and load comets
async function init() {
    // Your Three.js scene setup code here

    // Fetch and display comets
    const comets = await fetchCometData();
    displayComets(comets);
}

// Call the init function
init();

//Creating renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//////////////////////////////////////
//texture loader
const textureLoader = new THREE.TextureLoader();

//////////////////////////////////////
//import all texture
const sunTexture = textureLoader.load("image/8k_sun.jpg");
const mercuryTexture = textureLoader.load("image/8k_mercury.jpg");
const venusTexture = textureLoader.load("image/8k_venus_surface.jpg");
const earthTexture = textureLoader.load("image/earth.jpg");
const marsTexture = textureLoader.load("image/8k_mars.jpg");
const jupiterTexture = textureLoader.load("image/8k_jupiter.jpg");
const saturnTexture = textureLoader.load("image/8k_saturn.jpg");
const uranusTexture = textureLoader.load("image/2k_uranus.jpg");
const neptuneTexture = textureLoader.load("image/2k_neptune.jpg");
const plutoTexture = textureLoader.load("image/pluto.jpg");
const saturnRingTexture = textureLoader.load("image/saturn_ring.png");
const uranusRingTexture = textureLoader.load("image/uranus_ring.png");
const earth_moonTexture = textureLoader.load("image/8k_moon.jpg");
const mars_PhobosTexture = textureLoader.load("image/phobos_mars1.jpg");
const mars_DeimosTexture = textureLoader.load("image/Deimos_mars2.jpg");
const jupiter_GanymedeTexture = textureLoader.load("image/Jupiter_Ganymede.jpg");
const jupiter_CallistaTexture = textureLoader.load("image/Jupiter_Callisto.jpg");
const jupiter_IOTexture = textureLoader.load("image/Jupiter_IO.webp");
const jupiter_EuropaTexture = textureLoader.load("image/Jupiter_Europa.jpg");
const saturn_TitanTexture = textureLoader.load("image/Saturn_titan.jpg");
const saturn_EnceladusTexture = textureLoader.load("image/Saturn_Enceladus.jpg");
const Uranus_MirandaTexture = textureLoader.load("image/Uranus_Miranda.jpg");
const Uranus_ArielTexture = textureLoader.load("image/Uranus_Ariel.jpg");
const Neptune_TritonTexture = textureLoader.load("image/Neptune_triton.jpg");
const Neptune_GalateaTexture = textureLoader.load("image/Neptune_Galatea.jpg");
const pluto_charonTexture = textureLoader.load("image/pluto_CharonTexture.jpg");


//////////////////////////////////////
// Creating scene
const scene = new THREE.Scene();
//////////////////////////////////////


//background
const backgroundTexture = textureLoader.load("media/stars-galaxy-3840x2560-10307.jpg");
scene.background = backgroundTexture;


//////////////////////////////////////
//Perspective Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-50, 90, 150);

//////////////////////////////////////
//Percpective controll
const orbit = new OrbitControls(camera, renderer.domElement);

//////////////////////////////////////
//sun
const sungeo = new THREE.SphereGeometry(15, 50, 50);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture,
});
const sun = new THREE.Mesh(sungeo, sunMaterial);
scene.add(sun);

//////////////////////////////////////
//sun light (point light)
const sunLight = new THREE.PointLight(0xffffff, 4, 300);
scene.add(sunLight);

//////////////////////////////////////
//ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(ambientLight);

//////////////////////////////////////
//path for planet
const path_of_planets = [];
function createLineLoopWithMesh(radius, color, width) {
    const material = new THREE.LineBasicMaterial({
        color: color,
        linewidth: width,
    });
    const geometry = new THREE.BufferGeometry();
    const lineLoopPoints = [];

    // Calculate points for the circular path
    const numSegments = 100; // Number of segments to create the circular path
    for (let i = 0; i <= numSegments; i++) {
        const angle = (i / numSegments) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        lineLoopPoints.push(x, 0, z);
    }

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(lineLoopPoints, 3)
    );
    const lineLoop = new THREE.LineLoop(geometry, material);
    scene.add(lineLoop);
    path_of_planets.push(lineLoop);
}

///////////////////////////////////////
//create planet
const genratePlanet = (size, planetTexture, x, ring) => {
    const planetGeometry = new THREE.SphereGeometry(size, 50, 50);
    const planetMaterial = new THREE.MeshStandardMaterial({
        map: planetTexture,
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    const planetObj = new THREE.Object3D();
    planet.position.set(x, 0, 0);
    if (ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32
        );
        const ringMat = new THREE.MeshBasicMaterial({
            map: ring.ringmat,
            side: THREE.DoubleSide,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        planetObj.add(ringMesh);
        ringMesh.position.set(x, 0, 0);
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(planetObj);

    planetObj.add(planet);
    createLineLoopWithMesh(x, 0xffffff, 3);
    return {
        planetObj: planetObj,
        planet: planet,
    };
};


// Function to create the Moon and add it to Earth
const generateMoon = (size, earth_moonTexture, distanceFromEarth,x,y) => {
    const moonGeometry = new THREE.SphereGeometry(size, 50, 50);
    const moonMaterial = new THREE.MeshStandardMaterial({ map: earth_moonTexture });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);

    // Position the moon relative to Earth
    const MoonObj = new THREE.Object3D();
    moon.position.set(distanceFromEarth, x,y);

    scene.add(MoonObj);

    MoonObj.add(moon);
    // createLineLoopWithMesh(MoonObj, 0xffffff, 3);
    return {
        moonOrbit: MoonObj,
        moon: moon,
    };
};



const planets = [
    {
        ...genratePlanet(3.2, mercuryTexture, 28), // Mercury's diameter should be about 4,880 km
        rotaing_speed_around_sun: 0.004, // Mercury takes about 88 Earth days to orbit the Sun
        self_rotation_speed: 0.004, // Mercury rotates very slowly, one rotation takes about 58.6 Earth days
    },
    {
        ...genratePlanet(5.8, venusTexture, 44), // Venus' diameter should be about 12,104 km
        rotaing_speed_around_sun: 0.015, // Venus takes about 225 Earth days to orbit the Sun
        self_rotation_speed: 0.002, // Venus rotates very slowly and in the opposite direction (retrograde), taking about 243 Earth days per rotation
    },
    {
        ...genratePlanet(6, earthTexture, 62), // Earth's diameter is approximately 12,742 km
        rotaing_speed_around_sun: 0.01, // Earth takes 365.25 days to orbit the Sun
        self_rotation_speed: 0.02, // Earth rotates once every 24 hours
        moons: [
            generateMoon(1.6362, earth_moonTexture, 68,6,-6) // Earth's moon
        ],  // Adding the moon here

    },
    {
        ...genratePlanet(4, marsTexture, 78), // Mars' diameter should be about 6,779 km
        rotaing_speed_around_sun: 0.008, // Mars takes about 687 Earth days to orbit the Sun
        self_rotation_speed: 0.018, // Mars rotates once every 24.6 hours
        moons: [
            generateMoon(1.056, mars_PhobosTexture, 83,6,3), // Phobos
            generateMoon(0.5844, mars_DeimosTexture, 74,3,3) // Deimos
        ],
    },
    {
        ...genratePlanet(12, jupiterTexture, 100), // Jupiter's diameter is about 139,820 km
        rotaing_speed_around_sun: 0.002, // Jupiter takes about 12 Earth years to orbit the Sun
        self_rotation_speed: 0.04, // Jupiter rotates very quickly, once every 10 hours
        moons: [
            generateMoon(4.8,jupiter_GanymedeTexture,120,6,2),
            generateMoon(4,jupiter_CallistaTexture,87,-5,-8),
            generateMoon(2.5,jupiter_IOTexture,85,-2,9),
            generateMoon(4.2,jupiter_EuropaTexture,120,4.5,-17)
        ]
    },
    {
        ...genratePlanet(10, saturnTexture, 138, {
            innerRadius: 10,
            outerRadius: 20,
            ringmat: saturnRingTexture,
        }), // Saturn's diameter is about 116,460 km
        rotaing_speed_around_sun: 0.0009, // Saturn takes about 29.5 Earth years to orbit the Sun
        self_rotation_speed: 0.038, // Saturn rotates once every 10.7 hours

        moons: [
            generateMoon(2,saturn_TitanTexture,125,6,0),
            generateMoon(0.5,saturn_EnceladusTexture,125,7,-6)
        ]
    },
    {
        ...genratePlanet(7, uranusTexture, 176, {
            innerRadius: 7,
            outerRadius: 12,
            ringmat: uranusRingTexture,
        }), // Uranus' diameter is about 50,724 km
        rotaing_speed_around_sun: 0.0004, // Uranus takes about 84 Earth years to orbit the Sun
        self_rotation_speed: 0.03, // Uranus rotates once every 17 hours

        moons: [
            generateMoon(0.1 , Uranus_MirandaTexture,165,6,0),
            generateMoon(0.23 , Uranus_ArielTexture,165,7,-6)

        ]
    },
    {
        ...genratePlanet(7, neptuneTexture, 200), // Neptune's diameter is about 49,244 km
        rotaing_speed_around_sun: 0.0001, // Neptune takes about 165 Earth years to orbit the Sun
        self_rotation_speed: 0.032, // Neptune rotates once every 16 hours
        moons: [
            generateMoon(0.4, Neptune_TritonTexture,190,-5,0),
            generateMoon(0.29, Neptune_GalateaTexture,190,6,-3),
        ]
    },
    {
        ...genratePlanet(2.8, plutoTexture, 216), // Pluto's diameter is about 2,377 km
        rotaing_speed_around_sun: 0.0007, // Pluto takes about 248 Earth years to orbit the Sun
        self_rotation_speed: 0.008, // Pluto rotates once every 6.4 Earth days
        moons: [
            generateMoon(1.4, pluto_charonTexture, 213,5,0)
        ]
    },


];


// Ensure you add the moon orbit object to the planet object
planets[2].planetObj.add(planets[2].moons[0].moonOrbit); // Adding Earth's moon to Earth
planets[3].planetObj.add(planets[3].moons[0].moonOrbit); // Adding Phobos to Mars
planets[3].planetObj.add(planets[3].moons[1].moonOrbit); // Adding Deimos to Mars

planets[4].planetObj.add(planets[4].moons[0].moonOrbit); // Adding Ganymede to Jupiter
planets[4].planetObj.add(planets[4].moons[1].moonOrbit); // Adding Callista to Jupiter
planets[4].planetObj.add(planets[4].moons[2].moonOrbit); // Adding IO to Jupiter
planets[4].planetObj.add(planets[4].moons[3].moonOrbit); // Adding Europa to Jupiter

planets[5].planetObj.add(planets[5].moons[0].moonOrbit); // Adding Titan to Saturn
planets[5].planetObj.add(planets[5].moons[1].moonOrbit); // Adding Enceladus to saturn

planets[6].planetObj.add(planets[6].moons[0].moonOrbit); // Adding Miranda to Uranus
planets[6].planetObj.add(planets[6].moons[1].moonOrbit); // Adding Ariel to Uranus

planets[7].planetObj.add(planets[7].moons[0].moonOrbit); // Adding Triton to Neptune
planets[7].planetObj.add(planets[7].moons[1].moonOrbit); // Adding Galatea to Neptuen

planets[8].planetObj.add(planets[8].moons[0].moonOrbit); // Adding Charon to Pluto








//////////////////////////////////////
//NOTE - GUI options
var GUI = dat.gui.GUI;
const gui = new GUI();
const options = {
    "Real view": true,
    "Show path": true,
    speed: 1,
};
gui.add(options, "Real view").onChange((e) => {
    ambientLight.intensity = e ? 0 : 0.5;
});
gui.add(options, "Show path").onChange((e) => {
    path_of_planets.forEach((dpath) => {
        dpath.visible = e;
    });
});
const maxSpeed = new URL(window.location.href).searchParams.get("ms") * 1;
gui.add(options, "speed", 0, maxSpeed ? maxSpeed : 20);

//////////////////////////////////////
const planetNames = [
    "Sun",
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Pluto",
    "earthMoon"
];

const planetDataa = {
        sun: "The Sun is the star at the <br> center of our solar system.",
        mercury: "Mercury is the smallest <br>  planet in our solar system <br> and the closest to the Sun.",
        venus: "Venus is the second planet <br> from the Sun and is similar <br> in size to Earth.",
        earth: "Earth is the third planet <br> from the Sun and the only <br> known planet to support life.",
        mars: "Mars is known as the Red Planet <br> due to its reddish appearance.",
        jupiter: "Jupiter is the largest planet <br> in our solar system.",
        saturn: "Saturn is famous for <br> its stunning rings.",
        uranus: "Uranus is unique for its sideways <br> rotation and blue color.",
        neptune: "Neptune is the farthest planet<br> from the Sun and is known<br> for its strong winds.",
        pluto: "Pluto was reclassified <br> as a dwarf planet in 2006."
    };
// Initialize raycaster and mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const planetNameDiv = document.getElementById('planet-name');
const planetInfoDiv = document.getElementById('planet-info'); // Define it here



// Event listener for mouse movement
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});
const planetsWithSun = [sun, ...planets.map(p => p.planet)];

// Update planet name display based on mouse hover
function updatePlanetName() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planetsWithSun);

    const planetNameDiv = document.getElementById('planet-name');
    
    // Log intersects to verify intersection
    console.log('Intersects:', intersects);

    if (intersects.length > 0) {
        const planetIndex = planetsWithSun.findIndex(p => p === intersects[0].object);
        if (planetIndex !== -1) {
            const planetName = planetNames[planetIndex];
            planetNameDiv.textContent = planetName;
            console.log('Planet Name:', planetName);  // Verify planet name

             // Use the planetDataa object to get information
            const planetKey = planetNames[planetIndex].toLowerCase(); // Get the lowercase key for the planet
            const planetInfo = planetDataa[planetKey]; // Retrieve info from planetDataa

       if (planetInfo) {
                planetInfoDiv.innerHTML = `
                   ${planetInfo}
                `;
            }
        }
    } else {
        planetNameDiv.textContent = '';
         planetInfoDiv.innerHTML = '';
    }
}

console.log(planetData);

function createAsteroidBelt() {
    if (rock1 && rock2 && rock3 && !asteroidBelt) {
        asteroidBelt = new THREE.Group();
        let x = 10;
        for (let i = 0; i < 130; i++) {
            const rock = rock2.clone(); // Clone one of your rocks
            rock.position.set(
                Math.random() * 850 - 100, // Random position within a range
                0,
                Math.random() * 850 - 100
            );
            rock.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            asteroidBelt.add(rock);
            x+=10;
        }


        scene.add(asteroidBelt);
    }
}


const loader = new OBJLoader();

let rock1, rock2, rock3;
let asteroidBelt;

loader.load("rocks/Rock1.obj", function (object) {
    rock1 = object;
    createAsteroidBelt();
});

loader.load("rocks/Rock2.obj", function (object) {
    rock2 = object;
    createAsteroidBelt();
});

loader.load("rocks/Rock3.obj", function (object) {
    rock3 = object;
    createAsteroidBelt();
});



//////////////////////////////////////
//Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    
    planets.forEach((planet) => {
        // Rotate planets
        planet.planet.rotation.y += planet.self_rotation_speed * options.speed;
        planet.planetObj.rotation.y += planet.rotaing_speed_around_sun * options.speed;

        // Check if the planet has moons
        if (planet.moons && planet.moons.length > 0) {

            planet.moons.forEach((moon) => {

                moon.moon.rotation.y += 0.01 * options.speed;

            });
        }
    });
    if (asteroidBelt) {
        asteroidBelt.rotation.y += 0.001; // Rotate the entire belt

        asteroidBelt.children.forEach(rock => {
            rock.rotation.x = 0.002; // Rotate each rock
            rock.rotation.y = 0.002;
        });
    }

    updatePlanetName(); // Update planet name on each frame
    orbit.update();
    
    renderer.render(scene, camera);
};



animate();

//////////////////////////////////////
//Adjust camera on window resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


