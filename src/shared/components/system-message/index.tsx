import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Home } from 'lucide-react';

export function SystemMessage({ status, title, message }: { status: number; title: string; message: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 className="text-9xl font-bold text-gray-500">{status}</h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400">{message}</p>

      <div className="mt-2 flex justify-center">
        <Button onClick={() => navigate('/home')} label="Ir para o início" icon={<Home className="h-4 w-4" />} />
      </div>
    </div>
  );
}
