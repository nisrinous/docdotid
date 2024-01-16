export type ProductsResponse = {
  id: number;
  name: string;
  unitInPack: string;
  sellingUnit: number;
  image: string;
};

export type ProductCategoriesResponse = {
  id: number;
  name: string;
};

export type ProductResponse = {
  id: number;
  name: string;
  generic_name: string;
  content: string;
  manufacture_id: number;
  description: string;
  drug_classification_id: number;
  drug_form_id: number;
  product_category_id: number;
  unit_in_pack: number;
  selling_unit: number;
  weight: number;
  height: number;
  length: number;
  width: number;
  image: string;
  is_active: boolean;
};
