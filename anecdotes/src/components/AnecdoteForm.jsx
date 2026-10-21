import { useNotificationActions } from "../notificationStore"
import { useAnecdoteActions } from "../store"


const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const { notify } = useNotificationActions()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    if (!anecdote) {
      return
    }
    await add(anecdote)
    notify(`You added '${anecdote}'`)
    e.target.reset()
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input data-testid="new" name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
