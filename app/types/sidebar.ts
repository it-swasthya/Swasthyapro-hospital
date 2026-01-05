import { LucideIcon } from "lucide-react"

export type SidebarItem = {
  title: string
  url: string
  icon: LucideIcon
}

export type SidebarUser = {
  name: string
  role: string
  avatar?: string
}