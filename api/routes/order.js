const router=require("express").Router();
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAutherizations, verifyTokenAndAdmin } = require("./verifyToken");


//CREATE USER
router.post("/",verifyToken,async (req,res)=>{
    
    const newOrder= new Order(req.body)

    try {

        const savedOrder= await newOrder.save()
        res.status(200).json(savedOrder )
        
    } catch (err) {
        res.status(500).json(err)
    }

})








//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //DELETE
  router.delete("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try {
      await Order.findByIdAndDelete(req.params.id)
      res.status(200).json("Order  has been deleted")
    } catch (err) {
      res.status(500).json(err)
    }
  })
  //GET USER ORDERS 
  router.get("/find/:userId",verifyTokenAndAutherizations,async (req,res)=>{
    try {
      const orders= await Order.find({
        userId: req.params.userId 
      })

      res.status(200).json(orders)

    } catch (err) {
      res.status(500).json(err)
    }
  })



  //GET ALL 
  router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
  })



// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  let previousMonth =new Date(date.getFullYear(), date.getMonth() - 2, 1);

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports=router;