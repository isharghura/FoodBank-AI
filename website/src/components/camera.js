import React, {useRef, useEffect, useState} from "react";
// import {useNavigate} from "react-router-dom"
import ListFood from "./ListFood";
import '../index.css';
import '../Pages/Profile';


const WebCam = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false)
  const [mlJson, setMlJson] = useState("")

  // const navigate = useNavigate()

  // Start the webcam stream as soon as the component mounts
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing webcam: ', err);
      }
    };

    startWebcam();

    // Cleanup function to stop the webcam stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // Capture the current frame from the video stream
  const takePhoto = async () => {
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    const canvas = canvasRef.current;

    setButtonClicked(true)

    // Set canvas width and height to match the video feed
    canvas.width = width;
    canvas.height = height;

    // Draw the video frame onto the canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    // Convert the canvas image to base64 string
    const imageData = canvas.toDataURL('image/png');
    setPhoto(imageData); // Store the image for later use

    try {
      const response = await fetch('http://localhost:5001/save-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData }), // Send the base64 image to the backend
      });

      const result = await response.json();
      if (response.ok) {
        console.log('result: ', result)
        setMlJson(result)
      } else {
        console.error('Failed to save image:', result.error);
      }
    } catch (err) {
      console.error('Error saving the image:', err);
    }
  };

  const donateItem = async () => {
    console.log("Donated!")
    try {
      const response = await fetch('http://localhost:5001/insert-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mlJson }), // Send the base64 image to the backend
      });

      const result = await response.json();
      if (response.ok) {
        console.log('result: ', result)
        alert("You have succesfully donated the item!")
        setButtonClicked(false)
      } else {
        console.error('Failed to save image:', result.error);
      }
    } catch (err) {
      console.error('Error saving the image:', err);
    }
  }

  return (
    <div>
      <h1 className= "skibidi"><a href="ranks">LeaderBoard 3</a></h1>  
      <div className="top-right-button">
        <button className="btn"  onClick={() => window.location.href='profile'}><a href='profile'></a></button>
      </div>
      
      <video ref={videoRef} autoPlay width="600" height="400" children className="camera-screen" />
        <div>
          <button className="take-photo-button" onClick={takePhoto}>
            Take Photo
          </button>
        </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {photo && (
        <div>
          <h2>Captured Photo:</h2>
          <img src={photo} alt="Captured" className="taken_picture" />
          <ListFood data={mlJson}></ListFood>
          <button className="donate-button" onClick={donateItem}>
            Donate!
          </button>
          <br></br>
        </div>
      )}
    </div>
  );
};

export default WebCam;
