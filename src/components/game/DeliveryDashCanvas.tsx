import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

type CanvasStrings = {
  score: string;
  combo: string;
  streak: string;
  hintTouch: string;
  hintDesktop: string;
};

type DeliveryDashCanvasProps = {
  accentColor: string;
  strings: CanvasStrings;
  onGameOver: (result: { score: number; bestCombo: number }) => void;
};

type Vec = { x: number; y: number };

type Token = {
  id: number;
  x: number;
  y: number;
  label: string;
  points: number;
  pulse: number;
  radius: number;
};

type Bug = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  spin: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
};

type PowerUp = {
  id: number;
  x: number;
  y: number;
  pulse: number;
  radius: number;
};

type GameWorld = {
  width: number;
  height: number;
  player: { x: number; y: number; vx: number; vy: number; invuln: number };
  tokens: Token[];
  bugs: Bug[];
  powerUps: PowerUp[];
  particles: Particle[];
  trail: Vec[];
  keys: Set<string>;
  pointer: { x: number; y: number; active: boolean };
  joystick: { x: number; y: number; active: boolean };
  score: number;
  combo: number;
  bestCombo: number;
  lives: number;
  elapsed: number;
  nextBugAt: number;
  nextPowerAt: number;
  gridOffset: number;
  idSeq: number;
  over: boolean;
};

const desktopBoard = { width: 900, height: 540 };
const mobileBoard = { width: 640, height: 800 };
const playerRadius = 15;
const targetTokenCount = 5;
const startingLives = 3;
const maxBugs = 44;
const powerUpColor = "#FBBF24";

const tokenTypes: { label: string; points: number }[] = [
  { label: "React", points: 10 },
  { label: "Vue", points: 10 },
  { label: "Angular", points: 12 },
  { label: "Svelte", points: 12 },
  { label: "Next.js", points: 12 },
  { label: "Nuxt", points: 12 },
  { label: "Node", points: 10 },
  { label: "Deno", points: 12 },
  { label: "Bun", points: 14 },
  { label: "TypeScript", points: 12 },
  { label: "JavaScript", points: 10 },
  { label: "Python", points: 12 },
  { label: "Go", points: 14 },
  { label: "Rust", points: 16 },
  { label: "Java", points: 10 },
  { label: "PHP", points: 10 },
  { label: "Ruby", points: 12 },
  { label: "Elixir", points: 16 },
  { label: "RxJS", points: 12 },
  { label: "GraphQL", points: 12 },
  { label: "REST", points: 10 },
  { label: "Redux", points: 10 },
  { label: "Vite", points: 12 },
  { label: "Webpack", points: 10 },
  { label: "Tailwind", points: 12 },
  { label: "Sass", points: 10 },
  { label: "PostgreSQL", points: 12 },
  { label: "MongoDB", points: 10 },
  { label: "Redis", points: 12 },
  { label: "MySQL", points: 10 },
  { label: "Prisma", points: 12 },
  { label: "Magento", points: 12 },
  { label: "Shopify", points: 12 },
  { label: "Docker", points: 12 },
  { label: "Kubernetes", points: 16 },
  { label: "AWS", points: 12 },
  { label: "GCP", points: 12 },
  { label: "Azure", points: 12 },
  { label: "Terraform", points: 14 },
  { label: "CI/CD", points: 12 },
  { label: "Git", points: 10 },
  { label: "Jest", points: 10 },
  { label: "Cypress", points: 12 },
  { label: "Playwright", points: 14 },
  { label: "Kafka", points: 14 },
  { label: "gRPC", points: 14 },
  { label: "WebGL", points: 14 },
  { label: "Three.js", points: 14 },
  { label: "Figma", points: 10 },
  { label: "AI", points: 14 },
];

const tokenColor = "#22D3EE";
const bugColor = "#F43F5E";

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

const getComboMultiplier = (combo: number) => 1 + Math.floor(combo / 5);

