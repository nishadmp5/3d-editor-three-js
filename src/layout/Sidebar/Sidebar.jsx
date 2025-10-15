import AssetsListing from "../../components/AssetsListing/AssetsListing";
import RoomSettings from "../../components/RoomSettings/RoomSettings";
import TextureListing from "../../components/TextureListing/TextureListing";
import TransformProperties from "../../components/TransformProperties/TransformProperties";
import Logo from "../Logo/Logo";

const Sidebar = () => {
  return (
    <div className="w-full h-full">
      <Logo />
      <div className="w-full h-full overflow-y-scroll pb-20 bg-secondary  border-r border-gray-300">
        <RoomSettings/>
        <AssetsListing />

        <TextureListing/>
        <TransformProperties />
      </div>
    </div>
  );
};

export default Sidebar;
