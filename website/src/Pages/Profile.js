import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import "./Profile.css"
import { FaHome } from 'react-icons/fa';


import profile from '../assets/profile.png';

function UserProfile() {
  // Dummy data for submitted items
  const submittedItems = [
    { name: 'Apple', category: 'Fruit', date: '2023-09-25', points: 50 },
    { name: 'Carrot', category: 'Vegetable', date: '2023-09-20', points: 30 },
    { name: 'Cereal', category: 'Grains', date: '2023-09-15', points: 40 },
    // Add more items as needed
  ];

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Section with Background and Profile */}
      <div
        style={{
          backgroundColor: 'grey',
          backgroundPosition: 'center',
          height: '15rem',
        }}
        class="bg-cover bg-center, h-250 position-relative"
      >
        <Container fluid>
          <Row className="justify-content-center align-items-center" style={{ height: '100%' }}>
            <Col md={1} className="text-center">
              {/* Home Icon on the Left */}
              <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
                <FaHome size={40} /> {/* Adjust the size as needed */}
              </a>
            </Col>
            
            <Col md={2} className="text-center">
              <Image
                src={profile}
                roundedCircle
                style={{ width: '27vh', border: '5px solid white', position: 'relative', top: '10rem'}}
                class="rounded-circle"
              />
            </Col>
            <Col md={7} className="text-center text-white mt-5">
              <div className="name-div" style={{}}>
                <h1 className="mt-3">John Doe</h1>
                <p className="fst-italic">john.doe@example.com</p>
              </div>

            </Col>
            <Col md={3} className="text-center text-white mt-5">
              <div className="leaderboard-status" style={{}}>
                <h3 className="text-warning">Leaderboard Status</h3>
                <p className="fs-3 font-weight-bold">#3</p>
              </div>
              <div></div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* History Section */}
      <Container className="mt-5 pt-lg-0 pt-4">
        <h2 className="mb-4 m-md-5">History of Submitted Items</h2>
        <Row>
          {submittedItems.map((item, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.category}
                  </Card.Subtitle>
                  <Card.Text>
                    Submitted on: {item.date} <br />
                    Points: {item.points}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default UserProfile;
