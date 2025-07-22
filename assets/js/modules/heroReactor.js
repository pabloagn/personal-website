document.addEventListener('DOMContentLoaded', () => {
  const streamEls = document.querySelectorAll('.hero-stream');
  if (!streamEls.length) return;
  
  const MAX_SPEED = 1200;
  const MIN_SPEED = 30;
  const HOLD_MIN  = 8000;
  const HOLD_MAX  = 25000;
  const TWEEN_MIN = 800;
  const TWEEN_MAX = 4000;
  const REST_MIN  = 15000;
  const REST_MAX  = 45000;
  
  const rand  = (min, max) => Math.random() * (max - min) + min;
  const sign  = () => (Math.random() < 0.5 ? 1 : -1);
  
  // Aggressive easing functions for particle accelerator feel
  const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  const easeInQuart = t => t * t * t * t;
  const easeInOutBack = t => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  };
  
  const lanes = Array.from(streamEls).map((lane, i) => {
    const inner = lane.querySelector('.hero-stream__inner');
    inner.insertAdjacentHTML('beforeend', inner.innerHTML);
    
    return {
      inner,
      x: rand(-inner.offsetWidth, 0),
      speed: rand(MIN_SPEED * 0.2, MIN_SPEED * 0.8) * sign(),
      target: 0,
      phase: rand(0, 10000), // Stagger initial phases
      maxPhase: 0,
      restPhase: rand(REST_MIN, REST_MAX),
      acceleration: rand(0.015, 0.045), // Individual acceleration rates
      turbulence: rand(0.8, 1.2), // Speed multiplier variance
      direction: Math.random() < 0.5 ? 1 : -1,
      burstMode: false,
      burstIntensity: 1,
      microJitter: 0
    };
  });
  
  let last = performance.now();
  
  const loop = now => {
    const dt = Math.min((now - last) / 1000, 1/30); // Cap delta time
    last = now;
    
    for (const l of lanes) {
      // Add micro-jitter for more organic feel
      l.microJitter = Math.sin(now * 0.003 + l.phase * 0.001) * rand(0.1, 0.3);
      
      // Movement with jitter
      const effectiveSpeed = l.speed * l.turbulence + l.microJitter;
      l.x = (l.x - effectiveSpeed * dt) % l.inner.offsetWidth;
      if (l.x > 0) l.x -= l.inner.offsetWidth;
      
      l.inner.style.transform = `translateX(${l.x}px)`;
      
      l.phase -= dt * 1000;
      l.restPhase -= dt * 1000;
      
      // Burst mode trigger (random high-energy events)
      if (Math.random() < 0.0003 && !l.burstMode) {
        l.burstMode = true;
        l.burstIntensity = rand(1.5, 2.8);
        l.target = rand(MAX_SPEED * 0.7, MAX_SPEED) * l.direction * l.burstIntensity;
        l.phase = rand(TWEEN_MIN * 0.3, TWEEN_MIN * 0.7);
        l.maxPhase = l.phase;
        l.acceleration = rand(0.08, 0.15); // Much faster acceleration
      }
      
      // Regular phase transitions
      if (l.phase <= 0 && !l.burstMode) {
        // Decide next behavior with weighted randomness
        const behavior = Math.random();
        
        if (behavior < 0.15) {
          // Complete stop/near stop
          l.target = rand(-MIN_SPEED * 0.3, MIN_SPEED * 0.3);
          l.restPhase = rand(REST_MIN, REST_MAX);
        } else if (behavior < 0.35) {
          // Gentle drift
          l.target = rand(MIN_SPEED * 0.4, MIN_SPEED * 1.2) * sign();
        } else if (behavior < 0.7) {
          // Medium acceleration
          l.target = rand(MIN_SPEED * 2, MAX_SPEED * 0.4) * sign();
        } else {
          // High speed run
          l.target = rand(MAX_SPEED * 0.6, MAX_SPEED) * sign();
        }
        
        // Randomize direction occasionally
        if (Math.random() < 0.3) {
          l.direction *= -1;
          l.target *= l.direction;
        }
        
        l.phase = rand(TWEEN_MIN, TWEEN_MAX);
        l.maxPhase = l.phase;
        l.acceleration = rand(0.02, 0.06);
        l.turbulence = rand(0.85, 1.15);
      }
      
      // Aggressive easing with different curves based on context
      if (Math.abs(l.speed - l.target) > 1) {
        const progress = 1 - (l.phase / l.maxPhase);
        let easedProgress;
        
        if (l.burstMode) {
          // Explosive acceleration for bursts
          easedProgress = easeInQuart(progress);
        } else if (Math.abs(l.target) > MAX_SPEED * 0.5) {
          // Quick ramp-up for high speeds
          easedProgress = easeInOutBack(progress);
        } else {
          // Smooth but quick for normal speeds
          easedProgress = easeOutExpo(progress);
        }
        
        const accel = l.acceleration * (1 + easedProgress * 2);
        l.speed += (l.target - l.speed) * accel;
      }
      
      // Exit burst mode
      if (l.burstMode && l.phase < -rand(HOLD_MIN * 0.3, HOLD_MIN)) {
        l.burstMode = false;
        l.burstIntensity = 1;
        l.phase = 0;
      }
      
      // Regular hold phase exit
      if (!l.burstMode && l.phase < -rand(HOLD_MIN, HOLD_MAX)) {
        l.phase = 0;
      }
      
      // Rest phase (periodic low activity)
      if (l.restPhase <= 0) {
        if (Math.random() < 0.7) {
          l.target = rand(-MIN_SPEED * 0.2, MIN_SPEED * 0.2);
          l.phase = rand(TWEEN_MIN * 2, TWEEN_MAX * 1.5);
          l.maxPhase = l.phase;
        }
        l.restPhase = rand(REST_MIN, REST_MAX);
      }
    }
    
    requestAnimationFrame(loop);
  };
  
  requestAnimationFrame(loop);
});
