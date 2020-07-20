import React from 'react'
import { render, act, cleanup, fireEvent } from '@testing-library/react'

import { useToggleState } from '.'

afterEach(() => {
  cleanup()
})

describe('useToggleState', () => {
  it('should return the initial state', () => {
    const defaultValue = 1

    expect('1').toBe(defaultValue)
  })

  it('Component should rerender from change to state', () => {
    const defaultValue = 1
    const newValue = 45
    const testComponentId = 'tcid'
    const testButtonId = 'tbid'

    const Component = () => {
      const [actualValue, changeValue] = useToggleState(defaultValue)
      return (
        <div>
          <span data-testid={testComponentId}>{actualValue}</span>
          <button
            onClick={(_) => changeValue(newValue)}
            data-testid={testButtonId}
          >
            Test Button
          </button>
        </div>
      )
    }

    const testComponent = render(<Component />)

    expect(
      parseFloat(testComponent.getByTestId(testComponentId).textContent)
    ).toBe(defaultValue)

    fireEvent.click(testComponent.getByTestId(testButtonId))

    expect(
      parseFloat(testComponent.getByTestId(testComponentId).textContent)
    ).toBe(newValue)
  })

  it('Hook should return default value if range is not n > 1', () => {
    const defaultValue = 15
    const newValue = -4
    const testComponentId = 'tcid'
    const testButtonId = 'tbid'

    const Component = () => {
      const [actualValue, changeValue] = useToggleState(defaultValue)
      return (
        <div>
          <span data-testid={testComponentId}>{actualValue}</span>
          <button
            onClick={(_) => changeValue(newValue)}
            data-testid={testButtonId}
          >
            Test Button
          </button>
        </div>
      )
    }

    const testComponent = render(<Component />)

    expect(
      parseFloat(testComponent.getByTestId(testComponentId).textContent)
    ).toBe(defaultValue)

    fireEvent.click(testComponent.getByTestId(testButtonId))

    expect(
      parseFloat(testComponent.getByTestId(testComponentId).textContent)
    ).toBe(defaultValue)
  })
})
