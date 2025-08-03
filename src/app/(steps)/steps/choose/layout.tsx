"use client";

import { useState, useEffect, useRef } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  trailLength: number;
  color: string;
  life: number;
  maxLife: number;
}

interface TwinklingStar {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  color: string;
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 25 + Math.random() * 40,
    length: height * 2,
    angle: angle,
    speed: 0.4 + Math.random() * 0.8,
    opacity: 0.08 + Math.random() * 0.12,
    hue: 220 + Math.random() * 30, // Dark navy blue range
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.015 + Math.random() * 0.02,
  };
}

export default function ChooseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [twinklingStars, setTwinklingStars] = useState<TwinklingStar[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [gradientOffset, setGradientOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const beamAnimationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    
    // Set initial window size
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    
    // Initialize twinkling stars with more subtle colors
    const twinkleStars: TwinklingStar[] = [];
    for (let i = 0; i < 40; i++) {
      const starColors = [
        'rgba(255, 255, 255, 0.7)',
        'rgba(191, 219, 254, 0.6)', // Light blue
        'rgba(165, 180, 252, 0.5)', // Light indigo
        'rgba(203, 213, 225, 0.6)', // Light slate
      ];
      
      twinkleStars.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.015 + 0.008,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }
    setTwinklingStars(twinkleStars);

    // Animation loop
    const animate = () => {
      // Update gradient offset for moving background
      setGradientOffset(prev => (prev + 0.2) % 360);

      // Update shooting stars
      setShootingStars(prev => {
        const updated = prev.map(star => ({
          ...star,
          x: star.x + star.vx,
          y: star.y + star.vy,
          life: star.life + 1,
          opacity: Math.max(0, 1 - (star.life / star.maxLife)),
        })).filter(star => 
          star.life < star.maxLife && 
          star.x > -100 && star.x < window.innerWidth + 100 &&
          star.y > -100 && star.y < window.innerHeight + 100
        );

        // Add new shooting stars randomly
        if (Math.random() < 0.02) { // 2% chance each frame
          const startFromSide = Math.random();
          const starColors = [
            'rgba(255, 255, 255, 1)',
            'rgba(191, 219, 254, 1)', // Light blue
            'rgba(165, 180, 252, 1)', // Light indigo
            'rgba(203, 213, 225, 1)', // Light slate
          ];

          let newStar: ShootingStar;
          
          if (startFromSide < 0.25) { // From left
            newStar = {
              id: Math.random(),
              x: -50,
              y: Math.random() * window.innerHeight,
              vx: Math.random() * 6 + 3,
              vy: (Math.random() - 0.5) * 3,
              size: Math.random() * 1.5 + 0.8,
              opacity: 1,
              trailLength: Math.random() * 80 + 40,
              color: starColors[Math.floor(Math.random() * starColors.length)],
              life: 0,
              maxLife: Math.random() * 100 + 60,
            };
          } else if (startFromSide < 0.5) { // From right
            newStar = {
              id: Math.random(),
              x: window.innerWidth + 50,
              y: Math.random() * window.innerHeight,
              vx: -(Math.random() * 6 + 3),
              vy: (Math.random() - 0.5) * 3,
              size: Math.random() * 1.5 + 0.8,
              opacity: 1,
              trailLength: Math.random() * 80 + 40,
              color: starColors[Math.floor(Math.random() * starColors.length)],
              life: 0,
              maxLife: Math.random() * 100 + 60,
            };
          } else if (startFromSide < 0.75) { // From top
            newStar = {
              id: Math.random(),
              x: Math.random() * window.innerWidth,
              y: -50,
              vx: (Math.random() - 0.5) * 3,
              vy: Math.random() * 6 + 3,
              size: Math.random() * 1.5 + 0.8,
              opacity: 1,
              trailLength: Math.random() * 80 + 40,
              color: starColors[Math.floor(Math.random() * starColors.length)],
              life: 0,
              maxLife: Math.random() * 100 + 60,
            };
          } else { // From bottom
            newStar = {
              id: Math.random(),
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              vx: (Math.random() - 0.5) * 3,
              vy: -(Math.random() * 6 + 3),
              size: Math.random() * 1.5 + 0.8,
              opacity: 1,
              trailLength: Math.random() * 80 + 40,
              color: starColors[Math.floor(Math.random() * starColors.length)],
              life: 0,
              maxLife: Math.random() * 100 + 60,
            };
          }
          
          updated.push(newStar);
        }

        return updated;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateWindowSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (beamAnimationRef.current) {
        cancelAnimationFrame(beamAnimationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (windowSize.width > 0 && windowSize.height > 0) {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [windowSize]);

  // Canvas beam effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      const totalBeams = 16; // Reduced for subtle effect
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(window.innerWidth, window.innerHeight)
      );
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam;
      
      const column = index % 4;
      const spacing = window.innerWidth / 4;

      beam.y = window.innerHeight + 100;
      beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.6;
      beam.width = 20 + Math.random() * 50;
      beam.speed = 0.3 + Math.random() * 0.5;
      beam.hue = 220 + (index * 20) / totalBeams; // Navy blue range
      beam.opacity = 0.06 + Math.random() * 0.08;
      return beam;
  }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      // Calculate pulsing opacity
      const pulsingOpacity = beam.opacity * (0.7 + Math.sin(beam.pulse) * 0.3);

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

      // Dark navy theme gradient
      gradient.addColorStop(0, `hsla(${beam.hue}, 60%, 40%, 0)`);
      gradient.addColorStop(0.1, `hsla(${beam.hue}, 60%, 40%, ${pulsingOpacity * 0.3})`);
      gradient.addColorStop(0.4, `hsla(${beam.hue}, 60%, 40%, ${pulsingOpacity})`);
      gradient.addColorStop(0.6, `hsla(${beam.hue}, 60%, 40%, ${pulsingOpacity})`);
      gradient.addColorStop(0.9, `hsla(${beam.hue}, 60%, 40%, ${pulsingOpacity * 0.3})`);
      gradient.addColorStop(1, `hsla(${beam.hue}, 60%, 40%, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }

    function animateBeams() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const totalBeams = beamsRef.current.length;
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;

        // Reset beam when it goes off screen
        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams);
        }

        drawBeam(ctx, beam);
      });

      beamAnimationRef.current = requestAnimationFrame(animateBeams);
    }

    animateBeams();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (beamAnimationRef.current) {
        cancelAnimationFrame(beamAnimationRef.current);
      }
    };
  }, [mounted]);

  if (!mounted || windowSize.width === 0) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-black">
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }

  const mouseXPercent = (mousePosition.x / windowSize.width) * 100;
  const mouseYPercent = (mousePosition.y / windowSize.height) * 100;

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(30, 58, 138, 0.08) 0%, 
            rgba(15, 23, 42, 0.6) 40%,
            rgb(0, 0, 0) 70%),
          linear-gradient(${gradientOffset}deg, 
            rgb(0, 0, 0) 0%, 
            rgb(15, 23, 42) 25%, 
            rgb(30, 58, 138) 50%, 
            rgb(15, 23, 42) 75%, 
            rgb(0, 0, 0) 100%),
          radial-gradient(ellipse at 20% 30%, 
            rgba(30, 58, 138, 0.06) 0%, 
            transparent 70%),
          radial-gradient(ellipse at 80% 70%, 
            rgba(51, 65, 85, 0.04) 0%, 
            transparent 70%),
          rgb(0, 0, 0)
        `,
        transition: 'background 0.4s ease-out',
      }}
    >
      {/* Canvas Beam Effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ 
          filter: "blur(20px)",
          opacity: 0.8
        }}
      />

      {/* Twinkling stars background */}
      {twinklingStars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity * (1 + Math.sin(Date.now() * star.twinkleSpeed + star.id) * 0.4),
            boxShadow: `0 0 ${star.size * 1.5}px ${star.color}`,
            animation: `twinkle-${star.id} ${3 + Math.random() * 2}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <div key={star.id}>
          {/* Star trail */}
          <div
            className="absolute"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.trailLength}px`,
              height: '1.5px',
              background: `linear-gradient(90deg, 
                transparent 0%, 
                ${star.color.replace('1)', '0.2)')} 30%, 
                ${star.color.replace('1)', '0.6)')} 70%,
                ${star.color} 100%)`,
              transform: `rotate(${Math.atan2(star.vy, star.vx) * (180 / Math.PI)}deg)`,
              transformOrigin: 'right center',
              opacity: star.opacity * 0.7,
              filter: 'blur(0.5px)',
            }}
          />
          {/* Star head */}
          <div
            className="absolute rounded-full"
            style={{
              left: `${star.x - star.size/2}px`,
              top: `${star.y - star.size/2}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 3}px ${star.color}, 0 0 ${star.size * 6}px ${star.color.replace('1)', '0.4)')}`,
              filter: 'blur(0.3px)',
            }}
          />
        </div>
      ))}

      {/* Subtle moving gradient overlays */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: `
            linear-gradient(${(gradientOffset + 60) % 360}deg, 
              transparent 0%, 
              rgba(30, 58, 138, 0.04) 30%, 
              transparent 60%, 
              rgba(51, 65, 85, 0.03) 90%, 
              transparent 100%)
          `,
          animation: 'moveGradient 25s linear infinite',
        }}
      />

      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            radial-gradient(ellipse at ${50 + Math.sin(gradientOffset * 0.008) * 15}% ${50 + Math.cos(gradientOffset * 0.012) * 20}%, 
              rgba(30, 58, 138, 0.08) 0%, 
              rgba(15, 23, 42, 0.04) 50%,
              transparent 85%)
          `,
        }}
      />

      {/* Mouse-following subtle glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '300px',
          height: '300px',
          background: `
            radial-gradient(circle, 
              rgba(30, 58, 138, 0.02) 0%, 
              rgba(15, 23, 42, 0.01) 40%, 
              transparent 80%)
          `,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.4s ease-out',
          filter: 'blur(50px)',
        }}
      />
      
      {/* Subtle cosmic dust effect */}
      <div 
        className="absolute inset-0 opacity-4"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(203, 213, 225, 0.15) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(165, 180, 252, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 50% 10%, rgba(191, 219, 254, 0.12) 1px, transparent 1px),
            radial-gradient(circle at 10% 90%, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '300px 300px, 400px 400px, 350px 350px, 250px 250px',
          animation: 'cosmicDrift 40s linear infinite',
        }}
      />
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes moveGradient {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes cosmicDrift {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-30px, -20px) rotate(360deg); }
        }
        
        ${twinklingStars.map(star => `
          @keyframes twinkle-${star.id} {
            0%, 100% { 
              opacity: ${star.opacity * 0.4};
              transform: scale(1);
            }
            50% { 
              opacity: ${star.opacity * 0.9};
              transform: scale(${1 + star.size * 0.05});
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
} 