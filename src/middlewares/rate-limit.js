import rateLimit from 'express-rate-limit';
const signInLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs,
    message: "Too many accounts created from this IP, please try again after an hour"
});
//apply to specific routes
// app.use("/api/", signInLimiter);
//apply to all requests
export default signInLimiter;
