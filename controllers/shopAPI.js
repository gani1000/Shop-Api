
const { StatusCodes } = require('http-status-codes');
const Products = require('../model/shopAPI');

const getAllStaticProducts = async (req, res) => {
    const products = await Products.find({});
    res.status(StatusCodes.OK).json({ products });
}

const getAllProducts = async (req, res) => {
    const { featured, name, company, sort, fields, numericfilter } = req.query;
    const queryObject = {};
    
    if (featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i'};
    }
    if (company){
        queryObject.company = company;
    }
    let result = Products.find(queryObject);
    if (sort) {
        const SortList = sort.split(',').join(' ');
        result = result.sort(SortList);
    }
    if (fields){
        const filedsList = fields.split(',').join(' ');
        result = result.select(filedsList);
    }
    if(numericfilter){
        const mapOperator = {
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq',
            '>': '$gt',
            '>=': '$gte',
        };
        const regx = /\b(<|>|<=|>=|=)\b/g;
        let filter = numericfilter.replace(regx, (match) => `-${mapOperator[match]}-`);
        const options = ['price', 'rating'];
        filter = filter.split(',').forEach((item) => {
            const [filed, operator, value] = item.split('-');
            if (options.includes(filed)){
                queryObject.filed = {[operator]: Number(value)};
            }
        });
    }
    
    const products = await result;
    // console.log(products, products.length);
    res.status(StatusCodes.OK).json({ products, data: products.length });
}


const getAllProductsByID = async (req, res) => {
    const { id: taskID } = req.params;
    const products = await Products.findById({ _id: taskID });
    res.status(StatusCodes.OK).json({ products });
}

module.exports = {
    getAllStaticProducts,
    getAllProducts,
    getAllProductsByID
};