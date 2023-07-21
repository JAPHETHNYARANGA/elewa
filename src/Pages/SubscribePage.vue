<template>
    <div class="container">

        <div class="card shadow-lg p-3 mb-5 bg-white rounded border-0">
            <div v-if="!paid" id="paypal-button-container"></div>
            <div v-else id="confirmation">Order complete!</div>
        </div>

    </div>
</template>
  
   
   
<script>
import { loadScript } from '@paypal/paypal-js';

export default {
    name: 'Checkout-Payment',
    beforeCreate: function () {
        loadScript({ 'client-id': CLIENT_ID }).then((paypal) => {
            paypal
                .Buttons({
                    createOrder: this.createOrder,
                    onApprove: this.onApprove,
                })
                .render('#paypal-button-container');
        });
    },
    data() {
        return {
            paid: false,
        };
    },
    props: {
        cartTotal: {
            type: Number,
            default: 0.01,
        },
    },
    methods: {
        createOrder: function (data, actions) {
            console.log('Creating order...');
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: this.cartTotal,
                        },
                    },
                ],
            });
        },
        onApprove: function (data, actions) {
            console.log('Order approved...');
            return actions.order.capture().then(() => {
                this.paid = true;
                console.log('Order complete!');
            });
        },
    },
};
const CLIENT_ID = 'test';
</script>
  

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* This will make the container occupy the full viewport height */
}

.center-content {
  max-width: 50%;
}

.card {
  /* Add padding and other styles for the card */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 50%;
  text-align: center;
}

#paypal-button-container {
  margin: 30px 0;
}

#confirmation {
  color: green;
  margin-top: 1em;
  font-size: 2em;
}
</style>
  