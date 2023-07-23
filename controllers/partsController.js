const PartModel = require("../models/partsModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

// Post API For Adding Part Details-
const addPart = asyncHandler(async (req, res, next) => {
    const { name, specifications, compatibility, issues, instructions, serviceTag, modelNumber } = req.body;

    // if name or specifications is not presented-
    if (!name || !specifications) {
        next(new AppError("This field is required", 400));
        return;
    }

    // if model number exist-
    const existingModel = await PartModel.findOne({modelNumber});
    if(existingModel){
        return next(new AppError("Already exist this model number", 400));
    }

    // ready for saving details-
    const partDetails = await PartModel({
        name,
        specifications,
        compatibility,
        issues: issues || "No known issues",
        instructions: instructions || "No instructions available",
        serviceTag,
        modelNumber
    });
    partDetails.save();

    // send response
    const response = {
        status: "success",
        message: "Successfully Added!",
        data: {
            partDetails
        }
    };
    return res.status(200).json(response);
});

  
// Get API For Part Details-
const getAllPart = asyncHandler(async (req, res, next) => {
    const { query } = req.query;
    let parts;
  
    if (query !== "") {
      // If there is a query, perform the search based on serviceTag and modelNumber
      parts = await PartModel.find({
        $or: [
          { serviceTag: { $regex: new RegExp(query, 'i') } },
          { modelNumber: { $regex: new RegExp(query, 'i') } },
        ],
      });
    } else {
      // If no query is provided, get all parts
      parts = await PartModel.find();
    }
  
    // Send success response
    const response = {
      status: "success",
      message: "Successfully Getting Details Of All Parts",
      data: {
        parts,
      },
    };
    return res.status(200).json(response);
  });
  


// Get API For Single Part Details-
const getSinglePart = asyncHandler(async (req, res, next) => {
    const {_id} = req.params;

    // if id is not presented-
    if (!_id) {
        next(new AppError("Item id is not presented", 400));
    }

    const part = await PartModel.findById({_id});
    
    // send success response
    const response = {
        status: "success",
        message: "Successfully Getting Details Of Single Part",
        data: {
            part
        },
    };
    return res.status(200).json(response);
})
  

// Update API For Updating Part Details-
const updatePart = asyncHandler(async (req, res, next) => {
    const {_id} = req.params;

    // if id is not presented-
    if (!_id) {
        next(new AppError("Item id is not presented", 400));
    }

    const { name, specifications, compatibility, issues, instructions, serviceTag, modelNumber } = req.body;
    const updatedPart = await PartModel.findByIdAndUpdate(
        _id,
        {
        name,
        specifications,
        compatibility,
        issues: issues || "No known issues",
        instructions: instructions || "No instructions available",
        serviceTag,
        modelNumber
        },
        { new: true }
    );
  
    // send response
    const response = {
        status: "success",
        message: "Successfully Updated!",
        data: {
            updatedPart
        }
    };
    return res.status(200).json(response);
})

// Delete Api For Deleting Part Details-
const deletePart = asyncHandler(async (req, res, next) => {
    const {_id} = req.params;

    // if id is not presented-
    if (!_id) {
        next(new AppError("Item id is not presented", 400));
    }

    // delete part details-
    await PartModel.findByIdAndDelete(_id);
    
    // send response
    const response = {
        status: "success",
        message: "Successfully Deleted!",
    };
    return res.status(200).json(response);
})
  
// Export-
module.exports = {addPart, getAllPart, getSinglePart, updatePart, deletePart}