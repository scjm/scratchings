import './directory.component.scss'
import {categories} from './directory.component.data'
import CategoryItem from '../category-item/Category-item.component'

function Directory() {
  return (
        <div className="directories-container">
            { categories.map(({id, title, imageUrl})=>{
                return(
                    <CategoryItem 
                    key={id}
                    title={title}
                    imageUrl={imageUrl}
                    />
                )
            })     
        }
    </div>
  )
}

export default Directory