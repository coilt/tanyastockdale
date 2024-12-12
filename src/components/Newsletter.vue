<template>
  <div
    class="flex items-center bg-slate-200 py-12 sm:py-12 lg:py-24 rounded-t-xxl"
  >
    <div
      class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8"
    >
      <h2
        class="max-w-xl text-3xl font-semibold tracking-tight text-balance text-avocado sm:text-4xl lg:col-span-7"
      >
        Get the new articles first. Sign up for my newsletter.
      </h2>
      <form class="w-full max-w-md lg:col-span-5 lg:pt-2">
        <div class="flex gap-x-4">
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required="true"
            class="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-avocado ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-teal-800 transition-colors duration-300 ease-in-out sm:text-sm/6"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            class="flex-none rounded-md bg-avocado px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-teal-800 transition-colors duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Subscribe
          </button>
        </div>
        <p class="mt-4 text-sm/6 text-avocado">
          We care about your data. Read our
          <a
            href="#"
            class="font-semibold text-orange-800 hover:text-orange-600 transition-colors duration-300 ease-in-out"
            >privacy policy</a
          >.
        </p>
      </form>
    </div>
  </div>
</template>
