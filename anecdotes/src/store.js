import { create } from 'zustand'
import anecdoteService from './services/anecdotes'


const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(
        id, { ...anecdote, votes: anecdote.votes + 1 }
      )
      set(state => ({
        anecdotes: state.anecdotes.map(
          a => a.id === id ? updated : a
        ).toSorted((a, b) => b.votes - a.votes)
      })
    )},
    add: async (anecdote) => {
      const newAnecdote = await anecdoteService.createNew(anecdote)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote)}))
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    remove: async (id) => {
      await anecdoteService.deleteAnecdote(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    }
  },
}))


export const useAnecdotes = () => {
  const filter = useAnecdoteStore(state => state.filter.toLowerCase())
  const anecdotes = useAnecdoteStore(state => state.anecdotes)

  return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
}

export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions)
