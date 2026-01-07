import Sidebar from '@/components/Sidebar'

const StudySetHomePage = () => {
  return (
    <div className='h-screen bg-slate-50'>
        <Sidebar currentPath='/home'/>

        <div className='ml-64 p-8'>
            <p>Home</p>
        </div>
    </div>
  )
}

export default StudySetHomePage
