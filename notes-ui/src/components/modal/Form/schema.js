import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required('Required').min(20),
  });
