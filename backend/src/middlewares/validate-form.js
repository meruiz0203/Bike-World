const { validationResult } = require("express-validator"); 

module.exports = (redirectUrl) => async(req, res, next) => { 
    const id = req.params.id;
    console.log(req.body);
    const errors = validationResult(req);  

    console.log("Errors:", errors.array());

    if(!errors.isEmpty()){ 
        req.session.errors = errors.mapped();
        req.session.oldData = req.body;
        return res.redirect(redirectUrl.replace(':id', id))
    }  

    req.session.errors = null;
    req.session.oldData = null;
    next()
       
}