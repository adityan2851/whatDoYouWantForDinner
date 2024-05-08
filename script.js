document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const cuisines = ["Italian", "Japanese", "Mexican", "Indian", "French", "Chinese"];
    const numSegments = cuisines.length;
    const angle = 2 * Math.PI / numSegments;
    const radius = 250;
  
    function drawWheel() {
      cuisines.forEach((cuisine, index) => {
        ctx.fillStyle = `hsl(${index * 360 / numSegments}, 100%, 50%)`; // Color changes for each segment
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, index * angle, (index + 1) * angle);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fill();
        
        // Add text
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cuisine, canvas.width / 2 + Math.cos((index + 0.5) * angle) * radius * 0.7, canvas.height / 2 + Math.sin((index + 0.5) * angle) * radius * 0.7);
      });
    }
  
    let currentRotation = 0;
    document.getElementById('spinButton').addEventListener('click', function() {
      const rotations = Math.random() * 10 + 5; // Random number of rotations
      const duration = 3000; // 3 seconds
  
      const startTime = Date.now();
      function animate() {
        const elapsedTime = Date.now() - startTime;
        const progress = elapsedTime / duration;
        const frameRotation = currentRotation + rotations * progress * (2 * Math.PI);
  
        if (progress < 1) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(frameRotation);
          ctx.translate(-canvas.width / 2, -canvas.height / 2);
          drawWheel();
          ctx.restore();
          requestAnimationFrame(animate);
        } else {
          currentRotation += rotations * (2 * Math.PI);
        }
      }
      animate();
    });
  
    drawWheel();
  });
  