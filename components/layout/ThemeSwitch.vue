<script lang="ts" setup>
const currentTheme = ref(localStorage.getItem("theme") || "light");


// Функция для переключения темы
function toggleTheme() {
  if (currentTheme.value === 'light') {
    document.documentElement.classList.add('dark');
    currentTheme.value = 'dark';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    currentTheme.value = 'light';
    localStorage.setItem('theme', 'light');
  }
}

// Автоматическая установка темы при загрузке страницы
watchEffect(() => {
  if (currentTheme.value === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});
</script>

<template>
	<div class="flex items-center justify-between w-1/2 px-3 box-border absolute bottom-8">
		<Icon
			name="solar:moon-bold"
			size="30"
		/>
		<UiSwitch id="theme-switch" @click="toggleTheme" :checked="currentTheme === 'light'"/>
		<Icon
			name="solar:sun-bold"
			size="30"
		/>
	</div>
</template>

<style></style>
