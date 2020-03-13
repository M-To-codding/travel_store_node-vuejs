<template>
  <div class="flex justify-center mt-32"
       style="padding-top: 50px;">

    <div id="app" v-cloak>

      <div class="uk-align-center uk-margin-top uk-width-large uk-background-muted uk-box-shadow-large">
        <form class="uk-padding">

          <h1 class="title">Invoice</h1>

          <div class="uk-margin uk-text-center">
            <p class="stripeError" v-if="stripeError">
              {{stripeError}}
            </p>
          </div>


          <div class="uk-margin uk-text-left">
            <label class="uk-form-label" for="card-number">
              Card Number
            </label>
            <div class="uk-form-controls">
              <div id="card-number" class="uk-input" :class="{ 'uk-form-danger': cardNumberError }"></div>
              <span class="help-block" v-if="cardNumberError">
                                {{cardNumberError}}
                            </span>
            </div>
          </div>

          <div class="uk-grid-small uk-text-left" uk-grid>
            <div class="uk-width-1-2@s">
              <label class="uk-form-label" for="card-cvc">
                Card CVC
              </label>
              <div class="uk-form-controls">
                <div id="card-cvc" class="uk-input" :class="{ 'uk-form-danger': cardCvcError }"></div>
                <span class="help-block" v-if="cardCvcError">
                                    {{cardCvcError}}
                                </span>
              </div>
            </div>
            <div class="uk-width-1-2@s">
              <label class="uk-form-label" for="card-expiry">
                Expiry
              </label>
              <div class="uk-form-controls">
                <div id="card-expiry" class="uk-input" :class="{ 'uk-form-danger': cardExpiryError }"></div>
                <span class="help-block" v-if="cardExpiryError">
                                    {{cardExpiryError}}
                                </span>
              </div>
            </div>
          </div>

          <div class="uk-margin uk-margin-remove-bottom uk-text-center">
            <button class="uk-button uk-button-small uk-button-primary" @click.prevent="submitFormToCreateToken()">
              Donate $1200
            </button>
          </div>

        </form>
      </div>

    </div>

  </div>
</template>

<script>


  export default {
    name: "InvoiceTest",

    data() {
      return {
        card: {
          cvc: '',
          number: '',
          expiry: ''
        },

        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        stripe: null,

        // errors
        stripeError: '',
        cardCvcError: '',
        cardExpiryError: '',
        cardNumberError: '',

        loading: false,
      };
    },

    mounted() {
      this.setupStripe();
    },

    methods: {
      setupStripe() {
        if (window.Stripe === undefined) {
          alert('Stripe V3 library not loaded!');
        } else {
          const stripe = window.Stripe('pk_test_Cys2PCVq1RS5dC1Isn5Vd5u500SgVAtqpe');
          this.stripe = stripe;

          const elements = stripe.elements();
          this.cardCvc = elements.create('cardCvc');
          this.cardExpiry = elements.create('cardExpiry');
          this.cardNumber = elements.create('cardNumber');

          this.cardCvc.mount('#card-cvc');
          this.cardExpiry.mount('#card-expiry');
          this.cardNumber.mount('#card-number');

          this.listenForErrors();
        }
      },

      toggleError (event) {
        if (event.error) {
          this.stripeError = event.error.message;
        } else {
          this.stripeError = '';
        }
      },

      listenForErrors() {
        const vm = this;

        this.cardNumber.addEventListener('change', (event) => {
          vm.toggleError(event);
          vm.cardNumberError = '';
          vm.card.number = event.complete ? true : false;
        });

        this.cardExpiry.addEventListener('change', (event) => {
          vm.toggleError(event);
          vm.cardExpiryError = '';
          vm.card.expiry = event.complete ? true : false;
        });

        this.cardCvc.addEventListener('change', (event) => {
          vm.toggleError(event);
          vm.cardCvcError = '';
          vm.card.cvc = event.complete ? true : false;
        });
      },

      submitFormToCreateToken() {
        this.clearCardErrors();
        let valid = true;

        if (!this.card.number) {
          valid = false;
          this.cardNumberError = "Card Number is Required";
        }
        if (!this.card.cvc) {
          valid = false;
          this.cardCvcError = "CVC is Required";
        }
        if (!this.card.expiry) {
          valid = false;
          this.cardExpiryError = "Month is Required";
        }
        if (this.stripeError) {
          valid = false;
        }
        if (valid) {
          this.createToken()
        }
      },

      createToken() {
        this.stripe.createToken(this.cardNumber).then((result) => {
          if (result.error) {
            this.stripeError = result.error.message;
          } else {
            const token = result.token.id;
            alert('Thanks for donating.');
            console.log('token', result.token);

            this.reset();
          }
        })
      },

      clearElementsInputs() {
        this.cardCvc.clear();
        this.cardExpiry.clear();
        this.cardNumber.clear();
      },

      clearCardErrors() {
        this.stripeError = '';
        this.cardCvcError = '';
        this.cardExpiryError = '';
        this.cardNumberError = '';
      },

      reset() {
        this.clearElementsInputs();
        this.clearCardErrors();
      }
    },


  }
</script>

<style scoped>
  .title {
    padding: 30px;
  }

  [v-cloak] {
    display: none;
  }

  .help-block {
    color: red;
    font-size: 13px;
  }

  .uk-background-muted {
    background: none;
  }

  form {
    border-width: 2px;
  }

  label.uk-form-label {
    color: white;
  }

  button.uk-button-primary {
    color: #263238;
    font-weight: bold;
    background-color: white;
    padding: 10px;
    border-radius: 4px;
  }

  #card-number,
  #card-cvc,
  #card-expiry {
    padding-top: 10px;
  }

  .stripeError {
    color: red;
    font-style: italic;
  }
</style>