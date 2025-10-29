// Bouncing polka dots background effect
(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackground);
  } else {
    initBackground();
  }
  
  function initBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'background-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.6';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Brand colors
    const colors = ['#0080FF', '#80FF80', '#FF8080', '#FFFF80', '#8080FF', '#FFA500'];
    
    // Dot class
    class Dot {
      constructor(width, height, assignedColor) {
        this.targetRadius = Math.random() * 60 + 30; // Target size: 30-90
        this.radius = 0; // Start at 0, will grow to targetRadius
        this.color = assignedColor;
        this.x = width / 2; // Start at center
        this.y = height / 2; // Start at center
        this.targetX = Math.random() * width; // Target position
        this.targetY = Math.random() * height; // Target position
        this.vx = (Math.random() - 0.5) * 2; // Range: -1 to 1
        this.vy = (Math.random() - 0.5) * 2; // Range: -1 to 1
        this.isBlackHole = false;
        this.blackHoleTimer = 0;
        this.originalColor = assignedColor;
        this.isAbsorbed = false;
        this.isBeingSucked = false; // Track if dot is being sucked into black hole
        this.suckProgress = 0; // Track progress of being sucked in (0-1)
        this.dotsConsumed = 0; // Track how many dots this black hole has consumed
        this.growthProgress = 0; // Track growth from center (0-1)
        this.isGrowing = true; // Track if dot is still growing from center
        this.isShrinking = false; // Track if black hole is shrinking
        this.shrinkProgress = 0; // Track shrinking progress (0-1)
      }
      
      update(width, height, allDots) {
        // Handle growth from center
        if (this.isGrowing) {
          const growthSpeed = 0.02; // How fast dots grow and move outward
          this.growthProgress += growthSpeed;
          
          // Grow radius
          this.radius = this.targetRadius * this.growthProgress;
          
          // Move toward target position
          const moveProgress = Math.min(this.growthProgress * 2, 1); // Move faster than growing
          this.x = (width / 2) + (this.targetX - width / 2) * moveProgress;
          this.y = (height / 2) + (this.targetY - height / 2) * moveProgress;
          
          // When fully grown, start normal movement
          if (this.growthProgress >= 1) {
            this.isGrowing = false;
            this.x = this.targetX;
            this.y = this.targetY;
          }
        }
        
        // Black hole behavior
        if (this.isBlackHole) {
          // Check if there are any non-black-hole dots left
          const otherDots = allDots.filter(dot => !dot.isBlackHole && !dot.isAbsorbed && !dot.isBeingSucked);
          
          if (otherDots.length === 0 && !this.isShrinking) {
            // Start shrinking phase
            this.isShrinking = true;
            this.shrinkProgress = 0;
          }
          
          // Handle shrinking phase
          if (this.isShrinking) {
            const shrinkSpeed = 0.005; // Very slow shrinking
            this.shrinkProgress += shrinkSpeed;
            
            // Shrink radius
            this.radius = this.targetRadius * (1 - this.shrinkProgress);
            
            // When fully shrunk, mark for removal
            if (this.shrinkProgress >= 1) {
              this.isAbsorbed = true;
            }
          }
        }
        
        // Handle being sucked into black hole
        if (this.isBeingSucked) {
          const suckSpeed = 0.05; // How fast the dot gets sucked in
          this.suckProgress += suckSpeed;
          
          // Shrink the dot as it gets sucked in
          this.radius = this.radius * (1 - this.suckProgress * 0.1);
          
          // When fully sucked in, mark for removal
          if (this.suckProgress >= 1) {
            this.isAbsorbed = true;
          }
        }
        
        // Apply black hole attraction to this dot (if it's not a black hole and not being sucked)
        if (!this.isBlackHole && !this.isAbsorbed && !this.isBeingSucked) {
          const blackHoles = allDots.filter(dot => dot.isBlackHole);
          
          for (const blackHole of blackHoles) {
            const dx = blackHole.x - this.x;
            const dy = blackHole.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
              // Check if dot overlaps with black hole - start sucking process
              // Use combined radius to check for any overlap between circles
              if (distance < (this.radius + blackHole.radius)) {
                this.isBeingSucked = true;
                this.suckProgress = 0;
                blackHole.dotsConsumed++;
                break; // Stop processing this dot
              }
              
              // Calculate attraction force - stronger when closer and as more dots are consumed
              const maxDistance = Math.max(width, height) * 0.8; // 80% of screen width/height
              const normalizedDistance = Math.min(distance / maxDistance, 1);
              
              // Count remaining non-black-hole dots
              const remainingDots = allDots.filter(dot => !dot.isBlackHole && !dot.isAbsorbed && !dot.isBeingSucked).length;
              
              // Base force increases with consumed dots
              const consumedMultiplier = 1 + (blackHole.dotsConsumed * 0.01); // 1% increase per dot consumed
              
              // Final phase: dramatically increase attraction when only 2 dots left
              let finalPhaseMultiplier = 1;
              if (remainingDots <= 2) {
                finalPhaseMultiplier = 1 + (3 - remainingDots) * 4; // 5x force for 2 dots, 9x for 1 dot
              }
              
              const baseForce = 0.01 * consumedMultiplier * finalPhaseMultiplier;
              const maxForce = 0.03 * consumedMultiplier * finalPhaseMultiplier;
              const attractionForce = baseForce + (maxForce - baseForce) * (1 - normalizedDistance);
              
              // Always pull toward black hole (dx/distance gives direction)
              const attractionX = (dx / distance) * attractionForce;
              const attractionY = (dy / distance) * attractionForce;
              
              // Apply attraction to this dot
              this.vx += attractionX;
              this.vy += attractionY;
            }
          }
        }
        
        // Update position (only if not growing from center)
        if (!this.isGrowing) {
          this.x += this.vx;
          this.y += this.vy;
        }
        
        // Black hole behavior - migrate to center
        if (this.isBlackHole) {
          const centerX = width / 2;
          const centerY = height / 2;
          const dx = centerX - this.x;
          const dy = centerY - this.y;
          const distanceToCenter = Math.sqrt(dx * dx + dy * dy);
          
          // Apply gentle force toward center
          if (distanceToCenter > 10) { // Only if not already at center
            const centerForce = 0.02; // Gentle force
            this.vx += (dx / distanceToCenter) * centerForce;
            this.vy += (dy / distanceToCenter) * centerForce;
          }
          
          // Apply gentle friction to slow down
          this.vx *= 0.98;
          this.vy *= 0.98;
          
          // Bounce off edges
          if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx = Math.abs(this.vx);
          }
          if (this.x + this.radius > width) {
            this.x = width - this.radius;
            this.vx = -Math.abs(this.vx);
          }
          if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.vy = Math.abs(this.vy);
          }
          if (this.y + this.radius > height) {
            this.y = height - this.radius;
            this.vy = -Math.abs(this.vy);
          }
        } else {
          // Regular dot bouncing
          if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx = Math.abs(this.vx);
          }
          if (this.x + this.radius > width) {
            this.x = width - this.radius;
            this.vx = -Math.abs(this.vx);
          }
          if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.vy = Math.abs(this.vy);
          }
          if (this.y + this.radius > height) {
            this.y = height - this.radius;
            this.vy = -Math.abs(this.vy);
          }
        }
      }
      
      draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      checkCollision(other, width, height) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = this.radius + other.radius;
        
        // Normal collision handling for non-black-hole interactions
        if (distance < minDistance && distance > 0 && !this.isBlackHole && !other.isBlackHole) {
          // Separate dots to prevent overlap
          const overlap = minDistance - distance;
          const separationX = (dx / distance) * overlap * 0.5;
          const separationY = (dy / distance) * overlap * 0.5;
          
          this.x -= separationX;
          this.y -= separationY;
          other.x += separationX;
          other.y += separationY;
          
          // Simple repulsion (reduced to help black hole attraction)
          const repulsionForce = 0.05;
          const repulsionX = (dx / distance) * repulsionForce;
          const repulsionY = (dy / distance) * repulsionForce;
          
          this.vx -= repulsionX;
          this.vy -= repulsionY;
          other.vx += repulsionX;
          other.vy += repulsionY;
        }
      }
    }
    
    let dots = [];
    let blackHoleCooldown = 36000; // 10 minute initial delay at 60fps
    let respawnTimer = 0;
    let isRespawnPhase = false;
    
    // Function to create all dots
    function createAllDots() {
      dots = [];
      for (let colorIndex = 0; colorIndex < colors.length; colorIndex++) {
        for (let duplicate = 0; duplicate < 3; duplicate++) {
          dots.push(new Dot(canvas.width, canvas.height, colors[colorIndex]));
        }
      }
    }
    
    // Set canvas size and initialize dots
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createAllDots();
    }
    
    // Function to create a black hole from a dot near the center
    function createBlackHole() {
      // Find all dots that aren't already black holes
      const availableDots = dots.filter(dot => !dot.isBlackHole);
      
      if (availableDots.length > 0) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Find the dot closest to the center
        let closestDot = null;
        let minDistance = Infinity;
        
        for (const dot of availableDots) {
          const dx = dot.x - centerX;
          const dy = dot.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestDot = dot;
          }
        }
        
        if (closestDot) {
          closestDot.isBlackHole = true;
          closestDot.color = '#000000';
        }
      }
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Check if we need to start respawn phase
      if (!isRespawnPhase) {
        const hasBlackHole = dots.some(dot => dot.isBlackHole);
        const hasActiveDots = dots.some(dot => !dot.isBlackHole && !dot.isAbsorbed && !dot.isBeingSucked);
        
        // If black hole exists but no active dots, start respawn timer
        if (hasBlackHole && !hasActiveDots) {
          if (respawnTimer === 0) {
            respawnTimer = 1440;
          }
          respawnTimer--;
          
          if (respawnTimer <= 0) {
            isRespawnPhase = true;
            createAllDots();
            respawnTimer = 0;
          }
        }
        
        // Continue timer even if black hole disappears (shrinks away)
        if (respawnTimer > 0 && !hasBlackHole && !hasActiveDots) {
          respawnTimer--;
          
          if (respawnTimer <= 0) {
            isRespawnPhase = true;
            createAllDots();
            respawnTimer = 0;
          }
        }
      }
      
      // Black hole creation logic (only if not in respawn phase)
      if (!isRespawnPhase) {
        blackHoleCooldown--;
        if (blackHoleCooldown <= 0) {
          // Check if there's already a black hole
          const hasBlackHole = dots.some(dot => dot.isBlackHole);
          
          if (!hasBlackHole) {
            // Random chance to create black hole (1% per frame)
            if (Math.random() < 0.01) {
              createBlackHole();
              blackHoleCooldown = 36000; // 10 minute cooldown at 60fps
            }
          }
        }
      }
      
      // Update all dots
      dots.forEach(dot => dot.update(canvas.width, canvas.height, dots));
      
      // Check collisions between all dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          dots[i].checkCollision(dots[j], canvas.width, canvas.height);
        }
      }
      
      // Remove absorbed dots
      dots = dots.filter(dot => !dot.isAbsorbed);
      
      // Check if respawn phase is complete (all dots finished growing)
      if (isRespawnPhase) {
        const allDotsFinishedGrowing = dots.every(dot => !dot.isGrowing);
        if (allDotsFinishedGrowing) {
          isRespawnPhase = false;
        }
      }
      
      // Draw all dots
      dots.forEach(dot => dot.draw(ctx));
      
      requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
  }
})();