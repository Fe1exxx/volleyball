import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'  
import Authorization from './Authorization'

test('компонент отображается', () => {
  render(
    <MemoryRouter>  
      <Authorization />
    </MemoryRouter>
  )
  
  const emailInput = screen.getByPlaceholderText(/email/i)
  expect(emailInput).toBeInTheDocument()
})