import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_,i) =>{
             return <BurgerIngredient key={ingKey+1}  type={ingKey} />
        });
    });

    return (
        <div className={classes.Burger}>
        
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
            

        </div>
    );
};


export default burger;