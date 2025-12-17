import Item from "@/components/Home/Contents/Item/Item";

import "./RecommendedItem.scss";

interface ItemInterface {
  id: string;
  name: string;
  image: string | null;
  location_tag: string;
  rate: number;
  is_super_host: boolean;
  ratings: number;
}

const RecommendedItem = ({ item }: { item: ItemInterface }) => {
  return <Item item={item} style="recommended-item"/>;
};

export default RecommendedItem;
