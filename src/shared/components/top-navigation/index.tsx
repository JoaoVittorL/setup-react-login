import { motion } from 'framer-motion';
import { TabButton } from './tab-button';
import { Props, TabProps } from '@/shared/types/top-navigation';

export function TopNavigation({ setTabTaskActive, tabTaskActive, turnIsActive, items }: Props) {
  return (
    <motion.div
      className="mx-auto mb-2 inline-flex w-full flex-wrap items-center justify-center"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {items.map((tab: TabProps) => {
        if (tab.withTurn === turnIsActive) {
          return (
            <TabButton
              key={tab.id}
              isActive={tabTaskActive === tab.id}
              onClick={() => setTabTaskActive(tab.id)}
              icon={tab.icon}
            >
              {tab.label}
            </TabButton>
          );
        }
        return null;
      })}
    </motion.div>
  );
}
