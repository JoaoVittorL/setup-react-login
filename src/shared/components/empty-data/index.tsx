import { motion, AnimatePresence } from 'framer-motion';
import { Database } from 'lucide-react';
import { LightningPath } from './lightnin-path';
import { FloatingIcons } from './floating-icons';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
    },
  },
};
interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyData({ title, description }: EmptyStateProps) {
  return (
    <AnimatePresence>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="mt-4">
        <motion.div
          className="bg-gray-10000 relative flex flex-col items-center gap-6 overflow-hidden rounded-lg border border-gray-500/30 from-gray-900 to-gray-800 p-6 dark:bg-gradient-to-b"
          whileHover={{
            transition: { duration: 0.3 },
          }}
        >
          <LightningPath />
          <FloatingIcons />

          <motion.div
            className="relative z-10 cursor-pointer rounded-full bg-yellow-500/10 p-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Database className="h-12 w-12 text-gray-500" />
          </motion.div>

          <motion.div variants={contentVariants} className="relative z-10 space-y-2 text-center">
            <h3 className="text-xl font-bold text-gray-500">{title}</h3>
            <p className="mx-auto dark:text-yellow-100/60">{description}</p>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-yellow-400/5 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
