<script setup lang="ts">
import { uuid } from "vue-uuid";

useHead({
	title: "Login | CRM System",
});

const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
	isLoadingStore.set(true);
	await account.createEmailPasswordSession(emailRef.value, passwordRef.value);

	const response = await account.get();

	if (response) {
		authStore.set({
			email: response.email,
			name: response.name,
			status: response.status,
		});
	}

	emailRef.value = "";
	passwordRef.value = "";
	nameRef.value = "";

	await router.push("/");

	isLoadingStore.set(false);
};

const register = async () => {
	await account.create(uuid.v4(), emailRef.value, passwordRef.value, nameRef.value);

	await login();
};
</script>

<template>
	<div class="flex items-center justify-center min-h-screen w-full">
		<div class="rounded bg-sidebar w-1/4 p-5">
			<h1 class="text-2xl font-bold text-center mb-5">Login</h1>

			<form>
				<UiInput
					v-model="emailRef"
					placeholder="Email"
					type="email"
					class="mb-3"
				/>
				<UiInput
					v-model="passwordRef"
					placeholder="Password"
					type="password"
					class="mb-3"
				/>
				<UiInput
					v-model="nameRef"
					placeholder="Name"
					type="string"
					class="mb-3"
				/>
				<div class="flex items-center justify-center gap-5">
					<UiButton type="button" @click="login">Login</UiButton>
					<UiButton type="button" @click="register">Register</UiButton>
				</div>
			</form>
		</div>
	</div>
</template>
