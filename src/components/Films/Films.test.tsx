import { describe, it, expect } from 'vitest'
import Films from './Films'

describe('FilmList', () => {
  it('should be a function', () => {
    expect(Films).toBeTypeOf('function')
  })
  it('should render correctly', () => {
    expect(Films).toMatchSnapshot()
  })
})
