import { SignIn } from '@clerk/nextjs'

export default function InloggenPage() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center pt-[69px]">
      <SignIn />
    </div>
  )
}
