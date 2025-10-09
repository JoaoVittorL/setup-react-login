import { Loader2, LogIn } from 'lucide-react';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { useAuthModel } from './use-auth-model';
import { PasswordInput } from '@/shared/components/password-input';

type AuthViewProps = ReturnType<typeof useAuthModel>;
export const AuthView = (props: AuthViewProps) => {
  const { handleSubmit, register, handleSubmitForm, errors, isLoading } = props;

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          {...register('email')}
          aria-invalid={!!errors.email}
          placeholder="Digite seu email"
          autoComplete="off"
          disabled={isLoading}
          type="text"
          error={errors.email?.message}
        />
      </div>
      <PasswordInput
        name="password"
        label="Senha"
        register={register}
        isLoading={isLoading}
        placeholder="Digite sua senha"
        errors={errors}
      />
      <Button
        type="submit"
        variant="default"
        title="Botão de login"
        label={isLoading ? 'Entrando...' : 'Entrar'}
        icon={isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
        disabled={isLoading}
      />
    </form>
  );
};
