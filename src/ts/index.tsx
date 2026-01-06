import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import '../css/tailwind.css';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Capstone } from './pages/Capstone';
import { Contact } from './pages/Contact';
import { About } from './pages/About';

const router = createHashRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen bg-linear-to-b from-(--color-surface) to-(--color-base) text-(--color-text)">
        <Header />
        <main className="container mx-auto px-6 pt-10">
          <Home />
        </main>
      </div>
    )
  },
  {
    path: "/about",
    element: (
      <div className="min-h-screen bg-linear-to-b from-(--color-surface) to-(--color-base) text-(--color-text)">
        <Header />
        <main className="container mx-auto px-6 pt-10">
          <About />
        </main>
      </div>
    )
  },
  {
    path: "/projects",
    element: (
      <div className="min-h-screen bg-linear-to-b from-(--color-surface) to-(--color-base) text-(--color-text)">
        <Header />
        <main className="container mx-auto px-6 pt-10">
          <Projects />
        </main>
      </div>
    )
  },
  {
    path: "/capstone",
    element: (
      <div className="min-h-screen bg-linear-to-b from-(--color-surface) to-(--color-base) text-(--color-text)">
        <Header />
        <main className="container mx-auto px-6 pt-10">
          <Capstone />
        </main>
      </div>
    )
  },
  {
    path: "/contact",
    element: (
      <div className="min-h-screen bg-linear-to-b from-(--color-surface) to-(--color-base) text-(--color-text)">
        <Header />
        <main className="container mx-auto px-6 pt-10">
          <Contact />
        </main>
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
