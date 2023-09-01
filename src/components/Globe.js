import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import globeImg from './images/2k_earth_daymap.jpg';
import axios from 'axios';

const Globe = () => {
  const containerRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create a sphere (the globe)
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(globeImg);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Set camera position
    camera.position.z = 10;

    // Add event listener for mouse movement
    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      const lat = pos.y;
      const lon = Math.atan2(pos.x, pos.z);

      // Fetch weather data when latitude and longitude are available
      fetchWeatherData(lat, lon);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.x += 0.005;
      globe.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const fetchWeatherData = async (lat, lon) => {

    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {q: `${city}`},
      headers: {
        'X-RapidAPI-Key': '919c8dff28msh9290586769af049p1c1874jsn88f260938240',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const apiKey = 'YOUR_WEATHER_API_KEY';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${22.5}&lon=${34.3}&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <div ref={containerRef} />
      {weatherData && (
        <div>
          <h2>Weather Information</h2>
          <p>Location: {weatherData.name}, {weatherData.sys.country}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Globe;