const createToken = (world: GameWorld): Token => {
  // Prefer a technology that isn't already on the board so labels stay varied.
  const activeLabels = new Set(world.tokens.map((token) => token.label));
  const available = tokenTypes.filter((type) => !activeLabels.has(type.label));
  const pool = available.length > 0 ? available : tokenTypes;
  const type = pool[Math.floor(Math.random() * pool.length)];
  const radius = 22 + type.label.length * 2.4;

  let x = 0;
  let y = 0;
  let attempts = 0;

  do {
    x = randomBetween(radius + 12, world.width - radius - 12);
    y = randomBetween(radius + 60, world.height - radius - 12);
    attempts += 1;
  } while (Math.hypot(x - world.player.x, y - world.player.y) < 130 && attempts < 12);

  world.idSeq += 1;

  return {
    id: world.idSeq,
    x,
    y,
    label: type.label,
    points: type.points,
    pulse: Math.random() * Math.PI * 2,
    radius,
  };
};

const spawnBug = (world: GameWorld) => {
  const speed = Math.min(90 + world.elapsed * 6, 320);
  const fromLeft = Math.random() > 0.5;
  const onVerticalEdge = Math.random() > 0.5;

  const x = onVerticalEdge ? (fromLeft ? 20 : world.width - 20) : randomBetween(40, world.width - 40);
  const y = onVerticalEdge ? randomBetween(80, world.height - 40) : 40;

  const angle = Math.atan2(world.height / 2 - y, world.width / 2 - x) + randomBetween(-0.6, 0.6);

  world.idSeq += 1;
  world.bugs.push({
    id: world.idSeq,
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: 15,
    spin: Math.random() * Math.PI,
  });
};

const spawnParticles = (world: GameWorld, x: number, y: number, color: string, amount: number) => {
  for (let i = 0; i < amount; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = randomBetween(60, 260);
    world.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: randomBetween(0.35, 0.7),
      color,
    });
  }
};

const spawnPowerUp = (world: GameWorld) => {
  const radius = 24;
  let x = 0;
  let y = 0;
  let attempts = 0;

  do {
    x = randomBetween(radius + 20, world.width - radius - 20);
    y = randomBetween(radius + 80, world.height - radius - 20);
    attempts += 1;
  } while (Math.hypot(x - world.player.x, y - world.player.y) < 150 && attempts < 12);

  world.idSeq += 1;
  world.powerUps.push({ id: world.idSeq, x, y, pulse: Math.random() * Math.PI * 2, radius });
};

const createWorld = (width: number, height: number): GameWorld => {
  const world: GameWorld = {
    width,
    height,
    player: { x: width / 2, y: height / 2, vx: 0, vy: 0, invuln: 1 },
    tokens: [],
    bugs: [],
    powerUps: [],
    particles: [],
    trail: [],
    keys: new Set<string>(),
    pointer: { x: width / 2, y: height / 2, active: false },
    joystick: { x: 0, y: 0, active: false },
    score: 0,
    combo: 0,
    bestCombo: 0,
    lives: startingLives,
    elapsed: 0,
    nextBugAt: 4,
    nextPowerAt: 12,
    gridOffset: 0,
    idSeq: 0,
    over: false,
  };

  for (let i = 0; i < targetTokenCount; i += 1) {
    world.tokens.push(createToken(world));
  }

  for (let i = 0; i < 3; i += 1) {
    spawnBug(world);
  }

  return world;
};

