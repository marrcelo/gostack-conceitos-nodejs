const mergeObjects = (objToBeUpdated, objWithNewValues) => {
    for (const [key, value] of Object.entries(objWithNewValues)) {
        if (value) objToBeUpdated[key] = value;
    }
    return objToBeUpdated;
};

module.exports = { mergeObjects };
