import { EmptyData } from './empty-data';
import { LoadingSpinner } from './loading-spinner';

interface AsyncContentWrapperProps<T> {
  isLoading: boolean;
  response: {
    status: number;
    message: string;
    data: T;
  } | null;
  emptyCondition: (data: T) => boolean;
  children: (data: T) => React.ReactNode;
}

export function AsyncContentWrapper<T>({ isLoading, response, emptyCondition, children }: AsyncContentWrapperProps<T>) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!response || (response.status !== 200 && response.status !== 201)) {
    return <EmptyData title="Ops!" description={response?.message || 'Erro desconhecido'} />;
  }

  if (emptyCondition(response.data)) {
    return <EmptyData title="Ops!" description={response.message} />;
  }

  return <>{children(response.data)}</>;
}
