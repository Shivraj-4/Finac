'use client'; // Ensure this component is treated as a Client Component

import Spline from '@splinetool/react-spline/next';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleExploreClick = () => {
    // Navigate to the next page
    router.push('/dashboard/chat');
  };

  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: 'black' // Set background color to black
    }}>
      {/* Fullscreen Spline */}
      <Spline 
        scene="https://prod.spline.design/GvIxMLU3AFDsHkNG/scene.splinecode" 
        style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }} 
      />

<button
        onClick={handleExploreClick}
        style={{
          position: 'absolute',
          bottom: '15%', // Move button 5px down
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          padding: '10px 37px',
          fontSize: '25px',
          cursor: 'pointer',
          background: 'transparent', // Make background transparent
          border: 'none',
          borderRadius: '12px',
          fontWeight: 'bold',
          color: 'white', // Text color
          fontWeight:"bolder",
          fontFamily:"Times New Roman, Times, serif"
          
        }}
      >
        Chat with me
      </button>


      {/* "By RL" Branding */}
      <div style={{
        position: 'absolute',
        bottom: '15px', // Adjust if needed
        right: '20px',  // Adjust if needed
        backgroundColor: "black", // Semi-transparent white background
        padding: '10px 50px',
        borderRadius: '10px',
        zIndex: 1, // Make sure it's above the Spline
      }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: "white" }}>By RL</span>
      </div>
    </main>
  );
}
