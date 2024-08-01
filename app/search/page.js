import React, { useState, useCallback } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const INITIAL_BASIC_CRITERIA = {
  location: '',
  propertyType: '',
};

const INITIAL_ADVANCED_CRITERIA = {
  bedrooms: '',
  bathrooms: '',
  minSize: '',
  maxSize: '',
  amenities: [],
  petsAllowed: false,
  furnished: false,
  rentalType: 'any', // 'short-term', 'long-term', or 'any'
  utilitiesIncluded: 'any', // 'yes', 'no', or 'any'
};

const PROPERTY_TYPES = ['apartment', 'house', 'studio', 'condo'];
const AMENITIES_LIST = ['Parking', 'Gym', 'Pool', 'Balcony', 'Air Conditioning', 'Dishwasher', 'Washer/Dryer'];

const AdvancedSearchComponent = ({ onSearch }) => {
  const [basicCriteria, setBasicCriteria] = useState(INITIAL_BASIC_CRITERIA);
  const [advancedCriteria, setAdvancedCriteria] = useState(INITIAL_ADVANCED_CRITERIA);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const handleBasicChange = useCallback((e) => {
    const { name, value } = e.target;
    setBasicCriteria(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleAdvancedChange = useCallback((e) => {
    const { name, value } = e.target;
    setAdvancedCriteria(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleAmenityToggle = useCallback((amenity) => {
    setAdvancedCriteria(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  }, []);

  const handleSearch = useCallback(() => {
    onSearch({ ...basicCriteria, ...advancedCriteria, priceRange });
  }, [basicCriteria, advancedCriteria, priceRange, onSearch]);

  const toggleAdvanced = useCallback(() => setShowAdvanced(prev => !prev), []);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Input 
            name="location"
            placeholder="Enter location" 
            value={basicCriteria.location}
            onChange={handleBasicChange}
          />
          <Select 
            name="propertyType" 
            value={basicCriteria.propertyType} 
            onValueChange={(value) => setBasicCriteria(prev => ({ ...prev, propertyType: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Property type" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map(type => (
                <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>
            <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
            />
          </div>
          <Button onClick={toggleAdvanced}>
            {showAdvanced ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
          </Button>
          
          {showAdvanced && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  name="bedrooms"
                  type="number" 
                  placeholder="Min Bedrooms" 
                  value={advancedCriteria.bedrooms}
                  onChange={handleAdvancedChange}
                />
                <Input 
                  name="bathrooms"
                  type="number" 
                  placeholder="Min Bathrooms" 
                  value={advancedCriteria.bathrooms}
                  onChange={handleAdvancedChange}
                />
                <Input 
                  name="minSize"
                  type="number" 
                  placeholder="Min Size (sqft)" 
                  value={advancedCriteria.minSize}
                  onChange={handleAdvancedChange}
                />
                <Input 
                  name="maxSize"
                  type="number" 
                  placeholder="Max Size (sqft)" 
                  value={advancedCriteria.maxSize}
                  onChange={handleAdvancedChange}
                />
              </div>
              <div>
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {AMENITIES_LIST.map(amenity => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox 
                        id={amenity} 
                        checked={advancedCriteria.amenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityToggle(amenity)}
                      />
                      <Label htmlFor={amenity}>{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Rental Type</Label>
                  <RadioGroup 
                    name="rentalType"
                    value={advancedCriteria.rentalType}
                    onValueChange={(value) => setAdvancedCriteria(prev => ({ ...prev, rentalType: value }))}
                    className="flex space-x-4 mt-2"
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
                <div>
                  <Label>Utilities Included (Water, Electricity, Heating)</Label>
                  <RadioGroup 
                    name="utilitiesIncluded"
                    value={advancedCriteria.utilitiesIncluded}
                    onValueChange={(value) => setAdvancedCriteria(prev => ({ ...prev, utilitiesIncluded: value }))}
                    className="flex space-x-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any-utilities" />
                      <Label htmlFor="any-utilities">Any</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="utilities-included" />
                      <Label htmlFor="utilities-included">Included</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="utilities-not-included" />
                      <Label htmlFor="utilities-not-included">Not Included</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="petsAllowed"
                    checked={advancedCriteria.petsAllowed}
                    onCheckedChange={(checked) => setAdvancedCriteria(prev => ({ ...prev, petsAllowed: checked }))}
                  />
                  <Label htmlFor="petsAllowed">Pets Allowed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="furnished"
                    checked={advancedCriteria.furnished}
                    onCheckedChange={(checked) => setAdvancedCriteria(prev => ({ ...prev, furnished: checked }))}
                  />
                  <Label htmlFor="furnished">Furnished</Label>
                </div>
              </div>
            </div>
          )}
          
          <Button onClick={handleSearch} className="w-full">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearchComponent;