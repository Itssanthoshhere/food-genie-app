class APIFeatures {
  // query = Product.find()

  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    // this.queryStr.keyword -> if keyword exists ie if we type
    // localhost:8080/api/v1/products?keyword=Airpods
    const keyword = this.queryStr.keyword
      ? {
          // Search in name field
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  filter(allowedFields = []) {
    const queryCopy = { ...this.queryStr };

    // Removing fields from the query
    const removeFields = ["keyword", "limit", "page", "sort"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Reject arbitrary query keys if allowedFields is provided
    if (allowedFields.length > 0) {
      Object.keys(queryCopy).forEach((key) => {
        if (!allowedFields.includes(key)) {
          delete queryCopy[key];
        }
      });
    }

    // price: {gte: '1', 1te: '200'}}

    // this.query = this.query.find(queryCopy);

    // Advance filter for price, ratings etc
    let queryStr = JSON.stringify(queryCopy);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}

export default APIFeatures;
