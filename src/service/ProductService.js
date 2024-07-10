const Product = require("../models/ProductModel");

// [POST] /create
module.exports.createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, images, type, price, sizes, rating, discount, description } =
      newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });

      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "The name of product is already",
        });
      } else {
        const createProduct = await Product.create({
          name,
          images,
          type,
          price,
          sizes,
          rating,
          discount,
          description,
        });
        if (createProduct) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createProduct,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

// [PUT] /updateStatusProduct
module.exports.updateStatusProduct = async (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById({
        _id: productId,
      });

      if (!product) {
        return {
          status: "ERROR",
          message: "Không tìm thấy sản phẩm",
        };
      }
      product.status = !product.status;
      await product.save();

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: product,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// [PATCH] /update/:id
module.exports.updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
        deleted: false,
      });
      if (!product) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }
      await Product.updateOne(
        {
          _id: id,
        },
        data
      );

      const newProduct = await Product.findOne({ _id: id });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: newProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// [POST] /add-comment/:id
module.exports.addCommentProduct = async (productId, newComment) => {
  const { content, userId, rating, images } = newComment;

  try {
    const comment = { content, userId, rating, images, createdAt: new Date() };
    await Product.findByIdAndUpdate(
      productId,
      {
        $push: { comments: comment },
      },
      { new: true }
    );

    res.status(201).send("Comment added successfully.");
  } catch (error) {
    res.status(500).send("Error adding comment: " + error.message);
  }
};

// [GET] /detail/:id
module.exports.detailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
        deleted: false,
      });
      if (!product) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: product,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// [PATCH] /delete/:id
module.exports.deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      if (!product) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }
      await Product.updateOne(
        {
          _id: id,
        },
        {
          deleted: true,
        }
      );

      resolve({
        status: "OK",
        message: "Delete is success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

// [PATCH] /delete-many
module.exports.deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({
        _id: ids,
      });

      resolve({
        status: "OK",
        message: "Delete is success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

// [GET] /
module.exports.listProduct = (page, limit, sortKey, sortValue, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
      if (filter) {
        const label = filter[0];
        const regexValue = new RegExp(filter[1], "i");
        const query = { [label]: regexValue, status: true };

        const productsFilter = await Product.find(query)
          .limit(limit)
          .skip(page * limit);

        resolve({
          status: "OK",
          message: "SUCCESS",
          data: productsFilter,
          total: totalProduct,
          pageCurrent: Number(page),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (sortKey, sortValue) {
        const objectSort = {};
        objectSort[sortKey] = sortValue === 'asc' ? 1 : -1;
        const productsSort = await Product.find({ status: true })
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);

        resolve({
          status: "OK",
          message: "SUCCESS",
          data: productsSort,
          total: totalProduct,
          pageCurrent: Number(page),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      const products = await Product.find({ deleted: false })
        .limit(limit)
        .skip(page * limit);

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: products,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};

// [GET] /totalProduct
module.exports.totalProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const total = await Product.countDocuments({ deleted: false });

      resolve({
        status: "OK",
        message: "Success",
        data: total,
      });
    } catch (error) {
      reject(error);
    }
  });
};
