export function findMapLayer(layers, layerId) {
    return layers.find((layer) => layer.id === layerId) || layers[0];
}

export function formatLayerName(layer) {
    return layer.name;
}