import type { ComponentInternalInstance } from "vue"
import { getCurrentInstance } from "vue"
export default function useCurrentInstance () {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const proxy = appContext.config.globalProperties
  return {
    proxy
  }
}
