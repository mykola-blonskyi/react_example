import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import { compose, withProps, lifecycle } from 'recompose';
import classNames from 'classnames';
import { isEmpty } from 'lodash';

import * as _ from 'lodash';

const required = value => (value ? undefined : 'Required');

const MyMapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div className="clearfix" style={{ height: `100%` }} />,
    containerElement: <div className="clearfix" style={{ height: `400px`, position: 'relative' }} />,
    mapElement: <div className="clearfix" style={{ height: `80%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      const { fields, initialValues } = this.props;

      this.setState({
        bounds: null,
        center: {
          lat: initialValues.latitude && initialValues.longitude ? initialValues.latitude : 41.112469,
          lng: initialValues.latitude && initialValues.longitude ? initialValues.longitude : -96.767578
        },
        markers:
          initialValues.latitude && initialValues.longitude
            ? [
                {
                  position: {
                    lat: initialValues.latitude,
                    lng: initialValues.longitude
                  }
                }
              ]
            : [],
        zoom: 3,
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers
          });

          this.props.change('latitude', nextMarkers[0].position.lat());
          this.props.change('longitude', nextMarkers[0].position.lng());

          // refs.map.fitBounds(bounds);
        },
        mapClick: ref => {
          const clickPos = {
            position: {
              lat: ref.latLng.lat(),
              lng: ref.latLng.lng()
            }
          };

          this.setState({
            center: clickPos.position,
            markers: [clickPos]
          });

          this.props.change('latitude', clickPos.position.lat);
          this.props.change('longitude', clickPos.position.lng);
        },
        zoomOut: () => {
          const currentZoom = refs.map.getZoom();

          this.setState({
            zoom: currentZoom > 3 ? currentZoom - 1 : 3
          });
        },
        zoomIn: () => {
          const currentZoom = refs.map.getZoom();

          this.setState({
            zoom: currentZoom < 16 ? currentZoom + 1 : 16
          });
        },
        updateZoom: () => {
          const currentZoom = refs.map.getZoom();

          this.setState({
            zoom: currentZoom
          });
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const { handleSubmit, fields } = props;
// console.log('map props: ', props);
  return (
    <form className="proj_create_step4_wrapper" onSubmit={handleSubmit}>
      <GoogleMap
        style={{ position: 'relative' }}
        ref={props.onMapMounted}
        defaultZoom={3}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
        onClick={props.mapClick}
        defaultOptions={{
          disableDefaultUI: true
        }}
        zoom={props.zoom ? props.zoom : 3}
        onZoomChanged={props.updateZoom}
      >
        <IconButton
          className="zoom_in_btn"
          disabled={props.zoom === 16}
          iconClassName="material-icons"
          tooltip="Zoom In"
          onClick={props.zoomIn}
        >
          &#xE145;
        </IconButton>
        <IconButton
          className="zoom_out_btn"
          disabled={props.zoom === 3}
          iconClassName="material-icons"
          tooltip="Zoom Out"
          onClick={props.zoomOut}
        >
          &#xE15B;
        </IconButton>
        <SearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
            type="text"
            className="loop"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `250px`,
              height: `40px`,
              lineHeight: '40px',
              padding: `0 22px 0 12px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              marginTop: '10px',
              marginLeft: '10px',
              fontFamily: "'Titillium Web', sans-serif"
            }}
          />
        </SearchBox>
        {props.markers.map((marker, index) => (
          <Marker defaultIcon="./images/map_marker32.png" key={index} position={marker.position} />
        ))}
      </GoogleMap>
      <Field type="hidden" name="latitude" component="input" validate={required}/>
      <Field type="hidden" name="longitude" component="input" validate={required}/>

      <div className="clearfix bottom_button">
        <RaisedButton
          label="Continue"
          primary={true}
          className={classNames('wizard_btn', { empty_value: !props.valid })}
          type="submit"
        />
      </div>
    </form>
  );
});

export default reduxForm({
  form: 'ProjWizStep4',
  fields: ['latitude', 'longitude']
})(MyMapComponent);
