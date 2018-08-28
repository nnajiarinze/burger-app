import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad: 0,
            bacon : 0,
            cheese :0,
            meat : 0
        },
        totalPrice:4,
        purchasable: false,
        purchasing: false
       };

updatePurchasedState (ingredients){
  
    const sum = Object.keys(ingredients)
    .map(igKey =>{
        return ingredients[igKey];
    })
    .reduce((sum,el) => {
        return sum + el;
    },0);
    this.setState({purchasable: sum > 0});
}

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        } 

        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice,ingredients:updatedIngredients });
        
        this.updatePurchasedState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
     
        if(oldCount <=0){

            return ;
        }
            const newCount = oldCount -1;
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = newCount;
            const priceSubtraction = INGREDIENT_PRICES[type];
            const newPrice = this.state.totalPrice - priceSubtraction;
            this.setState({ingredients:updatedIngredients, totalPrice: newPrice});
        
            this.updatePurchasedState(updatedIngredients);
        
    }

    purchaseHandler = () =>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        alert('You continued');
    }
    render () {
        const disabledInfo={
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        return(
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    <OrderSummary
                    price ={this.state.totalPrice}
                    purchaseCancelled = {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler}
                     ingredients={this.state.ingredients}
                     />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                 price = {this.state.totalPrice}
                 ingredientAdded={this.addIngredientHandler}
                 ingredientRemoved={this.removeIngredientHandler}
                 purchasable = {this.state.purchasable}
                 disabledInfo = {disabledInfo}
                 ordered = {this.purchaseHandler}
                />
            </Aux>
        );
    }

}

export default BurgerBuilder;