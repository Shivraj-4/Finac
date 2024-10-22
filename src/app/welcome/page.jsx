'use client'; // Ensure this is treated as a Client Component

import { useRouter } from 'next/navigation'; // Ensure we use the next/navigation for client-side
import { useEffect } from 'react';
import Header from "../_components/Header";
import { HeroParallaxDemo } from "../_components/Hero";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Prevent the user from navigating back to the homepage '/'
    const handlePopState = () => {
      // When user tries to go back, redirect them to /welcome
      if (router.pathname === '/welcome') {
        router.push('/welcome');
      }
    };

    // Add a state in the history so that going back redirects to /welcome
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  return (
    <div>
      <Header />
      <HeroParallaxDemo />
    </div>
  );
}
