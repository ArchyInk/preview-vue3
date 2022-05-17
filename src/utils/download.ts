import { useCreateElement } from "arhooks-vue"

export default async (url: string, filename?: string) => {
  const link = useCreateElement<'a'>('a')
  const blob = await (await fetch(url)).blob()
  link.href = URL.createObjectURL(blob)
  link.download = filename || ''
  link.click()
}