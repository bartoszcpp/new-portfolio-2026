import { motion } from "motion/react";
import { Server, Store, Laptop } from "lucide-react";

export function FrameworkDiagram() {
  const brands = [
    { name: "Greyson Clothiers", color: "bg-surface-dark" },
    { name: "UTZ Snacks", color: "bg-accent-indigo" },
    { name: "Great Garden", color: "bg-ink-light" }
  ];

  return (
    <div className="relative w-full py-16 flex flex-col items-center">
      {/* Core Framework Node */}
      <motion.div 
        className="bg-accent-cyan p-8 rounded-[2rem] shadow-xl z-10 border-4 border-surface-dark flex flex-col items-center gap-4 w-64"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <Server size={48} className="text-surface-dark" />
        <div className="text-center">
          <h3 className="font-display font-bold text-surface-dark text-xl">Core Framework</h3>
          <p className="text-sm text-surface-dark/80 font-medium">Vue.js + Node.js + Shopify</p>
        </div>
      </motion.div>

      {/* Connecting Lines */}
      <div className="flex justify-center w-full max-w-2xl relative h-16 my-4">
        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
          <motion.path 
            d="M 50% 0 Q 20% 50 10% 100" 
            fill="none" 
            stroke="var(--color-ink-light)" 
            strokeWidth="4"
            strokeDasharray="8 8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.path 
            d="M 50% 0 L 50% 100" 
            fill="none" 
            stroke="var(--color-accent-indigo)" 
            strokeWidth="4"
            strokeDasharray="8 8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.path 
            d="M 50% 0 Q 80% 50 90% 100" 
            fill="none" 
            stroke="var(--color-ink-light)" 
            strokeWidth="4"
            strokeDasharray="8 8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </svg>
      </div>

      {/* Generated Storefronts */}
      <div className="flex justify-between w-full max-w-4xl px-4 gap-4 z-10">
        {brands.map((brand, i) => (
          <motion.div
            key={brand.name}
            className={`${brand.color} p-6 rounded-[2rem] shadow-lg flex-1 text-white flex flex-col items-center gap-3 border-4 border-surface-dark`}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.2 }}
            whileHover={{ y: -10 }}
          >
            <Store size={32} />
            <h4 className="font-bold text-center leading-tight">{brand.name}</h4>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
