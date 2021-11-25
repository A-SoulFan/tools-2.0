import Toast from "@/components/Toast/Toast"

// 辅助到剪切板
const copyToClipBoard = (text: string): void => {
  const copyElement = document.body.appendChild(
    document.createElement("textarea")
  )
  copyElement.style.position = "absolute"
  copyElement.style.left = "-9999px"
  copyElement.setAttribute("readonly", "")
  copyElement.value = text
  copyElement.select()
  document.execCommand("Copy")
  copyElement.parentElement?.removeChild(copyElement)
  Toast.Toast.show("已复制到剪切板")
}

export default copyToClipBoard
