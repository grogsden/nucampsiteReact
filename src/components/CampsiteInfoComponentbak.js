import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';;

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: '',
            author: '',
            text: '',
            isModalOpen: false,
            touched: {
                author: false
            }
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(values) {
        console.log("Current state is:" + JSON.stringify(values));
        alert("Current state is:" + JSON.stringify(values));
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return(
            <React.Fragment>
            <div>
                <br />
                <Button outline onClick={this.toggleModal}><i className="fa fa-pencil" /> Submit Comment</Button>
            </div>
            
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                    
                        <Label htmlFor="rating">Rating</Label>
                        <Row className="form-group">
                        <Col>
                            <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>
                            </Col>
                        </Row>
                            <Label htmlFor="author">Your Name</Label>
                            <Row className="form-group">
                            <Col>
                                <Control.text model=".author" id="author" name="author" 
                                className="form-control" 
                                placeholder="Your Name"
                                validators={{
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}
                                
                                ></Control.text>
                                <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                            </Col>
                        </Row>
                        
                            <Label htmlFor="text">Comment</Label>
                            <Row className="form-group">
                            <Col>
                                <Control.textarea row="6" model=".text" id="text" name="text" className="form-control"></Control.textarea>
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        
                    </LocalForm>
                </ModalBody>
            </Modal>
            </React.Fragment>
        )
    }
}


function RenderCampsite({campsite}) {
    return (
         <div className="col-md-5 m-1">
             <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    
function   RenderComments({comments}) {
        if (comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => {
                        return (
                            <div key={comment.id}>
                                <div>{comment.text}</div>
                                <div>{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</div>
                            </div>
                        );
                    })}
                    <CommentForm />
                </div>
            );
        }
        return <div />
    }

function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }
        return <div />;
    }

export default CampsiteInfo;