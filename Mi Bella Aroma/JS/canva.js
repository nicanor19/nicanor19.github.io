document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('cafeCanvas');
  const ctx = canvas.getContext('2d');

  // Dibujar taza de café
  ctx.beginPath();
  ctx.arc(200, 200, 100, 0, Math.PI * 2, false); // Cuerpo de la taza
  ctx.fillStyle = '#8B4513'; // Color marrón
  ctx.fill();
  ctx.stroke();

  // Asa de la taza
  ctx.beginPath();
  ctx.arc(120, 200, 20, 0, Math.PI * 1.5, false);
  ctx.lineWidth = 53;
  ctx.strokeStyle = '#8B4513';
  ctx.stroke();

  // Café dentro de la taza
  ctx.beginPath();
  ctx.arc(200, 200, 80, 0, Math.PI * 2, false);
  ctx.fillStyle = '#A52A2A'; // Color café
  ctx.fill();
});