const userSerialize = (user) => {
    return {
        _id: user._id,
        displayName: user.displayName,
        username: user.username,
        photoUrl: user.photoUrl
    };
}

module.exports = userSerialize