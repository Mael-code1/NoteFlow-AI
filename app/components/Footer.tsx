export default async function Footer() {
  await new Promise(r => setTimeout(r, 5_000))
  return (
    <footer className='flex flex-row justify-between items-center text-center bg-purple-600'>
      <div className='flex justify-center'>
        <div className='flex flex-col'>
          <span>
            a
          </span>
        </div>
      </div>
      <div className='flex'>
        <div className=''>
          b
        </div>
      </div>
    </footer>
  )
}


