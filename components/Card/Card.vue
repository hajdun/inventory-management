<script lang="ts">

const getUtcTimestamp = () => {
    return Math.floor(Date.now())
}

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}



export default {
    props: ['item'],
    methods: {
        formatDate: function (lastUpdated: string) {
            const date = new Date(parseInt(lastUpdated))
            const yearMOnthDay = [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate())
            ].join('/');

            const hourMinute = [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes())
            ].join(':');

            return `${yearMOnthDay} ${hourMinute}`
        },

        decreaseQuantity: function (item) {
            const MIN_QUANTITY = 0
            const newQty = item.quantity - 1 > MIN_QUANTITY ? item.quantity - 1 : MIN_QUANTITY
            if (newQty === item.quantity) {
                return
            }
            item.quantity = newQty
            item.lastUpdated = getUtcTimestamp()
            fetch(`/api/inventory/${item.id}`, {
                method: 'PUT',
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(res => res.json()
            ).then(json => {
                if (json.status !== "200" && !json.success) {
                    alert("Something bad happened " + json.statusMessage)
                }
            }).catch(err => {
                alert("Something bad happened " + err)
            })
        },
        increaseQuantity: function (item) {
            item.quantity += 1
            item.lastUpdated = getUtcTimestamp()
            fetch(`/api/inventory/${item.id}`, {
                method: 'PUT',
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(res => res.json()
            ).then(json => {
                if (json.status !== "200" && !json.success) {
                    alert("Something bad happened " + json.statusMessage)
                }
            }).catch(err => {
                alert("Something bad happened " + err)
            })
        },
        changeQuantityInput: function (event, item) {
            item.quantity = event.target.value
            item.lastUpdated = getUtcTimestamp()
            fetch(`/api/inventory/${item.id}`, {
                method: 'PUT',
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(res => res.json()
            ).then(json => {
                if (json.status !== "200" && !json.success) {
                    alert("Something bad happened " + json.statusMessage)
                }
            }).catch(err => {
                alert("Something bad happened " + err)
            })
        },
    }
}
</script>

<template>
    <div class="card justify-space-between flex flex-col space-y-4">
        <div height="300" width="220" class="justify-center flex align-center">
            <img :src="item.image_url" alt="product image" />
        </div>
        <div class="item-name">
            {{ item.name }}
        </div>
        <div class="available-quantity">
            <button class="available-quantity-stepper" aria-label="decrease quantity by one" title="decrease quantity"
                @click="decreaseQuantity(item)">
                - </button>
            <input class="available-quantity-input" type="number" :value=item.quantity
                @change="changeQuantityInput($event, item)" min="1" title="input quantity" />
            <button class="available-quantity-stepper" aria-label="increase quantity by one" title="increase quantity"
                @click="increaseQuantity(item)">
                + </button>
            <div>
                available
            </div>
        </div>

        <div>
            Last update: {{ formatDate(item.lastUpdated) }}
        </div>
    </div>
</template>


<style>
.card {
    height: 300px;
    background-color: rgb(247, 239, 229);
    padding: 12px;
    border-radius: 5%;
}

.card:hover {
    background-color: rgb(243, 232, 217);
    filter: drop-shadow(10px 10px 4px rgb(243, 196, 134));
    cursor: pointer;
}

.item-name {
    font-size: 20px;
}

.available-quantity {
    font-weight: bold;
}

.available-quantity-input {
    width: 50px;
    text-align: center;
    padding-left: 3px;
}

.available-quantity-stepper {
    width: 50px;
    border: 1px solid rgb(243, 196, 134);
    border-radius: 5%;
    background-color: rgb(243, 196, 134);
}

.available-quantity-stepper:hover {
    background-color: rgb(248, 168, 62);
}
</style>