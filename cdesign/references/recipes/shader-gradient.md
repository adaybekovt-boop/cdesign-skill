# Recipe: Shader Gradient Background

GLSL simplex noise gradient — organic, living color flow.
Looks like Aurora Borealis / Apple Vision Pro.
Significantly more premium than CSS gradient.

## When to use

User mentions: "живой градиент", "aurora", "organic colors",
"shader background", "premium gradient", "flowing colors",
"как Apple Vision Pro", "переливание как северное сияние"

Use CSS gradient (animated-glass-gradient.md) when performance is critical.
Use this shader when visual quality is the priority.

## Component: ShaderGradientBg

Create components/ui/shader-gradient-bg.tsx:

```tsx
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "motion/react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uNoiseScale;

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;

    // Layered noise for organic feel
    float n1 = snoise(vec3(uv * uNoiseScale, uTime * 0.12));
    float n2 = snoise(vec3(uv * uNoiseScale * 2.1, uTime * 0.08 + 10.0));
    float n3 = snoise(vec3(uv * uNoiseScale * 0.5, uTime * 0.05 + uScroll * 0.3));

    float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    noise = noise * 0.5 + 0.5; // remap to 0-1

    // Scroll shifts color mix
    float scrollShift = uScroll * 0.4;

    // Blend 3 colors based on noise + scroll
    vec3 color = mix(uColor1, uColor2, smoothstep(0.0, 0.6, noise + scrollShift));
    color = mix(color, uColor3, smoothstep(0.4, 1.0, noise + scrollShift * 0.5));

    // Subtle vignette
    float vignette = 1.0 - length((uv - 0.5) * 1.4);
    color *= smoothstep(0.0, 0.8, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const COLOR_SCHEMES = {
  aurora: {
    color1: new THREE.Color("#0ea5e9"),
    color2: new THREE.Color("#6366f1"),
    color3: new THREE.Color("#10b981"),
  },
  dusk: {
    color1: new THREE.Color("#5e6ad2"),
    color2: new THREE.Color("#a855f7"),
    color3: new THREE.Color("#ec4899"),
  },
  ember: {
    color1: new THREE.Color("#f59e0b"),
    color2: new THREE.Color("#ef4444"),
    color3: new THREE.Color("#8b5cf6"),
  },
  ocean: {
    color1: new THREE.Color("#0284c7"),
    color2: new THREE.Color("#0891b2"),
    color3: new THREE.Color("#6366f1"),
  },
};

function GradientMesh({
  scheme,
  noiseScale,
}: {
  scheme: keyof typeof COLOR_SCHEMES;
  noiseScale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColor1: { value: COLOR_SCHEMES[scheme].color1 },
      uColor2: { value: COLOR_SCHEMES[scheme].color2 },
      uColor3: { value: COLOR_SCHEMES[scheme].color3 },
      uNoiseScale: { value: noiseScale },
    }),
    [scheme, noiseScale]
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uScroll.value = scrollYProgress.get();
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface ShaderGradientBgProps {
  children: React.ReactNode;
  scheme?: keyof typeof COLOR_SCHEMES;
  noiseScale?: number;
  glassIntensity?: "none" | "soft" | "strong";
  className?: string;
}

export function ShaderGradientBg({
  children,
  scheme = "aurora",
  noiseScale = 1.8,
  glassIntensity = "soft",
  className,
}: ShaderGradientBgProps) {
  return (
    <div className={cn("relative min-h-[100dvh] overflow-hidden", className)}>
      {/* Shader gradient layer */}
      <div className="absolute inset-0 -z-10">
        <Canvas
          frameloop="always"
          camera={{ position: [0, 0, 1], fov: 75 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "low-power" }}
        >
          <GradientMesh scheme={scheme} noiseScale={noiseScale} />
        </Canvas>
      </div>

      {/* Frosted glass overlay */}
      {glassIntensity !== "none" && (
        <div
          className={cn(
            "absolute inset-0 -z-[5]",
            glassIntensity === "soft"
              ? "backdrop-blur-[48px] backdrop-saturate-[1.6]"
              : "backdrop-blur-[72px] backdrop-saturate-[2.0]"
          )}
          aria-hidden
        />
      )}

      {children}
    </div>
  );
}
```

## Usage

```tsx
import { ShaderGradientBg } from "@/components/ui/shader-gradient-bg";

// Aurora (default — blue/purple/green)
<ShaderGradientBg scheme="aurora" glassIntensity="soft">
  <Hero />
</ShaderGradientBg>

// Dusk — purple/pink
<ShaderGradientBg scheme="dusk" glassIntensity="strong">
  <Section />
</ShaderGradientBg>

// No glass — naked gradient
<ShaderGradientBg scheme="ocean" glassIntensity="none">
  <HeroVideo />
</ShaderGradientBg>
```

## Color schemes
- `aurora` — blue / indigo / emerald (default, universal)
- `dusk` — indigo / violet / pink (editorial, luxury)
- `ember` — amber / red / purple (warm, aggressive)
- `ocean` — sky / cyan / indigo (clean, tech)

## Performance
- `frameloop="always"` required — shader needs continuous uTime update
- `dpr={[1, 1.5]}` — never full retina for background shader
- `powerPreference="low-power"` — hints GPU to use integrated graphics
- Gate with DeviceTierProvider: on data-tier="low" render CSS fallback instead
- One instance per page max

## DeviceTier fallback

```tsx
// In layout or component:
const tier = document.documentElement.dataset.tier;
if (tier === "low") {
  return <div className="gradient-bg-fallback">{children}</div>;
}
return <ShaderGradientBg>{children}</ShaderGradientBg>;
```

## CSS fallback for globals.css

```css
.gradient-bg-fallback {
  background: linear-gradient(135deg, #0ea5e9, #6366f1, #10b981);
  background-size: 300% 300%;
  animation: gradient-shift 8s ease infinite;
}
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

## Anti-patterns
❌ Never use on every section — one instance per page
❌ Never set dpr above 1.5 for background shaders
❌ Never use `frameloop="demand"` — shader needs continuous time update
❌ Never stack ShaderGradientBg + GlassGradientBg on same page
