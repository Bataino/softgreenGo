<template>
    <form class="h-100 d-flex mt-3 mt-md-5 align-items-center justify-content-center" @submit.prevent="proceedToPayment">
        <div class=" p-4 text-start rounded-20 w-100">
            <h2 class="fw-bold text-sg-secondary _text-center text-md-start d-md-none">
                Checkout
            </h2>
            <h6 class="font-1 mt-3 text-l-gray text-center mb-3 ">
                Order Summary
            </h6>
            <div class="d-flex justify-content-around w-100 p-1 small">
                <div class="text-center">
                    <div class="d-flex align-items-center justify-content-center w-100">
                        <icon icon="fluent:select-all-on-24-regular" class="text-sg-primary font-2 fs-1" />
                        <span class="text-gray fs-3 ms-1">
                            {{ Object.entries(this.$store.state.cart).length }}
                        </span>
                    </div>
                    <div class="font-1 small text-sm">
                        Selected Items
                    </div>
                </div>
                <div class="text-center">
                    <div class="d-flex align-items-center justify-content-center w-100">
                        <icon icon="iconoir:delivery-truck" class="text-sg-tertiary font-2 fs-1" />
                        <span class="text-gray fs-3 ms-1">
                            ₦{{ delivery.price }}
                        </span>
                    </div>
                    <div class="font-1 small text-sm">
                        Delivery Fee
                    </div>
                </div>
                <div class="text-center">
                    <div class="d-flex align-items-center justify-content-center w-100">
                        <icon icon="fluent:money-20-regular" class="text-sg-secondary font-2 fs-1" />
                        <span class="text-gray fs-3 ms-1">
                            ₦{{ this.$store.getters.totalPrice + this.delivery.price }}
                        </span>
                    </div>
                    <div class="font-1 small text-sm">
                        Total Fee
                    </div>
                </div>
            </div>
            <h6 class="font-1 mt-4 text-l-gray text-center mb-3">
                Delivery Details
            </h6>
            <select-button class="shadow-none w-100 fw-normal text-sm mx-auto p-2 text-center" v-model="delivery_type" :options="['delivery','pickup']"></select-button>
            <div class="row max-400 mx-auto justify-content-center mt-2" v-if="delivery_type == 'delivery'">
                <select v-model="delivery.zone" placeholder="Select"
                    class="btn _w-75 required mb-2 bg-white text-start form-control font-1 shadow-sm py-3 px-4 mx-300"
                    required>
                    <option v-for="zone in zones" :key="zone.id" :value="zone.name">{{ zone.name }}</option>
                    <option :value="''" disabled>Select delivery Zone</option>
                </select>
                <input class="btn _w-75 shadow-sm mt-2 p-3 text-start" :required="delivery_type == 'delivery' ? true : false " v-model="delivery.location"
                    placeholder="Enter Delivery Address" type="" />
            </div>
            <div class="row justify-content-center mt-2" v-else>
                <select v-model="delivery.zone" placeholder="Select"
                    class="btn _w-75 required mb-2 bg-white text-start form-control font-1 shadow-sm py-3 px-4 mx-300"
                    required>
                    <option v-for="zone in pickup" :key="zone.id" :value="zone.name">{{ zone.name }}</option>
                    <option :value="''" disabled>Select Pickup location</option>
                </select>
            </div>
            
            <div class="text-center _text-md-start pt-4">
                <span class="small font-2">
                    <v-calendar :available-dates='getNextDate' :min-Date="this.getNextDate.start" :attributes="[{
                        highlight: 'green',  // Boolean, String, Object
                        dates: this.getNextDate.start,
                        content: 'white'
                    
                    }]" class="border-0 font-2 d-none" is-expanded :nav-visibility="false">
                    </v-calendar>
                    <small class="font-2">
                        Next Delivery takes place on
                        <b  class="fs-3">
                            {{ new Date(this.getNextDate.start).toDateString() }}
                        </b>
                    </small>
                </span>
            </div>
            <div class="mt-5 mb-3 text-center">
                <button type="submit" class="btn btn-sg-primary px-3">
                    Proceed to Payment
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import { getZones } from "@/services/product"
import { getNextDate } from "@/functions/date"
import SelectButton from 'primevue/selectbutton';

// import Widget from "@/functions/widget"

export default {
    name: "CheckOut",
    components: {
        SelectButton
    },
    data() {
        return {
            delivery: {
                price: 0,
                zone: ""
            },
            zones: [],
            pickup: [],
            delivery_type:'delivery'
        }
    },
    computed: {
        getNextDate() {
            return getNextDate()
        }
    },
    methods: {
        proceedToPayment() {
            this.$store.commit('updateLocalObject', {
                name: "order",
                value: { delivery: this.delivery }
            })
            this.$router.push('/payment')
        },
    },
    watch: {
        'delivery.zone': {
            handler(zone) {
                this.delivery.price = this.$store.state.zones.filter((e) => e.name == zone)[0].price
            }
        }
    },
    created() {
        // Widget.openLoading()
        getZones()
            .then((response) => {
                this.zones = response.data.zones
                this.pickup = response.data.pickup
                // Widget.dismiss()
            })


        // Restore Previously Choosed Dates
        if (Object.keys(this.$store.getters.order) > 1) {
            const delivery = this.$store.getters.order.delivery
            this.delivery = delivery
        }
    }
}
</script>

<style scoped lang="less">
.max-400 {
    max-width:400px
}
</style>
