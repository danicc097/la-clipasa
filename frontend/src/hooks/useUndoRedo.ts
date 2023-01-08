import { useRef, useState } from 'react'

export default function useUndo(initialValue) {
  const undoStack = useRef([])
  const redoStack = useRef([])
  const [value, setValue] = useState(initialValue)

  function undo() {
    if (undoStack.current.length > 0) {
      redoStack.current.push(value)
      setValue(undoStack.current.pop())
    }
  }

  function redo() {
    if (redoStack.current.length > 0) {
      undoStack.current.push(value)
      setValue(redoStack.current.pop())
    }
  }

  return { value, undo, redo }
}
