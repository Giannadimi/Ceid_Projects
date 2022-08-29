import React from "react";
import {
  Row,
  Col,
  Table,
  Grid,
  Panel,
  Button,
  DatePicker,
  CheckPicker,
  Checkbox,
  Modal,
  Divider,
  Dropdown,
} from "rsuite";
import { Bar } from "react-chartjs-2";
import { BaseURL } from "../../App";
import * as moment from "moment";
import { ReactComponent as Send_Icon } from "../../Icons/Send_Icon.svg";
import { ReactComponent as Delete_Icon } from "../../Icons/Delete_Icon.svg";
import { ReactComponent as Excel_Icon } from "../../Icons/Excel_Icon.svg";
import { ReactComponent as Warning_Icon } from "../../Icons/Warning_Icon.svg";

import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import HeatmapLayer from "react-leaflet-heatmap-layer";

import { CSVLink, CSVDownload } from "react-csv";

import { Line } from "react-chartjs-2";

const { Column, HeaderCell, Cell } = Table;

class CurrentAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrations_percentage_per_category: [],
      from: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      to: new Date(new Date().setHours(23, 59, 59, 59)).toISOString(),

      indeterminate: false,
      checkAll: false,
      selected_activities: [],
      locations_for_selected_activities: null,
      monthsArraylabel: null,
      monthsArraydata: null,
      hoursArraylabel: null,
      hoursArraydata: null,
      daysArraylabel: null,
      daysArraydata: null,
      YearsArraylabel: null,
      YearsArraydata: null,
      usersArraylabel: null,
      usersArraydata: null,

      mapCenter: {
        lat: 38.230462,
        lng: 21.75315,
        zoom: 13,
      },
      showDeleteModal: false,
      exportFileType: "json",
    };
  }
  //------------------------------------------------
  componentDidMount() {
    this.readUserStatistics();
  }
  //----------------------------------------------------
  componentDidUpdate(previousProps, previousState) {
    if (previousProps !== this.props) this.readUserStatistics();
  }
  //------------------------------------------------
  readUserStatistics = async () => {
    const GetAdminStatsURL = `${BaseURL}api/users/admin/stats`;

    const options = {
      method: "POST",
      headers: {
        Accpet: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({}),
    };

    let registrations_percentage_per_category = await fetch(
      GetAdminStatsURL,
      options
    ).then((response) => response.json());

    Promise.all([registrations_percentage_per_category]).then(([result1]) => {
      console.log("Admin result 1: ", result1);
      this.setState({
        registrations_percentage_per_category:
          result1.registrations_percentage_per_category,
        monthsArraydata: result1.monthsArraydata,
        monthsArraylabel: result1.monthsArraylabel,
        hoursArraydata: result1.hoursArraydata,
        hoursArraylabel: result1.hoursArraylabel,
        daysArraydata: result1.daysArraydata,
        daysArraylabel: result1.daysArraylabel,
        YearsArraydata: result1.YearsArraydata,
        YearsArraylabel: result1.YearsArraylabel,
        usersArraydata: result1.usersArraydata,
        usersArraylabel: result1.usersArraylabel,
      });
    });
  };

  //-------------------------------------------------
  ExportFile(data, exportAs) {
    switch (exportAs) {
      case "json": {
        const fileData = JSON.stringify(data);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `'LocationData'.json`;
        link.href = url;
        link.click();
        break;
      }
      case "csv": {
        break;
      }
      /*case "xml": {
        break;
      }*/
      default: //json export as default
      {
        const fileData = JSON.stringify(data);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `'Locationv2'.json`;
        link.href = url;
        link.click();
        break;
      }
    }
  }
  //-------------------------------------------------
  ApplyFilters = async () => {
    const { from, to, selected_activities } = this.state;

    const GetRegistrationPercentagePerCategoryURL = `${BaseURL}api/users/admin/stats/map_visualazation?selected_activities=${selected_activities}&startDate=${from}&endDate=${to}`;

    const options = {
      method: "POST",
      headers: {
        Accpet: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        //    user_id: user_id,
      }),
    };

    await fetch(GetRegistrationPercentagePerCategoryURL, options)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          locations_for_selected_activities:
            data.locations_for_selected_activities,
        })
      );
  };
  //-------------------------------------------------
  handleChange(value, categories) {
    const allValue = categories.map((item) => item.value);
    this.setState({
      selected_activities: value,
      indeterminate: value.length > 0 && value.length < allValue.length,
      checkAll: value.length === allValue.length,
    });
  }
  //-------------------------------------------------
  handleCheckAll(value, checked, categories) {
    const allValue = categories.map((item) => item.value);
    const nextValue = checked ? allValue : [];
    this.setState({
      selected_activities: nextValue,
      indeterminate: false,
      checkAll: checked,
    });
  }

  //-------------------------------------------------
  DeleteDataFromDB = async () => {
    const DeleteAllURL = `${BaseURL}api/users/admin/stats/`;
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    fetch(DeleteAllURL, options).then((response) => {
      if (response.ok) {
        this.setState({
          // plateEventsDATA: this.state.plateEventsDATA.filter(event => event.id !== plateEventID),
          showDeleteModal: false,
          registration_percentage_per_category: null,
        });
      }
      console.log(response.status);
    });
  };
  //-------------------------------------------------
  render() {
    const {
      registrations_percentage_per_category,
      from,
      to,
      checkAll,
      indeterminate,
      selected_activities,
      mapCenter,
      locations_for_selected_activities,
      exportFileType,
      monthsArraylabel,
      monthsArraydata,
      hoursArraylabel,
      hoursArraydata,
      daysArraylabel,
      daysArraydata,
      YearsArraylabel,
      YearsArraydata,
      usersArraylabel,
      usersArraydata,
    } = this.state;

    let location_points = [];
    let csvData = [];
    /**First line that contains title of each column */
    csvData.push([
      "heading",
      "nested_activity.type",
      "nested_activity.confidence",
      "nested_activity.timestampMs",
      "verticalAccuracy",
      "velocity",
      "accuracy",
      "latitude",
      "longitude",
      "altitude",
      "id_user",
    ]);
    if (locations_for_selected_activities !== null) {
      locations_for_selected_activities.forEach((location) => {
        let location_point = [location.latitude, location.longitude, "486"];
        location_points.push(location_point);
      });

      /**Construct Data for the CSV File */

      locations_for_selected_activities.forEach((el) =>
        csvData.push([
          el.heading,
          el.nested_activity.type,
          el.nested_activity.confidence,
          el.nested_activity.timestampMs == undefined
            ? ""
            : el.nested_activity.timestampMs,
          "",
          el.velocity == null ? "" : el.velocity,
          el.accuracy,
          el.latitude,
          el.longitude,
          el.altitude == undefined ? "" : el.altitude,
          el.id_user,
        ])
      );
    }

    let categories = [];
    registrations_percentage_per_category.forEach(
      (registration_percentage_per_category) =>
        categories.push({
          label: registration_percentage_per_category.category,
          value: registration_percentage_per_category.category,
        })
    );

    const ChartPerUser = {
      labels: usersArraylabel !== null ? usersArraylabel : [],
      datasets: [
        {
          label: "Registrations Per User",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: usersArraydata !== null ? usersArraydata : [],
        },
      ],
    };

    const DChartSPerYear = {
      labels: YearsArraylabel !== null ? YearsArraylabel : [],
      datasets: [
        {
          label: "Registrations Per Year",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: YearsArraydata !== null ? YearsArraydata : [],
        },
      ],
    };

    const BarChartSPerMonth = {
      labels: monthsArraylabel !== null ? monthsArraylabel : [],
      datasets: [
        {
          label: "Registrations Per Month",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: monthsArraydata !== null ? monthsArraydata : [],
        },
      ],
    };

    const BarChartSPerDay = {
      labels: daysArraylabel !== null ? daysArraylabel : [],
      datasets: [
        {
          label: "Registrations Per Day",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: daysArraydata !== null ? daysArraydata : [],
        },
      ],
    };

    const BarChartSPerHour = {
      labels: hoursArraylabel !== null ? hoursArraylabel : [],
      datasets: [
        {
          label: "Registrations Per Hour",
          backgroundColor: "rgba(245, 215, 110, 0.2)",
          borderColor: "rgba(245, 215, 110, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(245, 215, 110, 0.4)",
          hoverBorderColor: "rgba(245, 215, 110, 1)",
          data: hoursArraydata !== null ? hoursArraydata : [],
        },
      ],
    };

    return (
      <Grid>
        <Row>
          <Col md={23} mdOffset={1}>
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
                  <Col md={12} align="left">
                    <span> From</span>
                  </Col>
                  <Col md={12} align="left">
                    <span> To</span>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <DatePicker
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
                      defaultValue={new Date(Date.parse(from))}
                      placeholder="From"
                      onOk={(e) =>
                        this.setState({
                          from: moment.utc(e).toISOString(),
                        })
                      }
                      onClean={(e) => this.setState({ from: "" })}
                    />
                  </Col>
                  <Col md={12}>
                    <DatePicker
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
                      defaultValue={new Date(Date.parse(to))}
                      placeholder="To"
                      onOk={(e) =>
                        this.setState({
                          to: moment.utc(e).toISOString(),
                        })
                      }
                      onClean={(e) => this.setState({ to: "" })}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: "2%" }}>
                  <Col md={24}>
                    <CheckPicker
                      data={categories}
                      placeholder="Select"
                      ref={(ref) => {
                        this.picker = ref;
                      }}
                      style={{ width: "100%" }}
                      value={selected_activities}
                      onChange={(value) => this.handleChange(value, categories)}
                      renderExtraFooter={() => (
                        <div>
                          <Checkbox
                            inline
                            indeterminate={indeterminate}
                            checked={checkAll}
                            onChange={(value, checked) =>
                              this.handleCheckAll(value, checked, categories)
                            }
                          >
                            Check all
                          </Checkbox>
                          <Button
                            appearance="primary"
                            size="sm"
                            onClick={() => {
                              this.picker.close();
                            }}
                            style={{
                              float: "right",
                              marginRight: 10,
                              marginTop: 2,
                            }}
                          >
                            Ok
                          </Button>
                        </div>
                      )}
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
          <Col md={23} mdOffset={1}>
            <div style={{ marginTop: "2%" }}>
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
        </Row>
        <Row style={{ marginTop: "2%" }}>
          <Col md={23}>
            <Dropdown
              activeKey={exportFileType}
              title={exportFileType.toUpperCase()}
              onSelect={(e) => {
                this.setState({ exportFileType: e });
              }}
            >
              <Dropdown.Item eventKey="json">JSON</Dropdown.Item>
              {/*<Dropdown.Item eventKey="xml">XML</Dropdown.Item>*/}
              <Dropdown.Item eventKey="csv">
                <CSVLink
                  style={{ color: "white" }}
                  data={csvData}
                  filename="LocationData.csv"
                >
                  CSV
                </CSVLink>
              </Dropdown.Item>
            </Dropdown>

            <Button
              variant="secondary"
              size="lg"
              style={{
                left: "5%",
                backgroundColor: "#3c6945",
                width: "150px",
              }}
              //style={{ marginLeft: "1%" }}
              onClick={() => {
                this.ExportFile(
                  locations_for_selected_activities,
                  exportFileType
                );
              }}
            >
              <Excel_Icon
                style={{
                  width: "30px",
                  height: "12px",
                  fill: "white",
                  alignContent: "center",
                  marginRight: "20px",
                }}
              />

              <span style={{ position: "relative", right: "20px" }}>
                Export Data
              </span>
            </Button>

            {/*  <CSVLink data={csvData} filename={"LocationsData.csv"}>
                <Button
                  variant="secondary"
                  size="lg"
                  style={{
                    left: "5%",
                    backgroundColor: "#3c6945",
                    width: "150px",
                  }}
                  //style={{ marginLeft: "1%" }}
                  //  onClick={() => {
                  //   this.ExportFile(locations_for_selected_activities);
                  //                  this.setState({ loading: true });
                  // }}
                >
                  <Excel_Icon
                    style={{
                      width: "30px",
                      height: "12px",
                      fill: "white",
                      alignContent: "center",
                      marginRight: "20px",
                    }}
                  />

                  <span style={{ position: "relative", right: "20px" }}>
                    Export Data
                  </span>
                </Button>
              </CSVLink>
              <Button
                variant="secondary"
                size="lg"
                style={{
                  left: "5%",
                  backgroundColor: "#3c6945",
                  width: "150px",
                }}
                //style={{ marginLeft: "1%" }}
                //  onClick={() => {
                //   this.ExportFile(locations_for_selected_activities);
                //                  this.setState({ loading: true });
                // }}
                onClick={() => {
                  this.ExportFile();
                }}
              >
                <Excel_Icon
                  style={{
                    width: "30px",
                    height: "12px",
                    fill: "white",
                    alignContent: "center",
                    marginRight: "20px",
                  }}
                />

                <span style={{ position: "relative", right: "20px" }}>
                  Export Data
                </span>
              </Button>*/}
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col xs={12}>
            <div>
              <Bar data={DChartSPerYear} />
            </div>
          </Col>
          <Col xs={12}>
            <div>
              <Bar data={BarChartSPerMonth} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div>
              <Bar data={BarChartSPerDay} />
            </div>
          </Col>
          <Col xs={12}>
            <div>
              <Bar data={ChartPerUser} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={22}>
            <div>
              <Bar data={BarChartSPerHour} />
            </div>
          </Col>
        </Row>
        <Divider />
        <Row style={{ marginTop: "2%" }}>
          {/**Table */}
          <Row style={{ marginTop: "1%" }}>
            <Col md={23} mdOffset={1}>
              <Table height={400} data={registrations_percentage_per_category}>
                <Column flexGrow={2} minWidth={125} align="center" resizable>
                  <HeaderCell style={{ backgroundColor: "#3c4a69" }}>
                    Category
                  </HeaderCell>
                  <Cell dataKey="category" />
                </Column>
                <Column flexGrow={2} minWidth={180} align="center" resizable>
                  <HeaderCell style={{ backgroundColor: "#3c4a69" }}>
                    Registration Percentage
                  </HeaderCell>
                  <Cell dataKey="registrations" />
                </Column>
              </Table>
            </Col>
          </Row>
        </Row>
        <Row style={{ marginTop: "2%" }}>
          <Col md={23}>
            <Button
              variant="secondary"
              size="lg"
              style={{
                left: "5%",
                backgroundColor: "#693c4a",
                width: "150px",
                marginBottom: "2%",
              }}
              onClick={() => {
                this.setState({ showDeleteModal: true });
              }}
            >
              <Delete_Icon
                style={{
                  width: "30px",
                  height: "12px",
                  fill: "white",
                  alignContent: "center",
                  marginRight: "20px",
                }}
              />
              <span style={{ position: "relative", right: "20px" }}>
                Delete All
              </span>
            </Button>
          </Col>
        </Row>

        {/**Delete Confirmation Modal */}
        <Modal
          show={this.state.showDeleteModal}
          backdrop="static"
          autoFocus={true}
          size="xs"
          style={{ top: "15%" }}
          onExit={() => this.setState({ showDeleteModal: false })}
        >
          <Modal.Header>
            <Col align="center">
              <span style={{ position: "relative", top: "10px" }}>
                {" "}
                <Warning_Icon width="40px" height="40px" id="maps-icon" />{" "}
              </span>{" "}
              <span
                style={{
                  position: "relative",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "5%",
                }}
              >
                Warning
              </span>
            </Col>
          </Modal.Header>
          <Col
            style={{ fontSize: "15px", marginTop: "7%", paddingBottom: "2%" }}
            align="center"
          >
            <span style={{ marginLeft: "5%" }}>
              Are you sure you want to delete this event?{" "}
            </span>
          </Col>
          <Modal.Footer>
            <Button
              appearance="primary"
              style={{
                marginTop: "1%",
                width: "110px",
                right: "14%",
                backgroundColor: "#3c695b",
              }}
              onClick={() => {
                this.DeleteDataFromDB();
              }}
            >
              Yes
            </Button>
            <Button
              variant="secondary"
              style={{
                backgroundColor: "#693c4a",
                marginTop: "1%",
                width: "110px",
                right: "15%",
              }}
              onClick={() => this.setState({ showDeleteModal: false })}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </Grid>
    );
  }
}
export default CurrentAnalytics;
