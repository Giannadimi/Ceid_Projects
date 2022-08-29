import React from "react";
import {
  Container,
  Message,
  Sidebar,
  Row,
  Nav,
  Icon,
  Header,
  Content,
} from "rsuite";

import CurrentAnalytics from "./CurrentAnalytics";
import { ReactComponent as LoginLogo } from "../../Icons/LoginLogo.svg";

import { Redirect } from "react-router-dom";
class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      isUserLoggedIn: false,
      redirect: false,
      user_id: "",
    };
  }
  //------------------------------------------------
  componentDidMount() {
    console.log("[AdminDashboard][componentDidMount]");
    if (this.props.location.state !== undefined)
      this.setState({
        isUserLoggedIn: this.props.location.state.isUserLoggedIn,
        redirect: false,
        user_id: this.props.location.state.user_id,
      });
    else {
      setTimeout(() => {
        this.setState({
          redirect: true,
        });
      }, 2000);
    }
  }
  //------------------------------------------------
  componentDidUpdate() {}
  //------------------------------------------------
  onTabChange = (event, newValue) => {
    console.log("[onTabChange][event]", event);
    console.log("[onTabChange][event]", newValue);
    this.setState({ activeTab: newValue });
  };
  //------------------------------------------------
  render() {
    const { activeTab, isUserLoggedIn, redirect } = this.state;
    let page;
    console.log("activeTab", activeTab);

    switch (activeTab) {
      case "0":
        page = <CurrentAnalytics />;
        break;
      case "1": {
        if (this.state.user_id !== null) {
          this.setState({ user_id: "", isUserLoggedIn: false });
        }
        page = <Redirect to={{ pathname: "/" }} />;
        break;
      }

      default:
        page = <CurrentAnalytics />;
        break;
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
            width={260}
          >
            <Nav
              appearance="tabs"
              vertical
              onSelect={(eventKey) => this.setState({ activeTab: eventKey })}
            >
              <Nav.Item eventKey="0" icon={<Icon icon="dashboard" />}>
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey="1" icon={<Icon icon="sign-out" />}>
                {" "}
                Logout{" "}
              </Nav.Item>
            </Nav>
          </Sidebar>
          <Row>
            <Content>{page}</Content>
          </Row>
        </Container>
        {/*<Footer>
          <Row style={{ marginTop: "1%" }}>
            <Col md={24} align="right">
              <Icon icon="copyright" /> Giannoula Dimtitrouka
            </Col>
          </Row>
        </Footer>*/}
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
export default AdminDashboard;
