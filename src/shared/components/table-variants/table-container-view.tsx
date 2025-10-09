export function TableContainerView({ children, width }: { children: React.ReactNode; width?: string }) {
  const maxHeight = `calc(100vh - ${width || '150px'})`;
  return (
    <div
      id="tableContainerView"
      className="w-full overflow-x-auto overflow-y-auto rounded-md"
      style={{
        display: 'block',
        whiteSpace: 'nowrap',
        maxHeight,
      }}
    >
      {children}
    </div>
  );
}
