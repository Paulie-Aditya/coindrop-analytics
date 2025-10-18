"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-40" />
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coindrop_logo-fYdCtkpLn3npUlD1boYwGIGlOMhBob.jpg"
              alt="CoinDrop Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-lg font-light tracking-tight">CoinDrop</span>
          </motion.div>
          <motion.a
            href="https://discord.gg/2uBWkkQjVC"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-white/20 hover:border-white/40 rounded-full text-sm font-light transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Discord
          </motion.a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-7xl md:text-8xl font-bold mb-4 tracking-tight">CoinDrop</h1>
            <p className="text-xl md:text-2xl font-light text-white/70">Instant crypto tipping, everywhere.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Reward your community instantly. Send crypto across 5 blockchains with a single Discord command. No
              wallets, no friction, just frictionless Web3 payments.
            </p>

            <motion.a
              href="https://discord.gg/2uBWkkQjVC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 hover:border-white/40 rounded-full font-light transition-colors duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-light mb-16 text-center"
          >
            Why CoinDrop
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {[
              {
                title: "Instant Tipping",
                description: "Send tokens with /tip. No wallet setup, no manual transfers.",
              },
              {
                title: "Multi-Chain",
                description: "Ethereum, BSC, Polygon, Avalanche, Optimism. One wallet, infinite possibilities.",
              },
              {
                title: "Auto Wallets",
                description: "Every user gets a secure wallet. No seed phrases, no complexity.",
              },
              {
                title: "Live Pricing",
                description: "Real-time USD values from Pyth. Always know what you're sending.",
              },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="group">
                <motion.div
                  className="p-8 border border-white/5 hover:border-white/10 rounded-lg transition-colors duration-300"
                  whileHover={{ y: -4 }}
                >
                  <h3 className="text-lg font-light mb-3">{feature.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-light mb-16 text-center"
          >
            Built For
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "DAOs", description: "Reward contributors and governance participants instantly." },
              { title: "Gaming Guilds", description: "Tip players for achievements and community participation." },
              { title: "Communities", description: "Build loyalty by rewarding your most active members." },
            ].map((useCase, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="p-6 border border-white/5 hover:border-white/10 rounded-lg transition-colors duration-300 text-center"
                whileHover={{ y: -4 }}
              >
                <h3 className="text-base font-light mb-2">{useCase.title}</h3>
                <p className="text-white/50 text-sm">{useCase.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-light mb-16 text-center"
          >
            How It Works
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { step: "1", title: "Join", desc: "Add CoinDrop to your server" },
              { step: "2", title: "Deposit", desc: "Fund your wallet across chains" },
              { step: "3", title: "Tip", desc: "Use /tip to reward instantly" },
              { step: "4", title: "Withdraw", desc: "Cash out with 0.5% fee" },
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="relative">
                <div className="p-6 border border-white/5 hover:border-white/10 rounded-lg transition-colors duration-300 text-center">
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4 text-sm font-light">
                    {item.step}
                  </div>
                  <h3 className="font-light mb-2 text-sm">{item.title}</h3>
                  <p className="text-white/40 text-xs">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-white/10"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">Ready to reward your community?</h2>
          <p className="text-white/60 mb-8 text-sm leading-relaxed">
            Join Discord and start tipping instantly. No setup required.
          </p>
          <motion.a
            href="https://discord.gg/2uBWkkQjVC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 hover:border-white/40 rounded-full font-light transition-colors duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Discord
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-white/30 text-xs font-light">
          <p>CoinDrop © 2025. Instant crypto tipping, everywhere.</p>
        </div>
      </footer>
    </div>
  )
}
