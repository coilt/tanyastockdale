<template>
  <div>
    <meta charset="UTF-8" />
    <div class="relative isolate bg-slate-200 pt-24 pb-32 sm:pt-32">
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
          <Transition name="fade">
            <figure
              ref="figureRef"
              :class="[
                'rounded-2xl bg-white ring-1 shadow-lg ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1',
                {
                  'opacity-0 translate-y-12': !isVisible,
                  'opacity-100 translate-y-0': isVisible,
                },
              ]"
            >
              <blockquote
                class="p-6 text-lg tracking-tight text-gray-900 sm:p-12 sm:text-xl/8"
              >
                <h3 class="featured font-serif">
                  {{ featuredTestimonial.heading }}
                </h3>
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
          </Transition>

          <div v-for="(columnGroup, columnGroupIdx) in testimonials" :key="columnGroupIdx" class="space-y-8 xl:contents xl:space-y-0">
            <div v-for="(column, columnIdx) in columnGroup" :key="columnIdx" :class="[ (columnGroupIdx === 0 && columnIdx === 0) ||                (columnGroupIdx === testimonials.length - 1 &&
                  columnIdx === columnGroup.length - 1)
                  ? 'xl:row-span-2'
                  : 'xl:row-start-1',
                'space-y-8',
              ]"
            >
      
            <TransitionGroup name="fade" tag="div">
              <figure
                v-for="testimonial in column"
                :key="testimonial.author.handle"
                class="rounded-2xl bg-white p-6 ring-1 shadow-lg ring-gray-900/5"
              >
                <blockquote class="text-gray-900">
                  <h3 class="non-featured font-serif">
                    {{ testimonial.heading }}
                  </h3>

                  <p>{{ `“${testimonial.body}”` }}</p>
                </blockquote>
                <figcaption class="mt-6 flex items-center gap-x-4">
                  <img
                    class="size-10 rounded-full bg-gray-50"
                    :src="testimonial.author.imageUrl"
                    alt=""
                  />
                  <div>
                    <div class="font-semibold">
                      {{ testimonial.author.name }}
                    </div>
                    <div class="text-gray-600">
                      {{ `@${testimonial.author.handle}` }}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </TransitionGroup>
          
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const nonFeaturedRef = ref(null);
const nonFeaturedVisible = ref(false);
import { nextTick } from "vue";
const isVisible = ref(false);
const figureRef = ref(null);
const observer = ref(null);



 
onMounted(() => {
  nextTick(() => {
    if (figureRef.value) {
      console.log("Figure element found:", figureRef.value);
      observer.value = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            console.log("Testimonial entering viewport");
            isVisible.value = true;
            nextTick(() => {
              console.log("Visibility updated, triggering re-render");
            });
          }
        },
        { threshold: 0, rootMargin: "0px 0px -100px 0px" },
      );
      observer.value.observe(figureRef.value);
    } else {
      console.log("Figure element still not found after nextTick");
    }
  });
});

onMounted(() => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const nonFeaturedObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        nonFeaturedVisible.value = true;
      }
    }, { threshold: 0.1 });

    if (nonFeaturedRef.value) {
      nonFeaturedObserver.observe(nonFeaturedRef.value);
    }
  }
});

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
</script>

<style scoped>
figure {
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 1s ease,
    transform 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(230px);
}
</style>
