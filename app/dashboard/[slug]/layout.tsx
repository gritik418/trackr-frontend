'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { WorkspaceLayout } from '@/components/dashboard/WorkspaceLayout';

export default function Layout({
  children,
}: {    
  children: React.ReactNode;
}) {
  const params = useParams();
  const slug = params?.slug as string || '';

  if (!slug) return null;

  return (
    <WorkspaceLayout slug={slug}>
      {children}
    </WorkspaceLayout>
  );
}