const updateWorld = (world: GameWorld, dt: number) => {
  world.elapsed += dt;
  world.gridOffset = (world.gridOffset + dt * 26) % 48;

  const { player, keys, pointer, joystick } = world;

  let dirX = 0;
  let dirY = 0;

  if (keys.has("arrowleft") || keys.has("a")) dirX -= 1;
  if (keys.has("arrowright") || keys.has("d")) dirX += 1;
  if (keys.has("arrowup") || keys.has("w")) dirY -= 1;
  if (keys.has("arrowdown") || keys.has("s")) dirY += 1;

  const maxSpeed = 470;
  const joystickMaxSpeed = 260;
  let desiredX = 0;
  let desiredY = 0;

  if (dirX !== 0 || dirY !== 0) {
    const length = Math.hypot(dirX, dirY);
    desiredX = (dirX / length) * maxSpeed;
    desiredY = (dirY / length) * maxSpeed;
  } else if (joystick.active) {
    const magnitude = Math.hypot(joystick.x, joystick.y);
    const deadZone = 0.18;

    if (magnitude > deadZone) {
      const strength = Math.min(1, (magnitude - deadZone) / (1 - deadZone));
      const eased = strength * strength;
      desiredX = (joystick.x / magnitude) * joystickMaxSpeed * eased;
      desiredY = (joystick.y / magnitude) * joystickMaxSpeed * eased;
    }
  } else if (pointer.active) {
    const deltaX = pointer.x - player.x;
    const deltaY = pointer.y - player.y;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance > 6) {
      desiredX = (deltaX / distance) * maxSpeed;
      desiredY = (deltaY / distance) * maxSpeed;
    }
  }

  const steer = Math.min(1, dt * 9);
  player.vx += (desiredX - player.vx) * steer;
  player.vy += (desiredY - player.vy) * steer;

  player.x = Math.max(playerRadius, Math.min(world.width - playerRadius, player.x + player.vx * dt));
  player.y = Math.max(playerRadius, Math.min(world.height - playerRadius, player.y + player.vy * dt));

  if (player.invuln > 0) {
    player.invuln = Math.max(0, player.invuln - dt);
  }

  world.trail.unshift({ x: player.x, y: player.y });
  if (world.trail.length > 16) {
    world.trail.pop();
  }

  for (const token of world.tokens) {
    token.pulse += dt * 4;
  }

  for (const powerUp of world.powerUps) {
    powerUp.pulse += dt * 3;
  }

  const bugCap = Math.min(9 + Math.floor(world.elapsed / 6), maxBugs);
  if (world.elapsed >= world.nextBugAt && world.bugs.length < bugCap) {
    spawnBug(world);
    world.nextBugAt += Math.max(1.4, 4.5 - world.elapsed * 0.05);
  }

  if (world.elapsed >= world.nextPowerAt && world.powerUps.length === 0) {
    spawnPowerUp(world);
    world.nextPowerAt = world.elapsed + randomBetween(16, 22);
  }

  for (const bug of world.bugs) {
    bug.x += bug.vx * dt;
    bug.y += bug.vy * dt;
    bug.spin += dt * 6;

    if (bug.x < bug.radius) {
      bug.x = bug.radius;
      bug.vx = Math.abs(bug.vx);
    } else if (bug.x > world.width - bug.radius) {
      bug.x = world.width - bug.radius;
      bug.vx = -Math.abs(bug.vx);
    }

    if (bug.y < bug.radius) {
      bug.y = bug.radius;
      bug.vy = Math.abs(bug.vy);
    } else if (bug.y > world.height - bug.radius) {
      bug.y = world.height - bug.radius;
      bug.vy = -Math.abs(bug.vy);
    }
  }

  for (let i = world.tokens.length - 1; i >= 0; i -= 1) {
    const token = world.tokens[i];
    const hitDistance = playerRadius + token.radius * 0.7;

    if (Math.hypot(player.x - token.x, player.y - token.y) < hitDistance) {
      const multiplier = getComboMultiplier(world.combo);
      world.score += token.points * multiplier;
      world.combo += 1;
      world.bestCombo = Math.max(world.bestCombo, world.combo);
      spawnParticles(world, token.x, token.y, tokenColor, 14);
      world.tokens.splice(i, 1);
      world.tokens.push(createToken(world));
    }
  }

  for (let i = world.powerUps.length - 1; i >= 0; i -= 1) {
    const powerUp = world.powerUps[i];

    if (Math.hypot(player.x - powerUp.x, player.y - powerUp.y) < playerRadius + powerUp.radius) {
      const sortedByDistance = [...world.bugs].sort(
        (a, b) =>
          Math.hypot(a.x - player.x, a.y - player.y) - Math.hypot(b.x - player.x, b.y - player.y),
      );
      const removeCount = Math.min(Math.ceil(world.bugs.length * 0.6), 14);
      const removed = sortedByDistance.slice(0, removeCount);

      for (const bug of removed) {
        spawnParticles(world, bug.x, bug.y, powerUpColor, 8);
      }

      world.bugs = sortedByDistance.slice(removeCount);
      world.score += 20;
      spawnParticles(world, powerUp.x, powerUp.y, powerUpColor, 26);
      world.powerUps.splice(i, 1);
    }
  }

  if (player.invuln <= 0) {
    for (const bug of world.bugs) {
      if (Math.hypot(player.x - bug.x, player.y - bug.y) < playerRadius + bug.radius) {
        world.lives -= 1;
        world.combo = 0;
        player.invuln = 1.4;
        spawnParticles(world, player.x, player.y, bugColor, 22);

        const knockback = Math.atan2(player.y - bug.y, player.x - bug.x);
        player.vx = Math.cos(knockback) * 360;
        player.vy = Math.sin(knockback) * 360;

        if (world.lives <= 0) {
          world.over = true;
        }
        break;
      }
    }
  }

  for (let i = world.particles.length - 1; i >= 0; i -= 1) {
    const particle = world.particles[i];
    particle.life += dt;
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vx *= 0.92;
    particle.vy *= 0.92;

    if (particle.life >= particle.maxLife) {
      world.particles.splice(i, 1);
    }
  }
};

