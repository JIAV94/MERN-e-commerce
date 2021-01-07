import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Javier Aicinena',
    email: 'javier@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Valeria Ailloud',
    email: 'valeria@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users