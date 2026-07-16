import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CODE_BLOCKS = [
  '// Full-Stack Developer Portfolio',
  '@RestController',
  '@RequestMapping("/api")',
  'public class UserController {',
  '  @Autowired',
  '  private UserService userService;',
  '',
  '  @GetMapping("/users")',
  '  public ResponseEntity<List<User>>',
  '  getAllUsers() {',
  '    return ResponseEntity.ok(',
  '      userService.findAll()',
  '    );',
  '  }',
  '',
  '  @PostMapping("/users")',
  '  public User createUser(',
  '    @RequestBody UserDTO dto) {',
  '    return userService.create(dto);',
  '  }',
  '}',
  '',
  'const useProjects = () => {',
  '  const [data, setData] =',
  '    useState<Project[]>([]);',
  '  useEffect(() => {',
  '    api.get("/projects")',
  '      .then(res => setData(res.data));',
  '  }, []);',
  '  return { data };',
  '};',
  '',
  'export default function Dashboard() {',
  '  const { data } = useProjects();',
  '  return (',
  '    <div className="grid">',
  '      {data.map(p => (',
  '        <ProjectCard key={p.id}',
  '          project={p} />',
  '      ))}',
  '    </div>',
  '  );',
  '}',
  '',
  'SELECT p.name, p.tech_stack,',
  '  COUNT(c.id) AS commit_count,',
  '  SUM(c.lines) AS lines_added',
  'FROM projects p',
  'LEFT JOIN commits c',
  '  ON p.id = c.project_id',
  'WHERE p.status = "active"',
  '  AND p.owner_id = :userId',
  'GROUP BY p.id',
  'ORDER BY commit_count DESC',
  'LIMIT 10;',
  '',
  'interface Project {',
  '  id: string;',
  '  name: string;',
  '  tech: Technology[];',
  '  status: "active" | "done";',
  '  createdAt: Date;',
  '}',
  '',
  'docker-compose up --build -d',
  'git add . && git commit -m "feat"',
  'git push origin main',
  'kubectl apply -f deployment.yaml',
  '',
  'await prisma.user.findMany({',
  '  where: { active: true },',
  '  include: { projects: true },',
  '  orderBy: { createdAt: "desc" },',
  '  take: 20,',
  '});',
  '',
  'const redis = new Redis({',
  '  host: process.env.REDIS_HOST,',
  '  port: 6379,',
  '  password: process.env.REDIS_PASS,',
  '});',
  '',
  'await redis.set("session", token, {',
  '  EX: 3600,',
  '});',
];

function buildCodeTexture(hueShift: number) {
  const W = 512, H = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#02040A'; // Darker background
  ctx.fillRect(0, 0, W, H);

  ctx.font = 'bold 18px "Courier New", monospace';
  const lineH = 26;
  const repeated = [...CODE_BLOCKS, '', ...CODE_BLOCKS];

  repeated.forEach((line, i) => {
    const y = i * lineH + 20;
    if (y > H) return;
    const t = line.trim();

    // Brighter colors for clearer visibility
    if (t.startsWith('//') || t.startsWith('--') || t.startsWith('#')) {
      ctx.fillStyle = `hsl(${200 + hueShift}, 40%, 55%)`;
    } else if (/^(SELECT|FROM|WHERE|JOIN|LEFT|GROUP|ORDER|BY|LIMIT|AND|OR|AS)/i.test(t)) {
      ctx.fillStyle = `hsl(${210 + hueShift}, 90%, 75%)`;
    } else if (/^(public|private|class|interface|import|return|await|async|export|const|let|type|new|void|extends)/i.test(t) || t.startsWith('@')) {
      ctx.fillStyle = `hsl(${280 + hueShift}, 85%, 78%)`;
    } else if (t.startsWith('docker') || t.startsWith('git') || t.startsWith('npm') || t.startsWith('kubectl')) {
      ctx.fillStyle = `hsl(${140 + hueShift}, 80%, 65%)`;
    } else if (t.startsWith('"') || t.includes('"active"') || t.includes('"done"') || t.includes('"feat"')) {
      ctx.fillStyle = `hsl(${40 + hueShift}, 95%, 75%)`;
    } else if (t === '') {
      return;
    } else {
      ctx.fillStyle = `hsl(${195 + hueShift}, 30%, 75%)`;
    }
    ctx.fillText(line, 16, y);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function CodePlane({
  position,
  rotation,
  scale,
  scrollSpeed,
  hueShift,
  opacity,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  scrollSpeed: number;
  hueShift: number;
  opacity: number;
}) {
  const tex = useMemo(() => {
    const t = buildCodeTexture(hueShift);
    // Dynamically set repeat based on scale to prevent stretching
    t.repeat.set(scale[0] / 4, scale[1] / 8);
    return t;
  }, [hueShift, scale[0], scale[1]]);
  const offsetRef = useRef(Math.random());

  useFrame((_, dt) => {
    offsetRef.current += dt * scrollSpeed * 0.03;
    tex.offset.y = offsetRef.current % 1;
  });

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={tex}
        transparent
        opacity={opacity}
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

export function CodeRain() {
  const planes = [
    // Far back curved wall
    { pos: [0, 2, -12],   rot: [0, 0, 0],                 sc: [12, 9, 1],   spd: 0.4,  hue: 0,   op: 0.55 },
    { pos: [-8, 2, -9],   rot: [0,  Math.PI / 5, 0],      sc: [9,  8, 1],   spd: 0.28, hue: 20,  op: 0.42 },
    { pos: [ 8, 2, -9],   rot: [0, -Math.PI / 5, 0],      sc: [9,  8, 1],   spd: 0.35, hue: -20, op: 0.42 },
    { pos: [-14, 2, -3],  rot: [0,  Math.PI / 2.5, 0],    sc: [7,  7, 1],   spd: 0.22, hue: 40,  op: 0.3  },
    { pos: [ 14, 2, -3],  rot: [0, -Math.PI / 2.5, 0],    sc: [7,  7, 1],   spd: 0.3,  hue: -40, op: 0.3  },
    // Floor reflection (horizontal, faded)
    { pos: [0, -2.5, -6], rot: [-Math.PI / 2, 0, 0],      sc: [20, 10, 1],  spd: 0.15, hue: 0,   op: 0.08 },
  ];

  return (
    <group>
      {planes.map((p, i) => (
        <CodePlane
          key={i}
          position={p.pos as [number, number, number]}
          rotation={p.rot as [number, number, number]}
          scale={p.sc as [number, number, number]}
          scrollSpeed={p.spd}
          hueShift={p.hue}
          opacity={p.op}
        />
      ))}
    </group>
  );
}
