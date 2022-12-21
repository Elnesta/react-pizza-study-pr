import React from 'react';

import styles from './NotFound.module.scss';

const NotFoundBlock = () => {
  return (
    <div className = {styles.root}>
      <span>:(</span>
      <br></br>
      <h1>Ничего не найдено</h1>
      <p className = {styles.description}>К сожалению, данная страница отсутствует в нашем интернет-магазине</p>
    </div>
  )
}

export default NotFoundBlock