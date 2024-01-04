import { describe, it, expect } from 'vitest'
import Navbar from './Header'

describe('FilmList', () => {
  it('should be a function', () => {
    expect(Navbar).toBeTypeOf('function')
  })
  it('should render correctly', () => {
    expect(Navbar).toMatchSnapshot()
  })
})
