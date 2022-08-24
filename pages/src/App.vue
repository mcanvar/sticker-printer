<script>
import JsBarcode from "jsbarcode";

export default {
  data() {
    return {
      location: 1,
      cargoCode: "7270003979000091",
      markets: [
        {name: "TRENDYOL", value: "TY"},
        {name: "HEPSIBURADA", value: "HB"},
        {name: "CICEKSEPETI", value: "CS"},
        {name: "DOLAP", value: "DLP"}
      ],
      market: "TY",
      labels: [],
      printing: false
    };
  },
  watch: {
    location() {
      this.reDrawBarcode();
    },
    labels: {
      deep: true,
      handler(newLabels) {
        browser.storage.local.set({labels: JSON.stringify(newLabels)});
      }
    },
    cargoCode() {
      this.reDrawBarcode();
    }
  },
  computed: {
    appClasses() {
      return {
        "mx-auto": !this.printing,
        "p-4": !this.printing,
        "bg-gray-100": !this.printing,
        grid: !this.printing,
        "grid-cols-1": !this.printing,
        "gap-6": !this.printing
      };
    },
    printAreaClasses() {
      return {
        grid: !this.printing,
        container: !this.printing,
        "justify-items-center": !this.printing
      };
    }
  },
  methods: {
    reset() {
      if (confirm("Saved state of the paper will be deleted!")) {
        this.labels = new Array(44).fill({printed: false});

        this.locateToTheLast();
      }
    },
    print() {
      this.printing = true;

      setTimeout(() => {
        window.print();

        this.labels[(this.location - 1)].printed = true;

        this.locateToTheLast();
      }, 500);
    },
    selectLocation(number) {
      if (this.printing) {
        this.printing = false;

        if (this.location) this.location--;

        return;
      }

      this.location = number;
      this.reDrawBarcode();
    },
    locateToTheLast() {
      setTimeout(() => {
        for (let i = 43; i >= 0; i--) {
          if (this.labels[i] && !this.labels[i].printed) {
            this.location = i + 1;
            break;
          }
        }
      }, 500);
    },
    reDrawBarcode() {
      setTimeout(() => JsBarcode(".barcode").init(), 300);
    }
  },
  async created() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop)
    });

    if (params.cargoCode) this.cargoCode = params.cargoCode;

    const {labels} = await browser.storage.local.get({
      labels: JSON.stringify(new Array(44).fill({printed: false}))
    });

    this.labels = JSON.parse(labels);
  },
  mounted() {
    this.locateToTheLast();

    this.reDrawBarcode();

    window.addEventListener("afterprint", (event) => {
      this.printing = false;

      setTimeout(function () {
        window.close();
      }, 800);
    });
  }
}
</script>

<template>
  <div class="container" :class="appClasses">
    <div class="grid grid-cols-2 grid-rows-2 gap-4 mx-auto" v-if="!printing" style="width: 210mm;">
      <input class="p-2" v-model="cargoCode" type="text">
      <select v-model="market" class="">
        <option v-for="option in markets" :value="option.value">
          {{ option.name }}
        </option>
      </select>
      <button @click="print" class="bg-yellow-400 p-2 text-gray-700 font-bold">Print</button>
      <button @click="reset" class="bg-red-400 p-2 text-gray-700 font-bold">Reset</button>
    </div>
    <div :class="printAreaClasses">
      <div ref="printArea" class="bg-white grid grid-cols-4 gap-0"
           style="width: 210mm; height: 297mm; padding: 8.8mm 8mm">
        <button :disabled="label.printed" @click="selectLocation(index + 1)" v-for="(label, index) in labels"
                style="width: 48.5mm; height: 25.4mm;"
                class="text-center flex items-center justify-center box-border overflow-hidden"
                :class="{'border-2 border-yellow-400': index + 1 === location && !printing, 'bg-gray-200': !printing, 'cursor-not-allowed': label.printed}">
          <div v-if="index + 1 === location && !label.printed"
               class="text-black text-md font-bold p-1 grid grid-cols-1">
            {{ markets.filter(m => m.value === market)[0].name }}
            <img :jsbarcode-value="cargoCode" :jsbarcode-height="50" class="barcode" alt="loading"/>
          </div>
          <h1 v-else class="text-white text-5xl" :class="{'text-red-300': label.printed}">
            {{ printing ? '' : label.printed ? 'X' : index + 1 }}
          </h1>
        </button>
      </div>
    </div>
  </div>
</template>
