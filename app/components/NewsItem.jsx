import Image from 'next/image'
import styles from '../styles/newsitem.module.css'
import React from 'react'
import noimagefound from '../../public/noimage.jpg'
const NewsItem = ({title,url}) => {
   
  return (
    <div className={styles.card}>
      {url&& <Image src={noimagefound} alt='no-image' width={200} height={200}/>}
         <h5 className={styles.h5}>{title}</h5> 
    </div>
  )
}

export default NewsItem