import React from 'react';
import { motion } from 'framer-motion';

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  },
};

export const LightningPath: React.FC = () => (
  <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.15 }}>
    <motion.path
      d="M50,0 L100,50 L75,100 L125,150 L100,200 L150,250 L125,300"
      stroke="#FF3D0A"
      strokeWidth="3"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
    />
    <motion.path
      d="M200,0 L150,50 L175,100 L125,150 L150,200 L100,250 L125,300"
      stroke="#FF3D0A"
      strokeWidth="3"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
    />

    {/* Background Energy Fields */}
    <motion.path
      d="M0,150 C50,100 100,200 150,150 S250,100 300,150"
      stroke="##FF3D0A"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
    />
    <motion.path
      d="M0,100 C75,50 150,150 225,100 S300,50 400,100"
      stroke="#FF3D0A"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
    />
  </svg>
);
