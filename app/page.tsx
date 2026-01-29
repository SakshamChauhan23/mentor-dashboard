import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to student dashboard as the default landing page
  redirect('/student')
}
