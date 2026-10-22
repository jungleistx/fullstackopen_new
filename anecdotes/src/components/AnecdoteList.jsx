import { useNotificationActions } from '../notificationStore'
import { useAnecdotes, useAnecdoteActions } from '../store'


const deleteStyle = {
  background: 'red'
}

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteActions()
  const { notify } = useNotificationActions()

  const handleVote = async (anecdote) => {
    await vote(anecdote.id)
    notify(`you voted '${anecdote.content}'`)
  }

  const handleDelete = async (anecdote) => {
    await remove(anecdote.id)
    notify(`Deleted '${anecdote.content}'`)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>

            {anecdote.votes == 0 &&
              <button
                onClick={() => handleDelete(anecdote)}
                style={deleteStyle}>
                delete
              </button>}
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList