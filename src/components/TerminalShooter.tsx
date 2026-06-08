import React, { useRef, useEffect, useState } from 'react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  type?: string;
  char?: string;
  speed?: number;
  label?: string;
}

interface TerminalShooterProps {
  onGameOver: (score: number) => void;
}

export default function TerminalShooter({ onGameOver }: TerminalShooterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastAbsorbed, setLastAbsorbed] = useState("");

  const gameState = useRef({
    player: { x: 0, y: 0, width: 45, height: 20 },
    bullets: [] as GameObject[],
    enemies: [] as GameObject[],
    keys: {} as Record<string, boolean>,
    lastFire: 0,
    frameCount: 0,
    techStack: ["React", "Python", "YOLOv8", "Flask", "Android", "FastAPI", "PyTorch", "Tailwind", "Docker", "Nginx", "PostgreSQL", "TensorFlow"],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 400;
        gameState.current.player.y = canvas.height - 40;
        if (gameState.current.player.x === 0) {
            gameState.current.player.x = canvas.width / 2 - 22;
        }
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const handleKeyDown = (e: KeyboardEvent) => (gameState.current.keys[e.code] = true);
    const handleKeyUp = (e: KeyboardEvent) => (gameState.current.keys[e.code] = false);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId: number;

    const update = () => {
      const { player, bullets, enemies, keys, lastFire, frameCount, techStack } = gameState.current;
      gameState.current.frameCount++;

      if (keys['ArrowLeft'] && player.x > 0) player.x -= 6;
      if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += 6;

      const now = Date.now();
      if ((keys['Space'] || keys['ArrowUp']) && now - lastFire > 200) {
        bullets.push({ x: player.x + player.width / 2 - 1, y: player.y, width: 2, height: 12 });
        gameState.current.lastFire = now;
      }

      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= 8;
        if (bullets[i].y < 0) bullets.splice(i, 1);
      }

      const spawnRate = Math.max(15, 60 - wave * 4);
      if (frameCount % spawnRate === 0) {
        const types = [
          { char: '💀', label: 'memory leak' },
          { char: '🔴', label: 'HTTP 500' },
          { char: '⚠', label: 'deprecated dep' },
          { char: '👾', label: 'buffer overflow' }
        ];
        const type = types[Math.floor(Math.random() * types.length)];
        enemies.push({
          x: 20 + Math.random() * (canvas.width - 60),
          y: -20,
          width: 30,
          height: 30,
          char: type.char,
          label: type.label,
          speed: 1.2 + Math.random() * 1.5 + (wave * 0.25)
        });
      }

      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.y += enemy.speed!;
        enemy.x += Math.sin(enemy.y / 30) * 2.5;

        if (enemy.y > canvas.height - 20) {
          setIsGameOver(true);
          onGameOver(score);
          return;
        }

        if (
          enemy.x < player.x + player.width &&
          enemy.x + enemy.width > player.x &&
          enemy.y < player.y + player.height &&
          enemy.y + enemy.height > player.y
        ) {
          setIsGameOver(true);
          onGameOver(score);
          return;
        }

        for (let j = bullets.length - 1; j >= 0; j--) {
          const bullet = bullets[j];
          if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          ) {
            enemies.splice(i, 1);
            bullets.splice(j, 1);
            setScore(s => {
                const newScore = s + 100;
                if (newScore > 0 && newScore % 1000 === 0) setWave(w => w + 1);
                return newScore;
            });
            setLastAbsorbed(techStack[Math.floor(Math.random() * techStack.length)]);
            break;
          }
        }
      }
    };

    const draw = () => {
      ctx.fillStyle = '#0a0e14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scanline effect
      ctx.fillStyle = 'rgba(0, 245, 255, 0.05)';
      for(let i = 0; i < canvas.height; i += 4) {
          ctx.fillRect(0, i, canvas.width, 1);
      }

      ctx.fillStyle = '#39ff14';
      ctx.font = 'bold 16px "JetBrains Mono"';
      ctx.fillText('[ HK ]', gameState.current.player.x, gameState.current.player.y + 15);

      ctx.fillStyle = '#00f5ff';
      gameState.current.bullets.forEach(b => {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00f5ff';
          ctx.fillRect(b.x, b.y, b.width, b.height);
          ctx.shadowBlur = 0;
      });

      gameState.current.enemies.forEach(e => {
        ctx.font = '24px serif';
        ctx.fillText(e.char!, e.x, e.y + 20);
        ctx.font = '10px "JetBrains Mono"';
        ctx.fillStyle = '#ff2d55';
        ctx.fillText(e.label!, e.x - 10, e.y - 5);
      });

      ctx.fillStyle = '#39ff14';
      ctx.font = '12px "Orbitron"';
      ctx.fillText(`SCORE: ${score.toString().padStart(6, '0')}`, 20, 30);
      ctx.fillText(`WAVE: ${wave}`, 20, 50);

      const centerText = `SYSTEM DIAGNOSTIC WAVE ${wave}`;
      const metrics = ctx.measureText(centerText);
      ctx.fillText(centerText, (canvas.width - metrics.width) / 2, 30);

      if (lastAbsorbed) {
          ctx.fillStyle = '#ffb800';
          ctx.font = '10px "JetBrains Mono"';
          ctx.fillText(`ABSORBED: ${lastAbsorbed}`, canvas.width - 150, 30);
      }
    };

    const gameLoop = () => {
      if (!isGameOver) {
        update();
        draw();
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isGameOver, wave, score, onGameOver, lastAbsorbed]);

  return (
    <div className="relative w-full data-panel overflow-hidden bg-black/40 border-cyber-green/20 min-h-[400px]">
      <div className="bg-cyber-green/5 px-4 py-2 border-b border-cyber-green/20 flex justify-between items-center">
        <span className="text-[10px] font-display text-cyber-green tracking-widest uppercase">BUG_BLASTER_v1.0</span>
        <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-[10px] font-terminal text-cyber-green/60">ACTIVE_DIAGNOSTICS</span>
        </div>
      </div>
      <canvas ref={canvasRef} className="w-full block" />
      {isGameOver && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
          <h2 className="text-cyber-red text-3xl font-display mb-2 animate-glitch">CRASH LOG GENERATED</h2>
          <div className="font-terminal text-white/80 mb-8 text-center border border-cyber-red/30 p-6 bg-cyber-red/5">
            <p className="mb-2 text-cyber-red">{">> SYSTEM_ERROR: MODULE_OVERRUN"}</p>
            <p>FINAL_SCORE: <span className="text-cyber-green">{score}</span></p>
            <p>WAVES_SURVIVED: {wave}</p>
            <p className="mt-4 text-[10px] opacity-50">Dumping stack trace to leaderboard...</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="btn-danger flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            [ REBOOT_SYSTEM ]
          </button>
        </div>
      )}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none opacity-40">
          <div className="text-[9px] font-terminal text-cyber-green uppercase">[ SPACE ] TO FIRE | [ ARROWS ] TO MOVE</div>
          <div className="text-[9px] font-terminal text-cyber-green uppercase">PREVENT BUFFER OVERFLOW</div>
      </div>
    </div>
  );
}
