const User = require('../model/loginModel');

const login = async (req, res) => {
    const { username, password } = req.body;

    if(username == "" || password == ""){
        return res.status(400).json({message: "Please enter username and password"})
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const storedPassword = user.password;

        console.log("Entered Password: ", password);
        console.log("Stored Password: ", storedPassword);

        if (storedPassword === password) {
            console.log('Password matches');

            return res.status(200).json({ 
                message: "Login successful", 
                user: { _id:user._id, username: user.username, sno: user.sno } 
            });

        } else {
            console.log('Password does not match');
            return res.status(400).json({ message: "Password does not match" });
        }

    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).json({ message: "Failed to login", error });
    }
};

module.exports = { login };
