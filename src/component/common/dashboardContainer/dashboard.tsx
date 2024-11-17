'use client';
import MainDashboard from '@/component/dashbaord/index';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Button from '../button';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogOut = () => {
    if (typeof window === 'undefined') {
      return null;
    }

    localStorage.removeItem('token');
    window?.location.reload();
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className='flex h-screen relative'>
      {/* Toggle Button at the Top */}
      <button
        onClick={toggleSidebar}
        className='fixed top-3 right-4 p-1 text-green rounded-md z-30 md:hidden'
      >
        ☰ {/* Icon for the menu */}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-20 w-[50%] md:w-[17%] bg-[#EBEEF1] text-[#4C3B4D] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:flex-shrink-0`}
      >
        <div className='p-4'>
          <h2 className='text-xl font-bold text-[green]'>e-Recharge</h2>
          {/* <h3>{user} <h3> */}
          <ul className='mt-4 space-y-2'>
            <li>
              <Link href='#home' className='block p-2' onClick={closeSidebar}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href='/airtime'
                className='block p-2'
                onClick={closeSidebar}
              >
                Buy Airtime
              </Link>
            </li>
            <li>
              <Link
                href='/buy-data'
                className='block p-2'
                onClick={closeSidebar}
              >
                Buy Data
              </Link>
            </li>
            <li>
              <Link
                href='/buy-electricity'
                className='block p-2'
                onClick={closeSidebar}
              >
                Electricity
              </Link>
            </li>
            <li>
              <Link
                href='#contact'
                className='block p-2'
                onClick={closeSidebar}
              >
                Cable Tv
              </Link>
            </li>
            <Button
              title={'LogOut'}
              className={'w-full bg-[#c4472b]'}
              type={'button'}
              onClick={handleLogOut}
            />
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-4 px-4 md:px-10'>
        <MainDashboard />
      </div>
    </div>
  );
};

export default Sidebar;
