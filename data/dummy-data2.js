import Criteria from "../models/criteria";

export const CRITERIAS = [
  new Criteria("k1", "Vegetasi area genangan embung", "benefit", 0.937),
  new Criteria("k2", "Volume material timbunan", "cost", 0.701),
  new Criteria("k3", "Luas daerah yang akan dibebaskan", "cost", 1.847),
  new Criteria("k4", "Volume tampungan efektif", "benefit", 0.982),
  new Criteria("k5", "Lama operasi", "benefit", 1.173),
  new Criteria("k6", "Harga air/m3", "cost", 0.953),
  new Criteria("k7", "Akses jalan menuju site bendungan", "cost", 0.752),
];

export default CRITERIAS;
