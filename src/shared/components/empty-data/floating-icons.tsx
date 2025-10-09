import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Cloud, Wifi } from 'lucide-react';

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: (i: number) => ({
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.2,
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  }),
  float: (i: number) => ({
    y: [0, -10, 0],
    transition: {
      delay: i * 0.1,
      duration: 2,
      repeat: Infinity,
    },
  }),
};

const icons = [
  { Icon: Zap, position: 'top-10 left-10' },
  { Icon: Cloud, position: 'top-20 right-10' },
  { Icon: Wifi, position: 'bottom-10 left-20' },
];

export const FloatingIcons: React.FC = () => (
  <>
    {icons.map(({ Icon, position }, index) => (
      <motion.div
        key={index}
        className={`absolute ${position}`}
        variants={iconVariants}
        custom={index}
        initial="hidden"
        animate={['visible', 'float']}
      >
        <Icon className="text-gray-600 h-6 w-6" />
      </motion.div>
    ))}
  </>
);
