import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Presentations = () => {
    return (
        <Container className="mt-5">
            <Row className="text-center">
                <Col>
                    <h1 className="display-4 mb-4">Presentation</h1>
                    <p className="lead text-muted">
                        This video showcases a web application tool built with Angular as the front-end. The application enables users to explore and analyze bank transactional data through an interactive graph-based interface. By visualizing accounts and their connections as nodes and edges, it helps users identify patterns, trace transaction paths, and detect potential cases of money laundering or fraud. 
                    </p>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="mb-4">
                    <Card className="shadow">
                        <Card.Body>
                            <div className="video-container">
                                <video
                                    controls
                                    controlsList="nodownload"
                                    poster="https://movie-lads-statics.s3.us-east-2.amazonaws.com/resume/Hunter_pic.jpg"
                                    style={{
                                        width: "100%",
                                        height: "500pt",
                                    }}
                                >
                                    <source
                                        src="https://movie-lads-statics.s3.us-east-2.amazonaws.com/presentation/Tranalizer.mp4"
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Presentations;