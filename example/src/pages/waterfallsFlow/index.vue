<template>
  <div w100vw h100vh fcc>
    <button button-base class="mx-10" @click="() => $router.push('/waterfallsFlow/preLoad')">
      pre-load
    </button>
    <button button-base class="mx-10" @click="() => $router.push('/waterfallsFlow/noPreLoad')">
      no-pre-load
    </button>
  </div>
</template>
