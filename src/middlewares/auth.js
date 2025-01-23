export const adminAuth = (req, res, next) => {
    console.log("Admin Auth is getting checked");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("UnAuthorized Request");
    }
    else{
        next();
    }
};