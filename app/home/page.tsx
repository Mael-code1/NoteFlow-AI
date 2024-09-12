
export default function home({
  children,
  params,}:{
    children: React.ReactNode,
    params: {
      tag: string,
      item: string
    }
    }
  ) {
  return (
    <div className="">
      {children}
    </div>
  )
}
