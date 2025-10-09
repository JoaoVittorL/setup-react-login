import { AuthView } from '../components/form';
import { useAuthModel } from '../components/form/use-auth-model';

export function Auth() {
  const methods = useAuthModel();
  return <AuthView {...methods} />;
}
