interface DrawerOverlayProps {
  isVisible: boolean;
}

export function DrawerOverlay({ isVisible }: DrawerOverlayProps) {
  if (!isVisible) return null;

  return <div className="bg-black/50 fixed inset-0 z-50 backdrop-blur-sm transition-opacity" aria-hidden="true" />;
}
