import React from "react";
import { Line } from "react-chartjs-2";
import {
  Panel,
  Header,
  Content,
  Row,
  Col,
  Divider,
  Table,
  Grid,
  Message,
  Loader,
} from "rsuite";
import { BaseURL } from "../../App";

const { Column, HeaderCell, Cell } = Table;

class UserStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      last_uploading_timestamp: "",
      loading: false,
      ecological_score: null,
      ecological_score_for_last_12_months: null,
      user_registration_period: null,
      user_leaderboard: [],
      ecological_score_daterange: {
        start: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).toISOString(),
        end: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).toISOString(),
      },
    };
  }

  //----------------------------------------------------
  readUserStatistics = async (user_id) => {
    let currentdate = new Date();
    var current_month_start = new Date(
      currentdate.getFullYear(),
      currentdate.getMonth(),
      1
    ).toISOString();
    var current_month_end = new Date(
      currentdate.getFullYear(),
      currentdate.getMonth() + 1,
      0
    ).toISOString();

    this.setState({ loading: true });

    let same_date_last_year = new Date(
      currentdate.setMonth(currentdate.getMonth() - 20) //todo change it to 12
    ).toISOString();

    const GetUserLastUploadURL = `${BaseURL}api/users/stats/last_upload?user_id=${user_id}`;
    const GetUserEcologicalScoreURL = `${BaseURL}api/users/stats/ecological_score?user_id=${user_id}&current_month_start=${current_month_start}&current_month_end=${current_month_end}`;
    const GetUserEcologicalScore12MonthsURL = `${BaseURL}api/users/stats/ecological_score?user_id=${user_id}&current_month_start=${same_date_last_year}&current_month_end=${current_month_start}`;
    const GetUserRegistrationPeriod = `${BaseURL}api/users/stats/registration_period?user_id=${user_id}`;
    const GetUserLeaderboard = `${BaseURL}api/users/stats/leaderboard?user_id=${user_id}`;

    const options = {
      method: "POST",
      headers: {
        Accpet: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({}),
    };

    const options2 = {
      method: "POST",
      headers: {
        Accpet: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({}),
    };

    const options3 = {
      method: "POST",
      headers: {
        Accpet: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    };

    let last_upload = await fetch(
      GetUserLastUploadURL,
      options
    ).then((response) => response.json());

    let ecological_score = await fetch(
      GetUserEcologicalScoreURL,
      options2
    ).then((response) => response.json());

    let ecological_score_for_last_12_months = await fetch(
      GetUserEcologicalScore12MonthsURL,
      options3
    ).then((response) => response.json());

    let user_registration_period = await fetch(
      GetUserRegistrationPeriod,
      options
    ).then((response) => response.json());

    let user_leaderboard = await fetch(
      GetUserLeaderboard,
      options
    ).then((response) => response.json());

    Promise.all([
      last_upload,
      ecological_score,
      ecological_score_for_last_12_months,
      user_registration_period,
      user_leaderboard,
    ]).then(([result1, result2, result3, result4, result5]) => {
      console.log("result 3", result3);
      console.log("result 4", result4);
      console.log("result 5", result5);

      this.setState({
        last_uploading_timestamp: result1.last_uploading_timestamp,
        ecological_score: result2.ecological_score,
        ecological_score_daterange: result2.ecological_score_daterange,
        ecological_score_for_last_12_months: result3,
        user_registration_period: result4,
        user_leaderboard: result5.user_leaderboard, //todo change
        loading: false,
      });
    });
  };
  //----------------------------------------------------

  componentDidMount() {
    this.readUserStatistics(this.props.user_id);
  }
  //----------------------------------------------------
  componentDidUpdate(previousProps, previousState) {
    if (previousProps !== this.props)
      this.readUserStatistics(previousProps.user_id);
  }
  //----------------------------------------------------
  render() {
    const {
      last_uploading_timestamp,
      ecological_score,
      ecological_score_daterange,
      ecological_score_for_last_12_months,
      user_registration_period,
      user_leaderboard,
      loading,
    } = this.state;

    let leaderboard_table_data = [];

    user_leaderboard.forEach((user) => {
      leaderboard_table_data.push({
        name: `${user.firstname} ${user.lastname[0]}.`,
        ecological_score: user.ecological_score,
      });
    });

    const data = {
      labels:
        ecological_score_for_last_12_months !== null
          ? ecological_score_for_last_12_months.labels
          : [],
      datasets: [
        {
          label: "Last 12 months",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data:
            ecological_score_for_last_12_months !== null
              ? ecological_score_for_last_12_months.ecological_score
              : [],
        },
      ],
    };
    return (
      <Grid fluid>
        <Content>
          {loading ? (
            <Loader
              size="sm"
              content=""
              style={{ position: "absolute", top: "50%", left: "50%" }}
            />
          ) : (
            <Grid fluid>
              <Col
                style={{ marginTop: "3.8%" }}
                md={9}
                align="left"
                flexgrow={1}
                mdOffset={1}
              >
                <Row>
                  <Col style={{ textAlign: "center" }}>
                    <Panel bordered style={{ height: 220, width: 295 }}>
                      <span
                        style={{
                          marginBottom: "2%",
                          fontSize: 17,
                          fontWeight: 200,
                        }}
                      >
                        Activities Score
                      </span>
                      <Divider style={{ margin: 0, padding: 0 }} />
                      <div style={{ marginTop: "5%" }}>
                        {/*Show daterange title */}
                        {new Date(
                          ecological_score_daterange.start
                        ).toLocaleDateString()}{" "}
                        -{" "}
                        {new Date(
                          ecological_score_daterange.end
                        ).toLocaleDateString()}
                        <br />
                        {ecological_score !== null ? (
                          <span
                            style={{
                              marginTop: 0,
                              fontSize: 40,
                              color: "green",
                            }}
                          >
                            {" "}
                            {ecological_score}%{" "}
                          </span>
                        ) : (
                          <Message
                            type="error"
                            closable={true}
                            description="No data available for this period"
                          />
                        )}
                      </div>
                    </Panel>
                  </Col>
                </Row>

                <Row style={{ marginTop: "1%" }}>
                  <Col style={{ textAlign: "center" }}>
                    <Panel bordered style={{ height: 220, width: 295 }}>
                      <span
                        style={{
                          marginBottom: "2%",
                          fontSize: 17,
                          fontWeight: 200,
                        }}
                      >
                        {" "}
                        Registrations Daterange
                      </span>
                      <Divider style={{ margin: 0, padding: 0 }} />
                      <div style={{ marginTop: "5%" }}>
                        {/*Show daterange title */}
                        {user_registration_period !== null ? (
                          <span>
                            {new Date(
                              user_registration_period.registration_period_start
                            ).toLocaleDateString()}
                            -
                            {new Date(
                              user_registration_period.registration_period_end
                            ).toLocaleDateString()}
                          </span>
                        ) : null}
                      </div>
                    </Panel>
                  </Col>
                </Row>

                <Row style={{ marginTop: "1%" }}>
                  <Col style={{ textAlign: "center" }}>
                    <Panel bordered style={{ height: 220, width: 295 }}>
                      <span
                        style={{
                          marginBottom: "2%",
                          fontSize: 17,
                          fontWeight: 200,
                        }}
                      >
                        {" "}
                        Last Upload
                      </span>
                      <Divider style={{ margin: 0, padding: 0 }} />
                      <div style={{ marginTop: "5%" }}>
                        {/*Show daterange title */}
                        {last_uploading_timestamp
                          .replace("Z", " ")
                          .replace("T", " ")}
                      </div>
                    </Panel>
                  </Col>
                </Row>
              </Col>

              <Col md={14} align="center" flexgrow={2} mdPull={1}>
                <Row>
                  <Col md={14} mdOffset={8} align="center">
                    <h3>Ecological Score </h3>
                  </Col>
                </Row>
                <Row>
                  <Panel style={{ height: 400, width: 750 }} bordered>
                    <Line style={{ height: 370 }} data={data}></Line>
                  </Panel>
                </Row>
                <Row>
                  <Col md={24} mdOffset={3}>
                    <span style={{ fontSize: 15 }}>LeaderBoard</span>
                  </Col>
                </Row>
                <Row style={{ marginTop: "1%" }}>
                  <Col md={13}>
                    <Table
                      height={220}
                      width={750}
                      data={leaderboard_table_data}
                    >
                      <Column flexGrow={2} minWidth={300} align="center">
                        <HeaderCell style={{ backgroundColor: "#3c4a69" }}>
                          Name
                        </HeaderCell>
                        <Cell dataKey="name" />
                      </Column>
                      <Column
                        flexGrow={2}
                        minWidth={300}
                        align="center"
                        resizable
                      >
                        <HeaderCell style={{ backgroundColor: "#3c4a69" }}>
                          Ecological Score
                        </HeaderCell>
                        <Cell dataKey="ecological_score" />
                      </Column>
                    </Table>
                  </Col>
                </Row>
              </Col>
            </Grid>
          )}
        </Content>
      </Grid>
    );
  }
}

export default UserStats;
