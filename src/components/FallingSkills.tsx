import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';

interface SkillItem {
  src: string;
  name: string;
}

interface FallingSkillsProps {
  items: SkillItem[];
  gravity?: number;
  mouseConstraintStiffness?: number;
}

const FallingSkills: React.FC<FallingSkillsProps> = ({
  items,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [effectStarted, setEffectStarted] = useState(false);

  // Trigger on scroll into view
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEffectStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Render items initially in a hidden grid layout to measure positions
  useEffect(() => {
    if (!skillsRef.current) return;
    // Build the initial grid of skill cards as HTML
    const html = items
      .map(
        (item, i) => `
        <div class="skill-phys-card" data-index="${i}" style="display:inline-flex;align-items:center;justify-content:center;margin:8px;width:70px;height:70px;cursor:grab;">
          <img src="${item.src}" alt="${item.name}" style="width:100%;height:100%;object-fit:contain;pointer-events:none;" loading="lazy"/>
        </div>
      `
      )
      .join('');
    skillsRef.current.innerHTML = html;
  }, [items]);

  // Start Matter.js physics
  useEffect(() => {
    if (!effectStarted) return;
    if (!containerRef.current || !skillsRef.current || !canvasContainerRef.current) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
      },
    });

    // Boundaries
    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    };
    const floor = Bodies.rectangle(width / 2, height - 10, width, 20, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    // Create physics bodies from the skill cards
    const cardElements = skillsRef.current.querySelectorAll('.skill-phys-card');
    const cardBodies = [...cardElements].map((elem, i) => {
      const el = elem as HTMLElement;
      const rect = el.getBoundingClientRect();

      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.5,
        frictionAir: 0.02,
        friction: 0.3,
        density: 0.002,
      });

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 4,
        y: 0,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      return { elem: el, body };
    });

    // Position cards absolutely
    cardBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = 'translate(-50%, -50%)';
    });

    // Mouse interaction
    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    render.mouse = mouse;

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...cardBodies.map((cb) => cb.body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Update loop — sync DOM positions with physics bodies
    let animId: number;
    const updateLoop = () => {
      cardBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      animId = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      cancelAnimationFrame(animId);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, mouseConstraintStiffness]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent"
      style={{ height: '500px' }}
    >
      {/* Gold Corner Accents */}
      <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-10 h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent"></div>
        <div className="absolute top-0 left-0 h-10 w-px bg-gradient-to-b from-[#D4AF37]/40 to-transparent"></div>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
        <div className="absolute top-0 right-0 w-10 h-px bg-gradient-to-l from-[#D4AF37]/40 to-transparent"></div>
        <div className="absolute top-0 right-0 h-10 w-px bg-gradient-to-b from-[#D4AF37]/40 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
        <div className="absolute bottom-0 left-0 w-10 h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 h-10 w-px bg-gradient-to-t from-[#D4AF37]/40 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
        <div className="absolute bottom-0 right-0 w-10 h-px bg-gradient-to-l from-[#D4AF37]/40 to-transparent"></div>
        <div className="absolute bottom-0 right-0 h-10 w-px bg-gradient-to-t from-[#D4AF37]/40 to-transparent"></div>
      </div>
      {/* Skill cards container */}
      <div
        ref={skillsRef}
        className="flex flex-wrap justify-center items-start pt-4"
      />

      {/* Matter.js canvas (invisible — just for physics computation) */}
      <div
        className="absolute top-0 left-0 z-0 pointer-events-none"
        ref={canvasContainerRef}
        style={{ opacity: 0 }}
      />
    </div>
  );
};

export default FallingSkills;
