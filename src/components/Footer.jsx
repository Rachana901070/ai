import React from 'react';
import s from './Footer.module.css';

export default function Footer(){
  return <footer className={`footer`}><div className="container"><div className={s.foot}>© {new Date().getFullYear()} Maitri Dhatri</div></div></footer>;
}
