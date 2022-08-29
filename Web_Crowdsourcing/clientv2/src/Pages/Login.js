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

import { Route, Redirect, Link } from "react-router-dom";
class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {
        username: "",
        password: "",
      },
      isUserLoggedIn: false,
      UserRole: "",
      user_id: "",
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
    formValues[name] = value;
    this.setState({ formValues });
  };
  //---------------------------------------------------------------------------------
  handleSubmit = async (event) => {
    /**
     * Authenticate if user exists in the database
     */
    const GetUserAuthenticationURL = `${BaseURL}api/users/userauthentication`;
    const options = {
      method: "POST",
      headers: {
        Accpet: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        username: this.state.formValues.username,
        password: this.state.formValues.password,
      }),
    };

    await fetch(GetUserAuthenticationURL, options)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          isUserLoggedIn: result.isLoginSuccess,
          UserRole: result.UserRole,
          user_id: result.user_id,
          errMsg: result.errMsg,
        });
        // console.log("result",result)
      });
  };
  //---------------------------------------------------------------------------------
  render() {
    const { isUserLoggedIn, UserRole, errMsg, user_id } = this.state;
    console.log("UserRole", UserRole);
    console.log("isUserLoggedIn", isUserLoggedIn);
    console.log("errMsg", errMsg);
    console.log("user_id", user_id);

    return (
      <div>
        <Container>
          <Header
            style={{
              position: "relative",
              textAlign: "left",
              display: "block",
            }}
          >
            <LoginLogo
              style={{
                height: 70,
                width: 70,
                marginTop: "10px",
              }}
            />
            <span
              style={{
                position: "relative",
                fontSize: 30,
                fontWeight: "300",
                bottom: "20px",
              }}
            >
              {" "}
              CRWD ANALYTICS{" "}
            </span>
          </Header>
          <Row>
            <Content>
              <Col xsOffset={7} xs={12}>
                <Panel header="" bordered>
                  {errMsg !== "" ? (
                    <Message
                      showIcon
                      type="error"
                      description="Some error occur while you are trying to login! Please try again!"
                    />
                  ) : null}
                  <Form noValidate>
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
                    <Row style={{ paddingBottom: "2%" }}>
                      <Button
                        size="md"
                        style={{ width: 400, marginTop: "2%" }}
                        appearance="primary"
                        color="cyan"
                        onClick={(e) => this.handleSubmit(e)}
                      >
                        Login
                      </Button>
                    </Row>
                    <Link to="/signup">Don't have an account?</Link>
                  </Form>
                </Panel>
              </Col>
            </Content>
          </Row>
        </Container>
        <Route
          render={(props) =>
            isUserLoggedIn && UserRole === "Admin" ? (
              <Redirect
                to={{
                  pathname: "/adminPage",
                  state: {
                    username: this.state.formValues.username,
                    user_id: user_id,
                    isUserLoggedIn: isUserLoggedIn,
                  },
                }}
              />
            ) : isUserLoggedIn && UserRole === "User" ? (
              <Redirect
                to={{
                  pathname: "/userPage",
                  state: {
                    username: this.state.formValues.username,
                    user_id: user_id,
                    isUserLoggedIn: isUserLoggedIn,
                  },
                }}
              />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </div>
    );
  }
}

export default SignIn;
