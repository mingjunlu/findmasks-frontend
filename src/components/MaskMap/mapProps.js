const mapProps = {
    changeMapLanguage(map) {
        map.getStyle().layers.forEach((layer) => {
            if (layer.id.endsWith('-label')) {
                map.setLayoutProperty(layer.id, 'text-field', [
                    'coalesce',
                    ['get', 'name_zh-Hant'],
                    ['get', 'name'],
                ]);
            }
        });
    },
    containerStyle: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    maxBounds: [
        [117.82303563424552, 20.555013006344305],
        [123.84450551116388, 26.833835878766501],
    ],
};

export default mapProps;
