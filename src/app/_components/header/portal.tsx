'use client';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted
    ? createPortal(
        <>{children}</>,
        document.getElementById('_portal') as HTMLElement
      )
    : null;
}
