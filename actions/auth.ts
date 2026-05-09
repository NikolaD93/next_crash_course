'use server'

import { createSupabaseClient } from '@/utils/supabase/server'

export type AuthState = { error?: string; success?: boolean } | null

export async function signUpAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const country = formData.get('country') as string
  const skillLevel = formData.get('skillLevel') as string

  const supabase = await createSupabaseClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { firstName, lastName, country, skillLevel },
    },
  })

  if (error) {
    return { error: error.message }
  }

  const fullName = `${firstName} ${lastName}`

  const { error: profileError } = await supabase.from('students').insert({
    user_uuid: data.user?.id,
    full_name: fullName,
    country,
    skill_level: skillLevel,
  })

  if (profileError) {
    return { error: 'Could not save profile. Please try again.' }
  }

  return { success: true }
}
