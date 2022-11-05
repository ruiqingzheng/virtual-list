import { createRef, RefObject, useEffect, useRef } from 'react'
import ContentList from './ContentList/ContentList'
import { Skeleton } from 'antd'
import './ScrollContainer.css'

const useThrottle = (fn: (args: any) => void, interval?: number) => {
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
    <div
      ref={containerRef}
      className="scroll-container-wrapper relative bg-green-300 "
      style={{
        scrollBehavior: 'smooth',
        // backgroundColor: 'rgba(0, 0, 0, 0.25)',
        // backgroundColor: 'rgba(152, 66, 211, 0.23)',
        backgroundImage: "url('loading.svg')",
        backgroundSize: '200px 200px ',
         backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <ContentList containerRef={containerRef} ref={updateListRef}></ContentList>
    </div>
  )
}
