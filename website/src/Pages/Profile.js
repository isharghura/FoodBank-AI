import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import './Profile.css';
import profile from '../assets/profile.png';

function UserProfile() {
  const [submittedItems, setSubmittedItems] = useState([]);
  const [userId, setUserId] = useState(1); // Assuming user ID is 1 for demonstration

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/get-user-data/1`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const formattedData = data.map(item => ({
          name: item[0],
          date: item[1],
          points: item[2],
        }));

        setSubmittedItems(formattedData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div
        style={{
          backgroundColor: 'grey',
          backgroundPosition: 'center',
          height: '15rem',
        }}
        className="bg-cover bg-center h-250 position-relative"
      >
        <Container fluid>
          <Row className="justify-content-center align-items-center" style={{ height: '100%' }}>
            <Col md={2} className="text-center">
              <Image
                src={profile}
                roundedCircle
                style={{ width: '27vh', border: '5px solid white', position: 'relative', top: '10rem' }}
                className="rounded-circle"
              />
            </Col>
            <Col md={7} className="text-center text-white mt-5">
              <div className="name-div">
                <h1 className="mt-3">John Doe</h1>
              </div>
            </Col>
            <Col md={3} className="text-center text-white mt-5">
              <div className="leaderboard-status">
                <h3 className="text-warning">Leaderboard Status</h3>
                <p className="fs-3 font-weight-bold">#3</p>
              </div>
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
                  </Card.Subtitle>
                  <Card.Text>
                    Submitted on: {new Date(item.date).toLocaleString()} <br />
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
