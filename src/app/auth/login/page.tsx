'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card';
import { SignInTab } from '@/app/auth/login/_components/sign-in-tab';
import { SignUpTab } from '@/app/auth/login/_components/sign-up-tab';
import { Separator } from '@/components/ui/separator';
import { SocialAuthButtons } from '@/app/auth/login/_components/social-auth-buttons';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';
import EmailVerification from '@/app/auth/login/_components/email-verification';

type Tab = 'signin' | 'signup' | 'email-verification';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [selectedTab, setSelectedTab] = useState<Tab>('signin');

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data != null) router.push('/');
    });
  }, [router]);

  function openEmailVerificationTab(email: string) {
    setEmail(email);
    setSelectedTab('email-verification');
  }

  return (
    <Tabs
      value={selectedTab}
      onValueChange={(tab) => setSelectedTab(tab as Tab)}
      className="max-auto my-6 w-full px-4"
    >
      {(selectedTab === 'signin' || selectedTab === 'signup') && (
        <TabsList>
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
      )}
      <TabsContent value="signin">
        <Card>
          <CardHeader className="text-2xl font-bold">
            <CardTitle> Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            {/*    Sign In Form */}
            <SignInTab />
          </CardContent>
          <Separator />

          <CardFooter className="grid grid-cols-2 gap-3">
            <SocialAuthButtons />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader className="text-2xl font-bold">
            <CardTitle> Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            {/*    Sign up Form */}
            <SignUpTab openEmailVerificationTab={openEmailVerificationTab} />
          </CardContent>
          <Separator />

          <CardFooter className="grid grid-cols-2 gap-3">
            <SocialAuthButtons />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="email-verification">
        <Card>
          <CardHeader className="text-2xl font-bold">
            <CardTitle>Verify Your Email</CardTitle>
          </CardHeader>
          <CardContent>
            <EmailVerification email={email} />
          </CardContent>
          <Separator />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
