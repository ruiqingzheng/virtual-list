import React, { PropsWithChildren, RefObject, useEffect, useReducer } from 'react'
import mockData, { ItemType } from './mockData'

const ListItem = ({ data, style }: { data: ItemType; style: React.CSSProperties }) => {
  return (
    <>
      <div style={{ ...style }} className="w-full p-5 bg-green-300 hover:bg-green-200">
        <p>{data.id}</p>
        <span className="text-lg">{data.title}</span>
      </div>
    </>
  )
}

/****
 * 1. 获取父组件高度, 也就是可以scroll的组件的高度
 * 2. 根据父组件的scroll高度和item高度和scroll视窗高度来计算需要渲染的startIndex , endIndex
 * 3. 设置item为absolute 并计算每个item的top值
 * 4. 具体计算item高度px(因为用了px2rem, 变量的px需要我们手动计算)
 * 5. 调整底部
 */

interface IProps {
  containerRef: RefObject<HTMLDivElement>
}

interface VisibleItemType extends ItemType {
  index: number
}

const ContentList = ({ containerRef }: IProps, ref: any) => {
  const [_, updateList] = useReducer(x => x + 1, 0)

  let dataVisible: VisibleItemType[] = []
  let itemHeight = 120
  let start = 0
  let end = 0
  const totalSize = mockData.length

  let scrollScreenHeight = containerRef.current?.clientHeight as number

  if (containerRef.current) {
    const containerDOM = containerRef.current
    start = Math.floor(containerDOM.scrollTop / itemHeight)
    end = Math.ceil(start + scrollScreenHeight / itemHeight)
    start -= 2
    end += 2
    if (start < 0) start = 0
    if (end > mockData.length) end = totalSize
  }
  const baseStyle: React.CSSProperties = { position: 'absolute', height: itemHeight + 'px' }
  const containerDOM = containerRef.current
  dataVisible = mockData.map((item, index ) => ({...item, index})).slice(start, end)
  // bug
  // mockData.slice(start, end).map((item, index) => ({ ...item, index }))
  // debugger
  console.log(
    'container height: ',
    containerDOM?.clientHeight,
    'container width',
    containerDOM?.clientWidth,
    'container scrollTop:',
    containerDOM?.scrollTop,
    'start:',
    start,
    'end:',
    end,
    'dataVisible',
    dataVisible
  )
  ref.current = updateList

  return (
    <div className="flex flex-col gap-1 relative" style={{ height: itemHeight * totalSize + 'px' }}>
      {dataVisible.map(data => {
        return (
          <ListItem data={data} key={data.id} style={{ ...baseStyle, top: data.index * itemHeight + 'px' }}></ListItem>
        )
      })}
    </div>
  )
}

export default React.forwardRef(ContentList)
