'use client'; // Ensure this component is treated as a Client Component

import Spline from '@splinetool/react-spline/next';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleExploreClick = () => {
    // Navigate to the page that has Header and HeroParallaxDemo
    router.push('/welcome');
  };

  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Spline 
        scene="https://prod.spline.design/qMxY-x9CabGN6RAN/scene.splinecode" 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
      />

      {/* Button to navigate to the next page */}
      <button
        onClick={handleExploreClick}
        style={{
          position: 'absolute',
          bottom: '50%', // Adjust if needed
          left: '46%', // Move left from the center by 5%
          zIndex: 1,
          padding: '5px 20px',
          fontSize: '18px',
          fontWeight:"-moz-initial",
          cursor: 'pointer',
          background: 'rgba(255, 255, 255, 0.7)', // Transparent background
          border: 'none',
          borderRadius: '10px',
        }}
      >
        Explore
      </button>

      {/* Overlay Box for "by RL" */}
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
