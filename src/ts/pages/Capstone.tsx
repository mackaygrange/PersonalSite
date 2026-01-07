import diorSticker from '../../assets/images/dior-sticker.png';

import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaLock } from 'react-icons/fa';

import tugImage from '../../assets/images/capstone/tug.jpeg';
import teamImage from '../../assets/images/capstone/team.jpeg';
import testingSoftwareImage from '../../assets/images/capstone/testing-software.jpeg';
import testingImage from '../../assets/images/capstone/testing.jpeg';
import attachImage from '../../assets/images/capstone/attach.jpeg';
import planeImage from '../../assets/images/capstone/plane.jpeg';

interface ProjectImage {
  src: string;
  alt: string;
}

export function Capstone()
{
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Project images - add these paths as images become available
  const projectImages: ProjectImage[] = [
    { src: tugImage, alt: 'Electric Tug Prototype' },
    { src: teamImage, alt: 'Tug Project Team' },
    { src: testingSoftwareImage, alt: 'Testing Onboard Control Systems' },
    { src: testingImage, alt: 'Testing and Validation' },
    { src: attachImage, alt: 'Attach Mechanism' },
    { src: planeImage, alt: 'Hooked up to Aircraft' },

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
    <div className="space-y-8 max-w-5xl">
      {/* Project Header */}
      <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-8">
        <h1 className="text-5xl font-bold mb-4 text-(--color-text)">
          Autonomous Electric Tug Vehicle System
        </h1>
        <p className="text-xl text-(--color-subtle) mb-6">
          Senior Capstone Project in collaboration with Rocky Mountain Power and Provo International Airport
        </p>
        <div className="flex items-center gap-3 bg-(--color-base) p-4 rounded border border-(--color-overlay)">
          <FaLock className="text-(--color-gold) shrink-0" />
          <span className="text-sm text-(--color-subtle)">
            Repository is private per project requirements and stakeholder agreements
          </span>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-8">
        <h2 className="text-3xl font-bold mb-4 text-(--color-text)">Project Overview</h2>
        <p className="text-lg text-(--color-subtle) mb-4 leading-relaxed">
          Designed and developed an autonomous electric tug vehicle system to handle material movement and towing operations at an international airport. The system combines industrial-grade hardware platforms (NVIDIA Jetson, Raspberry Pi) with custom control electronics (ESP32, Arduino, Pico) and specialized servo/motor drivers to achieve fully autonomous operation.
        </p>
        <p className="text-lg text-(--color-subtle) leading-relaxed">
          The project demonstrates advanced systems integration, autonomous navigation, real-time control, and industrial-scale engineering principles. Successfully tested with live stakeholders and integrated into airport operational planning.
        </p>
      </div>

      {/* Image Gallery */}
      <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-8">
        <h2 className="text-3xl font-bold mb-6 text-(--color-text)">Project Gallery</h2>
        <div className="space-y-4">
          {/* Image Display */}
          <div className="relative bg-(--color-base) rounded-lg border border-(--color-overlay) overflow-hidden h-[50vh] flex items-center justify-center">
            <img
              src={projectImages[currentImageIndex].src}
              alt={projectImages[currentImageIndex].alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" fill="%23999" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="16"%3EImage not yet available%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevImage}
              className="flex items-center gap-2 px-4 py-2 text-(--color-text) rounded-lg transition-all duration-400 hover:scale-105 hover:text-(--color-iris)"
              aria-label="Previous image"
            >
              <FaChevronLeft /> Previous
            </button>

            <span className="text-(--color-subtle) font-medium">
              {currentImageIndex + 1} / {projectImages.length}
            </span>

            <button
              onClick={nextImage}
              className="flex items-center gap-2 px-4 py-2 text-(--color-text) rounded-lg transition-all duration-400 hover:scale-105 hover:text-(--color-iris)"
              aria-label="Next image"
            >
              Next <FaChevronRight />
            </button>
          </div>

          {/* Image Description */}
          <p className="text-center text-(--color-subtle) text-sm">
            {projectImages[currentImageIndex].alt}
          </p>
        </div>
      </div>

      {/* Hardware Platform */}
      <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-8">
        <h2 className="text-3xl font-bold mb-6 text-(--color-text)">Hardware Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-(--color-base) rounded-lg border border-(--color-overlay) p-4">
            <h3 className="font-bold text-(--color-gold) mb-2">Main Computing</h3>
            <ul className="text-sm text-(--color-subtle) space-y-1">
              <li>NVIDIA Jetson Xavier NX</li>
              <li>Raspberry Pi 4 (8GB RAM)</li>
              <li>Advanced sensor fusion</li>
            </ul>
          </div>
          <div className="bg-(--color-base) rounded-lg border border-(--color-overlay) p-4">
            <h3 className="font-bold text-(--color-gold) mb-2">Control Microcontrollers</h3>
            <ul className="text-sm text-(--color-subtle) space-y-1">
              <li>ESP32 (wireless & WiFi)</li>
              <li>Arduino Mega (motor control)</li>
              <li>Raspberry Pi Pico (servo control)</li>
            </ul>
          </div>
          <div className="bg-(--color-base) rounded-lg border border-(--color-overlay) p-4">
            <h3 className="font-bold text-(--color-gold) mb-2">Actuators</h3>
            <ul className="text-sm text-(--color-subtle) space-y-1">
              <li>DC Motors with encoders</li>
              <li>Stepper motors for precision</li>
              <li>Servo motors for control</li>
              <li>Solenoid valves for hydraulics</li>
            </ul>
          </div>
          <div className="bg-(--color-base) rounded-lg border border-(--color-overlay) p-4">
            <h3 className="font-bold text-(--color-gold) mb-2">Sensors</h3>
            <ul className="text-sm text-(--color-subtle) space-y-1">
              <li>GPS/RTK positioning</li>
              <li>IMU (acceleration & orientation)</li>
              <li>LiDAR for obstacle detection</li>
              <li>Current/voltage monitoring</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Control Systems */}
      <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-8">
        <h2 className="text-3xl font-bold mb-6 text-(--color-text)">Control Systems Architecture</h2>
        <div className="space-y-4">
          <div className="bg-(--color-base) rounded-lg border border-(--color-overlay) p-4">
            <h3 className="font-bold text-(--color-gold) mb-2">Motor Control</h3>
            <p className="text-sm text-(--color-subtle)">
              Custom PWM driver circuits with feedback from encoder sensors. Closed-loop speed control ensures accurate trajectory following and load compensation.
            </p>
          </div>
          <div className="bg-(--color-base) rounded-lg border border-(--color-overlay) p-4">
            <h3 className="font-bold text-(--color-gold) mb-2">Navigation & Localization</h3>
            <p className="text-sm text-(--color-subtle)">
              Real-time GPS/RTK fusion with IMU data provides cm-level positioning accuracy. Autonomous pathfinding algorithms compute collision-free routes around airport obstacles.
            </p>
          </div>
          <div className="bg-(--color-base) rounded-lg border border-(--color-overlay) p-4">
            <h3 className="font-bold text-(--color-gold) mb-2">Safety Systems</h3>
            <p className="text-sm text-(--color-subtle)">
              Multi-layer safety architecture with emergency stop buttons, obstacle detection, geofencing, and watchdog timers. All safety-critical operations logged for compliance auditing.
            </p>
          </div>
          <div className="bg-(--color-base) rounded-lg border border-(--color-overlay) p-4">
            <h3 className="font-bold text-(--color-gold) mb-2">Power Management</h3>
            <p className="text-sm text-(--color-subtle)">
              Lithium battery packs with intelligent charging systems and real-time consumption monitoring. Autonomous return-to-base when battery threshold reached.
            </p>
          </div>
          <div className="bg-(--color-base) rounded-lg border border-(--color-overlay) p-4">
            <h3 className="font-bold text-(--color-gold) mb-2">Software & Middleware</h3>
            <p className="text-sm text-(--color-subtle)">
              ROS2 Jazzy Jalisco provides the foundational robotics middleware for node communication, sensor data processing, and autonomous navigation algorithms across the heterogeneous hardware platforms.
            </p>
          </div>
        </div>
      </div>

      {/* Key Capabilities */}
      <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-8">
        <h2 className="text-3xl font-bold mb-6 text-(--color-text)">Key Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-linear-to-br from-(--color-iris)/20 to-(--color-gold)/20 rounded-lg border border-(--color-overlay) p-4">
            <h3 className="font-bold text-(--color-iris) mb-2">Full Autonomy</h3>
            <p className="text-sm text-(--color-subtle)">Completely autonomous operation without remote pilot. Pre-programmed mission execution with real-time adaptive pathfinding.</p>
          </div>
          <div className="bg-linear-to-br from-(--color-gold)/20 to-(--color-iris)/20 rounded-lg border border-(--color-overlay) p-4">
            <h3 className="font-bold text-(--color-gold) mb-2">Heavy Towing</h3>
            <p className="text-sm text-(--color-subtle)">Capable of towing and pushing up to 3-ton loads at the airport. Precision control for maneuvers in tight spaces.</p>
          </div>
          <div className="bg-linear-to-br from-(--color-iris)/20 to-(--color-gold)/20 rounded-lg border border-(--color-overlay) p-4">
            <h3 className="font-bold text-(--color-iris) mb-2">All-Weather Operation</h3>
            <p className="text-sm text-(--color-subtle)">Sealed electronics and waterproof connectors enable operation in rain and snow. Thermal management for extreme temperature ranges.</p>
          </div>
          <div className="bg-linear-to-br from-(--color-gold)/20 to-(--color-iris)/20 rounded-lg border border-(--color-overlay) p-4">
            <h3 className="font-bold text-(--color-gold) mb-2">Modular Design</h3>
            <p className="text-sm text-(--color-subtle)">Plug-and-play sensor and actuator modules enable easy maintenance and future upgrades without rewiring entire system.</p>
          </div>
        </div>
      </div>

      {/* Engineering Achievements */}
      <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-8">
        <h2 className="text-3xl font-bold mb-6 text-(--color-text)">Engineering Achievements</h2>
        <ul className="space-y-3 text-(--color-subtle)">
          <li className="flex gap-3">
            <span className="text-(--color-gold) font-bold shrink-0">•</span>
            <span>Integrated 5+ heterogeneous computing platforms with real-time communication via custom CAN/wireless protocols</span>
          </li>
          <li className="flex gap-3">
            <span className="text-(--color-gold) font-bold shrink-0">•</span>
            <span>Implemented full-duplex GPS/RTK fusion with IMU data for autonomous navigation in airport environment</span>
          </li>
          <li className="flex gap-3">
            <span className="text-(--color-gold) font-bold shrink-0">•</span>
            <span>Designed and tested multi-layer safety systems meeting airport operational requirements and regulatory standards</span>
          </li>
          <li className="flex gap-3">
            <span className="text-(--color-gold) font-bold shrink-0">•</span>
            <span>Optimized power management to achieve 8+ hour autonomous operation on single battery charge</span>
          </li>
          <li className="flex gap-3">
            <span className="text-(--color-gold) font-bold shrink-0">•</span>
            <span>Conducted extensive field testing with airport staff and integrated vehicle into operational planning</span>
          </li>
        </ul>
      </div>

      {/* Project Significance */}
      <div className="bg-(--color-surface) rounded-lg border border-(--color-overlay) p-8 border-l-4 border-l-(--color-gold)">
        <h2 className="text-3xl font-bold mb-4 text-(--color-text)">Project Significance</h2>
        <p className="text-lg text-(--color-subtle) leading-relaxed">
          This capstone represents the culmination of four years of engineering study, combining expertise in embedded systems, control theory, robotics, power electronics, and systems engineering. The project demonstrates the ability to take a complex real-world problem and deliver a production-ready solution in collaboration with industry partners. The work showcases practical skills in hardware integration, firmware development, systems debugging, and stakeholder communication that are directly applicable to professional engineering roles.
        </p>
      </div>

      {/* Stakeholder & Repository Notice */}
      <div className="bg-(--color-base) rounded-lg border border-(--color-overlay) p-8 text-center">
        <p className="text-(--color-subtle) mb-3">
          Developed in partnership with Rocky Mountain Power and Provo International Airport as part of Brigham Young University's Capstone Program.
        </p>
        <p className="text-sm text-(--color-subtle) flex items-center justify-center gap-2">
          <FaLock className="text-(--color-gold)" />
          Source code repository remains private per stakeholder confidentiality agreements and project requirements.
        </p>
      </div>
    </div>
  );
}
