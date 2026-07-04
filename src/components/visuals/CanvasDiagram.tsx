import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Network, Sparkles, Volume2, VolumeX } from "lucide-react";
import videriDemoVideo from "../../../assets/videri-demo.mp4";
import { useTranslation } from "../../i18n/LanguageContext";

export const CanvasDiagram = () => {
  const t = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldLoadVideo = useInView(containerRef, { once: true, margin: "300px" });
  const [isMuted, setIsMuted] = useState(true);

  const handleSoundToggle = () => {
    const nextMutedState = !isMuted;
    setIsMuted(nextMutedState);

    if (videoRef.current) {
      videoRef.current.muted = nextMutedState;
      void videoRef.current.play();
    }
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-6 sm:py-12">
      <div className="relative w-full max-w-3xl bg-surface-dark rounded-[2rem] p-3 shadow-2xl overflow-hidden sm:rounded-[3rem] sm:p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.18),transparent_36%)]" />

        <div className="relative z-10 mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-4 sm:gap-3">
          <motion.div
            className="bg-ink/10 backdrop-blur-md px-3 py-2 rounded-3xl text-ink flex items-center gap-2 text-sm sm:px-4 sm:py-3 sm:gap-3 sm:text-base"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Network className="text-accent-cyan" size={18} />
            <span className="font-bold">{t.canvas.socket}</span>
          </motion.div>
          <motion.div
            className="bg-ink/10 backdrop-blur-md px-3 py-2 rounded-3xl text-ink flex items-center gap-2 text-sm sm:px-4 sm:py-3 sm:gap-3 sm:text-base"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="text-accent-violet" size={18} />
            <span className="font-bold">{t.canvas.liveDemo}</span>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 overflow-hidden rounded-[2rem] border border-ink/10 bg-base"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <video
            ref={videoRef}
            src={shouldLoadVideo ? videriDemoVideo : undefined}
            className="aspect-video w-full bg-base object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-4 bg-gradient-to-t from-surface-dark/95 via-surface-dark/70 to-transparent p-3 pt-10 sm:justify-between sm:p-5 sm:pt-14">
            <div className="hidden sm:block">
              <h4 className="font-display text-2xl font-bold text-ink">{t.canvas.engineTitle}</h4>
              <p className="text-sm font-medium text-accent-cyan">{t.canvas.engineSubtitle}</p>
            </div>
            <motion.button
              type="button"
              onClick={handleSoundToggle}
              className="flex shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-ink/10 px-3 py-2 font-bold text-ink backdrop-blur-md transition-colors hover:bg-ink/20 sm:px-4 sm:py-3"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label={isMuted ? t.canvas.soundOnAria : t.canvas.soundOffAria}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              <span className="hidden sm:inline">{isMuted ? t.canvas.soundOn : t.canvas.soundOff}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
