<template>
  <div>
    <meta charset="UTF-8" />
    <div class="relative isolate bg-slate-200 pt-24 pb-32 sm:pt-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto text-center">
      
          <p
            class="mt-2 text-4xl font-serif tracking-tight text-avocado sm:text-5xl max-w-100"
          >
            Here is what people I worked with say
          </p>
        </div>

        <div
          class="mx-auto mt-8 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4"
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
            <blockquote class="p-6 text-lg tracking-tight text-gray-900 sm:p-12 sm:text-xl/8">
  <h3 class="featured font-serif">
    {{ formattedTestimonial.heading }}
  </h3>
  <div v-html="formatText(featuredTestimonial.body)"></div>








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
import { ref, onMounted, computed } from "vue";
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
  if (typeof window !== "undefined" && "IntersectionObserver" in window) {
    const nonFeaturedObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          nonFeaturedVisible.value = true;
        }
      },
      { threshold: 0.1 },
    );

    if (nonFeaturedRef.value) {
      nonFeaturedObserver.observe(nonFeaturedRef.value);
    }
  }
});

const formattedTestimonial = computed(() => ({
  ...featuredTestimonial,
  body: formatText(featuredTestimonial.body)
}))

const formatText = (text) => {
  const formattedText = text.replace(/\\n\\n/g, '\n\n');
  return formattedText.split('\n\n').map((paragraph, index) => 
    `<p class="${index > 0 ? 'mt-4' : ''}">${paragraph}</p>`
  ).join('');
}


const featuredTestimonial = {
  heading: "Thank you for your unwavering support",
  body: "I can’t thank my Functional Medicine Practitioner, Tanya Stockdale, enough for the incredible transformation she's guided me through over the past three months.\n\nFrom battling constant bloating and uncontrollable cravings to now feeling balanced, energized, and in control of my eating habits, her expertise has been a game-changer. Her personalized approach, focusing on tailored supplements and practical dietary adjustments, has alleviated my discomfort and boosted my overall well-being significantly.\n\nBut it's not just about what goes into my body&mdash;she's also helped me reshape my mindset around food, fostering a healthier relationship with eating. \n\n I feel empowered, informed, and genuinely excited about sustaining this newfound balance and vitality.\n\nThank you for your unwavering support, encouragement, and invaluable guidance on this journey to a healthier, happier me!",
  author: {
    name: "Tallulah Adey",
    handle: "tallulahadey",
    imageUrl: "/images/tallulah.jpg",
  },
};
const testimonials = [
  [
    [
      {
        heading: "A huge source of knowledge and support",
        body: "I first met Tanya when I joined one of her workshops. I was nervous to join as l did not know what to expect, but l am so glad l attended! She created such a warm and welcoming atmosphere. I highly recommend Tanya. She is a huge source of knowledge and support for everything a woman may be experiencing or going through.",
        author: {
          name: "Zoe Edmunds",
          handle: "zoe-edmunds",
          imageUrl:
            "/images/zoe.jpg",
        },
      },
    ],
    [
      {
        heading: "Surpassed my expectations",
        body: "During a challenging period with my health, I sought the guidance of Tanya. She thoroughly assessed my symptoms and, based on my blood results, recommended adjustments to my lifestyle. Remarkably, I began to notice significant improvements. The persistent, debilitating pain in my stomach gradually disappeared, and today, my energy levels surpass those prior to my battle.\n\nI have experienced positive impact of Tanya's interventions, which surpassed my expectations, and I highly recommend her services and expertise.",
        author: {
          name: "Elina Passarino",
          handle: "elinapassarino",
          imageUrl:
            "/images/elina.jpg",
        },
      },
      // More testimonials...
    ],
  ],
  [

    [
      {
        heading: "I am forever grateful",
        body: "I started working with Tanya in June. By then I very much was feeling like I will probably never get better. I was pretty much reacting to anything. Food. Shampoos. Pets. Hair sprays. Sunblocks. Make up. My flawless skin turned bright red and developed visible capillaries. Rosacea. My sleep was none existent. I was anxious. Unable to eat, exercise, constantly flushing and just not living but rather trying to survive.\n\nTanya suggested a few blood tests and gave me a list of supplements. She also gave me hope and reassurance that I can and will get better. It felt like a weight was taken off my shoulders just hearing that.\n\nNow, almost 5 months later I can say that the improvement is tremendous!\n\nI am forever grateful to Tanya and everything she did for me and my family (yes my daughter old and my husband are both currently working with Tanya as well)! Tanya has a brilliant mind, a heart of gold and perseverance! And most importantly she makes you feel like you can do it!",
        author: {
          name: "Elena",
          handle: "",
          imageUrl:
            "/images/helena.jpg",
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
