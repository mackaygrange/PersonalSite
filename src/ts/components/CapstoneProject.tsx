import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaLock } from 'react-icons/fa';

interface ProjectImage {
  src: string;
  alt: string;
}

export function CapstoneProject()
{
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Project images - add these paths as images become available
  const projectImages: ProjectImage[] = [
    { src: '/assets/images/capstone/tug-main.jpg', alt: 'Electric Tug Prototype' },
    { src: '/assets/images/capstone/assembly-1.jpg', alt: 'Tug Assembly and Components' },
    { src: '/assets/images/capstone/control-systems.jpg', alt: 'Onboard Control Systems' },
    { src: '/assets/images/capstone/testing.jpg', alt: 'Testing and Validation' },
  ];

  const nextImage = () =>
  {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () =>
  {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-6">
        <h1 className="text-4xl font-bold mb-2 text-(--color-text)">
          Autonomous Electric Tug Vehicle System
        </h1>
        <p className="text-lg text-(--color-subtle) mb-4">
          Senior Capstone Project in collaboration with Rocky Mountain Power and Provo International Airport
        </p>
        <div className="flex items-center gap-3 bg-(--color-base) p-3 rounded border border-(--color-overlay) mb-4">
          <FaLock className="text-(--color-gold)" />
          <span className="text-sm text-(--color-subtle)">
            Repository is private per project requirements and stakeholder agreements
          </span>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-6">
        <h2 className="text-2xl font-bold mb-4 text-(--color-gold)">Project Overview</h2>
        <div className="space-y-4 text-(--color-text)">
          <p className="leading-relaxed">
            Designed and developed a fully autonomous electric tug vehicle prototype for ground support operations at commercial airports. The system integrates advanced hardware control architecture with autonomous navigation capabilities, addressing the aviation industry's need for sustainable, intelligent ground support equipment.
          </p>
          <p className="leading-relaxed">
            This project represents a complete electrical and software engineering implementation, from embedded system design to autonomous control algorithms. The collaborative effort with Rocky Mountain Power and Provo International Airport provided real-world constraints and industrial-grade requirements that shaped every design decision.
          </p>
        </div>
      </div>

      {/* Image Gallery */}
      {projectImages.length > 0 && (
        <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-6">
          <h2 className="text-2xl font-bold mb-4 text-(--color-gold)">Project Gallery</h2>
          <div className="relative bg-(--color-base) rounded-lg overflow-hidden mb-4">
            <img
              src={projectImages[currentImageIndex].src}
              alt={projectImages[currentImageIndex].alt}
              className="w-full h-96 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
              }}
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-(--color-iris)/80 hover:bg-(--color-iris) text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-(--color-iris)/80 hover:bg-(--color-iris) text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
            >
              <FaChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-(--color-base)/80 px-3 py-1 rounded text-sm text-(--color-text)">
              {currentImageIndex + 1} / {projectImages.length}
            </div>
          </div>
          <p className="text-(--color-subtle) text-center italic">
            {projectImages[currentImageIndex].alt}
          </p>
        </div>
      )}

      {/* Technical Architecture */}
      <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-6">
        <h2 className="text-2xl font-bold mb-4 text-(--color-gold)">Technical Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hardware Stack */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-(--color-text)">Hardware Platform</h3>
            <ul className="space-y-2 text-(--color-text)">
              <li className="flex items-start gap-2">
                <span className="text-(--color-gold) font-bold">•</span>
                <div>
                  <span className="font-semibold">NVIDIA Jetson</span>
                  <p className="text-sm text-(--color-subtle)">AI inference and autonomous decision-making</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-(--color-gold) font-bold">•</span>
                <div>
                  <span className="font-semibold">Raspberry Pi 4/5</span>
                  <p className="text-sm text-(--color-subtle)">Primary system orchestration and control</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-(--color-gold) font-bold">•</span>
                <div>
                  <span className="font-semibold">ESP32</span>
                  <p className="text-sm text-(--color-subtle)">IoT connectivity and wireless communication</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-(--color-gold) font-bold">•</span>
                <div>
                  <span className="font-semibold">Arduino & Pico</span>
                  <p className="text-sm text-(--color-subtle)">Real-time motor and actuator control</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Control Systems */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-(--color-text)">Control Systems</h3>
            <ul className="space-y-2 text-(--color-text)">
              <li className="flex items-start gap-2">
                <span className="text-(--color-gold) font-bold">•</span>
                <div>
                  <span className="font-semibold">DC Motor Control</span>
                  <p className="text-sm text-(--color-subtle)">Variable speed and torque management</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-(--color-gold) font-bold">•</span>
                <div>
                  <span className="font-semibold">Stepper Motor Systems</span>
                  <p className="text-sm text-(--color-subtle)">Precision positioning for articulated components</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-(--color-gold) font-bold">•</span>
                <div>
                  <span className="font-semibold">Servo Actuators</span>
                  <p className="text-sm text-(--color-subtle)">Closed-loop feedback control mechanisms</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-(--color-gold) font-bold">•</span>
                <div>
                  <span className="font-semibold">Solenoid Systems</span>
                  <p className="text-sm text-(--color-subtle)">Power switching and pneumatic actuation</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Capabilities */}
      <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-6">
        <h2 className="text-2xl font-bold mb-4 text-(--color-gold)">Key Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-(--color-base) p-4 rounded border border-(--color-overlay)">
            <h3 className="font-semibold text-(--color-text) mb-2">Autonomous Navigation</h3>
            <p className="text-sm text-(--color-subtle)">
              Intelligent path planning and obstacle avoidance for airport ground operations
            </p>
          </div>
          <div className="bg-(--color-base) p-4 rounded border border-(--color-overlay)">
            <h3 className="font-semibold text-(--color-text) mb-2">Multi-Motor Coordination</h3>
            <p className="text-sm text-(--color-subtle)">
              Synchronized control of multiple motor types for complex mechanical operations
            </p>
          </div>
          <div className="bg-(--color-base) p-4 rounded border border-(--color-overlay)">
            <h3 className="font-semibold text-(--color-text) mb-2">Real-time Performance</h3>
            <p className="text-sm text-(--color-subtle)">
              Low-latency embedded control systems for responsive actuation and feedback
            </p>
          </div>
        </div>
      </div>

      {/* Engineering Achievements */}
      <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-6">
        <h2 className="text-2xl font-bold mb-4 text-(--color-gold)">Engineering Achievements</h2>
        <ul className="space-y-3 text-(--color-text)">
          <li className="flex items-start gap-3">
            <span className="text-(--color-gold) font-bold mt-1">✓</span>
            <div>
              <span className="font-semibold">Complete Electrical Design</span>
              <p className="text-sm text-(--color-subtle)">
                Comprehensive power distribution, motor drivers, and safety interlocks from concept to implementation
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-(--color-gold) font-bold mt-1">✓</span>
            <div>
              <span className="font-semibold">Multi-Platform Software Stack</span>
              <p className="text-sm text-(--color-subtle)">
                Cross-platform development spanning Linux (Jetson/Pi), microcontrollers (Arduino/ESP32/Pico), and autonomous systems
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-(--color-gold) font-bold mt-1">✓</span>
            <div>
              <span className="font-semibold">Industrial-Grade Integration</span>
              <p className="text-sm text-(--color-subtle)">
                Robust system design meeting stakeholder requirements from Rocky Mountain Power and Provo International Airport
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-(--color-gold) font-bold mt-1">✓</span>
            <div>
              <span className="font-semibold">Systems Engineering Excellence</span>
              <p className="text-sm text-(--color-subtle)">
                Integration of mechanical, electrical, and software subsystems into a cohesive autonomous platform
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Project Significance */}
      <div className="bg-(--color-gold)/10 border border-(--color-gold) rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-3 text-(--color-gold)">Project Significance</h2>
        <p className="text-(--color-text) leading-relaxed">
          This capstone project represents a significant step toward sustainable aviation ground support operations. By partnering with industry leaders at Rocky Mountain Power and Provo International Airport, we developed technology that addresses real operational challenges while advancing the adoption of electric propulsion and autonomous systems in commercial aviation.
        </p>
      </div>

      {/* Repository Notice */}
      <div className="bg-(--color-base) border border-(--color-overlay) rounded-lg p-6">
        <div className="flex items-start gap-3">
          <FaLock className="text-(--color-gold) text-xl mt-1 shrink-0" />
          <div>
            <h3 className="font-semibold text-(--color-text) mb-1">Repository Access</h3>
            <p className="text-(--color-subtle) text-sm">
              The source code repository for this project is maintained as private in accordance with intellectual property agreements with our industry partners. For inquiries regarding the technical implementation, architecture, or design decisions, please contact directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
