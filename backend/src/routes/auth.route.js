import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
    // Handle login logic here  
    res.send('Login successful');
}
);

router.get('/register', (req, res) => {
    // Handle registration logic here  
    res.send('Registration successful');
});

router.get('/logout', (req, res) => {
    // Handle logout logic here  
    res.send('Logout successful');
});


export default router;
