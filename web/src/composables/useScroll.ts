import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useScroll(threshold: number = 50): { isScrolled: Ref<boolean> } {
  const isScrolled = ref(false)

  const handleScroll = () => {
    isScrolled.value = window.scrollY > threshold
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isScrolled
  }
}
