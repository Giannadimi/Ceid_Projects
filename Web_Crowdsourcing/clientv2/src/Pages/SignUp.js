import React from "react";
import {
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Header,
  Row,
  Col,
  Content,
  Container,
  Panel,
  Message,
} from "rsuite";
import { ReactComponent as LoginLogo } from "../Icons/LoginLogo.svg";
import { BaseURL } from "../App";
import { Link } from "react-router-dom";
class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        email: "",
      },
      formEmailInvalidMsg: "",
      formPasslInvalidMsg: "",
      userCreated: "" /**Use it to redirect properly */,
      errMsg: "",
    };
  }
  componentDidMount() {
    console.log("[componentDidMount][props]", this.props);
  }
  //---------------------------------------------------------------------------------
  componentDidUpdate() {}
  //---------------------------------------------------------------------------------
  handleChange = (name, value) => {
    let formValues = this.state.formValues;
    if (name == "email") {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
      ) {
        formValues[name] = value;
        this.setState({ formValues: formValues, formEmailInvalidMsg: "" });
      } else {
        console.log("show unvalid message email");
        this.setState({
          /*formValues:formValues,*/ formEmailInvalidMsg: "Invalid Email",
        });
      }
    } else if (name == "password") {
      var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (value.match(passw)) {
        console.log("match password");
        this.setState({ formValues: formValues, formPasslInvalidMsg: "" });
      } else {
        this.setState({
          /*formValues:formValues,*/ formPasslInvalidMsg:
            "Your Password must contain at least 1 capital letter, 1 number and 1 special symbol!",
        });
      }
    } else {
      formValues[name] = value;
      this.setState({ formValues });
    }
  };
  //---------------------------------------------------------------------------------
  handleSubmit = async (event) => {
    /**
     * Create a new user
     */

    const userCreationURL = `${BaseURL}api/users/`;
    const options = {
      method: "POST",
      headers: {
        Accpet: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        username: this.state.formValues.username,
        firstname: this.state.formValues.firstname,
        lastname: this.state.formValues.lastname,
        password: this.state.formValues.password,
        e_mail: this.state.formValues.email,
        role: "User",
      }),
    };
    console.log(userCreationURL);
    await fetch(userCreationURL, options)
      .then((response) => response.json())
      .then((result) => {
        result.userCreated
          ? this.setState({ userCreated: true, errMsg: "" })
          : this.setState({
              userCreated: false,
              errMsg: "User Creation failed!",
            });
        console.log(result);
      });
  };
  //---------------------------------------------------------------------------------
  render() {
    const { userCreated } = this.state;

    console.log("userCreated", userCreated);
    return (
      <div>
        <Container>
          <Header>
            <Row style={{ marginTop: "0.8%" }}>
              <Col xs={2}>
                <LoginLogo
                  style={{ position: "relative", height: 70, width: 70 }}
                />
              </Col>
              <Col
                xsPull={2}
                xs={6}
                style={{ position: "relative", top: "10px", right: "4%" }}
              >
                <span style={{ fontSize: 30, fontWeight: "300" }}>
                  {" "}
                  CRWD ANALYTICS{" "}
                </span>
              </Col>
            </Row>
          </Header>
          <Content>
            <Col xsOffset={7} xs={12}>
              <Panel
                header={
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: "200",
                      position: "relative",
                      bottom: "20px",
                      float: "left",
                    }}
                  >
                    {" "}
                    Register
                  </span>
                }
                bordered
              >
                {this.state.userCreated ? (
                  <Message
                    showIcon
                    type="success"
                    description="Registration completed!"
                  />
                ) : this.state.userCreated === "" ? null : (
                  <Message
                    showIcon
                    type="error"
                    description="Some error occur during your registration! Please try again!"
                  />
                )}{" "}
                {this.state.formEmailInvalidMsg ? (
                  <Message
                    showIcon
                    type="error"
                    description={this.state.formEmailInvalidMsg}
                  />
                ) : null}{" "}
                {this.state.formPasslInvalidMsg ? (
                  <Message
                    showIcon
                    type="error"
                    description={this.state.formPasslInvalidMsg}
                  />
                ) : null}{" "}
                <Form>
                  <FormGroup>
                    <Row>
                      <ControlLabel>Firstname</ControlLabel>
                    </Row>
                    <Row>
                      <FormControl
                        onChange={(value) =>
                          this.handleChange("firstname", value)
                        }
                        name="firstname"
                        style={{
                          width: 400,
                          backgroundColor: "white",
                          color: "black",
                        }}
                      />
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <ControlLabel>Lastname</ControlLabel>
                    </Row>
                    <Row>
                      <FormControl
                        onChange={(value) =>
                          this.handleChange("lastname", value)
                        }
                        name="lastname"
                        style={{
                          width: 400,
                          backgroundColor: "white",
                          color: "black",
                        }}
                      />
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <ControlLabel>Username</ControlLabel>
                    </Row>
                    <Row>
                      <FormControl
                        onChange={(value) =>
                          this.handleChange("username", value)
                        }
                        name="username"
                        style={{
                          width: 400,
                          backgroundColor: "white",
                          color: "black",
                        }}
                      />
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <ControlLabel>Password</ControlLabel>
                    </Row>
                    <Row>
                      <FormControl
                        onChange={(value) =>
                          this.handleChange("password", value)
                        }
                        name="password"
                        type="password"
                        style={{
                          width: 400,
                          backgroundColor: "white",
                          color: "black",
                        }}
                      />
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <ControlLabel>E-mail</ControlLabel>
                    </Row>
                    <Row>
                      <FormControl
                        onChange={(value) => this.handleChange("email", value)}
                        name="email"
                        type="email"
                        style={{
                          width: 400,
                          backgroundColor: "white",
                          color: "black",
                        }}
                      />
                    </Row>
                  </FormGroup>
                  <Row style={{ paddingBottom: "2%" }}>
                    <Button
                      size="md"
                      style={{ width: 400, marginTop: "2%" }}
                      appearance="primary"
                      color="cyan"
                      onClick={(e) => this.handleSubmit(e)}
                    >
                      Sign Up
                    </Button>
                  </Row>
                  <Link to="/">Already have an account?</Link>
                </Form>
              </Panel>
            </Col>
          </Content>
        </Container>
      </div>
    );
  }
}

export default SignUp;
