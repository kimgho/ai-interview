import "@testing-library/jest-dom"
import { vi } from 'vitest'

// ResizeObserver Mock (필요할 경우)
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}))