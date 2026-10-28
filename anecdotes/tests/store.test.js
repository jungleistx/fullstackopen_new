import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'


vi.mock('../src/services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    deleteAnecdote: vi.fn(),
  }
}))


import anecdoteService from '../src/services/anecdotes'
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from '../src/store'


beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

const mockAnecdotes = [
  { id: 1, votes: 1, content: 'first' },
  { id: 2, votes: 3, content: 'second' },
  { id: 3, votes: 2, content: 'third' }
]

describe('useAnecdotes', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdote = [{ id: 1, votes: 0, content: 'test' }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdote)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdote)
  })


  it('anecdots are sorted by votes when loaded', async () => {
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual([
      mockAnecdotes[1], mockAnecdotes[2], mockAnecdotes[0]
    ])
  })


  it('filter works correctly', async () => {
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: actions } = renderHook(() => useAnecdoteActions())
    act(() => {
      actions.current.setFilter('ir')
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual([
      mockAnecdotes[2], mockAnecdotes[0]
    ])
  })
})
