import React, {useRef, useEffect, useState} from "react";

const WebCam = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photo, setPhoto] = useState(null);

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
    const takePhoto = () => {
        const width = videoRef.current.videoWidth;
        const height = videoRef.current.videoHeight;
        const canvas = canvasRef.current;

        // Set canvas width and height to match the video feed
        canvas.width = width;
        canvas.height = height;

        // Draw the video frame onto the canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, width, height);

        // Convert the canvas image to base64 string
        const imageData = canvas.toDataURL('image/png');
        setPhoto(imageData); // Store the image for later use
    };

    return(
        <div>
      <h1>Webcam Capture</h1>
      <video ref={videoRef} autoPlay width="600" height="400" />
      <div>
        <button onClick={takePhoto}>Take Photo</button>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {photo && (
        <div>
          <h2>Captured Photo:</h2>
          <img src={photo} alt="Captured" />
        </div>
      )}
    </div>
    );
};
    


    // useEffect(() =>{
    //     const getVideo = async() => {
    //         try {
    //             const stream = await navigator.mediaDevices.getUserMedia({video: true });
    //             if (videoRef.current) {
    //                 videoRef.current.srcObject = stream;
    //               }
    //             } catch (err) {
    //               console.error("Error accessing webcam: ", err);
    //             }
    //         };
            
    //         getVideo();

    //         // Cleanup function to stop the video stream when the component is unmounted
    //         return () => {
    //             if (videoRef.current && videoRef.current.srcObject) {
    //                 const stream = videoRef.current.srcObject;
    //                 const tracks = stream.getTracks();

    //                 tracks.forEach(track => track.stop());
    //             }
    //             };
    //         }, []);

    //         return(
    //             <div>
    //                 <video ref={videoRef} width={600} height={400} autoPlay />
    //             </div>
    //         );
    //     };
    
export default WebCam;