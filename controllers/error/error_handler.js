const errorHandler = (error, res) => {
    const status = error.status || 500;
    const message = error.message || "Backend Error Occured";
    const extraDetails = error.extraDetails || "Backend Extra Error Occured";
    const ejsFile = error.ejsFile || 0;
    // console.log(error);
    return ejsFile ? res.render(ejsFile, { err:error.error }) : res.status(status).json({ message, extraDetails });
}

module.exports = errorHandler;