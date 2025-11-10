'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { authClient } from '@/lib/auth/auth-client';

export default function Home() {
  const { data: session, isPending: loading } = authClient.useSession();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className="my-6 px-4 max-w-md mx-auto">
      <div className="text-center space-y-6">
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
            {/* TODO: Add Loading states */}
            <Button variant="destructive" size="lg" onClick={() => authClient.signOut()}>
              Sign In / Sign Up
            </Button>
          </>
        )
        }
      </div>
    </div>
  );
}
