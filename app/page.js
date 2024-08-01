'use client'
import React, { useState } from 'react';
import { Search, MapPin, Home, UserPlus, Mail } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
const HomePage = () => {
  const [listings, setListings] = useState([
    { id: 1, title: 'Cozy Studio Apartment', location: 'Downtown', price: '$1200/month' },
    { id: 2, title: 'Spacious 2BR House', location: 'Suburbs', price: '$1800/month' },
    { id: 3, title: 'Modern 1BR Loft', location: 'City Center', price: '$1500/month' },
  ]);

  return (
    <div className="container mx-auto p-4">
       <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">FindYourHome</h1>
        <nav>
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </nav>
      </header>

      <main>
        <section className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Input placeholder="Enter location" className="flex-grow" />
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
                <Button><Search className="mr-2 h-4 w-4" /> Search</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((listing) => (
              <Card key={listing.id}>
                <CardHeader>
                  <CardTitle>{listing.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><MapPin className="inline mr-2" />{listing.location}</p>
                  <p className="font-bold mt-2">{listing.price}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Post or Find a Home</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button><Home className="mr-2" /> Post a Listing</Button>
              <Button variant="outline"><UserPlus className="mr-2" /> Find a Home</Button>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Need a Custom Search?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Contact us for personalized assistance in finding your perfect home.</p>
              <Button className="mt-4"><Mail className="mr-2" /> Contact Us</Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="mt-8 text-center text-gray-500">
        <p>&copy; 2024 FindYourHome. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;