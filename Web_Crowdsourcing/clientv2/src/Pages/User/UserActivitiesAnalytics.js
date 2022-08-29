import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Panel,
  Content,
  Row,
  Col,
  DateRangePicker,
  Button,
  Grid,
  Table,
  Loader,
} from "rsuite";
import { ReactComponent as Send_Icon } from "../../Icons/Send_Icon.svg";
import * as moment from "moment";
import { BaseURL } from "../../App";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import HeatmapLayer from "react-leaflet-heatmap-layer";

const { Column, HeaderCell, Cell } = Table;

class UserActivitiesAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      from: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      to: new Date(new Date().setHours(23, 59, 59, 59)).toISOString(),
      analyticsData: null,
      loading: true,
      //Dummy
      mapCenter: {
        lat: 38.230462,
        lng: 21.75315,
        zoom: 13,
      },
    };
  }
  //----------------------------------------------------
  componentDidMount() {
    console.log("<===[compentDidMount][UserAnalytics]==>");
    /**Call apply filter with default values */
    this.ApplyFilters();
  }
  //----------------------------------------------------
  componentDidUpdate(previousProps, previousState) {
    console.log("<===[componentDidUpdate][UserAnalytics]==>");
  }
  //----------------------------------------------------

  ApplyFilters = async () => {
    const { from, to, user_id } = this.state;
    console.log("<===[ApplyFilters][UserAnalytics]==>");

    const GetRegistrationPercentagePerCategoryURL = `${BaseURL}api/users/analytics/registration_percentage_per_category?user_id=${user_id}&startDate=${from}&endDate=${to}`;

    const options = {
      method: "POST",
      headers: {
        Accpet: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({}),
    };

    await fetch(GetRegistrationPercentagePerCategoryURL, options)
      .then((response) => response.json())
      .then((data) => this.setState({ analyticsData: data, loading: false }));
  };
  //----------------------------------------------------
  render() {
    const { analyticsData, mapCenter, from, to, loading } = this.state;

    let location_points = [];

    if (analyticsData !== null) {
      analyticsData.locations.forEach((location) => {
        let location_point = [location.latitude, location.longitude, "486"];
        console.log("location_point", location_point);
        location_points.push(location_point);
      });
    }

    console.log("location_points===>", location_points);
    console.log("analyticsData", analyticsData);

    const BarChartScorePerCategoryData = {
      labels: analyticsData !== null ? analyticsData.category_labels : [],
      datasets: [
        {
          label: "Registration Percentage",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: analyticsData !== null ? analyticsData.category_scores : [],
        },
      ],
    };

    return loading ? (
      <Loader
        size="sm"
        content=""
        style={{ position: "absolute", top: "50%", left: "50%" }}
      />
    ) : (
      <Grid fluid>
        <Content>
          <Grid>
            <Row>
              <Col md={24} mdOffset={1}>
                <Panel
                  header={
                    <span
                      style={{
                        position: "relative",
                        fontSize: "16px",
                        fontStyle: "bold",
                      }}
                    >
                      Filters
                    </span>
                  }
                  collapsible
                  bordered
                  style={{
                    border: "0.5px solid #3c4a69",
                    marginBottom: "1%",
                  }}
                >
                  <Col>
                    <Row>
                      <Col md={24}>
                        <DateRangePicker
                          size="sm"
                          format="YYYY-MM-DD HH:mm:ss"
                          block
                          appearance="subtle"
                          style={{
                            width: this.props.DatePickerWidth,
                            backgroundColor: "white",
                            borderLeft: "1px solid black",
                            borderRadius: "4px",
                            overflow: "visible",
                            zIndex: 2,
                          }}
                          defaultValue={[
                            new Date(Date.parse(from)),
                            new Date(Date.parse(to)),
                          ]}
                          placeholder="From"
                          onOk={(e) =>
                            this.setState({
                              from: moment.utc(e[0]).toISOString(),
                              to: moment.utc(e[1]).toISOString(),
                            })
                          }
                          onClean={(e) => this.setState({ from: "", to: "" })}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "2%" }}>
                      <Col md={24} align="center">
                        <Button
                          variant="secondary"
                          size="md"
                          style={{ backgroundColor: "#9a8558" }}
                          onClick={() => {
                            this.setState({ loading: true });
                            this.ApplyFilters();
                          }}
                        >
                          Apply Filters
                          <Send_Icon
                            style={{
                              width: "30px",
                              height: "12px",
                              fill: "white",
                              alignContent: "center",
                            }}
                          />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Panel>
              </Col>
            </Row>
            <Row>
              <Col md={14} mdOffset={1}>
                <div>
                  <Map
                    center={[mapCenter.lat, mapCenter.lng]}
                    zoom={mapCenter.zoom}
                    style={{ height: "480px", width: "100%", zIndex: -1 }}
                  >
                    <HeatmapLayer
                      fitBoundsOnLoad
                      fitBoundsOnUpdate
                      points={location_points}
                      longitudeExtractor={(m) => m[1]}
                      latitudeExtractor={(m) => m[0]}
                      intensityExtractor={(m) => parseFloat(m[2])}
                    />
                    <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  </Map>
                </div>
              </Col>
              <Col md={9}>
                <Table
                  height={480}
                  //  width={450}
                  data={
                    analyticsData !== null
                      ? analyticsData.most_registered_day_hour
                      : {}
                  }
                  style={{ width: "110%" }}
                >
                  <Column flexGrow={1} minWidth={115} align="center" resizable>
                    <HeaderCell style={{ backgroundColor: "#3c4a69" }}>
                      Activity Category
                    </HeaderCell>
                    <Cell dataKey="category" />
                  </Column>
                  <Column flexGrow={1} minWidth={140} align="center" resizable>
                    <HeaderCell style={{ backgroundColor: "#3c4a69" }}>
                      Most Registered Hour
                    </HeaderCell>
                    <Cell dataKey="most_registed_hour" />
                  </Column>
                  <Column flexGrow={1} minWidth={140} align="center">
                    <HeaderCell style={{ backgroundColor: "#3c4a69" }}>
                      Most Registered Day
                    </HeaderCell>
                    <Cell dataKey="most_registed_day" />
                  </Column>
                </Table>
              </Col>
            </Row>

            <Row style={{ marginTop: "2%" }}>
              <Col md={24} mdOffset={1}>
                {" "}
                <span>Registration Percentage Per Category</span>
              </Col>
            </Row>
            <Row>
              <Col md={24} mdOffset={1}>
                <Bar
                  options={{
                    responsive: true,
                  }}
                  data={BarChartScorePerCategoryData}
                  style={{ height: "150px", width: "100%" }}
                  height={100}
                />
              </Col>
            </Row>
          </Grid>
        </Content>
      </Grid>
    );
  }
}
export default UserActivitiesAnalytics;
