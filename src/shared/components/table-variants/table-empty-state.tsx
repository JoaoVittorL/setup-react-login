import { TableBody, TableCell, TableRow } from '@/shared/components/ui/table';
import { AnimatePresence, motion } from 'framer-motion';
import { LightningPath } from '../empty-data/lightnin-path';
import { FloatingIcons } from '../empty-data/floating-icons';
import { ShieldAlert } from 'lucide-react';
interface TableEmptyStateProps {
  colSpan: number;
  message: string;
  title: string;
}

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
export function TableEmptyState({ colSpan, message, title }: TableEmptyStateProps) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={colSpan} className="text-center">
          <AnimatePresence>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <motion.div
                className="relative flex flex-col items-center gap-6 overflow-hidden rounded-b-md bg-white-500 p-6 dark:bg-muted/40"
                whileHover={{
                  transition: { duration: 0.3 },
                }}
              >
                <LightningPath />
                <FloatingIcons />

                <motion.div
                  className="relative cursor-pointer rounded-full bg-yellow-500/10 p-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShieldAlert className="h-12 w-12 text-red-500" />
                </motion.div>

                <motion.div variants={contentVariants} className="relative space-y-2 text-center">
                  <h3 className="text-xl font-bold text-gray-500">{title}</h3>
                  <p className="mx-auto font-bold dark:text-yellow-100/60">{message}</p>
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
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
