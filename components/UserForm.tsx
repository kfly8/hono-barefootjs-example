"use client"

import { createForm } from '@barefootjs/form'
import { userSchema } from '../schema'

interface UserFormProps {
  initialName?: string
  initialEmail?: string
  initialBio?: string
}

export function UserForm(props: UserFormProps) {
  const form = createForm({
    schema: userSchema,
    defaultValues: {
      name: props.initialName ?? '',
      email: props.initialEmail ?? '',
      bio: props.initialBio ?? '',
    },
    validateOn: 'blur',
    revalidateOn: 'input',
    onSubmit: async (data) => {
      const res = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name: data.name, email: data.email, bio: data.bio ?? '' }),
      })
      if (res.redirected) window.location.href = res.url
    },
  })

  const name = form.field('name')
  const email = form.field('email')
  const bio = form.field('bio')

  return (
    <form onSubmit={form.handleSubmit}>
      <div>
        <label for="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name.value()}
          onInput={name.handleInput}
          onBlur={name.handleBlur}
        />
        {name.error() && <p className="error">{name.error()}</p>}
      </div>
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email.value()}
          onInput={email.handleInput}
          onBlur={email.handleBlur}
        />
        {email.error() && <p className="error">{email.error()}</p>}
      </div>
      <div>
        <label for="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={bio.value()}
          onInput={bio.handleInput}
          onBlur={bio.handleBlur}
        />
        {bio.error() && <p className="error">{bio.error()}</p>}
      </div>
      <button type="submit" disabled={form.isSubmitting()}>Create</button>
    </form>
  )
}
