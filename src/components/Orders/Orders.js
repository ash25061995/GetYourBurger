import React from 'react';
import classes from './Orders.css'
const Orders = props => {

    return (

        <div className={classes.Orders}>
            <table >
                <tbody>
                    <tr>
                        <td>
                            <p >Customer Name: </p>
                        </td>
                        <td>
                            <p><strong style={{ textTransform: "capitalize" }}>{props.name}</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Customer Email: </p>
                        </td>
                        <td>
                            <p><strong>{props.email}</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Customer Address: </p>
                        </td>
                        <td>
                            <p><strong>{props.street},{props.zip},{props.country}</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Ingredients: </p>
                        </td>
                        <td>
                            {
                                Object.keys(props.ingredients).map((ig) => {
                                    return (
                                        <strong key={ig}><li  style={ingredientStyle}>{ig}({props.ingredients[ig]})</li></strong>
                                    );
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Delivery Method: </p>
                        </td>
                        <td>
                            <p><strong>{props.delivery}</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Total Price:</p>
                        </td>
                        <td>
                            <p><strong>{props.price}</strong></p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
const ingredientStyle = {
    textTransform: 'capitalize',
    display: 'inline-block',
    margin: '0 8px',
    border: '1px solid #ccc',
    padding: '5px'

}

export default Orders;