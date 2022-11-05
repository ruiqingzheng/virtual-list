import { createRef, RefObject, useEffect, useRef } from 'react'
import ContentList from './ContentList/ContentList'
import { Skeleton } from 'antd'
import './ScrollContainer.css'

const useThrottle = (fn: (args: any) => void, interval?: number ) => {
  let timer: number | null = null
  return (args: any) => {
    if (timer) return

    timer = setTimeout(() => {
      fn(args)
      timer && clearTimeout(timer)
      timer = null
    }, interval || 50)
  }
}

export default function ScrollContainer() {
  const containerRef = useRef<HTMLDivElement>(null)

  const updateListRef = useRef<React.DispatchWithoutAction>()

  useEffect(() => {
    updateListRef.current && updateListRef.current()
    containerRef.current?.addEventListener(
      'scroll',
      useThrottle(() => {
        updateListRef.current && updateListRef.current()
      })
    )
  }, [])

  return (
    <div ref={containerRef} className="scroll-container-wrapper" style={{scrollBehavior: 'smooth'}}>
      <ContentList containerRef={containerRef} ref={updateListRef}></ContentList>
    </div>
  )
}
