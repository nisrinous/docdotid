export type ProductsResponse = {
  id: number;
  name: string;
  unit_in_pack: string;
  selling_unit: number;
  max_price: number;
  min_price: number;
  image: string;
  product_category_id: number;
  category_name: string;
  manufacturer_name: string;
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
  manufacturer_id: number;
  manufacturer_name: string;
  description: string;
  drug_classification_id: number;
  drug_form_id: number;
  product_category_id: number;
  category_name: number;
  unit_in_pack: number;
  selling_unit: number;
  max_price: number;
  min_price: number;
  weight: number;
  height: number;
  length: number;
  width: number;
  image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
