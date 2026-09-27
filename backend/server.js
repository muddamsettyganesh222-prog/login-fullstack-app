const express = require('express')
const db = require('./db')
const cors = require('cors')

const app = express()

const PORT = 5000
app.use(cors())
app.use(express.json())
app.get('/api/hello', (req, res) => {
    res.json({
        message: 'Hello from backend'
    })
})
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            })
        }

        const user = rows[0]

        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            })
        }

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
})
app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users')

        res.json(rows)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: 'Database error'
        })
    }
})
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})