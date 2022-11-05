import '../../skeleton.css'

export const ContentListSkeleton = () => {
  const items = Array(10).fill(0)
  return (
    <>
      <div className="flex flex-col gap-1 relative bg-green-300 h-full w-full overflow-hidden">
        {items.map((item, index)=> (
          <div key={index} className={`w-full p-5 bg-green-300  flex flex-col justify-center items-start gap-3`}>
            <div className={'skeletons w-1/3 h-12'}></div>
            <div className={'skeletons w-1/2 h-12'}></div>
          </div>
        ))}
      </div>
    </>
  )
}
