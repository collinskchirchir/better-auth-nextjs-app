'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { authClient } from '@/lib/auth/auth-client';
import { BetterAuthActionButton } from '@/components/auth/better-auth-action-button';

export default function Home() {
  const { data: session, isPending: loading } = authClient.useSession();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mx-auto my-6 max-w-md px-4">
      <div className="space-y-6 text-center">
        {session === null ? (
          <>
            <h1 className="text-3xl font-bold">Welcome to Our App</h1>
            <Button asChild size="lg">
              <Link href="/auth/login">Sign In / Sign Up</Link>
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Welcome {session.user.name}</h1>
            <BetterAuthActionButton
              size="lg"
              variant="destructive"
              action={() => authClient.signOut()}
            >
              Sign Out
            </BetterAuthActionButton>
          </>
        )}
      </div>
    </div>
  );
}
