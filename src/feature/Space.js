import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux"
import { getPosts, filterByLaunchYear, filterByStatus, filterByLastLaunchYear } from './spaceSlice'
import { Row, Card, Col, Container, Nav,Navbar, NavDropdown, Form } from "react-bootstrap";

const StyledInput = styled(Form.Control)`
width: 50%;
margin-left: 270px;
padding: 10px 50px 10px 150px;
border-style: solid;
border-color: black;
focus:{
  box-shadow: 0 0 0 1px #2684ff;
  border-color: #2684ff;
}
`;

const Space = () => {
    const [searchText, setSearchText] = useState("");
    const inputRef = useRef();
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.list);
  
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  let unique = [...new Set(posts.map(item => item.launch_year))];
  console.log(unique);

  return (
    <div>
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">React-Redux</Navbar.Brand>
    <Nav className="me-auto">
      <NavDropdown title="Filter Launch By" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={()=>dispatch(filterByLastLaunchYear(1))}>Last Year</NavDropdown.Item>
          <NavDropdown.Item onClick={()=>dispatch(filterByLastLaunchYear(2))}>2 Years ago</NavDropdown.Item>
          <NavDropdown.Item onClick={()=>dispatch(filterByLastLaunchYear(3))}>3 Years ago</NavDropdown.Item>
          <NavDropdown.Item onClick={()=>dispatch(filterByLastLaunchYear(4))} >4 Years ago</NavDropdown.Item>
    </NavDropdown>
      <NavDropdown title="Filter Mission By" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={()=>dispatch(filterByStatus(true))}>Success</NavDropdown.Item>
          <NavDropdown.Item onClick={()=>dispatch(filterByStatus(false))} >Failiure</NavDropdown.Item>
    </NavDropdown>
    <NavDropdown title="Filter By Launch Year" id="basic-nav-dropdown">
          {unique.map((item)=>{
            return(
            <NavDropdown.Item onClick={()=>dispatch(filterByLaunchYear(item))}>{item}</NavDropdown.Item>
            );
          })}
        </NavDropdown>
          </Nav>
        </Container>
       </Navbar>
  
<Container>

        {/* <input
				type='text'
				name=''
			  className=''
				placeholder='Search by mission Name'
				ref={inputRef}
				onChange={(event) => setSearchText(event.target.value)}
        
			/> */}
        <Container className='mt-3'>
           <StyledInput type="text" onChange={(event) => setSearchText(event.target.value)}  placeholder="Search by mission Name" />
        </Container>

        <Row>
             {posts.filter((item)=>item.mission_name.toLowerCase().startsWith(searchText)).map((item, i) =>{return(
                <Col md={3} className="mt-3" key={i}>
                  <Card style={{ width: "16rem" }}>
                    <Card.Img
                      variant="top"
                      src={item.links.mission_patch_small}
                    />
                    <Card.Body>
                      
                      <Card.Title>{item.mission_name}</Card.Title>
                      <Card.Text>{item.launch_date_utc}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )} )}
            </Row>
  
  </Container>
  </div>
  )
}

export default Space;
