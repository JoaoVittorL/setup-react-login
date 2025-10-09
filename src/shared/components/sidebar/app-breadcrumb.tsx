import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/shared/components/ui/breadcrumb';

export function HeaderBreadcrumb({ tabTitle }: { tabTitle: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={`/${tabTitle.split(' | ')[1]?.toLowerCase()}`}>{tabTitle}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
