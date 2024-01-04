import { describe, it, expect } from 'vitest'
import PilotsList from './Pilots'

describe('PilotsList', () => {
  it('should be a function', () => {
    expect(PilotsList).toBeTypeOf('function')
  })

  it('should render correctly with pilots', () => {
    const pilots = ['Pilot1', 'Pilot2', 'Pilot3']
    const wrapper = PilotsList({ pilots })
    expect(wrapper).toMatchSnapshot()
  })

  it('should render correctly without pilots', () => {
    const pilots: string[] = [] // Test with an empty array
    const wrapper = PilotsList({ pilots })
    expect(wrapper).toMatchSnapshot()
  })
})
