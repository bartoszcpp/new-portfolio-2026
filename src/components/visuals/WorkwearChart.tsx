import { motion } from "motion/react";

export const WorkwearChart = () => (
  <div className="w-full h-64 flex items-end justify-between gap-4 mt-8 relative px-4">
      <div className="absolute inset-0 flex flex-col justify-between py-4 z-0">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full border-t-2 border-ink/10 border-dashed" />
        ))}
      </div>
      
      {/* Before AI */}
      <div className="flex-1 flex flex-col items-center gap-4 z-10">
        <motion.div 
          className="w-full max-w-[120px] bg-surface-dark rounded-t-[2rem] rounded-b-xl shadow-lg relative overflow-hidden flex flex-col justify-end"
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="p-4 text-white font-bold text-center">Standard<br/>Dev Time</div>
        </motion.div>
        <span className="font-bold text-ink">Before AI</span>
      </div>

      {/* After AI */}
      <div className="flex-1 flex flex-col items-center gap-4 z-10">
        <motion.div 
          className="w-full max-w-[120px] bg-accent-indigo rounded-t-[2rem] rounded-b-xl shadow-lg relative overflow-hidden flex flex-col justify-end"
          initial={{ height: 0 }}
          whileInView={{ height: "40%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <div className="p-4 text-white font-bold text-center">AI Assisted</div>
        </motion.div>
        <span className="font-bold text-ink">With Copilot/Cursor</span>
      </div>

      {/* Impact Badge */}
      <motion.div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-cyan text-surface-dark font-bold py-3 px-6 rounded-full shadow-xl z-20 whitespace-nowrap border-4 border-surface-dark"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", delay: 1 }}
      >
        60% Faster Delivery!
      </motion.div>
  </div>
);
