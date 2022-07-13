const cfg = () => {
    return {
        jwt_secret: "V$C0D&",
        jwt_expires: "1d",
        salt: 10,
        db_path: "mongodb+srv://fernandofiap25mob:Fe25Mob@cluster25mobtrabalho.4d1bf.mongodb.net/?retryWrites=true&w=majority"
    };
};

module.exports = cfg();