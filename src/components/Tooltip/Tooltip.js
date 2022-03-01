import React from 'react'

const Tooltip = ({ feature }) => {
    const { ID, LABEL } = feature.properties

    return (
        <div id={`tooltip-${ID}`}>
            <strong>BDRC ID:</strong> {ID}
            <br />
            <strong>Printery Name:</strong> {LABEL}
        </div>
    )
}

export default Tooltip
