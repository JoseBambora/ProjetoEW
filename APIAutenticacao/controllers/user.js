var User = require('../models/user')

module.exports.updateUser = (id, pwd,finaluser) => {
    return User.findById(id,function(err,user){
        if (err) 
            return callback(err);
        else
        {
            user.setPassword(pwd, function(setPasswordErr, updatedUser) {
                if (setPasswordErr) 
                  return callback(setPasswordErr);
                else
                {
                    updatedUser.username = finaluser.username
                    updatedUser.email = finaluser.email
                    updatedUser.birth_date = finaluser.email
                    updatedUser.address = finaluser.address
                    updatedUser.save(function(saveErr) {
                        if (saveErr)
                            return callback(saveErr);
                
                        return callback(null, updatedUser);
                    });
                }
            });
        }
    })
}