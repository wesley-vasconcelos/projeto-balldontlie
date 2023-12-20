<template>
  <div class="notificationGroup">
    <NotificationGroup group="white">
      <div
        class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none z-50"
      >
        <div class="w-full max-w-sm">
          <Notification
            v-slot="{ notifications, close }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
          >
            <div
              class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
              v-for="notification in notifications"
              :key="notification.id"
            >
              <div class="p-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <CheckCircleIcon
                      v-if="notification.type === 'success'"
                      class="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                    <InformationCircleIcon
                      v-if="notification.type === 'info'"
                      class="h-6 w-6 text-blue-400"
                      aria-hidden="true"
                    />
                    <XCircleIcon
                      v-if="notification.type === 'error'"
                      class="h-6 w-6 text-red-400"
                      aria-hidden="true"
                    />

                    <svg
                      v-if="notification.type === 'download'"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 text-blue-400"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                  </div>

                  <div class="ml-3 w-0 flex-1 pt-0.5">
                    <p
                      class="text-sm font-medium text-gray-900"
                      style="word-wrap: break-word"
                    >
                      {{ formatTitle(notification.title) }}
                    </p>
                    <p
                      class="mt-1 text-sm text-gray-500"
                      style="word-wrap: break-word"
                      v-if="notification.text"
                    >
                      {{ formatText(notification.text) }}
                    </p>
                  </div>

                  <div class="ml-4 flex-shrink-0 flex">
                    <button
                      @click="close(notification.id)"
                      class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span class="sr-only">Close</span>
                      <XIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Notification>
        </div>
      </div>
    </NotificationGroup>
  </div>
</template>

<script>
import {
  CheckCircleIcon,
  XIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/solid";

const notifyText = {
  api001: "A senha deve conter pelo menos 8 caracteres.",
  api002: "A senha deve conter pelo menos um número.",
  api003: "A senha deve conter pelo menos uma letra maiúscula.",
};

const notifyTitle = {
  generic: "Ocorreu um erro",
  api014: "Código expirado",
};

export default {
  name: "notification-component",
  components: {
    CheckCircleIcon,
    XIcon,
    InformationCircleIcon,
    XCircleIcon,
  },
  setup() {
    function formatText(val) {
      const formated = notifyText[val] ? notifyText[val] : val;
      return formated;
    }

    function formatTitle(val) {
      const formated = notifyTitle[val] ? notifyTitle[val] : val;
      return formated;
    }
    return {
      formatText,
      formatTitle,
    };
  },
};
</script>
