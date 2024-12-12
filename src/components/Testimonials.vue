<template>
  <div class="relative isolate bg-slate-200 pt-24 pb-32 sm:pt-32">
    <div
      class="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 "
      aria-hidden="true"
    >
      <div
        class="ml-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc]"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <div
      class="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
      aria-hidden="true"
    >
      <div
        class="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] xl:mr-[calc(50%-12rem)] xl:ml-0"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-base/7 font-semibold text-teal-600">Testimonials</h2>
        <p
          class="mt-2 text-4xl font-serif tracking-tight text-avocado sm:text-5xl"
        >
          Here is what people are saying
        </p>
      </div>
      <div
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4"
      >
        <figure
          class="rounded-2xl bg-white ring-1 shadow-lg ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1"
        >
        
          <blockquote
            class="p-6 text-lg font-semibold tracking-tight text-gray-900 sm:p-12 sm:text-xl/8"
            
          >
          <h3 class="featured font-serif">{{ featuredTestimonial.heading }}</h3>
            <p>{{ `“${featuredTestimonial.body}”` }}</p>
          </blockquote>
          <figcaption
            class="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap"
          >
            <img
              class="size-10 flex-none rounded-full bg-gray-50"
              :src="featuredTestimonial.author.imageUrl"
              alt=""
            />
            <div class="flex-auto">
              <div class="font-semibold">
                {{ featuredTestimonial.author.name }}
              </div>
              <div class="text-gray-600">
                {{ `@${featuredTestimonial.author.handle}` }}
              </div>
            </div>
            <img
              class="h-10 w-auto flex-none"
              :src="featuredTestimonial.author.logoUrl"
              alt=""
            />
          </figcaption>
        </figure>
        <div
          v-for="(columnGroup, columnGroupIdx) in testimonials"
          :key="columnGroupIdx"
          class="space-y-8 xl:contents xl:space-y-0"
        >
          <div
            v-for="(column, columnIdx) in columnGroup"
            :key="columnIdx"
            :class="[
              (columnGroupIdx === 0 && columnIdx === 0) ||
              (columnGroupIdx === testimonials.length - 1 &&
                columnIdx === columnGroup.length - 1)
                ? 'xl:row-span-2'
                : 'xl:row-start-1',
              'space-y-8',
            ]"
          >
            <figure
              v-for="testimonial in column"
              :key="testimonial.author.handle"
              class="rounded-2xl bg-white p-6 ring-1 shadow-lg ring-gray-900/5"
            >
              <blockquote class="text-gray-900">
                <h3 class="non-featured font-serif">{{ testimonial.heading }}</h3>

                <p>{{ `“${testimonial.body}”` }}</p>
              </blockquote>
              <figcaption class="mt-6 flex items-center gap-x-4">
                <img
                  class="size-10 rounded-full bg-gray-50"
                  :src="testimonial.author.imageUrl"
                  alt=""
                />
                <div>
                  <div class="font-semibold">{{ testimonial.author.name }}</div>
                  <div class="text-gray-600">
                    {{ `@${testimonial.author.handle}` }}
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" type="module">

 
import { gsap } from 'gsap' 
 
 


const featuredTestimonial = {
  heading: "I can’t thank enough",
  body: "I can’t thank my Functional Medicine Practitioner, Tanya Stockdale, enough for the incredible transformation she's guided me through over the past three months. From battling constant bloating and uncontrollable cravings to now feeling balanced, energized, and in control of my eating habits, her expertise has been a game-changer.",
  author: {
    name: "Tallulah",
    handle: "tallulah",
    imageUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
  },
};
const testimonials = [
  [
    [
      {
        heading: "Amazing Results",
        body: "I don’t know what kind of sorcery this is, but ever since I got with Tanya’s program, my lasagna has been winning neighborhood bake-offs—despite the fact it’s not baked and technically, I’m using frozen dinners. Highly recommend!",
        author: {
          name: "Leslie Alexander",
          handle: "lesliealexander",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
    [
      {
        heading: "Amazing Results",
        body: "Warning: Tanya’s programs might make you irresistible. My cat, Mr. Reaper, started preparing me breakfast in bed. If you want devotion bordering on obsession, this is for you.",
        author: {
          name: "Lindsay Walton",
          handle: "lindsaywalton",
          imageUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
  ],
  [
    [
      {
        heading: "Amazing Results",
        body: "No joke, every single person asked me, ‘If I am on Tanya’s program? You’re the ONE.’ Sure, they all turned out to be pyramid scheme recruiters, but still, my calendar is booked solid. ",
        author: {
          name: "Tom Cook",
          handle: "tomcook",
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
    [
      {
        heading: "Amazing Results",
        body: "I was skeptical at first, but after one week with this program, I can now predict the weather with my elbow and communicate fluently with squirrels. It’s like I’ve ascended to a higher plane of existence. 10/10 would ascend again.",
        author: {
          name: "Leonard Krasner",
          handle: "leonardkrasner",
          imageUrl:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
  ],
];



// onMounted(() => {
//   gsap.from(testimonialRefs.value, {
//     opacity: 0,
//     y: 50,
//     duration: 0.8,
//     stagger: 0.2,
//     ease: 'power3.out',
//     scrollTrigger: {
//       trigger: testimonialRefs.value[0],
//       start: 'top bottom-=100',
//       end: 'bottom top+=100',
//       toggleActions: 'play none none reverse'
//     }
//   })
// })
</script>



 