<template lang="pug">
div.w-64.ml-3
    div#display-box(class="bg-white h-11 flex justify-between items-center cursor-pointer text-sm 2xl:text-base border-[1px] border-blue-600 rounded text-blue-600" @click="toggleCalendar" title="Start Date - End Date; format: YYYY-MM-DD") 
        span(class="p-2") {{ defaultStartDate }} - {{ defaultEndDate }}
        div(class="p-2")
            svg(class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true", xmlns="http://www.w3.org/2000/svg", fill="currentColor", viewBox="0 0 20 20")
                path(d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z") 
    div(class="bg-white absolute py-1 mt-0.5 rounded flex justify-between max-h-[90vh] overflow-y-auto border-[1px] border-blue-600 z-10" v-show="isCalendarOpen")
        div#sidebar(class="flex flex-col max-h-[70vh] overflow-y-auto scroll__menu")
            div(class="p-2 text-blue-600 hover:bg-blue-600 cursor-pointer border-b-2 border-b-gray-300" @click="handleDefaultDate('Custom')") Custom
            div#ranges(class="border-b-2 border-b-gray-300") 
                div(class="text-blue-600 hover:bg-blue-600 cursor-pointer" v-for="range,rangeName of defaultRanges" :key="rangeName")
                    div.flex.justify-between.items-center.gap-2.p-2(@click="handleDefaultDate(rangeName)")
                        div(v-if="Array.isArray(range)") {{ rangeName }}
                        div.w-full(v-else)
                            div.flex.gap-2.justify-between.w-full
                                div.flex.gap-2
                                    div {{ rangeName }}
                                    div ({{ range.selected }})
                                
                                span >
                            //- div(v-for="subRange, subRangeName of range" :key="subRangeName" v-if="typeof(subRange) === 'object'" @click="range.selected = subRangeName")
                            //-     div.p-2 {{ subRangeName }}
            div#comp-section
                div#comp-toggle.flex.justify-between.p-2
                    label(for="compToggle" class="text-blue-600 font-semibold") Compare
                    label.relative.inline-flex.items-center.mr-1.cursor-pointer
                        input(id="compToggle" type="checkbox" :value="compToggle" class="sr-only peer" v-model="compToggle")
                        div(class="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600")
                div#comp-ranges(v-show="compToggle")
                    div.text-blue-600
                        div(class="hover:bg-blue-600 cursor-pointer p-2") Previous Year 
                        div(class="hover:bg-blue-600 cursor-pointer p-2") Previous Period 
                        div(class="hover:bg-blue-600 cursor-pointer p-2") Custom
        div#calendar(class="border-[1px] border-l-blue-600 px-4 border-y-0")
            div(date-rangepicker, id="default-date-range" class="flex items-center mt-4")
                div
                    label(class="absolute top-2.5 z-[60] bg-white px-1 ml-4 text-gray-700 text-sm") Start Date
                    div.relative(class="border-[1px] border-blue-600 focus:border-blue-600 rounded-lg")
                        
                        div.absolute.inset-y-0.start-0.flex.items-center.ps-3.pointer-events-none
                            svg(class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true", xmlns="http://www.w3.org/2000/svg", fill="currentColor", viewBox="0 0 20 20")
                                path(d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z")
                        input(name="start", type="text", class="w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600", placeholder="Select start date" v-model="defaultStartDate" :disabled="selectedDefault !== 'Custom'")
                span.mx-4.text-gray-500 -
                div
                    label(class="absolute top-2.5 z-[60] bg-white px-1 ml-4 text-gray-700 text-sm") End Date
                    div.relative(class="border-[1px] border-blue-600 focus:border-blue-600 rounded-lg")
                        div.absolute.inset-y-0.start-0.flex.items-center.ps-3.pointer-events-none
                            svg(class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true", xmlns="http://www.w3.org/2000/svg", fill="currentColor", viewBox="0 0 20 20")
                                path(d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z")
                        input(name="end", type="text", class="w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600", placeholder="Select end date" v-model="defaultEndDate" :disabled="selectedDefault !== 'Custom'")
            div(v-show="compToggle")
                div(class="text-blue-600 text-base py-3") Compare With
                div(date-rangepicker, id="compare-date-range" class="flex items-center mt-2")
                    div
                        label(class="absolute top-[6.7rem] z-[60] bg-white px-1 ml-4 text-gray-700 text-sm") Start Date
                        div.relative(class="border-[1px] border-blue-600 focus:border-blue-600 rounded-lg")
                            
                            div.absolute.inset-y-0.start-0.flex.items-center.ps-3.pointer-events-none
                                svg(class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true", xmlns="http://www.w3.org/2000/svg", fill="currentColor", viewBox="0 0 20 20")
                                    path(d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z")
                            input(name="start", type="text", class="w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600", placeholder="Select start date" v-model="compStartDate")
                    span.mx-4.text-gray-500 -
                    div
                        label(class="absolute top-[6.7rem] z-[60] bg-white px-1 ml-4 text-gray-700 text-sm") End Date
                        div.relative(class="border-[1px] border-blue-600 focus:border-blue-600 rounded-lg")
                            div.absolute.inset-y-0.start-0.flex.items-center.ps-3.pointer-events-none
                                svg(class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true", xmlns="http://www.w3.org/2000/svg", fill="currentColor", viewBox="0 0 20 20")
                                    path(d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z")
                            input(name="end", type="text", class="w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600", placeholder="Select end date" v-model="compEndDate")


</template>
<script>
import moment from "moment";
import DateRangePicker from 'flowbite-datepicker/DateRangePicker';
export default {
    name: "DatePicker",
    components: {
        DateRangePicker
    },
    data() {
        return {
            selectedDefault: null,
            defaultStartDate: moment().subtract(1, 'month').format("YYYY-MM-DD"),
            defaultEndDate: moment().format("YYYY-MM-DD"),
            compStartDate: moment().subtract(2, 'months').format("YYYY-MM-DD"),
            compEndDate: moment().subtract(1, 'month').format("YYYY-MM-DD"),
            compToggle: false,
            defaultRanges: {
                "Yesterday": [
                    moment().subtract(1, "day").format("YYYY-MM-DD"),
                    moment().subtract(1, "day").format("YYYY-MM-DD"),
                ],
                "This Week": {
                    "Sun - Today": [
                        moment().startOf("week").format("YYYY-MM-DD"),
                        moment().format("YYYY-MM-DD"),
                    ],
                    "Mon - Today": [
                        moment().startOf("week").add(1, "day").format("YYYY-MM-DD"),
                        moment().format("YYYY-MM-DD"),
                    ],
                    selected: "Sun - Today",
                    show: false
                },
                "Last 7 Days": [
                    moment().subtract(7, "days").format("YYYY-MM-DD"),
                    moment().format("YYYY-MM-DD"),
                ],
                "Last Week": {
                    hasOption: true,
                    "Sun - Sat": [
                        moment().subtract(1, "week").startOf("week").format("YYYY-MM-DD"),
                        moment().subtract(1, "week").endOf("week").format("YYYY-MM-DD"),
                    ],
                    "Mon - Sun": [
                        moment().subtract(1, "week").startOf("week").add(1, "day").format("YYYY-MM-DD"),
                        moment().subtract(1, "week").endOf("week").add(1, "day").format("YYYY/MM/DD"),
                    ],
                    selected: "Sun - Sat",
                    show: false
                },
                "Last 14 Days": [
                    moment().subtract(14, "days").format("YYYY-MM-DD"),
                    moment().format("YYYY-MM-DD"),
                ],
                "This Month": [
                    moment().startOf("month").format("YYYY-MM-DD"),
                    moment().format("YYYY-MM-DD"),
                ],
                "Last 30 Days": [
                    moment().subtract(30, "days").format("YYYY-MM-DD"),
                    moment().format("YYYY-MM-DD"),
                ],
                "Last Month": [
                    moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD"),
                    moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
                ],
            },
            isCalendarOpen: false,
        };
    },
    mounted() {
        const defaultDateRange = document.querySelector('#default-date-range');
        const compDateRange = document.querySelector('#compare-date-range');
        new DateRangePicker(defaultDateRange, {
            format: "yyyy-mm-dd",
        });
        new DateRangePicker(compDateRange, {
            format: "yyyy-mm-dd",
        });
        
    },
    methods: {
        toggleCalendar() {
            this.isCalendarOpen = !this.isCalendarOpen;
        },
        handleDefaultDate(selectedDate) {
            this.selectedDefault = selectedDate;
            if(selectedDate !== 'Custom') {
                this.defaultStartDate = this.defaultRanges[selectedDate][0]
                this.defaultEndDate = this.defaultRanges[selectedDate][1]

            }
        },
        close(event) {
            if (!this.$el.contains(event.target)) {
                //prevent closing the box when clear search button is clicked
                if (event.target == this.$refs.clrBtn) return;
                else this.isDropdownOpen = false
            }
        },
    },
};
</script>
<style lang="sass" scoped>
.scroll__menu
    &::-webkit-scrollbar
        width: 6px
        border-radius: 12px

/* Track */
.scroll__menu
    &::-webkit-scrollbar-track
        background: var(--base_color-20)
        border-radius: 12px

/* Handle */
.scroll__menu
    &::-webkit-scrollbar-thumb
        background: var(--base_color-40)
        border-radius: 12px

/* Handle on hover */
.scroll__menu
    &::-webkit-scrollbar-thumb:hover
        background: var(--base_color-60)
</style>
<style>
.datepicker-cell.range-start {
    background-color: #065559 !important;
    color: white !important;
}
.datepicker-cell.range-end {
    background-color: #065559 !important;
    color: white !important;
}
</style>
