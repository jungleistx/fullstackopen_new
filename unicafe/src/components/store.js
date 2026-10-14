import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'


const useCounterStore = create(set => ({
  good: 0,
  neutral: 0,
  bad: 0,
  all: 0,
  actions: {
    addGood: () => set(state => ({
      good: state.good + 1,
      all: state.all + 1
    })),
    addNeutral: () => set(state => ({
      neutral: state.neutral + 1,
      all: state.all + 1
    })),
    addBad: () => set(state => ({
      bad: state.bad + 1,
      all: state.all + 1
    }))
  }
}))


export const useValues = () => useCounterStore(
    useShallow(state => ({
      good: state.good,
      neutral: state.neutral,
      bad: state.bad,
      all: state.all
    }))
  )

export const useCounterControls = () => useCounterStore(state => state.actions)
