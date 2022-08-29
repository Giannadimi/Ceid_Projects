import React from "react";
import {
  Icon,
  Sidenav,
  Nav,
  Container,
  Sidebar,
  Message,
  Header,
  Content,
  Row,
} from "rsuite";
import UserStats from "./UserStats";
import UserActivitiesAnalytics from "./UserActivitiesAnalytics";
import UserDataUpload from "./UserDataUpload";
import { ReactComponent as LoginLogo } from "../../Icons/LoginLogo.svg";

import { Redirect } from "react-router-dom";

//-------------------------------------------------------------------------------------------------------------------------------------------------

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: true,
      activeTab: 1,
      redirect: false,
      isUserLoggedIn: false,
      user_id:
        this.props !== this.props.location.state.user_id ? "empty" : null,
    };
  }

  //----------------------------------------------------
  componentDidMount() {
    if (this.props.location.state !== undefined)
      this.setState({
        isUserLoggedIn:
          this.props.location.state.isUserLoggedIn !== undefined
            ? this.props.location.state.isUserLoggedIn
            : false,
        redirect: false,
        user_id:
          this.props.location.state.user_id !== undefined
            ? this.props.location.state.user_id
            : null,
      });
    else {
      setTimeout(() => {
        this.setState({
          redirect: true,
        });
      }, 2000);
    }
  }
  //----------------------------------------------------
  componentDidUpdate(previousProps, previousState) {
    if (previousProps.location.state !== this.props.location.state)
      this.setState({ user_id: previousState.user_id });
  }
  //----------------------------------------------------
  render() {
    const { expand, activeTab, isUserLoggedIn, redirect, user_id } = this.state;

    let page;
    switch (activeTab) {
      case "1": {
        page = <UserStats user_id={user_id} />;
        break;
      }
      case "2": {
        page = <UserActivitiesAnalytics user_id={user_id} />;
        break;
      }
      case "4": {
        page = <UserDataUpload user_id={user_id} />;
        break;
      }
      case "5": {
        if (this.state.user_id !== null) {
          this.setState({ user_id: "", isUserLoggedIn: false });
        }
        page = <Redirect to={{ pathname: "/" }} />;
        break;
      }
      default: {
        page = <UserStats user_id={user_id} />;
        break;
      }
    }

    return isUserLoggedIn ? (
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
        <Container>
          <Sidebar
            style={{ display: "flex", flexDirection: "column" }}
            width={expand ? 260 : 56}
            collapsible
          >
            <Sidenav.Header></Sidenav.Header>
            <Sidenav
              expanded={expand}
              appearance="subtle"
              onSelect={(eventKey) => this.setState({ activeTab: eventKey })}
            >
              <Sidenav.Body>
                <Nav>
                  <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
                    Dashboard
                  </Nav.Item>
                  <Nav.Item eventKey="2" icon={<Icon icon="bar-chart" />}>
                    Analytics
                  </Nav.Item>
                  <Nav.Item eventKey="4" icon={<Icon icon="upload" />}>
                    Data Uploading
                  </Nav.Item>
                  <Nav.Item eventKey="5" icon={<Icon icon="sign-out" />}>
                    {" "}
                    Logout{" "}
                  </Nav.Item>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Sidebar>
          <Row>
            <Content>{page}</Content>
          </Row>
        </Container>
      </Container>
    ) : (
      <div>
        <Message
          showIcon
          type="error"
          description="You need to logged in to see this page!"
        />
        {redirect ? <Redirect to={{ pathname: "/" }} /> : null}
      </div>
    );
  }
}

export default UserDashboard;
