import { SignUp } from '@clerk/nextjs'

export default function RegistrerenPage() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center pt-[69px]">
      <SignUp />
    </div>
  )
}
