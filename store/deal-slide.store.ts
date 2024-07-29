import type { ICard } from "~/components/kanban/kanban.types";

interface IDealSlideStore {
  isOpen: boolean
  card: ICard | null
}

const defaultValue: IDealSlideStore = {
  isOpen: false,
  card: null
}

export const useDealSlideStore = defineStore("deal-slide", {
  state: () => defaultValue,
  actions: {
    clear(){
      this.$patch(defaultValue)
    },
    set(card: ICard) {
      this.$patch({card, isOpen: true})
    },
    toggle() {
      this.isOpen = !this.isOpen
    }
  }
})

