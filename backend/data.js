/* eslint-disable import/no-anonymous-default-export */
import bcrypt from 'bcryptjs'

const data = {
   users: [
      {
         name: 'kelvin',
         email: 'kelvin@example.com',
         password: bcrypt.hashSync('1234', 8),
         isAdmin: true
      },
      {
         name: 'mwas',
         email: 'user@example.com',
         password: bcrypt.hashSync('1234', 8),
         isAdmin: false
      },

   ],
   products: [
      {
         name: 'Nike Slim Shirt',
         category: 'Shirts',
         image: './images/p1.jpg',
         price: 120,
         countInStock: 10,
         brand: 'Nike',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality product'
      },
      {
         name: 'Adidas Fit Shirt',
         category: 'Shirts',
         image: './images/p1.jpg',
         price: 100,
         countInStock: 20,
         brand: 'Nike',
         rating: 4.0,
         numReviews: 5,
         description: 'high quality product'
      },
      {
         name: 'Lacoste Free Shirt',
         category: 'Shirts',
         image: './images/p1.jpg',
         price: 220,
         countInStock: 0,
         brand: 'Nike',
         rating: 4.8,
         numReviews: 10,
         description: 'high quality product'
      },
      {
         name: 'Nike Slim Pant',
         category: 'Pants',
         image: './images/p1.jpg',
         price: 78,
         countInStock: 15,
         brand: 'Nike',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality product'
      },
      {
         name: 'puma Slim Pants',
         category: 'Pants',
         image: './images/p1.jpg',
         price: 65,
         countInStock: 5,
         brand: 'Puma',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality product'
      },
      {
         name: 'Adidas Fit Pant',
         category: 'Pants',
         image: './images/p1.jpg',
         price: 139,
         countInStock: 12,
         brand: 'Puma',
         rating: 4.5,
         numReviews: 15,
         description: 'high quality product'
      }
   ]
}

export default data