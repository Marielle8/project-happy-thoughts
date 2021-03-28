import React, { useState, useEffect } from 'react'

import ThoughtForm from './components/ThoughtForm'
import ThoughtList from './components/ThoughtList'

import { API_URL, LIKE_URL } from './reusable/urls'

export const App = () => {
  const [thoughtsList, setThoughtsList] = useState([])
  const [newThought, setNewThought] = useState('')

  useEffect(() => {
    fetchThoughtList()
  }, [thoughtsList])

  const fetchThoughtList = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(thoughts => setThoughtsList(thoughts))
      .catch(err => (console.error(err)))
  }

  const handleNewThoughtChange = (event) => {
    setNewThought(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: newThought })
    }

    fetch(API_URL, options)
      .then(res => res.json())
      .then(recivedThought => setThoughtsList([...thoughtsList, recivedThought]))
      .catch(err => (console.error(err)));
    setNewThought('')
  }

  const handleLikesIncrease = (id) => {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    fetch(LIKE_URL(id), options)
      .then(res => res.json())
      .then(recivedThought => {
        const updatedThoughtsList = thoughtsList.map(thought => {
          if (thought._id === recivedThought._id) {
            thought.hearts += 1;
          }
          return thought;
        })
        setThoughtsList(updatedThoughtsList);
      })
      .catch(err => (console.log(err)))
  }

  return (
    <div className="form-container">
      <ThoughtForm
        newThought={newThought}
        onNewThoughtChange={handleNewThoughtChange}
        onFormSubmit={handleFormSubmit}
      />
      <ThoughtList
        thoughtsList={thoughtsList}
        handleLikesIncrease={handleLikesIncrease}
      />
    </div>
  )
}





