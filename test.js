require("dotenv").config();
const jwt=require("jsonwebtoken");
const generated=(id)=>{
    const  token=jwt.sign({userId:id},process.env.SECRET_KEY)
    console.log(token);
}
generated(12)
const verify=()=>{
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE2NzUwOTk0OTh9.3IJqWrQsNXTHxKxgHKJpv9snC378mpCzyjmamCo-vMA"
jwt.verify(token,process.env.SECRET_KEY,(error,user)=>{
    if(error) console.log(error)
    console.log(user)
})
}
verify()