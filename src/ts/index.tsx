import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import '../css/tailwind.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Capstone } from './pages/Capstone';
import { Contact } from './pages/Contact';
import { About } from './pages/About';

const router = createHashRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col min-h-screen bg-linear-to-b from-(--color-surface) to-(--color-base) text-(--color-text)">
        <Header />
        <main className="container mx-auto px-6 pt-10 grow">
          <Home />
        </main>
        <Footer />
      </div>
    )
  },
  {
    path: "/about",
    element: (
      <div className="flex flex-col min-h-screen bg-linear-to-b from-(--color-surface) to-(--color-base) text-(--color-text)">
        <Header />
        <main className="container mx-auto px-6 pt-10 grow">
          <About />
        </main>
        <Footer />
      </div>
    )
  },
  {
    path: "/projects",
    element: (
      <div className="flex flex-col min-h-screen bg-linear-to-b from-(--color-surface) to-(--color-base) text-(--color-text)">
        <Header />
        <main className="container mx-auto px-6 pt-10 grow">
          <Projects />
        </main>
        <Footer />
      </div>
    )
  },
  {
    path: "/capstone",
    element: (
      <div className="flex flex-col min-h-screen bg-linear-to-b from-(--color-surface) to-(--color-base) text-(--color-text)">
        <Header />
        <main className="container mx-auto px-6 pt-10 grow">
          <Capstone />
        </main>
        <Footer />
      </div>
    )
  },
  {
    path: "/contact",
    element: (
      <div className="flex flex-col min-h-screen bg-linear-to-b from-(--color-surface) to-(--color-base) text-(--color-text)">
        <Header />
        <main className="container mx-auto px-6 pt-10 grow">
          <Contact />
        </main>
        <Footer />
      </div>
    )
  },
]);

function App()
{
  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
