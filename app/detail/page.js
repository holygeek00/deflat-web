'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, BedDouble, Bath, Square, CalendarDays } from 'lucide-react';

const ListingDetailsPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const listing = {
    id: 1,
    title: "Spacious 2-Bedroom Apartment in Kreuzberg",
    price: 1200,
    location: "Kreuzberg, Berlin",
    bedrooms: 2,
    bathrooms: 1,
    size: 75, // in square meters
    availableFrom: "2024-09-01",
    description: "A beautiful and spacious apartment in the heart of Kreuzberg. Recently renovated with modern amenities and a balcony overlooking a quiet courtyard. Close to public transportation and local attractions.",
    features: [
      "Balcony", "Furnished", "Pet-friendly", "Dishwasher", "Washing Machine", 
      "High-speed Internet", "TV", "Parking", "Air Conditioning", "Heating",
      "Garden Access", "Coffee Machine", "Gym Access", "Security System",
      "Dryer", "Bike Storage", "Child-friendly", "Elevator", "Gas Stove",
      "Electricity Included", "Minimalist Design", "Spacious", "Water Included",
      "Smart Home Features", "Piano", "Rain Shower", "Security Cameras",
      "Hardwood Floors", "Energy-efficient Appliances", "Ceiling Fan",
      "Cable TV", "Waste Disposal", "Fenced Property", "Storage Unit",
      "Intercom", "Window Coverings", "Medical Facilities Nearby",
      "Recently Renovated", "Allows Cats", "Allows Dogs"
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
      <p className="text-xl text-gray-600 mb-6">{listing.location}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <div className="relative h-96 mb-4">
            <img 
              src={listing.images[currentImageIndex]} 
              alt={`${listing.title} - Image ${currentImageIndex + 1}`} 
              className="w-full h-full object-cover rounded-lg"
            />
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {listing.images.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`${listing.title} - Thumbnail ${index + 1}`} 
                className={`w-full h-24 object-cover rounded-lg cursor-pointer ${index === currentImageIndex ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <p className="text-3xl font-bold mb-4">€{listing.price} <span className="text-lg font-normal text-gray-600">/month</span></p>
            <div className="space-y-4 mb-6">
              <p className="flex items-center"><BedDouble className="mr-2 h-5 w-5" /> {listing.bedrooms} Bedrooms</p>
              <p className="flex items-center"><Bath className="mr-2 h-5 w-5" /> {listing.bathrooms} Bathrooms</p>
              <p className="flex items-center"><Square className="mr-2 h-5 w-5" /> {listing.size} m²</p>
              <p className="flex items-center"><CalendarDays className="mr-2 h-5 w-5" /> Available from {listing.availableFrom}</p>
            </div>
            <Button className="w-full mb-4">Contact Landlord</Button>
            <Button variant="outline" className="w-full">Save Listing</Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="description" className="mb-8">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4">
          <p className="text-gray-700">{listing.description}</p>
        </TabsContent>
        <TabsContent value="features" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {listing.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {feature}
              </Badge>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="location" className="mt-4">
          <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
            <p className="text-gray-600">Map placeholder - Integration with map service required</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button variant="outline">Back to Search Results</Button>
      </div>
    </div>
  );
}

export default ListingDetailsPage;