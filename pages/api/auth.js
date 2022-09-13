import { api } from '@carbonplan/auth'

const secret = process.env.JWT_SECRET

const users = [
  {
    username: 'admin',
    password: process.env.ADMIN_PASSWORD,
  },
  {
    username: 'guest',
    password: process.env.GUEST_PASSWORD,
  },
]

const handler = api({ secret, users })

export default handler
