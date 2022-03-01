import React, { useRef, useEffect } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css'
import Tooltip from '../Tooltip/Tooltip'
import ReactDOM from 'react-dom'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

const Map = () => {
    const mapContainerRef = useRef(null)
    const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }))

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: process.env.REACT_APP_MAPBOX_STYLE,
            center: [94.628764, 37.554383],
            zoom: 4
        })

        // change cursor to pointer when user hovers over a clickable feature
        map.on('mouseenter', (e) => {
            if (e.features.length) {
                map.getCanvas().style.cursor = 'pointer'
            }
        })

        // reset cursor to default when user is no longer hovering over a clickable feature
        map.on('mouseleave', () => {
            map.getCanvas().style.cursor = ''
        })

        // add tooltip when users mouse move over a point
        map.on('mousemove', (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['nlm-printers'] // replace with your layer name
            })

            if (!features.length) {
                return
            }

            const feature = features[0]

            // Create tooltip node
            const tooltipNode = document.createElement('div')
            ReactDOM.render(<Tooltip feature={feature} />, tooltipNode)

            // Set tooltip on map
            tooltipRef.current
                .setLngLat(e.lngLat)
                .setDOMContent(tooltipNode)
                .addTo(map)
        })

        // Clean up on unmount
        return () => map.remove()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className='map-container' ref={mapContainerRef} />
        </div>
    )
}

export default Map
