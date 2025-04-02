import React from 'react';
import { NavBar } from '../components/NavBar';

export const HomePage = () => {
  return (
    <>
      <NavBar name={"Home"} link={"/"} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 text-gray-800">
        <section className="flex flex-col items-center justify-center h-screen text-center px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-10 rounded-lg blur-3xl"></div>
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 drop-shadow-md">
            Welcome to the Future
          </h1>
          <p className="text-xl text-gray-700 mt-4 max-w-2xl">
            Innovating the world with technology and modern solutions.
          </p>
          <button className="flex items-center gap-2 mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-500 hover:scale-105 transition transform duration-300">
            Get Started 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-5 h-5 fill-white'>
              <path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2l0 82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9l0-107.2c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>
            </svg>
          </button>
        </section>

        <section className="py-20 px-4 bg-white">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Fast Performance", desc: "Optimized for high-speed execution." },
              { title: "Secure & Reliable", desc: "Top-tier security with encryption." },
              { title: "Modern Design", desc: "User-friendly and beautiful UI." },
            ].map((feature, index) => (
              <div key={index} className="p-8 bg-gray-50 rounded-xl shadow-xl transform hover:scale-105 transition duration-300">
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="py-6 text-center bg-gray-200 border-t border-gray-300">
          <p className="text-gray-600">&copy; 2025 Anand. All Rights Reserved.</p>
        </footer>
      </div>

    </>
  )
}
