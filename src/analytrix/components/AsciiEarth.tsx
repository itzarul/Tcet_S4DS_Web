import React, { useEffect, useRef } from 'react';

// Earth geography landmass detection approximation using spherical coords (latitude phi, longitude theta)
function isLand(latDeg: number, lonDeg: number): boolean {
  // Normalize lon to -180 to 180
  let lon = ((((lonDeg + 180) % 360) + 360) % 360) - 180;
  let lat = latDeg;

  // Antarctica
  if (lat < -60) return true;

  // Greenland
  if (lat > 60 && lat < 83 && lon > -55 && lon < -15) return true;

  // North America
  if (lat > 15 && lat < 72 && lon > -168 && lon < -52) {
    if (lat < 30 && lon > -80) return false;
    return true;
  }

  // South America
  if (lat > -56 && lat < 13 && lon > -82 && lon < -34) {
    if (lat < -20 && lon > -40) return false;
    return true;
  }

  // Europe
  if (lat > 35 && lat < 71 && lon > -10 && lon < 45) return true;

  // Africa
  if (lat > -35 && lat < 37 && lon > -18 && lon < 52) {
    if (lat > 20 && lon > 40) return false; // Red sea / horn gap
    return true;
  }

  // Asia
  if (lat > 10 && lat < 78 && lon >= 45 && lon < 170) {
    if (lat < 25 && lon < 60) return true; // Arabian peninsula
    return true;
  }

  // Australia & New Zealand
  if (lat > -44 && lat < -10 && lon > 112 && lon < 155) return true;
  if (lat > -47 && lat < -34 && lon > 165 && lon < 179) return true;

  // Japan / Indonesia
  if (lat > 30 && lat < 46 && lon > 129 && lon < 146) return true;
  if (lat > -10 && lat < 6 && lon > 95 && lon < 141) return true;

  return false;
}

export default function AsciiEarth() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef<number>(0);
  const dragRef = useRef<{ isDragging: boolean; lastX: number; velocity: number }>({
    isDragging: false,
    lastX: 0,
    velocity: 0.006,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const handleMouseDown = (e: MouseEvent) => {
      dragRef.current.isDragging = true;
      dragRef.current.lastX = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDragging) return;
      const dx = e.clientX - dragRef.current.lastX;
      rotationRef.current += dx * 0.01;
      dragRef.current.velocity = dx * 0.005;
      dragRef.current.lastX = e.clientX;
    };

    const handleMouseUp = () => {
      dragRef.current.isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        dragRef.current.isDragging = true;
        dragRef.current.lastX = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragRef.current.isDragging || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - dragRef.current.lastX;
      rotationRef.current += dx * 0.01;
      dragRef.current.velocity = dx * 0.005;
      dragRef.current.lastX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      dragRef.current.isDragging = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    const render = () => {
      if (!dragRef.current.isDragging) {
        rotationRef.current += dragRef.current.velocity;
        // Damp velocity back to standard smooth rotation
        dragRef.current.velocity += (0.006 - dragRef.current.velocity) * 0.04;
      }

      const rot = rotationRef.current;
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.44;

      ctx.clearRect(0, 0, width, height);

      // Grid steps for ASCII cells
      // Matching user's screenshot: nice dense circular cell grid
      const cellSize = 13;
      const cols = Math.floor(width / cellSize);
      const rows = Math.floor(height / cellSize);

      ctx.font = 'bold 12px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = (c + 0.5) * cellSize;
          const py = (r + 0.5) * cellSize;

          const dx = px - cx;
          const dy = py - cy;
          const distSq = dx * dx + dy * dy;
          const rSq = radius * radius;

          // Outside sphere
          if (distSq > rSq) {
            continue;
          }

          const dist = Math.sqrt(distSq);
          const normDist = dist / radius; // 0 at center, 1 at edge
          const dz = Math.sqrt(Math.max(0, rSq - distSq)); // front hemisphere z

          // Calculate latitude & longitude on 3D rotating globe
          // Spherical mapping:
          // y = -R * sin(lat) => lat = -asin(dy / R)
          const latRad = -Math.asin(Math.min(1, Math.max(-1, dy / radius)));
          const latDeg = (latRad * 180) / Math.PI;

          // lon on unrotated projection
          const lonRad = Math.atan2(dx, dz);
          // Apply current world rotation
          const lonDeg = ((lonRad - rot) * 180) / Math.PI;

          // Edge detection for spherical rim
          const isEdge = normDist > 0.91;
          const isOuterRim = normDist > 0.96;

          if (isOuterRim) {
            // Outermost boundary open circle / ring
            ctx.fillStyle = '#94a3b8'; // subtle grey/white ring
            ctx.fillText('o', px, py);
            continue;
          }

          if (isEdge) {
            // Edge Wireframe: Outline the sphere edges using open circle characters ('O', 'o')
            ctx.fillStyle = 'rgba(203, 213, 225, 0.85)';
            ctx.fillText(Math.random() > 0.5 ? 'O' : 'o', px, py);
            continue;
          }

          // Polar highlights: accent polar regions and active land nodes with vibrant pink/magenta 'X' glyphs
          const isPolar = latDeg > 60 || latDeg < -64;

          const land = isLand(latDeg, lonDeg);

          if (isPolar) {
            ctx.fillStyle = '#f43f5e'; // vibrant pink/magenta
            ctx.fillText('X', px, py);
            continue;
          }

          if (land) {
            // Landmasses: filled with vertical stripes ('|', 'I'), double circles ('8'), and sage-green filled character blocks
            // Accents: some active land nodes with vibrant pink/magenta 'X'
            const pseudoRand = Math.sin(latDeg * 12.9898 + lonDeg * 78.233) * 43758.5453;
            const frac = pseudoRand - Math.floor(pseudoRand);

            if (frac > 0.88) {
              ctx.fillStyle = '#fb7185'; // active pink accent node
              ctx.fillText('X', px, py);
            } else if (frac > 0.55) {
              ctx.fillStyle = '#86efac'; // sage green vertical stripe
              ctx.fillText('|', px, py);
            } else if (frac > 0.3) {
              ctx.fillStyle = '#bbf7d0'; // sage green I
              ctx.fillText('I', px, py);
            } else if (frac > 0.15) {
              ctx.fillStyle = '#6ee7b7'; // sage green 8
              ctx.fillText('8', px, py);
            } else {
              ctx.fillStyle = '#a7f3d0'; // plus accent
              ctx.fillText('+', px, py);
            }
          } else {
            // Oceans: Dense matrix grid using dark teal-green plus signs ('+') and small dots ('.')
            const pseudoRand = Math.sin(latDeg * 3.14 + lonDeg * 5.71) * 1000;
            const frac = pseudoRand - Math.floor(pseudoRand);

            if (frac > 0.28) {
              ctx.fillStyle = '#14b8a6'; // dark teal-green plus sign
              ctx.fillText('+', px, py);
            } else {
              ctx.fillStyle = '#0f766e'; // teal dot
              ctx.fillText('.', px, py);
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      {/* Background canvas rendering procedural ASCII globe */}
      <canvas
        ref={canvasRef}
        width={420}
        height={420}
        className="w-full h-full object-contain pointer-events-auto"
      />
    </div>
  );
}
