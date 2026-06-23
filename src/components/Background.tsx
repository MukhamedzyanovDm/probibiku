"use client";

import React, { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  angle: number;
  speed: number;
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create 3-4 soft fluid colored blobs with higher opacity and saturation for better density/contrast
    const blobs: Blob[] = [
      {
        x: width * 0.25,
        y: height * 0.3,
        vx: 0.25,
        vy: 0.15,
        radius: Math.min(width, height) * 0.5,
        color: "rgba(79, 70, 229, 0.42)", // Rich Indigo
        angle: Math.random() * Math.PI * 2,
        speed: 0.35,
      },
      {
        x: width * 0.75,
        y: height * 0.2,
        vx: -0.15,
        vy: 0.25,
        radius: Math.min(width, height) * 0.55,
        color: "rgba(14, 165, 233, 0.35)", // Saturated Sky Blue
        angle: Math.random() * Math.PI * 2,
        speed: 0.25,
      },
      {
        x: width * 0.5,
        y: height * 0.7,
        vx: 0.1,
        vy: -0.2,
        radius: Math.min(width, height) * 0.45,
        color: "rgba(147, 51, 234, 0.30)", // Rich Purple
        angle: Math.random() * Math.PI * 2,
        speed: 0.3,
      },
    ];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      blobs[0].radius = Math.min(width, height) * 0.5;
      blobs[1].radius = Math.min(width, height) * 0.55;
      blobs[2].radius = Math.min(width, height) * 0.45;
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      blobs.forEach((blob) => {
        blob.angle += 0.0015;
        blob.x += Math.cos(blob.angle) * blob.speed + blob.vx;
        blob.y += Math.sin(blob.angle) * blob.speed + blob.vy;

        if (blob.x - blob.radius > width) {
          blob.x = -blob.radius;
        } else if (blob.x + blob.radius < 0) {
          blob.x = width + blob.radius;
        }

        if (blob.y - blob.radius > height) {
          blob.y = -blob.radius;
        } else if (blob.y + blob.radius < 0) {
          blob.y = height + blob.radius;
        }

        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* High-performance fluid animation canvas with adjusted blur, contrast and opacity */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
        style={{
          filter: "blur(75px) contrast(1.3)",
          opacity: 0.9,
        }}
      />

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.25]" 
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
            backgroundSize: "2.5rem 2.5rem"
          }}
        />
      </div>
    </>
  );
}
