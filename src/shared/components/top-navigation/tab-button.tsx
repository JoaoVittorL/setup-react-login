import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { Search } from 'lucide-react';
interface Props {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
  icon: typeof Search;
}

const getTabItemStyles = (isActive: boolean) => ({
  button: clsx(
    'relative z-10 px-6 py-2 text-sm font-medium transition-colors flex justify-center items-center gap-2',
    '',
    isActive ? 'text-white' : 'dark:text-white text-gray-600',
  ),
  motionDiv: 'absolute inset-0 bg-green-600',
});
export function TabButton({ isActive, onClick, children, icon: Icon }: Props) {
  const styles = getTabItemStyles(isActive);

  return (
    <div className="relative">
      <button onClick={onClick} className={styles.button}>
        <Icon size={16} />
        {children}
      </button>
      {isActive && (
        <motion.div
          className={styles.motionDiv}
          layoutId="active-tab"
          initial={{ borderRadius: '8px' }}
          animate={{ borderRadius: '8px' }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            mass: 1,
          }}
          style={{
            borderRadius: '8px',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
    </div>
  );
}
