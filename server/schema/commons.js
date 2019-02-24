module.exports = { prepareObject: (o) => {
    if (o) {
        o._id = o._id.toString();
    }
    return o;
}};