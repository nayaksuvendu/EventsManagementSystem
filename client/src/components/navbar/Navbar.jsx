import {Navbar,Nav,Container} from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux/Slice/AuthSlice'

const Mavbar = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const{user} = useSelector((state) => state?.auth)
    
    const handleClick= async(e)=>{
        e.preventDefault();
        dispatch(logout()); 
        navigate('/');         
    }
       
    return(
        <div className=' w-full h-full flex top-0 mt-0 bg-gray-900 text-center text-white border-none  '>
            <Navbar collapseOnSelect expand="lg"  variant="dark" fixed='top'  >
                <Container>
                    <Navbar.Brand href="/" className='text-3xl font-bold text-primary'><span className="text-white text-4xl">N</span>ayak</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto ">
                        <Nav.Link href="/">Home</Nav.Link>       
                        <Nav.Link href="#services">Services</Nav.Link> 
                        <Nav.Link href="#about">About Us</Nav.Link> 
                        <Nav.Link href="#feedback">Feedback</Nav.Link> 
                    </Nav>
                    {user ? 
                    <div >
                        
                        <div class=" group relative inline-block hover:bg-transparent hover:block ">
                          <span class=" cursor-pointer text-white p-4 flex-wrap text-lg border-none font-bold bg-transparent " >Welcome <span className='text-indigo-500 uppercase'>{user.username}</span></span>
                        
                        <div className="bg-transparent absolute hidden group-hover:block min-w-[160px] z-[5] p-2 cursor-pointer border-none ">
                            <li className='text-green-800'>
                                <ul className='text-white'>{user.username}</ul>
                                <ul className='text-white'>{user.email}</ul>
                                <ul className='cursor-pointer'>
                                <button className=' text-white bg-red-500 rounded-lg hover:bg-red-600 p-1 font-semibold transition-all ease-in-out ' onClick={handleClick}>Logout</button>
                                </ul>
                            </li>
                        </div>
                        </div>                
                        </div>
                     : (
                    <Nav className=' flex gap-3'>
                        <Nav.Link href="register" className=' text-white pt-8 pr-11 text-decoration-none block  border-2 rounded-lg hover:bg-blue-600 hover:bg-transparent  '>Register</Nav.Link> 
                        <Nav.Link href="login" className=' text-white pt-8 pr-11 text-decoration-none block border-2 rounded-lg hover:bg-blue-600 hover:bg-transparent'>Login</Nav.Link>
                        
                    </Nav>
                    )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Mavbar



