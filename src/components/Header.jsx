import React from 'react'
import { clearUser } from '../redux/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
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
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">TODO</Navbar.Brand>
                <Nav className="ms-auto d-flex align-items-center">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    {userData?.email ? (
                        <button onClick={handleLogout} className="btn btn-light text-primary fw-semibold fs-5 ms-3">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login">
                            <button className="btn btn-light text-primary fw-semibold fs-5 ms-3">
                                Sign Up
                            </button>
                        </Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
