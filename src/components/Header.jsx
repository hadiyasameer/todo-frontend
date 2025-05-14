import React from 'react'
import { clearUser } from '../redux/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { persister } from '../redux/store'
import { userLogout } from '../userApi'


function Header() {
    const navigate = useNavigate();

    const userData = useSelector((state) => state.user.user)
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await userLogout()
            await persister.purge()
            dispatch(clearUser())
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">TODO</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <div className='nav-end gap-5'>
                            {userData.email ? (
                                <div className="flex items-center gap-4">
                                    <button onClick={handleLogout} className="text-blue bg-white font-semibold px-4 py-1 rounded text-3xl cursor-pointer">
                                        Logout
                                    </button>
                                </div>) : (
                                <>
                                    <Link to="/login">
                                        <button className="bg-white text-blue font-semibold px-4 rounded hover:bg-text-black text-3xl transition">
                                            Sign Up
                                        </button>
                                    </Link>
                                </>
                            )
                            }
                        </div>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header