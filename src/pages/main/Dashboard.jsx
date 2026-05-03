import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import Dash from "../../components/Dash";
import InterestCategories from "../../components/InterestCategories";
import ExperienceCards from "../../components/ExperienceCards";

export default function Dashboard() {
    return (
        <div className="bg-white font-[Trebuchet_MS,sans-serif]">
            <Dash />
            <InterestCategories />
            <ExperienceCards />
        </div>
    );
}