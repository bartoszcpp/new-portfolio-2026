import { motion } from "motion/react";
import { GitMerge, Users, Zap, Code2, Network } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Philosophy = {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  bg: string;
};

const philosophies: Philosophy[] = [
  {
    icon: Zap,
    title: "Pragmatic Architecture",
    desc: "Focusing on business value over theoretical perfection. Clean code is a means to an end-scalable, maintainable, and highly performant user experiences.",
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10"
  },
  {
    icon: Network,
    title: "Knowledge Amplification",
    desc: "Code reviews aren't just quality gates; they are the primary vehicle for engineering growth. I prioritize proactive refactoring and cross-pollination of skills.",
    color: "text-accent-indigo",
    bg: "bg-accent-indigo/10"
  },
  {
    icon: Code2,
    title: "AI-Augmented Execution",
    desc: "Pioneering modern workflows by integrating LLMs, Cursor, and Copilot natively into our processes, drastically reducing boilerplate and accelerating delivery.",
    color: "text-accent-violet",
    bg: "bg-accent-violet/10"
  }
];

export const Leadership = () => (
  <section className="bg-surface-dark py-32 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-32 -right-32 w-96 h-96 bg-accent-indigo rounded-full mix-blend-screen opacity-20 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-accent-cyan rounded-full mix-blend-screen opacity-20 blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 items-center">
        
        <div className="flex-1 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-ink leading-tight">
              Engineering <br/>
              <span className="text-accent-cyan italic">Philosophy</span>
            </h2>
            <p className="mt-6 text-xl text-ink-light/80 font-medium max-w-lg leading-relaxed">
              Writing code is only half the job. Elevating the entire team's standards, architecture, and workflow is where true leverage is created.
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div 
              className="flex items-start gap-6 bg-base-alt/50 p-6 rounded-[2rem] border border-ink/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-4 bg-ink-light rounded-full text-accent-indigo">
                <Users size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-ink mb-2">Mentorship & Growth</h4>
                <p className="text-ink-light/70 font-medium">Actively guiding developers to turn raw technical potential into high-impact, autonomous engineering execution.</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start gap-6 bg-base-alt/50 p-6 rounded-[2rem] border border-ink/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-4 bg-ink-light rounded-full text-accent-cyan">
                <GitMerge size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-ink mb-2">Architectural Standards</h4>
                <p className="text-ink-light/70 font-medium">Enforcing clean architecture, rigorous state management, and proactive optimization across the entire stack.</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 w-full grid gap-6">
          {philosophies.map((item, i) => (
            <motion.div
              key={i}
              className="bg-base-alt p-8 rounded-[2rem] border border-ink/5 shadow-2xl relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ink/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}>
                <item.icon size={32} className={item.color} />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-ink mb-3">{item.title}</h3>
              <p className="text-ink-light/70 font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
  </section>
);
