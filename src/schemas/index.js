import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
  nombre: yup.string().required("The field cannot be empty"),
  descripcion: yup.string().required("The field cannot be empty"),
  contrato: yup.string().required("The field cannot be empty"),
  address: yup.string().required("The field cannot be empty"),
  addressF: yup.string().required("The field cannot be empty"),
  TotalShares: yup.number().positive().required("The field cannot be empty"),
  SharePrice: yup.number().positive().required("The field cannot be empty"),
  EstimatedProfitability: yup.number().positive().required("The field cannot be empty"),
  TechnicalDetails: yup.string().required("The field cannot be empty"),
  Location: yup.string().required("The field cannot be empty"),
  StartOperation: yup.string().required("The field cannot be empty"),
  Date: yup.string().required("The field cannot be empty"),
});