import React from 'react';
import AppLayout from '../components/layouts/AppLayout';
import { NextPageWithLayout } from 'next';

interface HelloWorldProps {
  title: string;
}

const HelloWorld: NextPageWithLayout<HelloWorldProps> = ({ title }) => {
  return <div>{title}</div>;
};

HelloWorld.layout = AppLayout;

export default HelloWorld;
