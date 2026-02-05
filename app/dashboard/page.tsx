import { redirect } from 'next/navigation';

export default function DashboardIndex() {
  // In a real app, we would check the user's last accessed workspace or default workspace here.
  // For now, we redirect to the Organization selection screen to enforce the "Must choose a scope" rule.
  // Alternatively, if we had a dummy workspace, we could redirect there.
  return redirect('/dashboard/hell');
}
