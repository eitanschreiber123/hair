import { Suspense } from 'react'
import SignForm from './signForm'

export default function SignPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignForm />
    </Suspense>
  )
}
