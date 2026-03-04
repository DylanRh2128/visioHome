import { MapPin, Star } from "lucide-react";

const PropertyCard = ({ property }) => {
    return (
        <div className="user-card-property group cursor-pointer">
            <div className="user-property-img-wrapper">
                <img
                    src={property.image}
                    alt={property.title}
                    className="user-property-img"
                />
                <span className="user-property-badge">Destacado</span>
                <button className="user-property-star">
                    <Star className="w-4 h-4 fill-current" />
                </button>
            </div>
            <div className="user-property-content">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="user-property-title">{property.title}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                        <Star className="w-3 h-3 fill-current" /> {property.rating}
                    </div>
                </div>
                <div className="user-property-location">
                    <MapPin className="w-3 h-3" /> {property.location}
                </div>
                <div className="flex-grow">
                    <div className="flex gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                            <span className="font-bold text-gray-900">{property.beds}</span> Hab
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="font-bold text-gray-900">{property.baths}</span> Baños
                        </span>
                    </div>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="user-property-price mb-0">{property.price}</div>
                    <div className="flex gap-2">
                        <button className="text-[#6b0000] font-bold text-sm hover:underline">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
