import React from "react";
import {
  Uploader,
  Container,
  Content,
  Modal,
  Button,
  Col,
  Loader,
} from "rsuite";

import { ReactComponent as FileUploading_Icon } from "../../Icons/FileUploading.svg";

import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw-src.css";

//-------------------------------------------------------------------------------------------------------------------------------------------------
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
});

class UserDataUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.user_id,
      show_modal: false,
      loading: false,
      rectangles: [],
    };
  }
  //----------------------------------------------------
  componentDidMount() {
    this._isMounted = true;

    console.log("<===[UserDataUpload]=>");
    console.log("[UserDataUpload][componentDidMount]");
  }
  //----------------------------------------------------
  componentDidUpdate(previousProps, previousState) {
    console.log("<===[UserDataUpload][componentDidUpdate]==>");
  }

  //----------------------------------------------------
  componentWillUnmount(previousProps, previousState) {
    console.log("<===[UserDataUpload][componentDidUpdate]==>");
  }

  handleUploaderChange(value) {
    console.log("fileList", value);
    this.setState({ show_modal: true });
    //this.setState({ value });
  }
  //----------------------------------------------------
  handleStartUpload() {
    this.setState({ loading: true, show_modal: false });
    this.uploader.start();
  }

  _onEdited = (e) => {
    let numEdited = 0;
    e.layers.eachLayer((layer) => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

    this._onChange();
  };

  _onCreated = (e) => {
    const { rectangles } = this.state;
    let type = e.layerType;
    let layer = e.layer;
    rectangles.push(layer);
    this.setState({ rectangles: rectangles });
    if (type === "marker") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    } else {
      console.log("_onCreated: something else created:", type, e);
    }
    // Do whatever else you need to. (save to db; etc)
    // console.log(" layer.getBounds().getSouth", layer.getBounds().getSouth());
    var rectangle_points_coordinates = layer.getLatLngs();

    let rectangleBounds = layer.getBounds();

    console.log("bound", layer.getBounds());
    let res = this.isPointInsidePolygon({ x: 38.241238, y: 21.735159 }, layer);

    console.log("res", res);

    console.log("rectangle_points_coordinates", rectangle_points_coordinates);
    this._onChange();
  };

  isPointInsidePolygon(marker, poly) {
    var inside = false;
    var x = 38.241238,
      y = 21.735159;
    for (var ii = 0; ii < poly.getLatLngs().length; ii++) {
      var polyPoints = poly.getLatLngs()[ii];
      for (
        var i = 0, j = polyPoints.length - 1;
        i < polyPoints.length;
        j = i++
      ) {
        var xi = polyPoints[i].lat,
          yi = polyPoints[i].lng;
        var xj = polyPoints[j].lat,
          yj = polyPoints[j].lng;

        var intersect =
          yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
    }

    return inside;
  }

  _onDeleted = (e) => {
    let numDeleted = 0;
    e.layers.eachLayer((layer) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);
    this.setState({ rectangles: [] });
    this._onChange();
  };

  _onEdited = (e) => {
    let numEdited = 0;
    e.layers.eachLayer((layer) => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

    this._onChange();
  };

  _onMounted = (drawControl) => {
    console.log("_onMounted", drawControl);
  };

  _onEditStart = (e) => {
    console.log("_onEditStart", e);
  };

  _onEditStop = (e) => {
    console.log("_onEditStop", e);
  };

  _onDeleteStart = (e) => {
    console.log("_onDeleteStart", e);
  };

  _onDeleteStop = (e) => {
    console.log("_onDeleteStop", e);
  };

  //----------------------------------------------------
  _editableFG = null;
  _onFeatureGroupReady = (reactFGref) => {
    console.log("_onFeatureGroupReady", reactFGref);
    // populate the leaflet FeatureGroup with the geoJson layers
    if (reactFGref !== null) {
      let leafletGeoJSON = new L.GeoJSON(this.getGeoJson());
      let leafletFG = reactFGref.leafletElement;

      leafletGeoJSON.eachLayer((layer) => {
        leafletFG.addLayer(layer);
      });
    }
    // store the ref for future access to content
    this._editableFG = reactFGref;
  };

  _onChange = () => {
    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API

    const { onChange } = this.props;
    console.log("_onChange", this.props);

    if (!this._editableFG || !onChange) {
      return;
    }

    const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    console.log("geojsonData", geojsonData);
    onChange(geojsonData);
  };

  //------------------------------------------------------

  getGeoJson() {
    return; /*{
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [-122.46923446655273, 37.80293476836673],
          },
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-122.48069286346434, 37.800637436707525],
                [-122.48069286346434, 37.803104310307276],
                [-122.47950196266174, 37.803104310307276],
                [-122.47950196266174, 37.800637436707525],
                [-122.48069286346434, 37.800637436707525],
              ],
            ],
          },
        },
      ],
    };*/
  }

  //----------------------------------------------------
  render() {
    const { user_id, show_modal, loading, rectangles } = this.state;
    console.log("[DataUpload][rectangles]", rectangles);
    console.log("[DataUpload][rectangles]", typeof rectangles);

    var str = "";

    rectangles.forEach((el, index) => {
      if (str != "") {
        str += "&";
      }
      str += index + "=" + encodeURIComponent(el);
    });
    console.log("str", str);

    console.log("[DataUpload][user_id]", user_id);
    console.log("loading", loading);
    return (
      <div className="App">
        <Container>
          {/*</Container>    {loading ? (
            <Loader
              size="sm"
              content="Uploading..."
              style={{ position: "absolute", top: "50%", left: "50%" }}
            />
          ) : (*/}
          <Content>
            <Col md={23} mdOffset={1} style={{ marginTop: "2%" }}>
              <Uploader
                action={`http://localhost:8080/api/users/upload?user_id=${user_id}&rectangles=${rectangles.join(
                  ","
                )}`}
                onChange={(fileList) => {
                  this.handleUploaderChange(FileList);
                }}
                ref={(ref) => {
                  this.uploader = ref;
                }}
                autoUpload={false}
                onSuccess={(e) => {
                  console.log("onSucces", e);
                  this.setState({ loading: false });
                }}
              >
                <div style={{ lineHeight: "250px", width: "1000px" }}>
                  <FileUploading_Icon
                    style={{
                      width: "300px",
                      height: "150px",
                      marginTop: "15%",
                      marginLeft: "3%",
                    }}
                  />
                </div>
              </Uploader>
              <Modal size={this.state.size} show={show_modal}>
                <Modal.Header>
                  <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/*Map to draw a rectangle in order to take the coordinates of the areas that we dont want to upload the data */}
                  <Map
                    center={[38.230462, 21.75315]}
                    zoom={13}
                    zoomControl={false}
                    style={{ width: "100%", height: "480px" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    <FeatureGroup
                      ref={(reactFGref) => {
                        this._onFeatureGroupReady(reactFGref);
                      }}
                    >
                      <EditControl
                        position="topright"
                        onEdited={this._onEdited}
                        onCreated={this._onCreated}
                        onDeleted={this._onDeleted}
                        onMounted={this._onMounted}
                        onEditStart={this._onEditStart}
                        onEditStop={this._onEditStop}
                        onDeleteStart={this._onDeleteStart}
                        onDeleteStop={this._onDeleteStop}
                        draw={{
                          rectangle: true,
                          circle: false,
                          polygon: false,
                          marker: false,
                          circlemarker: false,
                          polyline: false,
                        }}
                      />
                    </FeatureGroup>
                  </Map>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={() => this.handleStartUpload()}
                    appearance="primary"
                  >
                    Ok
                  </Button>
                  <Button
                    onClick={() => {
                      this.setState({ show_modal: false });
                      this.handleStartUpload();
                    }}
                    appearance="subtle"
                  >
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Content>
        </Container>
      </div>
    );
  }
}

export default UserDataUpload;
