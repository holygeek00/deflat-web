'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const PROPERTY_TYPES = ['apartment', 'house', 'studio', 'condo'];
const AMENITIES_LIST = ['Parking', 'Gym', 'Pool', 'Balcony', 'Air Conditioning', 'Dishwasher', 'Washer/Dryer'];

const PropertyListingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    amenities: [],
    petsAllowed: false,
    furnished: false,
    rentalType: 'long-term',
    utilitiesIncluded: 'no',
    availableFrom: '',
    availableTo: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSwitchChange = (name) => {
    setFormData(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>List a New Property</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select name="propertyType" value={formData.propertyType} onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (per month)</Label>
            <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input type="number" id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input type="number" id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Size (sq ft)</Label>
            <Input type="number" id="size" name="size" value={formData.size} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              {AMENITIES_LIST.map(amenity => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox 
                    id={amenity} 
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={() => handleCheckboxChange(amenity)}
                  />
                  <Label htmlFor={amenity}>{amenity}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Switch 
                id="petsAllowed"
                checked={formData.petsAllowed}
                onCheckedChange={() => handleSwitchChange('petsAllowed')}
              />
              <Label htmlFor="petsAllowed">Pets Allowed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="furnished"
                checked={formData.furnished}
                onCheckedChange={() => handleSwitchChange('furnished')}
              />
              <Label htmlFor="furnished">Furnished</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Rental Type</Label>
            <RadioGroup 
              name="rentalType"
              value={formData.rentalType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, rentalType: value }))}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="short-term" id="short-term" />
                <Label htmlFor="short-term">Short-term</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="long-term" id="long-term" />
                <Label htmlFor="long-term">Long-term</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Utilities Included</Label>
            <RadioGroup 
              name="utilitiesIncluded"
              value={formData.utilitiesIncluded}
              onValueChange={(value) => setFormData(prev => ({ ...prev, utilitiesIncluded: value }))}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="utilities-included" />
                <Label htmlFor="utilities-included">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="utilities-not-included" />
                <Label htmlFor="utilities-not-included">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="availableFrom">Available From</Label>
            <Input type="date" id="availableFrom" name="availableFrom" value={formData.availableFrom} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availableTo">Available To (Optional)</Label>
            <Input type="date" id="availableTo" name="availableTo" value={formData.availableTo} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Upload Images</Label>
            <Input type="file" id="images" name="images" onChange={handleChange} multiple accept="image/*" />
          </div>

          <Button type="submit" className="w-full">List Property</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyListingForm;