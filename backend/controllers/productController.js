
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @description:  Fetch all products
// @route         GET /api/products
// @access        Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 2
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i' // Case insensitive
    }
  } : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @description:  Fetch single product
// @route         GET /api/products/:id
// @access        Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @description:  Delete a product
// @route         DELETE /api/products/:id
// @access        Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @description:  Create a product
// @route         POST /api/products
// @access        Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: 'Sample name',
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    description: 'Sample description',
    countInStock: 0,
    numReviews: 0
  })
  
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @description:  Update a product
// @route         PUT /api/products/:id
// @access        Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock
  } = req.body
  
  const product = await Product.findById(req.params.id)
  
  if (product) {
    product.name = name
    product.image = image
    product.brand = brand
    product.category = category
    product.description = description
    product.price = price
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @description:  Create new review
// @route         POST /api/products/:id/reviews
// @access        Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  
  const product = await Product.findById(req.params.id)
  
  if (product) {
    const alreadyReviewed = product.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / 
    product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @description:  Get top reated products
// @route         GET /api/products/top
// @access        Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1}).limit(3)

  res.json(products)
})

export {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct
}