import React, { useEffect, useRef } from "react";

// 粒子接口
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

// 动画背景组件属性
interface AnimatedBackgroundProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className = "",
  particleCount = 50,
  colors = ["#8785a2", "#6b6b83", "#5a5a6b", "#4a4a55", "#3a3a44", "#2c2c2c"],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  // 创建粒子
  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  };

  // 初始化粒子
  const initParticles = (canvas: HTMLCanvasElement) => {
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas));
    }
  };

  // 更新粒子位置
  const updateParticles = (canvas: HTMLCanvasElement) => {
    particlesRef.current.forEach((particle) => {
      // 更新位置
      particle.x += particle.vx;
      particle.y += particle.vy;

      // 边界检测和反弹
      if (particle.x <= 0 || particle.x >= canvas.width) {
        particle.vx *= -1;
      }
      if (particle.y <= 0 || particle.y >= canvas.height) {
        particle.vy *= -1;
      }

      // 确保粒子在画布内
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));

      // 透明度变化
      particle.opacity += (Math.random() - 0.5) * 0.01;
      particle.opacity = Math.max(0.1, Math.min(0.7, particle.opacity));
    });
  };

  // 绘制粒子
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    particlesRef.current.forEach((particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // 绘制连接线
    drawConnections(ctx);
  };

  // 绘制粒子间的连接线
  const drawConnections = (ctx: CanvasRenderingContext2D) => {
    const maxDistance = 100;

    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const particle1 = particlesRef.current[i];
        const particle2 = particlesRef.current[j];

        const dx = particle1.x - particle2.x;
        const dy = particle1.y - particle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.2;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = "#8785a2";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle1.x, particle1.y);
          ctx.lineTo(particle2.x, particle2.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  };

  // 动画循环
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    updateParticles(canvas);
    drawParticles(ctx);

    animationRef.current = requestAnimationFrame(animate);
  };

  // 调整画布大小
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // 重新初始化粒子
    initParticles(canvas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 初始化画布
    resizeCanvas();

    // 开始动画
    animate();

    // 监听窗口大小变化
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    // 清理函数
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount, colors]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* 渐变背景 - 专业深色调渐变 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #f0f2f5 0%, #e8eaed 50%, #d9dce0 100%)",
          opacity: 0.9,
        }}
      />

      {/* 粒子动画画布 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "multiply" }}
      />

      {/* 额外的装饰元素 */}
      <div className="absolute inset-0 opacity-25">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ backgroundColor: "rgba(135, 133, 162, 0.3)" }}
        />
        <div
          className="absolute top-3/4 right-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{
            backgroundColor: "rgba(162, 155, 189, 0.3)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{
            backgroundColor: "rgba(184, 179, 209, 0.3)",
            animationDelay: "4s",
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;
