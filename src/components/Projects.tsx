import { motion } from "motion/react";
import type { ReactNode } from "react";
import { WorkwearImpact } from "./visuals/WorkwearImpact";
import { FrameworkDiagram } from "./visuals/FrameworkDiagram";
import { CanvasDiagram } from "./visuals/CanvasDiagram";

const Badge = ({ children }: { children: ReactNode }) => (
  <span className="px-4 py-2 bg-surface-dark rounded-full text-ink font-bold text-sm shadow-sm border-2 border-ink/10">
    {children}
  </span>
);

export const Projects = () => (
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
            Workwear Express <br/>
            <span className="text-accent-indigo">E-commerce Portal</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Badge>React</Badge>
            <Badge>RxJS</Badge>
            <Badge>Magento</Badge>
            <Badge>B2B Portal</Badge>
            <Badge>AI Agents</Badge>
          </div>
        </div>
          
        <div className="space-y-6 text-lg text-ink-light font-medium leading-relaxed">
          <p>
            Workwear Express is a UK-based workwear e-commerce company with a mature, high-impact sales platform. This became my most important long-term project, where I had the biggest influence on both product development and engineering standards.
          </p>
          <p>
            I worked on the ongoing development of the core React, RxJS and Magento sales system, delivering new business features from client requirements and proactive team initiatives. These improvements directly supported the company's commercial growth and day-to-day sales operations.
          </p>
          <p>
            I also delivered a dedicated B2B portal from scratch as a separate client request. By integrating AI assistants into the development workflow, the team was able to respond quickly to new business needs while keeping the implementation maintainable.
          </p>
          <p>
            My role evolved with the project: early on I received detailed code reviews from senior engineers, and over time I became the person reviewing others' work, helping the team keep quality high while the platform, company, and sales operation continued to grow.
          </p>
        </div>
      </div>
      <div className="flex-1 w-full bg-base-alt p-8 rounded-[3rem] shadow-xl border-4 border-base relative overflow-hidden">
        <h3 className="font-display font-bold text-ink text-2xl mb-2">Long-Term Product Ownership</h3>
        <p className="text-ink-light/70 font-medium">
          A qualitative view of the areas where I contributed most.
        </p>
        <WorkwearImpact />
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
