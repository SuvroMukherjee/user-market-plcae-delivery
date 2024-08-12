import React from 'react';
import { HomeGrownProducts } from './HomeComponents/HomeGrownProducts';
import { MainHomeView } from './HomeComponents/MainHomeView';
import HomeTopCategory from './HomeComponents/HomeTopCategory';
import HomeUpComing from './HomeComponents/HomeUpComing';
import HomePopularProducts from './HomeComponents/HomePopularProducts';
import { HomeBrands } from './HomeComponents/HomeBrands';

const HomePage = () => {
  return (
    <div className="page-content mb-4">
      <MainHomeView/>
      <HomeGrownProducts/>
      <HomeTopCategory/>
      <HomeUpComing/>
      <HomePopularProducts/>
      <HomeBrands/>
    </div>
  );
}

export default HomePage