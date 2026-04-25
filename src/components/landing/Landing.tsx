"use client";

export interface LandingProps {
  isLoggedIn: boolean;
}

export function Landing({ isLoggedIn }: LandingProps) {
  // isLoggedIn will be used by section components in Task 28
  void isLoggedIn;
  return <main className="min-h-screen">{/* sections wired in Task 28 */}</main>;
}

export default Landing;