const drawWorld = (
  ctx: CanvasRenderingContext2D,
  world: GameWorld,
  accentColor: string,
  isTouch: boolean,
  strings: CanvasStrings,
) => {
  ctx.fillStyle = "#0B1121";
  ctx.fillRect(0, 0, world.width, world.height);

  ctx.save();
  ctx.strokeStyle = "rgba(99, 102, 241, 0.14)";
  ctx.lineWidth = 1;
  const gridSize = 48;
  for (let x = -gridSize + world.gridOffset; x < world.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, world.height);
    ctx.stroke();
  }
  for (let y = -gridSize + world.gridOffset; y < world.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(world.width, y);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const token of world.tokens) {
    const scale = 1 + Math.sin(token.pulse) * 0.06;
    const width = token.radius * 2 * scale;
    const height = 40 * scale;

    ctx.save();
    ctx.shadowBlur = 22;
    ctx.shadowColor = tokenColor;
    ctx.fillStyle = "rgba(34, 211, 238, 0.16)";
    ctx.strokeStyle = tokenColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(token.x - width / 2, token.y - height / 2, width, height, 14);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = "#F8FAFC";
    ctx.font = "bold 16px 'Space Grotesk', sans-serif";
    ctx.fillText(token.label, token.x, token.y + 1);
  }
  ctx.restore();

  for (const bug of world.bugs) {
    ctx.save();
    ctx.translate(bug.x, bug.y);
    ctx.rotate(bug.spin);
    ctx.shadowBlur = 18;
    ctx.shadowColor = bugColor;
    ctx.fillStyle = bugColor;
    ctx.beginPath();
    const spikes = 8;
    for (let i = 0; i < spikes * 2; i += 1) {
      const radius = i % 2 === 0 ? bug.radius : bug.radius * 0.55;
      const angle = (Math.PI / spikes) * i;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  for (const powerUp of world.powerUps) {
    const scale = 1 + Math.sin(powerUp.pulse) * 0.12;

    ctx.save();
    ctx.translate(powerUp.x, powerUp.y);
    ctx.shadowBlur = 28;
    ctx.shadowColor = powerUpColor;
    ctx.fillStyle = "rgba(251, 191, 36, 0.16)";
    ctx.strokeStyle = powerUpColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, powerUp.radius * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = powerUpColor;
    ctx.beginPath();
    const spikes = 4;
    const outer = powerUp.radius * 0.72 * scale;
    const inner = powerUp.radius * 0.28 * scale;
    for (let i = 0; i < spikes * 2; i += 1) {
      const radius = i % 2 === 0 ? outer : inner;
      const angle = (Math.PI / spikes) * i - Math.PI / 2;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  for (const particle of world.particles) {
    const alpha = 1 - particle.life / particle.maxLife;
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  world.trail.forEach((point, index) => {
    const alpha = (1 - index / world.trail.length) * 0.4;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(point.x, point.y, playerRadius * (1 - index / world.trail.length), 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  const blinking = world.player.invuln > 0 && Math.floor(world.player.invuln * 12) % 2 === 0;
  if (!blinking) {
    ctx.save();
    ctx.shadowBlur = 26;
    ctx.shadowColor = accentColor;
    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(world.player.x, world.player.y, playerRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#F8FAFC";
    ctx.beginPath();
    ctx.arc(world.player.x, world.player.y, playerRadius * 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
  for (let y = 0; y < world.height; y += 3) {
    ctx.fillRect(0, y, world.width, 1);
  }
  ctx.restore();

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#94A3B8";
  ctx.font = "bold 13px Inter, sans-serif";
  ctx.fillText(strings.score, 24, 34);
  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 34px 'Space Grotesk', sans-serif";
  ctx.fillText(String(world.score), 24, 66);

  if (world.combo > 1) {
    ctx.fillStyle = accentColor;
    ctx.font = "bold 18px 'Space Grotesk', sans-serif";
    ctx.fillText(
      `x${getComboMultiplier(world.combo)} ${strings.combo} · ${world.combo} ${strings.streak}`,
      24,
      92,
    );
  }

  for (let i = 0; i < startingLives; i += 1) {
    const cx = world.width - 28 - i * 30;
    ctx.beginPath();
    ctx.arc(cx, 34, 9, 0, Math.PI * 2);
    ctx.fillStyle = i < world.lives ? bugColor : "rgba(148, 163, 184, 0.25)";
    ctx.fill();
  }

  if (world.elapsed < 4.5) {
    ctx.globalAlpha = Math.max(0, 1 - world.elapsed / 4.5);
    ctx.textAlign = "center";
    ctx.fillStyle = "#F8FAFC";
    ctx.font = "bold 18px 'Space Grotesk', sans-serif";
    const hint = isTouch ? strings.hintTouch : strings.hintDesktop;
    ctx.fillText(hint, world.width / 2, world.height - 28);
    ctx.globalAlpha = 1;
    ctx.textAlign = "left";
  }
};

type VirtualJoystickProps = {
  accentColor: string;
  onChange: (x: number, y: number, active: boolean) => void;
};

const knobRadius = 22;

const VirtualJoystick = ({ accentColor, onChange }: VirtualJoystickProps) => {
  const baseRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const [knob, setKnob] = useState({ x: 0, y: 0 });

  const handleMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const base = baseRef.current;
    if (!activeRef.current || !base) {
      return;
    }

    const rect = base.getBoundingClientRect();
    const maxRadius = rect.width / 2;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);
    const norm = distance > 0 ? Math.min(distance, maxRadius) / maxRadius : 0;
    const dirX = distance > 0 ? deltaX / distance : 0;
    const dirY = distance > 0 ? deltaY / distance : 0;

    const knobTravel = maxRadius - knobRadius;
    setKnob({ x: dirX * norm * knobTravel, y: dirY * norm * knobTravel });
    onChange(dirX * norm, dirY * norm, true);
  };

  const handleStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    activeRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    handleMove(event);
  };

  const handleEnd = () => {
    activeRef.current = false;
    setKnob({ x: 0, y: 0 });
    onChange(0, 0, false);
  };

  return (
    <div
      ref={baseRef}
      onPointerDown={handleStart}
      onPointerMove={handleMove}
      onPointerUp={handleEnd}
      onPointerCancel={handleEnd}
      className="flex h-28 w-28 touch-none select-none items-center justify-center rounded-full border border-ink/15 bg-surface-dark/60 backdrop-blur-sm"
      aria-hidden="true"
    >
      <div
        className="pointer-events-none h-11 w-11 rounded-full border-2 border-white/30 shadow-lg"
        style={{
          backgroundColor: accentColor,
          transform: `translate(${knob.x}px, ${knob.y}px)`,
        }}
      />
    </div>
  );
};

export const DeliveryDashCanvas = ({ accentColor, strings, onGameOver }: DeliveryDashCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<GameWorld | null>(null);
  const onGameOverRef = useRef(onGameOver);
  const stringsRef = useRef(strings);
  const isTouchRef = useRef(false);
  const [isTouch] = useState(() => {
    const coarsePointer =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    isTouchRef.current = coarsePointer;
    return coarsePointer;
  });

  onGameOverRef.current = onGameOver;
  stringsRef.current = strings;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return undefined;
    }

    const board = isTouchRef.current ? mobileBoard : desktopBoard;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = board.width * dpr;
    canvas.height = board.height * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const world = createWorld(board.width, board.height);
    worldRef.current = world;

    const movementKeys = new Set([
      "arrowup",
      "arrowdown",
      "arrowleft",
      "arrowright",
      "w",
      "a",
      "s",
      "d",
    ]);

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
        event.preventDefault();
      }
      world.keys.add(key);

      if (movementKeys.has(key)) {
        world.pointer.active = false;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      world.keys.delete(event.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    let animationFrame = 0;
    let lastTime = performance.now();
    let finished = false;

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      updateWorld(world, dt);
      drawWorld(context, world, accentColor, isTouchRef.current, stringsRef.current);

      if (world.over && !finished) {
        finished = true;
        onGameOverRef.current({ score: world.score, bestCombo: world.bestCombo });
        return;
      }

      animationFrame = window.requestAnimationFrame(loop);
    };

    animationFrame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [accentColor]);

  const updatePointer = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const world = worldRef.current;
    const canvas = canvasRef.current;
    
    if (!world || !canvas || isTouchRef.current) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    world.pointer.x = ((event.clientX - rect.left) / rect.width) * world.width;
    world.pointer.y = ((event.clientY - rect.top) / rect.height) * world.height;
    world.pointer.active = true;
  };

  const deactivatePointer = () => {
    const world = worldRef.current;
    if (world) {
      world.pointer.active = false;
    }
  };

  const handleJoystickChange = (x: number, y: number, active: boolean) => {
    const world = worldRef.current;
    if (!world) {
      return;
    }

    world.joystick.x = x;
    world.joystick.y = y;
    world.joystick.active = active;
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Delivery Dash arcade game board"
        onPointerMove={updatePointer}
        onPointerDown={updatePointer}
        onPointerLeave={deactivatePointer}
        onPointerUp={deactivatePointer}
        style={{
          aspectRatio: isTouch
            ? `${mobileBoard.width} / ${mobileBoard.height}`
            : `${desktopBoard.width} / ${desktopBoard.height}`,
        }}
        className="w-full touch-none rounded-[2rem] border border-ink/10 bg-base"
      />
      {isTouch && (
        <div className="mt-4 flex justify-start">
          <VirtualJoystick accentColor={accentColor} onChange={handleJoystickChange} />
        </div>
      )}
    </div>
  );
};
