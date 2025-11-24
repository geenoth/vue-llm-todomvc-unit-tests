import { config } from '@vue/test-utils'
import { createApp } from 'vue'

// Make Vue available globally for @vue/test-utils
global.Vue = { createApp }