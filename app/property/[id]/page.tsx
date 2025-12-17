import "./Property.scss";

import Gallery from "@/components/PropertyDetails/Gallary/Gallery";
import Details from "@/components/PropertyDetails/Details/Details";
import Descriptions from "@/components/PropertyDetails/Descriptions/Descriptions";
import Amenities from "@/components/PropertyDetails/Amenities/Amenities";
import Map from "@/components/PropertyDetails/Map/Map";
import Recommendations from "@/components/PropertyDetails/Recommendations/Recommendations";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const BASE_URL = process.env.REACT_APP_BASE_URL ?? "http://localhost:3000";

const PropertyDetails = async ({ params }: PageProps) => {
  const { id } = await params;

  const respone = await fetch(`${BASE_URL}/api/properties/${id}`, {
    cache: "no-store",
  });
  const responseJSON = await respone.json();

  const propertyDetails = responseJSON?.property;
  const similarStays = responseJSON?.similarStays ?? [];

  return (
    <main className="property-details">
      <div className="container-wrapper">
        <div className="property-flex-box">
          <Gallery data={propertyDetails} />
          <Details data={propertyDetails} id={id} />
        </div>

        <div className="property-flex-column-box">
          <Descriptions data={propertyDetails} />

          <div className="property-flex-box">
            <Amenities data={propertyDetails} />
            <Map data={propertyDetails} />
          </div>
        </div>

        <Recommendations id={id} similarStays={similarStays} />
      </div>
    </main>
  );
};

export default PropertyDetails;
