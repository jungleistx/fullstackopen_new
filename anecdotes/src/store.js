import { create } from 'zustand'
import anecdoteService from './services/anecdotes'


// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = anecdote => ({
//   content: anecdote,
//   id: getId(),
//   votes: 0
// })

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: id => set(
      state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
        ).toSorted((a, b) => b.votes - a.votes)
      })
    ),
    add: async (anecdote) => {
      const newAnecdote = await anecdoteService.createNew(anecdote)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote)}))
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => {
  const filter = useAnecdoteStore(state => state.filter.toLowerCase())
  const anecdotes = useAnecdoteStore(state => state.anecdotes)

  return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
}

export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions)
