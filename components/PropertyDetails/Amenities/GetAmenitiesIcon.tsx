import { IoMdCheckboxOutline } from "react-icons/io";
import { LuWaves } from "react-icons/lu";
import { TbFridge, TbToolsKitchen2 } from "react-icons/tb";
import { BiCctv } from "react-icons/bi";
import { IoWifi } from "react-icons/io5";
import { PiCar, PiFireExtinguisher, PiOven } from "react-icons/pi";
import { FaShower } from "react-icons/fa";
import { TbDropletBolt } from "react-icons/tb";
import { MdOutlineCoffeeMaker, MdOutlineSanitizer } from "react-icons/md";

const amenitiesList = [
  {
    name: "Lakeside",
    icon: <LuWaves />,
  },
  {
    name: "Kitchen",
    icon: <TbToolsKitchen2 />,
  },
  {
    name: "Security cameras on property",
    icon: <BiCctv />,
  },
  {
    name: "WiFi",
    icon: <IoWifi />,
  },
  {
    name: "Free parking",
    icon: <PiCar />,
  },
  {
    name: "Outdoor shower",
    icon: <FaShower />,
  },
  {
    name: "Hot water",
    icon: <TbDropletBolt />,
  },
  {
    name: "Shampoo",
    icon: <MdOutlineSanitizer />,
  },
  {
    name: "Fire extinguisher",
    icon: <PiFireExtinguisher />,
  },
  {
    name: "Freezer",
    icon: <TbFridge />,
  },
  {
    name: "Coffee maker",
    icon: <MdOutlineCoffeeMaker />,
  },
  {
    name: "Glass stove",
    icon: <PiOven />
  },
];

const GetAmenitiesIcon = ({ name }: { name: string }) => {
  const exists = amenitiesList.find((el) => el.name === name);

  if (exists) {
    return exists.icon;
  } else {
    return <IoMdCheckboxOutline />;
  }
};

export default GetAmenitiesIcon;
