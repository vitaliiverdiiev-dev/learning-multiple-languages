import supabase from '@/shared/config/supabase-client.config'
import { redirect } from '@tanstack/react-router'

export const requireAuthLoader = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw redirect({ to: '/sign-in' })
  }

  return { user: session.user }
}
