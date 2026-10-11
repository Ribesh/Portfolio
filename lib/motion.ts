// Shared spring presets — critically damped by default (§4 of apple-design),
// a touch of bounce reserved for momentum-driven interactions.
// Note: Motion's spring takes `bounce` (0-1) alongside `duration`, not `damping` —
// `damping` is a raw physical coefficient that bypasses duration resolution entirely
// and (at the default stiffness) produces a wildly underdamped, oscillating spring.
export const SPRING = { type: "spring" as const, bounce: 0, duration: 0.5 }
export const SPRING_SNAPPY = { type: "spring" as const, bounce: 0, duration: 0.3 }
export const SPRING_BOUNCY = { type: "spring" as const, bounce: 0.3, duration: 0.5 }

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: SPRING },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: SPRING },
}

export const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

export const viewport = { once: true, margin: "-80px" }
