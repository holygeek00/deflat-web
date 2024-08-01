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
import { Slider } from '@/components/ui/slider';

const PROPERTY_TYPES = ['apartment', 'house', 'studio', 'condo', 'any'];
const AMENITIES_LIST = ['Parking', 'Gym', 'Pool', 'Balcony', 'Air Conditioning', 'Dishwasher', 'Washer/Dryer'];

const HousingRequirementsForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    preferredLocations: '',
    propertyType: 'any',
    minBedrooms: '',
    minBathrooms: '',
    minSize: '',
    maxSize: '',
    priceRange: [0, 5000],
    desiredAmenities: [],
    petsAllowed: false,
    preferFurnished: false,
    rentalType: 'any',
    utilitiesIncluded: 'any',
    moveInDateRange: {
      from: '',
      to: ''
    },
    additionalRequirements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      desiredAmenities: prev.desiredAmenities.includes(amenity)
        ? prev.desiredAmenities.filter(a => a !== amenity)
        : [...prev.desiredAmenities, amenity]
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
        <CardTitle>Housing Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="preferredLocations">Preferred Locations</Label>
            <Textarea 
              id="preferredLocations" 
              name="preferredLocations" 
              value={formData.preferredLocations} 
              onChange={handleChange} 
              placeholder="Enter one or more preferred locations"
            />
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minBedrooms">Min Bedrooms</Label>
              <Input type="number" id="minBedrooms" name="minBedrooms" value={formData.minBedrooms} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minBathrooms">Min Bathrooms</Label>
              <Input type="number" id="minBathrooms" name="minBathrooms" value={formData.minBathrooms} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minSize">Min Size (sq ft)</Label>
              <Input type="number" id="minSize" name="minSize" value={formData.minSize} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxSize">Max Size (sq ft)</Label>
              <Input type="number" id="maxSize" name="maxSize" value={formData.maxSize} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Price Range: ${formData.priceRange[0]} - ${formData.priceRange[1]}</Label>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={formData.priceRange}
              onValueChange={(value) => setFormData(prev => ({ ...prev, priceRange: value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Desired Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              {AMENITIES_LIST.map(amenity => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox 
                    id={amenity} 
                    checked={formData.desiredAmenities.includes(amenity)}
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
                id="preferFurnished"
                checked={formData.preferFurnished}
                onCheckedChange={() => handleSwitchChange('preferFurnished')}
              />
              <Label htmlFor="preferFurnished">Prefer Furnished</Label>
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
                <RadioGroupItem value="any" id="any-rental" />
                <Label htmlFor="any-rental">Any</Label>
              </div>
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
                <RadioGroupItem value="any" id="any-utilities" />
                <Label htmlFor="any-utilities">Any</Label>
              </div>
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
            <Label>Desired Move-in Date Range</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="moveInDateFrom">From</Label>
                <Input 
                  type="date" 
                  id="moveInDateFrom" 
                  name="moveInDateRange.from" 
                  value={formData.moveInDateRange.from} 
                  onChange={handleChange} 
                />
              </div>
              <div>
                <Label htmlFor="moveInDateTo">To</Label>
                <Input 
                  type="date" 
                  id="moveInDateTo" 
                  name="moveInDateRange.to" 
                  value={formData.moveInDateRange.to} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalRequirements">Additional Requirements</Label>
            <Textarea 
              id="additionalRequirements" 
              name="additionalRequirements" 
              value={formData.additionalRequirements} 
              onChange={handleChange} 
              placeholder="Any other specific requirements or preferences"
            />
          </div>

          <Button type="submit" className="w-full">Submit Requirements</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HousingRequirementsForm;