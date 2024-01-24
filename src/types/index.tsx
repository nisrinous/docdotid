import { type FileWithPath } from "react-dropzone";

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
  category: string;
  is_active: boolean;
  price: string;
  product_id: number;
  total_stock: number;
  stock: number;
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

export type PharmacyResponse = {
  id: number;
  name: string;
  address: string;
  postal_code: number;
  latitude: number;
  longitude: number;
  city_code: number;
  operational_hour: string;
  operational_day: string;
  is_active: boolean;
  pharmacist_id: number;
};

export type UserDetailResponse = {
  name: string;
  phone: string;
  email: string;
  gender: string;
  weight: string;
  height: string;
  image: string;
  id: number;
};

export type OrdersResponse = {
  id: number;
  pharmacy: {
    id: number;
    name: string;
    phone: string;
  };
  order_price: number;
  total_price: number;
  status: number;
};

export type DoctorResponse = {
  id: number;
  user_name: string;
  email: string;
  is_active: boolean;
  fee: number;
  specialist_id: number;
  specialist_name: string;
  specialist_description: string;
  image: string;
  years_of_experience: number;
};

export type PharmaciesOwnedListResponse = {
  id: string;
  name: string;
  address: string;
  operational_hour: string;
  operational_day: string;
  is_active: boolean;
};

export type CategoryListResponse = {
  id: number;
  name: string;
};
export type ProductListResponse = {
  id: number;
  name: string;
};

export type FileWithPreview = FileWithPath & {
  preview: string;
};

export type DoctorCategoriesResponse = {
  id: number;
  name: string;
  description: string;
  symptoms: string;
};

export type MedicineOrderResponse = {
  id: number;
  quantity: number;
  price: string;
  pharmacy_name: string;
  showed_product: {
    id: number;
    name: string;
    unit_in_pack: string;
    selling_unit: string;
    image: string;
    weight: string;
    max_price: null;
    min_price: null;
    product_category_id: null;
    category_name: null;
    manufacturer_name: string;
    total_stock: number;
  };
  created_at: string;
};

export type CartDataResponse = {
  cart_items: CartItemResponse[];
  shipping_details: string;
  pharmacy_id: number;
  order_price: string;
};

export type CartItemResponse = {
  id: number;
  quantity: number;
  stock: number;
  price: string;
  product_category_id: number;
  product: {
    id: number;
    name: string;
    unit_in_pack: string;
    selling_unit: string;
    image: string;
    weight: string;
    max_price: number;
    min_price: number;
    product_category_id: number;
    category_name: string;
    manufacturer_name: string;
    total_stock: number;
    is_active: boolean;
  };
};
