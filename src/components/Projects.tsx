import { motion } from "motion/react";
import { WorkwearChart } from "./visuals/WorkwearChart";
import { FrameworkDiagram } from "./visuals/FrameworkDiagram";
import { CanvasDiagram } from "./visuals/CanvasDiagram";

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-4 py-2 bg-surface-dark rounded-full text-ink font-bold text-sm shadow-sm border-2 border-ink/10">
    {children}
  </span>
);

export function Projects() {
  return (
    <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto space-y-48">
      
      {/* PROJECT 1 */}
      <motion.div 
        className="flex flex-col lg:flex-row gap-16 items-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight">
              Global Workwear <br/>
              <span className="text-accent-indigo">E-commerce Portal</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              <Badge>React</Badge>
              <Badge>RxJS</Badge>
              <Badge>Magento</Badge>
              <Badge>AI Agents</Badge>
            </div>
          </div>
          
          <div className="space-y-6 text-lg text-ink-light font-medium leading-relaxed">
            <p>
              Managing a massive, high-traffic global sales system requires more than just maintaining code—it demands constant, proactive evolution. As the primary platform grew, standard development cycles began to bottleneck feature releases.
            </p>
            <p>
              We completely revolutionized our approach by building a dedicated B2B portal for enterprise clients from scratch. The true breakthrough wasn't just the architecture, but the integration of AI assistants into our daily development workflow.
            </p>
            <p>
              By leveraging advanced LLMs for boilerplate generation, test coverage, and complex RxJS stream debugging, we drastically compressed the delivery timeline. What traditionally took months was deployed in weeks, resulting in an immediate and measurable surge in global sales.
            </p>
          </div>
        </div>
        <div className="flex-1 w-full bg-base-alt p-8 rounded-[3rem] shadow-xl border-4 border-base relative overflow-hidden">
          <h3 className="font-display font-bold text-ink text-2xl mb-4">Delivery Velocity Impact</h3>
          <WorkwearChart />
        </div>
      </motion.div>

      {/* PROJECT 2 */}
      <motion.div 
        className="flex flex-col lg:flex-row-reverse gap-16 items-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight">
              Agency E-commerce <br/>
              <span className="text-accent-cyan">Generation Engine</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              <Badge>Vue.js</Badge>
              <Badge>Node.js</Badge>
              <Badge>Shopify</Badge>
              <Badge>Automation</Badge>
            </div>
          </div>
          
          <div className="space-y-6 text-lg text-ink-light font-medium leading-relaxed">
            <p>
              When an agency scales, custom e-commerce builds become a major resource drain. To solve this, I architected and developed a massive internal framework designed to automate and standardize the generation of bespoke Shopify storefronts.
            </p>
            <p>
              Instead of starting from scratch for every client, our engineers utilized this Vue.js and Node.js-powered engine. It provided a robust core architecture while allowing deep customization for unique brand identities.
            </p>
            <p>
              This tool fundamentally shifted the agency's operational capacity. It was successfully deployed to generate highly tailored, performant platforms for major, high-volume brands including Greyson Clothiers, UTZ Snacks, and Great Garden Plants.
            </p>
          </div>
        </div>
        <div className="flex-1 w-full bg-base-alt rounded-[3rem] shadow-xl border-4 border-base overflow-hidden">
          <FrameworkDiagram />
        </div>
      </motion.div>

      {/* PROJECT 3 */}
      <motion.div 
        className="flex flex-col lg:flex-row gap-16 items-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight">
              Interactive Canvas <br/>
              <span className="text-accent-violet">Presentation App</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              <Badge>React</Badge>
              <Badge>Canvas API</Badge>
              <Badge>Node.js</Badge>
              <Badge>WebSockets</Badge>
            </div>
          </div>
          
          <div className="space-y-6 text-lg text-ink-light font-medium leading-relaxed">
            <p>
              Strategic partners required a dynamic, high-impact presentation tool that went far beyond standard slide decks. Stepping into the role of Tech Lead, I took full autonomous ownership of the project's realization—from direct client architecture sessions to final deployment.
            </p>
            <p>
              The core technical challenge was building a flawless, synchronized real-time experience. I engineered a robust solution utilizing the HTML5 Canvas API backed by a Node.js real-time event layer.
            </p>
            <p>
              The application featured a custom real-time image generator, manipulating pixel data on the fly to respond to presenter inputs. This created a deeply immersive, highly responsive presentation environment that captivated strategic stakeholders.
            </p>
          </div>
        </div>
        <div className="flex-1 w-full bg-base-alt p-4 rounded-[3rem] shadow-xl border-4 border-base">
          <CanvasDiagram />
        </div>
      </motion.div>

    </section>
  );
}
