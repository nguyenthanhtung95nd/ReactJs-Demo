import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=>{
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
      const response = await fetch(`/feedback?_sort=id&_order=desc`)
      const data = await response.json()
      setFeedback(data)
      setIsLoading(false)
  }

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  const addFeedback = async (newFeedback) => {
    // newFeedback.id = uuidv4()
    // setFeedback([newFeedback, ...feedback])

    const response = await fetch('/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFeedback)
    })

    const data = await response.json()
    setFeedback([data, ...feedback])
  }
  const handleDelete = async (id) => {
    // if (window.confirm('Are you sure delete item')) {
    //   setFeedback(feedback.filter((item) => item.id !== id))
    // }
    if (window.confirm('Are you sure you want to delete?')) {
        await fetch(`/feedback/${id}`, { method: 'DELETE' })
  
        setFeedback(feedback.filter((item) => item.id !== id))
      }
  }
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  const updateFeedback = async (id, updateItem) => {
    // setFeedback(
    //   feedback.map((item) => {
    //     return item.id === id ? { ...item, ...updateItem } : item
    //   })
    // )
    const response = await fetch(`/feedback/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateItem),
      })
  
      const data = await response.json()
  
      setFeedback(feedback.map((item) => (item.id === id ? data : item)))
  
      // being able to add a feedback after editing
      setFeedbackEdit({
        item: {},
        edit: false,
      })
  }
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        handleDelete,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
