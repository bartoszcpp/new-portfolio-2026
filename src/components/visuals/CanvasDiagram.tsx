import { motion } from "motion/react";
import { MonitorPlay, Sparkles, Network } from "lucide-react";

export function CanvasDiagram() {
  return (
    <div className="w-full flex flex-col items-center py-12">
      <div className="relative w-full max-w-3xl aspect-[16/9] bg-surface-dark rounded-[3rem] p-8 shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Abstract Canvas Background Particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 bg-accent-indigo rounded-full blur-xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="flex justify-between items-start z-10">
          <motion.div 
            className="bg-ink/10 backdrop-blur-md p-4 rounded-3xl text-ink flex items-center gap-3"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Network className="text-accent-cyan" />
            <span className="font-bold">Socket.io Events</span>
          </motion.div>
          <motion.div 
            className="bg-ink/10 backdrop-blur-md p-4 rounded-3xl text-ink flex items-center gap-3"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="text-accent-indigo" />
            <span className="font-bold">Real-time Render</span>
          </motion.div>
        </div>

        <div className="self-center z-10 relative">
          <motion.div
            className="w-48 h-48 border-8 border-accent-cyan rounded-full flex items-center justify-center relative overflow-hidden"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <MonitorPlay size={64} className="text-ink" />
            <motion.div 
              className="absolute inset-0 bg-accent-indigo mix-blend-overlay"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "center center", clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
            />
          </motion.div>
          
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 border-4 border-accent-cyan rounded-full"
            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </div>

        <motion.div 
          className="text-center z-10"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-2xl font-display font-bold text-ink">HTML5 Canvas Engine</h4>
          <p className="text-accent-cyan font-medium">60 FPS Sync across devices</p>
        </motion.div>
      </div>
    </div>
  );
}
