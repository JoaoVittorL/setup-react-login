import { TableBody, TableCell, TableRow } from '@/shared/components/ui/table';
import { motion } from 'framer-motion';

interface TableLoadingProps {
  colSpan: number;
  message?: string;
}

export function TableLoading({ colSpan, message }: TableLoadingProps) {
  return (
    <TableBody className="h-32 bg-white dark:bg-muted/40">
      <TableRow>
        <TableCell colSpan={colSpan} className="p-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="relative">
              <motion.div
                className="h-12 w-12 rounded-full border-8 border-gray-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-0 h-12 w-12 rounded-full border-8 border-transparent border-r-primary border-t-primary"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.2,
                }}
              />
            </div>
            <div className="space-y-2 text-center">
              <motion.p
                className="text-lg font-medium text-primary"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {message}
              </motion.p>
              <p className="text-sm text-muted-foreground">Isso pode levar alguns segundos...</p>
            </div>
          </motion.div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
