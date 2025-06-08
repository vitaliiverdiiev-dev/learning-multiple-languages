import {useEffect, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import supabase from '@/shared/config/supabase-client.config'
import { AuthContext } from './auth.context'
import { redirect } from '@tanstack/react-router'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setSession(session ?? null)
      setUser(session?.user ?? null)
      setIsLoading(false)
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null)
      setUser(session?.user ?? null)
    })

    init()

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (!session) {
    redirect({ to: '/sign-in' })
    return;
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}