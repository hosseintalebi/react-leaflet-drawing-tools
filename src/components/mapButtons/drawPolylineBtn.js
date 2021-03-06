import React from 'react'
import { PropTypes } from 'prop-types'
import ReactDOM from 'react-dom'
import L from 'leaflet'
import { MapControl } from 'react-leaflet'

export default class DrawPolylineBtn extends MapControl {
  static contextTypes = {
    map: PropTypes.instanceOf(Map),
  }
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
  }

  getFirstLastElementClass () {
    const { last, first } = this.props
    return last ? 'last' : first ? 'first' : ''
  }

  componentWillMount() {
    const centerControl = L.control({position: 'topright'})
    const jsx = (
      <div {...this.props} onClick={this.onClick} style={{width: 30, height: 30, backgroundColor: '#FFF', cursor: 'pointer'}}>
        <img src='style/images/polyline.png' />
      </div>
    )

    centerControl.onAdd = (map) => {
      let div = L.DomUtil.create('div', `leaflet-bar leaflet-control leaflet-draw-btn ${this.getFirstLastElementClass()}`)
      ReactDOM.render(jsx, div)
      return div
    }
    this.leafletElement = centerControl
  }
  onClick() {
    const { map } = this.context
    const { drawControl } = this.props
    new L.Draw.Polyline(map, drawControl.options.polyline).enable()
  }
}
