import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cetificationSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String
    },
    properties: {
      landLot: {
        landLotNo: Number,
        landMapSheetNo: Number,
        landAddress: String,
        landArea: Number, //m2
        landFormOfUse: String,
        landPurposeOfUse: String,
        landTimeOfUse: String,
        landOriginOfUse: String
      },
      house: {
        houseAddress: String,
        houseType: String,
        houseApartmentName: String,
        houseConstructionArea: String,
        houseFloorArea: String,
        houseFormOfOwner: String,
        houseClass: String,
        houseTimeOfUse: String
      },
      otherConstruction: String,
      //production forest is an artificial forest
      prodForestIsArtificial: String,
      perennialTree: String,
      notice: String
    },
    status: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Cetification", cetificationSchema);
