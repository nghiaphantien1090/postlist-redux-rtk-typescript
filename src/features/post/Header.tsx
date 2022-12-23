import {Link} from 'react-router-dom'
export function Header() {
    return (
        <div className=' h-20 bg-slate-800 flex text-white justify-between'>
            <h1 className=' text-4xl my-auto mx-9'>
                <Link to='/'>
               Manage Post 
                </Link>
            </h1>
            <div className='my-auto mx-9'>
                <h1>Active Post</h1>
            </div>
        </div>
    )
}