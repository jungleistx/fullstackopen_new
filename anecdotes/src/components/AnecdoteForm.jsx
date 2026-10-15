import { useAnecdoteActions } from "../store"


const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions()

  const createAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if (!content) {
      return
    }
    addAnecdote(content)
    e.target.reset()
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input data-testid="new" name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
