import { useNotificationActions } from '../notificationStore'
import { useAnecdotes, useAnecdoteActions } from '../store'


const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote } = useAnecdoteActions()
  const { notify } = useNotificationActions()

  const handleVote = async (anecdote) => {
    await vote(anecdote.id)
    notify(`You voted '${anecdote.content}'`)
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList