import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { FaServer, FaDatabase, FaCode, FaKey, FaAws, FaUser, FaEnvelope, FaLinkedin } from 'react-icons/fa';

const About = () => {
    return (
        <Container className="mt-5">
            <Row className="text-center">
                <Col>
                    <h1 className="display-4 mb-4">About This Website</h1>
                    <p className="lead text-muted">
                        A Full-Stack Web Application leveraging modern web technologies, hosted on the cloud.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mb-4">
                    <Card className="shadow h-100">
                        <Card.Body>
                            <Card.Title className="mb-3">
                                <FaAws size={28} className="text-warning" /> Architecture
                            </Card.Title>
                            <Card.Text>
                                The backend is powered by Django on an EC2 instance, connected to a MySQL database hosted on AWS RDS. User-uploaded media files are stored in an AWS S3 bucket, ensuring scalability and reliability.
                            </Card.Text>
                            <Card.Text>
                                NGINX is used as a reverse proxy server on the EC2 instance, efficiently managing and routing traffic between the frontend and backend services.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow h-100">
                        <Card.Body>
                            <Card.Title className="mb-3">
                                <FaCode size={28} className="text-primary" /> Frontend & Deployment
                            </Card.Title>
                            <Card.Text>
                                The frontend is built using React and hosted through AWS Amplify, utilizing CI/CD pipelines to automate deployments. The DNS is managed with AWS Route 53 for efficient traffic routing.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mb-4">
                    <Card className="shadow h-100">
                        <Card.Body>
                            <Card.Title className="mb-3">
                                <FaKey size={28} className="text-success" /> Authentication
                            </Card.Title>
                            <Card.Text>
                                JWT Authentication is used to secure user sessions, providing a scalable, stateless authentication process.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow h-100">
                        <Card.Body>
                            <Card.Title className="mb-3">
                                <FaDatabase size={28} className="text-danger" /> GitHub Repositories
                            </Card.Title>
                            <Card.Text>
                                Explore the code for this project on GitHub:
                            </Card.Text>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <a href="https://github.com/hassanzaker/movielads-front" target="_blank" rel="noopener noreferrer">
                                        Frontend Repository
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a href="https://github.com/hassanzaker/movielads-back" target="_blank" rel="noopener noreferrer">
                                        Backend Repository
                                    </a>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="mb-4">
                    <Card className="shadow h-100">
                        <Card.Body>
                            <Card.Title>
                                <FaUser size={28} className="text-info" /> About Me
                            </Card.Title>
                            <Row className="align-items-center">
                                <Col md={4}>
                                    <img
                                        src="https://movie-lads-statics.s3.us-east-2.amazonaws.com/resume/Hunter_pic.jpg"
                                        alt="My profile"
                                        className="img-fluid rounded-circle"
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Text>
                                        I am a passionate software and web developer seeking opportunities in software and web development roles. Through building this project, I have gained hands-on experience with cloud services, backend and frontend technologies, and managing deployments.
                                    </Card.Text>
                                    <Card.Text>
                                        I am always eager to learn and improve my skills, and I plan to continuously enhance this website by adding new features and refining the existing ones. If you are looking for a dedicated developer who enjoys taking on challenges, feel free to reach out!
                                    </Card.Text>
                                    <Card.Text>
                                        <FaEnvelope /> Email: <a href="mailto:h.zaker2222@gmail.com">h.zaker2222@gmail.com</a>
                                    </Card.Text>
                                    <Card.Text>
                                        <FaLinkedin /> LinkedIn: <a href="https://www.linkedin.com/in/hunter-zaker-896bb1220/" target="_blank" rel="noopener noreferrer">
                                            Hunter Zaker
                                        </a>
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        href="https://movie-lads-statics.s3.us-east-2.amazonaws.com/resume/Hunter_resume-2.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View My Resume
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
