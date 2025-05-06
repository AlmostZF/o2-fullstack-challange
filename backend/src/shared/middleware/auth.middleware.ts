
    
async function authMiddleware(req: any, res: any, next: any) {
    const API_KEY = "TOKEN123456789"
    const apiKey = req.headers.authorization?.split(' ')[1]
    if (!apiKey || apiKey !== API_KEY) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}

export default authMiddleware;





