import { createRef, RefObject, useEffect, useRef } from 'react'
import ContentList from './ContentList/ContentList'
import './ScrollContainer.css'


export default function ScrollContainer() {
  const containerRef = useRef<HTMLDivElement>(null)

  const updateListRef = useRef<React.DispatchWithoutAction>()

  useEffect(() => {
    containerRef.current?.addEventListener('scroll', () => {
      updateListRef.current && updateListRef.current()
    })
  }, [])

  return (
    <div ref={containerRef} className="scroll-container-wrapper bg-sky-100">
      <ContentList containerRef={containerRef} ref={updateListRef}></ContentList>
    </div>
  )
}
