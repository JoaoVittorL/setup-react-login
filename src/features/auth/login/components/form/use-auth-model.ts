import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/shared/context/auth';
import { AuthSchema, schema } from '../../validations/auth-schema';

export const useAuthModel = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthSchema>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmitForm = async (values: AuthSchema) => {
    const response = await login(values);
    if (response.status === 201 || response.status === 200) {
      navigate('/home');
      return toast.success('Login realizado com sucesso!');
    } else {
      return toast.error('Credenciais inválidas!');
    }
  };

  return {
    handleSubmit,
    register,
    handleSubmitForm,
    errors,
    isLoading,
  };
};
