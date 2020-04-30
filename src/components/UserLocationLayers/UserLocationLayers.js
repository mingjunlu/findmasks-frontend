import React from 'react';
import PropTypes from 'prop-types';
import { Layer } from 'react-mapbox-gl';
import { userLocationProps, userLocationRadiusProps } from './userLocationLayersProps';

const UserLocationLayer = ({ radius }) => (
    <>
        <Layer
            id={userLocationRadiusProps.id}
            type={userLocationRadiusProps.type}
            sourceId={userLocationRadiusProps.sourceId}
            paint={{
                ...userLocationRadiusProps.paint,
                'circle-radius': {
                    base: 1.75,
                    stops: [
                        [8, 0],
                        [16, radius * 1.5],
                        [20, radius * 10],
                    ],
                },
            }}
        />
        <Layer
            id={userLocationProps.id}
            type={userLocationProps.type}
            sourceId={userLocationProps.sourceId}
            paint={userLocationProps.paint}
        />
    </>
);

UserLocationLayer.propTypes = {
    radius: PropTypes.number.isRequired,
};

export default UserLocationLayer;
