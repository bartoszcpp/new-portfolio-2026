import { motion } from "motion/react";
import { Code2, Database, Layout, Sparkles, Terminal } from "lucide-react";
import portraitImage from "../../assets/bartosz-portrait.png";

export const Hero = () => {
  const icons = [
    { Icon: Layout, color: "text-accent-indigo", top: "10%", left: "10%", delay: 0 },
    { Icon: Database, color: "text-accent-cyan", top: "20%", left: "80%", delay: 0.2 },
    { Icon: Terminal, color: "text-ink-light", top: "70%", left: "15%", delay: 0.4 },
    { Icon: Code2, color: "text-accent-violet", top: "80%", left: "85%", delay: 0.6 },
    { Icon: Sparkles, color: "text-accent-cyan", top: "40%", left: "90%", delay: 0.8 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Floating Icons */}
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.color} opacity-80`}
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          <item.Icon size={48} />
        </motion.div>
      ))}

      <div className="max-w-6xl w-full mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16 relative z-10">
        <motion.div 
          className="flex-1 space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold text-ink leading-[1.1] tracking-tight">
            Engineering
            <br />
            <span className="text-accent-indigo italic">Organic</span>
            <br />
            Experiences.
          </h1>
          <p className="text-xl md:text-2xl text-ink-light max-w-xl font-medium leading-relaxed">
            Hi, I'm Bartosz Ciąpała. I build vibrant, high-performance web platforms bridging deep technical architecture with elevated human design.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accent-indigo text-base rounded-full font-bold text-lg shadow-lg hover:bg-accent-violet transition-colors"
            >
              Explore My Work
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-base-alt text-ink rounded-full font-bold text-lg border-2 border-ink-light hover:bg-base transition-colors"
            >
              Get in Touch
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="flex-1 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Creative Masked Image Placeholder */}
          <div className="w-full aspect-[4/5] relative rounded-t-[12rem] rounded-b-[4rem] overflow-hidden border-8 border-base-alt shadow-2xl">
            <div className="absolute inset-0 bg-ink opacity-10 mix-blend-multiply"></div>
            <img 
              src={portraitImage} 
              alt="Bartosz Ciąpała" 
              className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
            />
          </div>
          
          <motion.div 
            className="absolute -bottom-8 -left-8 bg-surface-dark border border-ink/10 text-ink p-6 rounded-[2rem] shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="font-display font-bold text-2xl">Senior Full-Stack</p>
            <p className="text-accent-cyan font-medium">React • Vue • Node • AI</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
