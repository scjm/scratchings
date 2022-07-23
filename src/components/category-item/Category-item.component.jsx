import React, {useEffect, useState} from 'react'

import './Category-item.component.scss'

function CategoryItem({imageUrl, title}) {
  
  return (
        <div className="category-container">
        <div className="background-image" style={{
          backgroundImage: `url(${imageUrl})`}}/>
        <div className="category-body-container">
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>
    </div>
  )
}

export default CategoryItem