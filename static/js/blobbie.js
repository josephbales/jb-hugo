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
    const colors = ['#0080FF', '#80FF80', '#FF8080', '#FFFF80', '#8080FF'];
    
    // Dot class
    class Dot {
      constructor(width, height) {
        this.radius = Math.random() * 60 + 40; // Random radius between 40 and 100
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random starting position (can be off-screen)
        this.x = Math.random() * (width + this.radius * 4) - this.radius * 2;
        this.y = Math.random() * (height + this.radius * 4) - this.radius * 2;
        
        // Random velocity (slow)
        this.vx = (Math.random() - 0.5) * 0.75;
        this.vy = (Math.random() - 0.5) * 0.75;
      }
      
      update(width, height) {
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Wrap around edges
        if (this.x - this.radius > width) {
          this.x = -this.radius;
          // Randomize velocity slightly when wrapping
          this.vx = (Math.random() - 0.5) * 0.75;
          this.vy = (Math.random() - 0.5) * 0.75;
        }
        if (this.x + this.radius < 0) {
          this.x = width + this.radius;
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = (Math.random() - 0.5) * 0.5;
        }
        if (this.y - this.radius > height) {
          this.y = -this.radius;
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = (Math.random() - 0.5) * 0.5;
        }
        if (this.y + this.radius < 0) {
          this.y = height + this.radius;
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = (Math.random() - 0.5) * 0.5;
        }
      }
      
      draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      checkCollision(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = this.radius + other.radius;
        
        if (distance < minDistance) {
          // Calculate collision response
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);
          
          // Rotate velocity
          const vx1 = this.vx * cos + this.vy * sin;
          const vy1 = this.vy * cos - this.vx * sin;
          const vx2 = other.vx * cos + other.vy * sin;
          const vy2 = other.vy * cos - other.vx * sin;
          
          // Bounce
          const vx1Final = vx2;
          const vx2Final = vx1;
          
          // Rotate back
          this.vx = vx1Final * cos - vy1 * sin;
          this.vy = vy1 * cos + vx1Final * sin;
          other.vx = vx2Final * cos - vy2 * sin;
          other.vy = vy2 * cos + vx2Final * sin;
          
          // Separate dots to prevent overlap
          const overlap = minDistance - distance;
          const separationX = (dx / distance) * overlap * 0.5;
          const separationY = (dy / distance) * overlap * 0.5;
          
          this.x -= separationX;
          this.y -= separationY;
          other.x += separationX;
          other.y += separationY;
        }
      }
    }
    
    let dots = [];
    
    // Set canvas size and initialize dots
    function resizeCanvas() {
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize or reinitialize dots if canvas size changed significantly
      if (dots.length === 0 || Math.abs(oldWidth - canvas.width) > 100 || Math.abs(oldHeight - canvas.height) > 100) {
        const numDots = Math.floor((canvas.width * canvas.height) / 120000);
        dots = [];
        for (let i = 0; i < numDots; i++) {
          dots.push(new Dot(canvas.width, canvas.height));
        }
      }
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update all dots
      dots.forEach(dot => dot.update(canvas.width, canvas.height));
      
      // Check collisions only between visible dots
      for (let i = 0; i < dots.length; i++) {
        // Skip if dot is completely off-screen
        if (dots[i].x + dots[i].radius < 0 || dots[i].x - dots[i].radius > canvas.width ||
            dots[i].y + dots[i].radius < 0 || dots[i].y - dots[i].radius > canvas.height) {
          continue;
        }
        
        for (let j = i + 1; j < dots.length; j++) {
          // Skip if other dot is completely off-screen
          if (dots[j].x + dots[j].radius < 0 || dots[j].x - dots[j].radius > canvas.width ||
              dots[j].y + dots[j].radius < 0 || dots[j].y - dots[j].radius > canvas.height) {
            continue;
          }
          
          dots[i].checkCollision(dots[j]);
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

