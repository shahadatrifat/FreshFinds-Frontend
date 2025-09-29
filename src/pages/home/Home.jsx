import React from 'react';
import EditProduct from '../Vendor/Editproduct/EditProduct';
import Hero from '../../components/Home/Hero';
import Newsletter from '../../components/Home/NewsLetter';
import Carousel from '../../components/Home/Carousel';
import CategoryGrid from '../../components/Home/CategoryGrid';
import FeaturedGrid from '../../components/Home/FeaturedGrid';
import AdBanner from '../../components/Home/AdBanner';

const Home = () => {
    return (
        <div className="bg-offwhite min-h-screen">
      <Hero />
      <main className="container mx-auto px-4 md:px-6 space-y-16">
        <CategoryGrid />
        <AdBanner></AdBanner>
        <FeaturedGrid />
        <Newsletter />
      </main>
    </div>
    );
};

export default Home;